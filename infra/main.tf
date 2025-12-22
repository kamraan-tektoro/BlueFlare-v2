resource "azurerm_resource_group" "rg" {
  name     = "${var.project}-${var.environment}-rg"
  location = var.location
}

resource "random_string" "suffix" {
  length  = 6
  upper   = false
  special = false
}

# Generate Postgres password if not provided
resource "random_password" "postgres_password" {
  count   = var.postgres_admin_password == "" ? 1 : 0
  length  = 32
  special = true
  upper   = true
  lower   = true
  numeric = true
}

locals {
  postgres_password = var.postgres_admin_password != "" ? var.postgres_admin_password : random_password.postgres_password[0].result
  # Short names for container apps (max 32 chars, lowercase alphanumeric and hyphens only)
  container_app_name_prefix = replace("${var.project}-${var.environment}", "blueflare-website", "bf")
  postgres_host             = azurerm_postgresql_flexible_server.pg.fqdn
  # URL-encode the password to handle special characters in DATABASE_URL
  postgres_password_encoded = urlencode(local.postgres_password)
  postgres_conn             = "postgresql://${var.postgres_admin_user}:${local.postgres_password_encoded}@${azurerm_postgresql_flexible_server.pg.fqdn}:5432/${azurerm_postgresql_flexible_server_database.umami_db.name}?sslmode=require"

  # Common tags for all resources
  common_tags = {
    project     = var.project
    environment = var.environment
  }
}

# -----------------------------
# Log Analytics (Container Apps needs this)
# -----------------------------
resource "azurerm_log_analytics_workspace" "law" {
  name                = "${var.project}-${var.environment}-law"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = local.common_tags
}

# -----------------------------
# Static Web App (Standard)
# Repo linkage is typically done via Portal/GitHub Actions after creation
# -----------------------------
resource "azurerm_static_web_app" "swa" {
  name                = "${var.swa_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku_tier            = "Standard"
  sku_size            = "Standard"

  tags = local.common_tags
}

# -----------------------------
# Storage Account for:
# - Function runtime storage
# - Table Storage (Leads + Rate limits)
# - Public media blobs (images/videos)
# -----------------------------
resource "azurerm_storage_account" "sa" {
  # Storage account names: 3-24 chars, lowercase alphanumeric only
  # Shorten: blueflare-website -> bf
  name                     = "${replace(replace(var.project, "blueflare-website", "bf"), "-", "")}${var.environment}${random_string.suffix.result}"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  # Required for public blob container
  allow_nested_items_to_be_public = true
  min_tls_version                 = "TLS1_2"

  tags = local.common_tags
}

# Public container for media
resource "azurerm_storage_container" "media" {
  name                  = var.media_container_name
  storage_account_name  = azurerm_storage_account.sa.name
  container_access_type = "blob" # public read for blobs only
}

# Tables
resource "azurerm_storage_table" "leads" {
  name                 = "Leads"
  storage_account_name = azurerm_storage_account.sa.name
}

resource "azurerm_storage_table" "rate_limits" {
  name                 = "ContactRateLimits"
  storage_account_name = azurerm_storage_account.sa.name
}

# -----------------------------
# App Insights for Functions
# -----------------------------
resource "azurerm_application_insights" "ai" {
  name                = "${var.project}-${var.environment}-ai"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"

  tags = local.common_tags
}

# -----------------------------
# Function App (Linux, Consumption, Node 20)
# Stores leads in Table + sends email via Microsoft Graph
# -----------------------------
resource "azurerm_service_plan" "func_plan" {
  name                = "${var.project}-${var.environment}-func-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "Y1" # Consumption

  tags = local.common_tags
}

resource "azurerm_linux_function_app" "func" {
  name                = "${var.function_app_name}-${var.environment}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  service_plan_id            = azurerm_service_plan.func_plan.id
  storage_account_name       = azurerm_storage_account.sa.name
  storage_account_access_key = azurerm_storage_account.sa.primary_access_key

  site_config {
    application_stack {
      node_version = "20"
    }

    cors {
      allowed_origins     = ["*"] # Allow all origins - function code handles specific origins
      support_credentials = false
    }
  }

  app_settings = {
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.ai.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.ai.connection_string

    # Use default Functions storage connection string for @azure/data-tables TableClient.fromConnectionString
    "RATE_TABLE_NAME"        = azurerm_storage_table.rate_limits.name
    "LEADS_TABLE_NAME"       = azurerm_storage_table.leads.name
    "DAILY_CONTACT_LIMIT"    = tostring(var.daily_contact_limit)
    "CORS_ALLOW_ORIGIN"      = var.site_origin
    "CONTACT_SUBJECT_PREFIX" = "BlueFlare Website Contact"

    # Microsoft Graph email (app registration)
    "GRAPH_TENANT_ID"     = var.graph_tenant_id
    "GRAPH_CLIENT_ID"     = var.graph_client_id
    "GRAPH_CLIENT_SECRET" = var.graph_client_secret
    "GRAPH_FROM_USER"     = var.graph_from_user
    "GRAPH_TO_EMAIL"      = var.graph_to_email
  }

  tags = local.common_tags
}

# -----------------------------
# Postgres (Flexible Server) for Umami
# -----------------------------
resource "azurerm_postgresql_flexible_server" "pg" {
  name                = "${var.project}-${var.environment}-pg-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  administrator_login    = var.postgres_admin_user
  administrator_password = local.postgres_password

  sku_name   = var.postgres_sku_name
  storage_mb = var.postgres_storage_mb
  version    = "16"

  # Public access (simple MVP). If you later want private networking, we can refactor.
  public_network_access_enabled = true

  backup_retention_days = 7
  zone                  = "1"

  tags = local.common_tags
}

resource "azurerm_postgresql_flexible_server_database" "umami_db" {
  name      = "umami"
  server_id = azurerm_postgresql_flexible_server.pg.id
  charset   = "UTF8"
  collation = "en_US.utf8"
}

# Allow Azure services to access Postgres (easy MVP)
resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "AllowAzureServices"
  server_id        = azurerm_postgresql_flexible_server.pg.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Enable pgcrypto extension for Umami (required for UUID generation)
resource "azurerm_postgresql_flexible_server_configuration" "pgcrypto" {
  name      = "azure.extensions"
  server_id = azurerm_postgresql_flexible_server.pg.id
  value     = "pgcrypto"
}

# Allow non-SSL connections (required for Peekaping which doesn't support SSL config)
# Note: This reduces security - consider VNet integration for production
resource "azurerm_postgresql_flexible_server_configuration" "require_secure_transport" {
  name      = "require_secure_transport"
  server_id = azurerm_postgresql_flexible_server.pg.id
  value     = "off"
}

# -----------------------------
# Container Apps Environment (for Umami only now)
# -----------------------------
resource "azurerm_container_app_environment" "cae" {
  name                       = "${var.project}-${var.environment}-cae"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id

  tags = local.common_tags
}

# -----------------------------
# Umami Container App
# -----------------------------
resource "azurerm_container_app" "umami" {
  name                         = "${local.container_app_name_prefix}-umami"
  container_app_environment_id = azurerm_container_app_environment.cae.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  # Ensure pgcrypto extension is enabled before Umami starts
  depends_on = [azurerm_postgresql_flexible_server_configuration.pgcrypto]

  ingress {
    external_enabled = true
    target_port      = 3000
    transport        = "auto"

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    container {
      name   = "umami"
      image  = var.umami_container_image
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "DATABASE_URL"
        value = local.postgres_conn
      }

      # Required by Umami; set a long random value in production
      env {
        name  = "APP_SECRET"
        value = random_string.suffix.result
      }

      env {
        name  = "DISABLE_TELEMETRY"
        value = "1"
      }
    }

    min_replicas = 1
    max_replicas = 1
  }

  tags = local.common_tags
}

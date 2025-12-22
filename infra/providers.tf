terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.100.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 3.6.0"
    }
    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = ">= 1.22.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "06a25468-a9b6-42f2-affa-fd5a36dd7069"
}

# PostgreSQL provider for managing database users and permissions
# Uses the admin credentials from the Flexible Server
provider "postgresql" {
  host            = azurerm_postgresql_flexible_server.pg.fqdn
  port            = 5432
  database        = "postgres"
  username        = var.postgres_admin_user
  password        = local.postgres_password
  sslmode         = "require"
  connect_timeout = 15
  superuser       = false
}

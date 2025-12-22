# -----------------------------
# Gatus Status Monitoring Deployment
# Simple, lightweight uptime monitoring with web UI
# https://github.com/TwiN/gatus - MIT License
# -----------------------------

locals {
  # Webhook URL for Graph API email alerts (auto-configured if Graph credentials exist)
  gatus_webhook_url_auto = var.gatus_webhook_url != "" ? var.gatus_webhook_url : (
    var.graph_tenant_id != "" && var.graph_client_id != "" && var.graph_client_secret != "" ?
    "https://${azurerm_linux_function_app.func.default_hostname}/api/gatus-webhook" : ""
  )

  # Check if any alerting is enabled
  alerting_enabled = local.gatus_webhook_url_auto != "" || var.gatus_slack_webhook_url != "" || var.gatus_discord_webhook_url != ""
}

# -----------------------------
# Gatus Container App
# -----------------------------
resource "azurerm_container_app" "gatus" {
  name                         = "${local.container_app_name_prefix}-gatus"
  container_app_environment_id = azurerm_container_app_environment.cae.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  ingress {
    external_enabled = true
    target_port      = 8080
    transport        = "auto"

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    # Init container to create config file
    init_container {
      name   = "config-init"
      image  = "busybox:latest"
      cpu    = 0.25
      memory = "0.5Gi"

      command = ["/bin/sh", "-c"]
      args = [<<-EOT
        cat > /config/config.yaml << 'CONFIGEOF'
ui:
  title: "${var.gatus_title}"
  header: "${var.gatus_title}"

storage:
  type: memory

endpoints:
  - name: BlueFlare Website
    group: Website
    url: "${var.site_origin}"
    interval: 60s
    conditions:
      - "[STATUS] == 200"
      - "[RESPONSE_TIME] < 5000"

  - name: Lead Capture API
    group: API
    url: "https://${azurerm_linux_function_app.func.default_hostname}/api/contact"
    method: OPTIONS
    interval: 60s
    conditions:
      - "[STATUS] < 500"

  - name: Umami Analytics
    group: Services
    url: "https://${azurerm_container_app.umami.ingress[0].fqdn}"
    interval: 60s
    conditions:
      - "[STATUS] == 200"
      - "[RESPONSE_TIME] < 5000"
CONFIGEOF
        echo "=== Gatus Config Created ==="
        cat /config/config.yaml
        echo "==========================="
EOT
      ]

      volume_mounts {
        name = "config"
        path = "/config"
      }
    }

    container {
      name   = "gatus"
      image  = var.gatus_image
      cpu    = 0.25
      memory = "0.5Gi"

      volume_mounts {
        name = "config"
        path = "/config"
      }

      env {
        name  = "TZ"
        value = "America/Chicago"
      }
    }

    # EmptyDir volume for config sharing between init and main container
    volume {
      name         = "config"
      storage_type = "EmptyDir"
    }

    min_replicas = 1
    max_replicas = 1
  }

  tags = local.common_tags
}

# -----------------------------
# Gatus Status Monitoring Deployment
# Simple, lightweight uptime monitoring with web UI
# https://github.com/TwiN/gatus - MIT License
# -----------------------------

# Build alerting configuration
locals {
  # Webhook URL for Graph API email alerts (auto-configured if Graph credentials exist)
  gatus_webhook_url_auto = var.gatus_webhook_url != "" ? var.gatus_webhook_url : (
    var.graph_tenant_id != "" && var.graph_client_id != "" && var.graph_client_secret != "" ?
    "https://${azurerm_linux_function_app.func.default_hostname}/api/gatus-webhook" : ""
  )
  # Slack alerting config
  slack_alerting_config = var.gatus_slack_webhook_url != "" ? join("\n", [
    "  slack:",
    "    webhook-url: \"${var.gatus_slack_webhook_url}\"",
    "    default-alert:",
    "      failure-threshold: ${var.gatus_alert_failure_threshold}",
    "      success-threshold: ${var.gatus_alert_success_threshold}",
    "      send-on-resolved: true"
  ]) : ""

  # Discord alerting config
  discord_alerting_config = var.gatus_discord_webhook_url != "" ? join("\n", [
    "  discord:",
    "    webhook-url: \"${var.gatus_discord_webhook_url}\"",
    "    default-alert:",
    "      failure-threshold: ${var.gatus_alert_failure_threshold}",
    "      success-threshold: ${var.gatus_alert_success_threshold}",
    "      send-on-resolved: true"
  ]) : ""

  # Email alerting config
  email_alerting_config = var.gatus_email_from != "" && var.gatus_email_to != "" ? join("\n", [
    "  email:",
    "    from: \"${var.gatus_email_from}\"",
    "    to: \"${var.gatus_email_to}\"",
    "    host: \"${var.gatus_email_smtp_host}\"",
    "    port: ${var.gatus_email_smtp_port}",
    "    username: \"${var.gatus_email_smtp_username}\"",
    "    password: \"${var.gatus_email_smtp_password}\"",
    "    default-alert:",
    "      failure-threshold: ${var.gatus_alert_failure_threshold}",
    "      success-threshold: ${var.gatus_alert_success_threshold}",
    "      send-on-resolved: true"
  ]) : ""

  # Webhook alerting config (for Graph API via Azure Function)
  webhook_alerting_config = local.gatus_webhook_url_auto != "" ? join("\n", [
    "  custom:",
    "    - url: \"${local.gatus_webhook_url_auto}\"",
    "      method: POST",
    "      default-alert:",
    "        failure-threshold: ${var.gatus_alert_failure_threshold}",
    "        success-threshold: ${var.gatus_alert_success_threshold}",
    "        send-on-resolved: true"
  ]) : ""

  # Build alerts list for endpoints
  slack_alert = var.gatus_slack_webhook_url != "" ? join("\n", [
    "      - type: slack",
    "        failure-threshold: ${var.gatus_alert_failure_threshold}",
    "        success-threshold: ${var.gatus_alert_success_threshold}",
    "        send-on-resolved: true"
  ]) : ""

  discord_alert = var.gatus_discord_webhook_url != "" ? join("\n", [
    "      - type: discord",
    "        failure-threshold: ${var.gatus_alert_failure_threshold}",
    "        success-threshold: ${var.gatus_alert_success_threshold}",
    "        send-on-resolved: true"
  ]) : ""

  email_alert = var.gatus_email_from != "" && var.gatus_email_to != "" ? join("\n", [
    "      - type: email",
    "        failure-threshold: ${var.gatus_alert_failure_threshold}",
    "        success-threshold: ${var.gatus_alert_success_threshold}",
    "        send-on-resolved: true"
  ]) : ""

  webhook_alert = local.gatus_webhook_url_auto != "" ? join("\n", [
    "      - type: custom",
    "        failure-threshold: ${var.gatus_alert_failure_threshold}",
    "        success-threshold: ${var.gatus_alert_success_threshold}",
    "        send-on-resolved: true"
  ]) : ""

  # Combine all alerts
  endpoint_alerts = trimspace(join("\n", compact([
    local.slack_alert,
    local.discord_alert,
    local.email_alert,
    local.webhook_alert
  ])))
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
        cat > /config/config.yaml << 'EOF'
ui:
  title: "${var.gatus_title}"
  header: "${var.gatus_title}"

storage:
  type: memory
${length(compact([local.slack_alerting_config, local.discord_alerting_config, local.email_alerting_config, local.webhook_alerting_config])) > 0 ? "\nalerting:\n" : ""}${local.slack_alerting_config != "" ? "${local.slack_alerting_config}\n" : ""}${local.discord_alerting_config != "" ? "${local.discord_alerting_config}\n" : ""}${local.email_alerting_config != "" ? "${local.email_alerting_config}\n" : ""}${local.webhook_alerting_config != "" ? "${local.webhook_alerting_config}\n" : ""}endpoints:
  - name: BlueFlare Website
    group: Website
    url: "${var.site_origin}"
    interval: 60s
    conditions:
      - "[STATUS] == 200"
      - "[RESPONSE_TIME] < 5000"
${local.endpoint_alerts != "" ? "    alerts:\n${local.endpoint_alerts}\n" : ""}
  - name: Lead Capture API
    group: API
    url: "https://${azurerm_linux_function_app.func.default_hostname}/api/contact"
    method: OPTIONS
    interval: 60s
    conditions:
      - "[STATUS] < 500"
${local.endpoint_alerts != "" ? "    alerts:\n${local.endpoint_alerts}\n" : ""}
  - name: Umami Analytics
    group: Services
    url: "https://${azurerm_container_app.umami.ingress[0].fqdn}"
    interval: 60s
    conditions:
      - "[STATUS] == 200"
      - "[RESPONSE_TIME] < 5000"
${local.endpoint_alerts != "" ? "    alerts:\n${local.endpoint_alerts}\n" : ""}
EOF
        echo "Config created:"
        cat /config/config.yaml
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

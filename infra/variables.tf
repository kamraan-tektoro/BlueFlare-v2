variable "project" {
  type        = string
  description = "Project prefix"
  default     = "blueflare-website"
}

variable "environment" {
  type        = string
  description = "Environment name (dev/prod)"
  default     = "prod"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "centralus"
}

# ---------- Domains / origins ----------
variable "site_origin" {
  type        = string
  description = "Allowed origin for CORS, e.g. https://<your-swa-domain>"
  default     = "https://example.com"
}

# ---------- Static Web App ----------
variable "swa_name" {
  type        = string
  description = "Static Web App name"
  default     = "blueflare-website"
}

# ---------- Function App ----------
variable "function_app_name" {
  type        = string
  description = "Function app name"
  default     = "blueflare-website-leads"
}

variable "daily_contact_limit" {
  type        = number
  description = "Max submissions per IP per day"
  default     = 5
}

# ---------- Media (Blob) ----------
variable "media_container_name" {
  type        = string
  description = "Public blob container for images/videos"
  default     = "media"
}

# ---------- Email via Microsoft Graph ----------
variable "graph_tenant_id" {
  type      = string
  sensitive = true
  default   = ""
}

variable "graph_client_id" {
  type      = string
  sensitive = true
  default   = ""
}

variable "graph_client_secret" {
  type      = string
  sensitive = true
  default   = ""
}

variable "graph_from_user" {
  type    = string
  default = "info@blueflare.com"
}

variable "graph_to_email" {
  type    = string
  default = "leads@blueflare.com"
}

# ---------- Umami + Postgres ----------
variable "umami_domain" {
  type        = string
  description = "Optional custom domain for Umami (leave blank if none)"
  default     = ""
}

variable "umami_container_image" {
  type        = string
  description = "Umami container image"
  default     = "ghcr.io/umami-software/umami:postgresql-latest"
}

variable "postgres_admin_user" {
  type    = string
  default = "umamiadmin"
}

variable "postgres_admin_password" {
  type      = string
  sensitive = true
  default   = ""
}

variable "postgres_sku_name" {
  type        = string
  description = "Flexible Server SKU; pick a small burstable SKU for cost control"
  default     = "B_Standard_B1ms"
}

variable "postgres_storage_mb" {
  type    = number
  default = 32768
}

# ---------- Gatus Status Monitoring ----------
# MIT License - https://github.com/TwiN/gatus
variable "gatus_image" {
  type        = string
  description = "Gatus container image"
  default     = "twinproduction/gatus:latest"
}

variable "gatus_title" {
  type        = string
  description = "Title shown in the Gatus dashboard"
  default     = "BlueFlare Status"
}

# Gatus Alerting Configuration
variable "gatus_slack_webhook_url" {
  type        = string
  description = "Slack webhook URL for Gatus alerts (optional)"
  sensitive   = true
  default     = ""
}

variable "gatus_discord_webhook_url" {
  type        = string
  description = "Discord webhook URL for Gatus alerts (optional)"
  sensitive   = true
  default     = ""
}

variable "gatus_email_from" {
  type        = string
  description = "Email address to send Gatus alerts from (optional). If using Microsoft 365, can reuse graph_from_user"
  default     = ""
}

variable "gatus_email_smtp_host" {
  type        = string
  description = "SMTP host for email alerts (optional). For Microsoft 365 use: smtp.office365.com"
  default     = ""
}

variable "gatus_email_smtp_port" {
  type        = number
  description = "SMTP port for email alerts"
  default     = 587
}

variable "gatus_email_smtp_username" {
  type        = string
  description = "SMTP username for email alerts (optional). For Microsoft 365, use the email address"
  sensitive   = true
  default     = ""
}

variable "gatus_email_smtp_password" {
  type        = string
  description = "SMTP password for email alerts (optional). For Microsoft 365, use an App Password (not the Graph client secret)"
  sensitive   = true
  default     = ""
}

variable "gatus_email_to" {
  type        = string
  description = "Email address to send Gatus alerts to (optional). Can reuse graph_to_email"
  default     = ""
}

# Option: Use Graph API via webhook (requires custom function)
variable "gatus_webhook_url" {
  type        = string
  description = "Webhook URL for custom alerting (e.g., Azure Function that sends via Graph API)"
  default     = ""
}

variable "gatus_alert_failure_threshold" {
  type        = number
  description = "Number of consecutive failures before sending alert"
  default     = 3
}

variable "gatus_alert_success_threshold" {
  type        = number
  description = "Number of consecutive successes before resolving alert"
  default     = 2
}

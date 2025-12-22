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

# ---------- Uptime Kuma VM ----------
variable "uptimekuma_admin_ssh_public_key" {
  type        = string
  description = "SSH public key for the Uptime Kuma VM admin user (azureuser)"
  sensitive   = true
}

variable "uptimekuma_allowed_ip_cidr" {
  type        = string
  description = "CIDR block allowed to access Uptime Kuma (e.g., your public IP: 203.0.113.10/32)"
  default     = "0.0.0.0/0" # Default to allow all - should be overridden in production
}

variable "uptimekuma_allow_public" {
  type        = bool
  description = "If true, allow port 3001 from anywhere (0.0.0.0/0). Otherwise only from uptimekuma_allowed_ip_cidr"
  default     = false
}

variable "uptimekuma_vm_size" {
  type        = string
  description = "Azure VM size for Uptime Kuma"
  default     = "Standard_B2s_v2"
}

variable "uptimekuma_port" {
  type        = number
  description = "Port for Uptime Kuma web UI"
  default     = 3001
}

variable "uptimekuma_container_image" {
  type        = string
  description = "Uptime Kuma Docker image"
  default     = "louislam/uptime-kuma:latest"
}

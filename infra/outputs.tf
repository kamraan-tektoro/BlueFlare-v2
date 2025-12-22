output "resource_group" {
  value = azurerm_resource_group.rg.name
}

output "static_web_app_name" {
  value = azurerm_static_web_app.swa.name
}

output "static_web_app_url" {
  value       = "https://${azurerm_static_web_app.swa.name}.azurestaticapps.net"
  description = "Default domain URL for the Static Web App (azurestaticapps.net)"
}

output "function_app_base_url" {
  value = "https://${azurerm_linux_function_app.func.default_hostname}"
}

output "lead_capture_endpoint" {
  value = "https://${azurerm_linux_function_app.func.default_hostname}/api/contact"
}

output "storage_account_name" {
  value = azurerm_storage_account.sa.name
}

output "public_media_base_url" {
  value = "https://${azurerm_storage_account.sa.name}.blob.core.windows.net/${azurerm_storage_container.media.name}"
}

output "umami_url" {
  value = "https://${azurerm_container_app.umami.ingress[0].fqdn}"
}

output "postgres_fqdn" {
  value = azurerm_postgresql_flexible_server.pg.fqdn
}

# -----------------------------
# Uptime Kuma VM Outputs
# -----------------------------
output "uptimekuma_public_ip" {
  value       = azurerm_public_ip.kuma_pip.ip_address
  description = "Public IP address of the Uptime Kuma VM"
}

output "uptimekuma_url" {
  value       = "http://${azurerm_public_ip.kuma_pip.ip_address}:${var.uptimekuma_port}"
  description = "URL to access Uptime Kuma web UI"
}

output "uptimekuma_ssh_command" {
  value       = "ssh azureuser@${azurerm_public_ip.kuma_pip.ip_address}"
  description = "SSH command to connect to the Uptime Kuma VM"
}

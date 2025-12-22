# -----------------------------
# Uptime Kuma VM Deployment
# Using a small Azure VM with local disk storage for SQLite WAL compatibility
# -----------------------------

# -----------------------------
# Networking - Virtual Network & Subnet
# -----------------------------
resource "azurerm_virtual_network" "kuma_vnet" {
  name                = "bf-${var.environment}-kuma-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  tags = local.common_tags
}

resource "azurerm_subnet" "kuma_subnet" {
  name                 = "kuma-subnet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.kuma_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# -----------------------------
# Network Security Group
# -----------------------------
resource "azurerm_network_security_group" "kuma_nsg" {
  name                = "bf-${var.environment}-kuma-nsg"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  # SSH access - restricted to allowed IP
  security_rule {
    name                       = "AllowSSH"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = var.uptimekuma_allowed_ip_cidr
    destination_address_prefix = "*"
  }

  # Uptime Kuma web UI - restricted to allowed IP (default)
  security_rule {
    name                       = "AllowKumaFromAllowedIP"
    priority                   = 200
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = tostring(var.uptimekuma_port)
    source_address_prefix      = var.uptimekuma_allowed_ip_cidr
    destination_address_prefix = "*"
  }

  # Uptime Kuma web UI - public access (only if uptimekuma_allow_public=true)
  dynamic "security_rule" {
    for_each = var.uptimekuma_allow_public ? [1] : []
    content {
      name                       = "AllowKumaPublic"
      priority                   = 210
      direction                  = "Inbound"
      access                     = "Allow"
      protocol                   = "Tcp"
      source_port_range          = "*"
      destination_port_range     = tostring(var.uptimekuma_port)
      source_address_prefix      = "0.0.0.0/0"
      destination_address_prefix = "*"
    }
  }

  tags = local.common_tags
}

# Associate NSG with subnet
resource "azurerm_subnet_network_security_group_association" "kuma_nsg_assoc" {
  subnet_id                 = azurerm_subnet.kuma_subnet.id
  network_security_group_id = azurerm_network_security_group.kuma_nsg.id
}

# -----------------------------
# Public IP
# -----------------------------
resource "azurerm_public_ip" "kuma_pip" {
  name                = "bf-${var.environment}-kuma-pip"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"

  tags = local.common_tags
}

# -----------------------------
# Network Interface
# -----------------------------
resource "azurerm_network_interface" "kuma_nic" {
  name                = "bf-${var.environment}-kuma-nic"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.kuma_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.kuma_pip.id
  }

  tags = local.common_tags
}

# -----------------------------
# Linux Virtual Machine
# -----------------------------
resource "azurerm_linux_virtual_machine" "kuma_vm" {
  name                = "bf-${var.environment}-uptimekuma-vm"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  size                = var.uptimekuma_vm_size
  admin_username      = "azureuser"

  network_interface_ids = [
    azurerm_network_interface.kuma_nic.id
  ]

  admin_ssh_key {
    username   = "azureuser"
    public_key = var.uptimekuma_admin_ssh_public_key
  }

  os_disk {
    name                 = "bf-${var.environment}-kuma-osdisk"
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    disk_size_gb         = 30
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  # Cloud-init script for Docker + Uptime Kuma installation
  custom_data = base64encode(templatefile("${path.module}/cloud-init/uptimekuma.yaml", {
    kuma_port            = var.uptimekuma_port
    kuma_container_image = var.uptimekuma_container_image
  }))

  tags = local.common_tags
}


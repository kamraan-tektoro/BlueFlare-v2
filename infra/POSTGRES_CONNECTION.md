# PostgreSQL Database Connection Guide

## Quick Connection Info

### Get Connection Details

Run these commands to get your connection details:

```bash
cd infra

# Get the PostgreSQL server FQDN (hostname)
terraform output postgres_fqdn

# Example output: blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com
```

### Connection Parameters

| Parameter | Value |
|-----------|-------|
| **Host** | `blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com` (get from `terraform output postgres_fqdn`) |
| **Port** | `5432` |
| **Database** | `umami` (or `postgres` for admin access) |
| **Username** | `umamiadmin` |
| **Password** | `@Postgres2025!` (from `terraform.tfvars`) |
| **SSL Mode** | `require` (mandatory for Azure PostgreSQL) |

---

## Connection String Format

### PostgreSQL Connection String (URI)

```
postgresql://umamiadmin:@Postgres2025!@blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com:5432/umami?sslmode=require
```

**Note:** If your password contains special characters (like `@`), URL-encode them:
- `@` becomes `%40`
- `!` becomes `%21`
- `#` becomes `%23`

**URL-encoded version:**
```
postgresql://umamiadmin:%40Postgres2025%21@blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com:5432/umami?sslmode=require
```

---

## Connecting from Different Clients

### 1. psql (Command Line)

```bash
# Install PostgreSQL client tools (if not installed)
# Ubuntu/Debian:
sudo apt-get install postgresql-client

# macOS:
brew install postgresql

# Windows:
# Download from https://www.postgresql.org/download/windows/

# Connect
psql "host=blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com port=5432 dbname=umami user=umamiadmin password=@Postgres2025! sslmode=require"

# Or using connection string
psql "postgresql://umamiadmin:%40Postgres2025%21@blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com:5432/umami?sslmode=require"
```

### 2. pgAdmin (GUI Tool)

1. **Download pgAdmin:** https://www.pgadmin.org/download/
2. **Add New Server:**
   - Right-click "Servers" → "Create" → "Server"
   - **General Tab:**
     - Name: `BlueFlare Production`
   - **Connection Tab:**
     - Host: `blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com`
     - Port: `5432`
     - Database: `umami` (or `postgres` for admin)
     - Username: `umamiadmin`
     - Password: `@Postgres2025!`
   - **SSL Tab:**
     - SSL Mode: `Require`
     - Click "Save"

### 3. DBeaver (Free Universal Database Tool)

1. **Download DBeaver:** https://dbeaver.io/download/
2. **Create New Connection:**
   - Click "New Database Connection" → Select "PostgreSQL"
   - **Main Tab:**
     - Host: `blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com`
     - Port: `5432`
     - Database: `umami`
     - Username: `umamiadmin`
     - Password: `@Postgres2025!`
   - **SSL Tab:**
     - Check "Use SSL"
     - SSL Mode: `require`
   - Click "Test Connection" → "Finish"

### 4. Azure Data Studio

1. **Download:** https://aka.ms/azuredatastudio
2. **Add Connection:**
   - Click "New Connection"
   - Server: `blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com`
   - Authentication Type: `SQL Login`
   - Username: `umamiadmin`
   - Password: `@Postgres2025!`
   - Database: `umami`
   - Encrypt: `Mandatory`
   - Click "Connect"

### 5. VS Code (PostgreSQL Extension)

1. **Install Extension:** "PostgreSQL" by Chris Kolkman
2. **Add Connection:**
   - Click the PostgreSQL icon in sidebar
   - Click "+" to add connection
   - Enter:
     - Host: `blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com`
     - Port: `5432`
     - Database: `umami`
     - Username: `umamiadmin`
     - Password: `@Postgres2025!`
     - SSL: `require`

### 6. TablePlus (macOS/Windows)

1. **Download:** https://tableplus.com/
2. **Create Connection:**
   - Click "Create a new connection" → "PostgreSQL"
   - **Connection Details:**
     - Name: `BlueFlare Production`
     - Host: `blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com`
     - Port: `5432`
     - User: `umamiadmin`
     - Password: `@Postgres2025!`
     - Database: `umami`
   - **SSL:**
     - Enable SSL: `Yes`
     - SSL Mode: `require`
   - Click "Connect"

### 7. Python (psycopg2)

```python
import psycopg2
from urllib.parse import quote_plus

# URL-encode password
password = quote_plus("@Postgres2025!")

# Connection string
conn_string = f"postgresql://umamiadmin:{password}@blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com:5432/umami?sslmode=require"

# Connect
conn = psycopg2.connect(conn_string)
cursor = conn.cursor()
cursor.execute("SELECT version();")
print(cursor.fetchone())
conn.close()
```

### 8. Node.js (pg)

```javascript
const { Client } = require('pg');

const client = new Client({
  host: 'blueflare-website-prod-pg-0xbuz1.postgres.database.azure.com',
  port: 5432,
  database: 'umami',
  user: 'umamiadmin',
  password: '@Postgres2025!',
  ssl: {
    rejectUnauthorized: false, // Azure uses self-signed certs
    require: true
  }
});

client.connect()
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Connection error', err));
```

---

## Available Databases

After connecting, you can see available databases:

```sql
-- List all databases
\l

-- Or in SQL
SELECT datname FROM pg_database;
```

**Default databases:**
- `postgres` - Default admin database
- `umami` - Umami analytics database
- `template0`, `template1` - PostgreSQL templates (don't modify)

---

## Common Commands

```sql
-- Connect to a specific database
\c umami

-- List all tables
\dt

-- Describe a table
\d table_name

-- List all users/roles
\du

-- Show current database
SELECT current_database();

-- Show current user
SELECT current_user;
```

---

## Security Notes

### Firewall Rules

Azure PostgreSQL Flexible Server has a firewall. Your IP must be allowed:

1. **Check if your IP is allowed:**
   ```bash
   # Get your public IP
   curl ifconfig.me
   ```

2. **Add firewall rule via Azure Portal:**
   - Azure Portal → PostgreSQL Flexible Server → `blueflare-website-prod-pg-*`
   - Go to **Networking** → **Firewall rules**
   - Click **"+ Add current client IP address"** or add your IP manually
   - Click **Save**

3. **Or via Azure CLI:**
   ```bash
   # Get your IP
   MY_IP=$(curl -s ifconfig.me)
   
   # Add firewall rule
   az postgres flexible-server firewall-rule create \
     --resource-group blueflare-website-prod-rg \
     --name blueflare-website-prod-pg-0xbuz1 \
     --rule-name "MyIP" \
     --start-ip-address "$MY_IP" \
     --end-ip-address "$MY_IP"
   ```

### SSL/TLS

- **SSL is mandatory** for Azure PostgreSQL Flexible Server
- Always use `sslmode=require` or higher
- Azure uses self-signed certificates, so you may need to accept the certificate in GUI tools

---

## Troubleshooting

### Connection Timeout

**Problem:** Can't connect, connection times out

**Solutions:**
1. Check firewall rules (see above)
2. Verify your IP is allowed
3. Check if server is running: Azure Portal → PostgreSQL Server → Check status

### SSL Error

**Problem:** SSL connection failed

**Solutions:**
1. Ensure `sslmode=require` is set
2. For GUI tools, accept the self-signed certificate
3. For command-line, add: `PGSSLMODE=require`

### Authentication Failed

**Problem:** Wrong username/password

**Solutions:**
1. Verify username: `umamiadmin` (case-sensitive)
2. Verify password: `@Postgres2025!` (from `terraform.tfvars`)
3. URL-encode special characters in connection strings

### Can't Find Database

**Problem:** Database doesn't exist

**Solutions:**
1. Connect to `postgres` database first: `\c postgres`
2. List databases: `\l`
3. Create database if needed (requires admin privileges)

---

## Quick Reference Script

Save this as `connect-postgres.sh`:

```bash
#!/bin/bash
# Quick PostgreSQL connection script

# Get values from Terraform
cd infra
PG_HOST=$(terraform output -raw postgres_fqdn)
PG_USER="umamiadmin"
PG_PASS="@Postgres2025!"
PG_DB="umami"

# URL-encode password
PG_PASS_ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$PG_PASS'))")

# Connection string
CONN_STRING="postgresql://${PG_USER}:${PG_PASS_ENCODED}@${PG_HOST}:5432/${PG_DB}?sslmode=require"

echo "Connecting to: $PG_HOST"
echo "Database: $PG_DB"
echo ""
echo "Connection string:"
echo "$CONN_STRING"
echo ""

# Connect
psql "$CONN_STRING"
```

Make it executable:
```bash
chmod +x connect-postgres.sh
./connect-postgres.sh
```

---

## Need Help?

- **Azure Portal:** Check PostgreSQL server logs and metrics
- **Terraform:** `terraform output` to get all connection details
- **Documentation:** https://docs.microsoft.com/azure/postgresql/flexible-server/


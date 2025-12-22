#!/bin/bash
# Quick PostgreSQL connection script for BlueFlare

# Connection details
PG_HOST="blueflare-website-prod-pg-tsc6g9.postgres.database.azure.com"
PG_PORT="5432"
PG_USER="umamiadmin"
PG_PASS="@Postgres2025!"
PG_DB="${1:-umami}"  # Default to umami, or pass database name as argument

echo "=========================================="
echo "Connecting to PostgreSQL"
echo "=========================================="
echo "Host: $PG_HOST"
echo "Port: $PG_PORT"
echo "User: $PG_USER"
echo "Database: $PG_DB"
echo "=========================================="
echo ""

# Test connection first
echo "Testing connection..."
PGPASSWORD="$PG_PASS" psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB" -c "SELECT version();" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Connection successful!"
    echo ""
    echo "Opening interactive psql session..."
    echo "Type '\\q' to quit"
    echo ""
    
    # Connect interactively
    PGPASSWORD="$PG_PASS" psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DB"
else
    echo "❌ Connection failed!"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check firewall rules in Azure Portal"
    echo "2. Verify your IP is allowed: $(curl -s ifconfig.me)"
    echo "3. Check credentials are correct"
    exit 1
fi


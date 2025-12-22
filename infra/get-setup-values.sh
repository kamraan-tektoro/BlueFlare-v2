#!/bin/bash
# Quick script to get all values needed for setup after Terraform reset

echo "=========================================="
echo "BlueFlare Setup Values - After Terraform Reset"
echo "=========================================="
echo ""

# Check if terraform is initialized
if [ ! -f "terraform.tfstate" ] && [ ! -f ".terraform/terraform.tfstate" ]; then
    echo "⚠️  Terraform not initialized. Run 'terraform init' first."
    exit 1
fi

echo "1. FUNCTION APP URL (for VITE_LEAD_CAPTURE_URL):"
echo "   Run: terraform output lead_capture_endpoint"
echo "   Or: terraform output -raw lead_capture_endpoint"
echo ""

echo "2. STATIC WEB APP URL:"
echo "   Run: terraform output static_web_app_url"
echo ""

echo "3. GRAPH API VALUES (from Azure Portal):"
echo ""
echo "   Tenant ID:"
echo "   - Azure Portal → Azure AD → Overview → Tenant ID"
echo ""
echo "   Client ID:"
echo "   - Azure Portal → App Registration → Your App → Overview → Application (client) ID"
echo ""
echo "   Client Secret:"
echo "   - Azure Portal → App Registration → Your App → Certificates & secrets"
echo "   - Create new secret and copy the VALUE (not the ID)"
echo ""

echo "4. TO SET VITE_LEAD_CAPTURE_URL:"
echo ""
FUNCTION_URL=$(terraform output -raw lead_capture_endpoint 2>/dev/null)
if [ -n "$FUNCTION_URL" ]; then
    echo "   Azure Portal:"
    echo "   - Static Web App → Settings → Configuration"
    echo "   - Add: VITE_LEAD_CAPTURE_URL = $FUNCTION_URL"
    echo ""
    echo "   Or Azure CLI:"
    echo "   az staticwebapp appsettings set \\"
    echo "     --name blueflare-website-prod \\"
    echo "     --resource-group blueflare-website-prod-rg \\"
    echo "     --setting-names VITE_LEAD_CAPTURE_URL=\"$FUNCTION_URL\""
else
    echo "   ⚠️  Run 'terraform apply' first to get Function App URL"
fi
echo ""

echo "5. CURRENT TERRAFORM OUTPUTS:"
terraform output 2>/dev/null || echo "   ⚠️  Run 'terraform apply' first"
echo ""

echo "=========================================="
echo "See infra/SETUP_GUIDE.md for detailed instructions"
echo "=========================================="


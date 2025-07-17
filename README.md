# Fakturownia MCP Server

A Model Context Protocol (MCP) server for integrating with the Fakturownia.pl API. This serverless solution provides access to invoices, clients, products, payments, categories, warehouses, and departments through a standardized MCP interface, deployed on## 📚 Documentation

- **[Complete Setup Guide](FAKTUROWNIA-README.md)** - Detailed configuration instructions
- **[Usage Examples](FAKTUROWNIA-EXAMPLES.md)** - Practical examples and testing
- **[Deployment Guide](GITHUB-NETLIFY-DEPLOY.md)** - GitHub and Netlify setup
- **[AI Agent Guide](AI-AGENT-GUIDE.md)** - Comprehensive guide for AI agents
- **[AI Platform Examples](AI-PLATFORM-EXAMPLES.md)** - Claude, ChatGPT, Make.com examples
- **[Quick Reference](QUICK-REFERENCE.md)** - Cheat sheet for developers
- **[Fakturownia API Docs](https://app.fakturownia.pl/api)** - Official API documentationfy Functions.

## 🚀 Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/maciejmaciejmaciejmaciej/fakturownia_mcp)

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Go to [netlify.com](https://netlify.com) and sign up/login**
2. **Click "Add new site" → "Import an existing project"**
3. **Connect your GitHub account**
4. **Select your `fakturownia_mcp` repository**
5. **Configure build settings:**
   - Build command: (leave empty)
   - Publish directory: (leave empty)
   - Functions directory: `netlify/functions`
6. **Click "Deploy site"**

### Option 2: One-Click Deploy

Click the "Deploy to Netlify" button above for instant deployment.

## 🔧 Environment Variables Setup

After deployment, configure these environment variables in your Netlify dashboard:

1. Go to **Site settings → Environment variables**
2. Add the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `FAKTUROWNIA_DOMAIN` | Your Fakturownia subdomain | `mycompany` |
| `FAKTUROWNIA_API_TOKEN` | Your Fakturownia API token | `your-api-token-here` |

### Getting Fakturownia API Credentials

1. **Domain**: If your Fakturownia URL is `https://mycompany.fakturownia.pl`, your domain is `mycompany`
2. **API Token**: 
   - Log in to your Fakturownia account
   - Go to **Settings → API**
   - Copy your API token

## 📡 Your API Endpoint

After deployment, your MCP server will be available at:
```
https://YOUR-SITE-NAME.netlify.app/.netlify/functions/fakturownia-server
```

Shorter URL (via netlify.toml redirect):
```
https://YOUR-SITE-NAME.netlify.app/fakturownia
```

## 🧪 Test Your Deployment

### Health Check

```bash
curl https://YOUR-SITE-NAME.netlify.app/.netlify/functions/fakturownia-server
```

### Test MCP Protocol
```bash
curl -X POST https://YOUR-SITE-NAME.netlify.app/.netlify/functions/fakturownia-server \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

### Get Invoices
```bash
curl -X POST https://YOUR-SITE-NAME.netlify.app/.netlify/functions/fakturownia-server \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "get_invoices",
      "arguments": {
        "page": 1,
        "perPage": 5
      }
    }
  }'
```

## 🔗 Integration with Make.com

### Step 1: Create HTTP Module
1. In Make.com, add an **HTTP** module
2. Select **Make a request**

### Step 2: Configure the Request
- **URL**: `https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server`
- **Method**: `POST`
- **Headers**: 
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body Type**: `Raw`
- **Content Type**: `JSON (application/json)`

### Step 3: MCP Request Body
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_invoices",
    "arguments": {
      "page": 1,
      "perPage": 10,
      "period": "this_month"
    }
  }
}
```

## 🛠️ Available API Methods

### 🧾 Invoices
- `get_invoices` - List invoices with pagination and filters
- `get_invoice` - Get single invoice by ID
- `create_invoice` - Create new invoice
- `update_invoice` - Update existing invoice
- `delete_invoice` - Delete invoice
- `send_invoice_by_email` - Email invoice to client
- `change_invoice_status` - Update invoice status
- `get_invoice_pdf` - Download invoice PDF

### 👥 Clients
- `get_clients` - List clients with search filters
- `get_client` - Get single client by ID
- `create_client` - Create new client
- `update_client` - Update existing client
- `delete_client` - Delete client

### 📦 Products
- `get_products` - List products with warehouse filtering
- `get_product` - Get single product by ID
- `create_product` - Create new product
- `update_product` - Update existing product

### 💰 Payments
- `get_payments` - List payments with filters
- `get_payment` - Get single payment by ID
- `create_payment` - Create new payment
- `update_payment` - Update existing payment
- `delete_payment` - Delete payment

### 🏷️ Categories
- `get_categories` - List all categories
- `get_category` - Get single category by ID
- `create_category` - Create new category
- `update_category` - Update existing category
- `delete_category` - Delete category

### 🏭 Warehouses
- `get_warehouses` - List all warehouses
- `get_warehouse` - Get single warehouse by ID
- `create_warehouse` - Create new warehouse
- `update_warehouse` - Update existing warehouse
- `delete_warehouse` - Delete warehouse

### 📋 Warehouse Documents
- `get_warehouse_documents` - List warehouse documents
- `get_warehouse_document` - Get single document by ID
- `create_warehouse_document` - Create new document
- `update_warehouse_document` - Update existing document
- `delete_warehouse_document` - Delete document

### 🏢 Departments
- `get_departments` - List all departments
- `get_department` - Get single department by ID
- `create_department` - Create new department
- `update_department` - Update existing department
- `delete_department` - Delete department

## 📚 Usage Examples

### Create Invoice Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "create_invoice",
    "arguments": {
      "invoiceData": {
        "kind": "vat",
        "number": null,
        "sell_date": "2024-01-15",
        "issue_date": "2024-01-15",
        "payment_to": "2024-01-29",
        "seller_name": "My Company",
        "buyer_name": "Client Name",
        "buyer_email": "client@example.com",
        "positions": [
          {
            "name": "Web Development Service",
            "tax": 23,
            "total_price_gross": 1230.00,
            "quantity": 1
          }
        ]
      }
    }
  }
}
```

### Search Clients Example
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_clients",
    "arguments": {
      "page": 1,
      "perPage": 10,
      "name": "John",
      "email": "john@example.com"
    }
  }
}
```

## 🎯 Make.com Automation Examples

### 1. Invoice Creation Workflow
**Trigger**: New email with invoice request
1. **Email Parser** - Extract client and service details
2. **HTTP Request** - Search for existing client
3. **HTTP Request** - Create client if not found
4. **HTTP Request** - Create invoice
5. **HTTP Request** - Send invoice by email

### 2. Payment Tracking
**Trigger**: Webhook from payment processor
1. **HTTP Request** - Find invoice by number
2. **HTTP Request** - Create payment record
3. **HTTP Request** - Update invoice status to "paid"

### 3. Inventory Management
**Trigger**: Schedule (daily)
1. **HTTP Request** - Get low stock products
2. **HTTP Request** - Create purchase orders
3. **Email** - Send stock alerts

## 🛡️ Security Features

- ✅ API tokens handled via environment variables
- ✅ CORS properly configured
- ✅ Input validation on all endpoints
- ✅ Error handling prevents information leakage
- ✅ Serverless architecture for scalability

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start local development server
netlify dev

# Test the function locally
npm run test
```

## 📖 Documentation

- **[Complete Setup Guide](FAKTUROWNIA-README.md)** - Detailed configuration instructions
- **[Usage Examples](FAKTUROWNIA-EXAMPLES.md)** - Practical examples and testing
- **[Deployment Guide](GITHUB-NETLIFY-DEPLOY.md)** - GitHub and Netlify setup
- **[Fakturownia API Docs](https://app.fakturownia.pl/api)** - Official API documentation

## 🚀 Quick Start

1. **Fork this repository**
2. **Deploy to Netlify** using the button above
3. **Add environment variables** (domain + API token)
4. **Test your endpoints** using the examples above
5. **Integrate with Make.com** or your preferred automation platform

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For Fakturownia API documentation and support:
- **API Docs**: https://app.fakturownia.pl/api
- **Fakturownia Support**: Contact your Fakturownia account manager

---

**Ready to automate your invoicing with Fakturownia? Deploy now and start building powerful integrations!** 🚀

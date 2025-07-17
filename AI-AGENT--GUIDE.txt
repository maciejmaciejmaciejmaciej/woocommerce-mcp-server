# 🤖 AI Agent Guide - Fakturownia MCP Server

## 🎯 Quick Start for AI Agents

This guide teaches AI agents how to make proper API calls to the Fakturownia MCP Server.

### Base URL
```
https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server
```

### Required Headers
```json
{
  "Content-Type": "application/json"
}
```

## 🔥 Essential Call Structure

**ALL API calls must follow this MCP protocol structure:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "METHOD_NAME",
    "arguments": {
      // Your parameters here
    }
  }
}
```

## 📋 Available Methods (37 total)

### 🧾 INVOICES (8 methods)
- `fakt_get_invoices` - List invoices with filters
- `fakt_get_invoice` - Get single invoice by ID
- `fakt_create_invoice` - Create new invoice
- `fakt_update_invoice` - Update existing invoice
- `fakt_delete_invoice` - Delete invoice
- `fakt_send_invoice_by_email` - Email invoice to client
- `fakt_change_invoice_status` - Update invoice status
- `fakt_get_invoice_pdf` - Download invoice PDF

### 👥 CLIENTS (5 methods)
- `fakt_get_clients` - List clients with search
- `fakt_get_client` - Get single client
- `fakt_create_client` - Create new client
- `fakt_update_client` - Update existing client
- `fakt_delete_client` - Delete client

### 📦 PRODUCTS (4 methods)
- `fakt_get_products` - List products
- `fakt_get_product` - Get single product
- `fakt_create_product` - Create new product
- `fakt_update_product` - Update existing product

### 💰 PAYMENTS (5 methods)
- `fakt_get_payments` - List payments
- `fakt_get_payment` - Get single payment
- `fakt_create_payment` - Create new payment
- `fakt_update_payment` - Update existing payment
- `fakt_delete_payment` - Delete payment

### 🏷️ CATEGORIES (5 methods)
- `fakt_get_categories` - List categories
- `fakt_get_category` - Get single category
- `fakt_create_category` - Create new category
- `fakt_update_category` - Update existing category
- `fakt_delete_category` - Delete category

### 🏭 WAREHOUSES (5 methods)
- `fakt_get_warehouses` - List warehouses
- `fakt_get_warehouse` - Get single warehouse
- `fakt_create_warehouse` - Create new warehouse
- `fakt_update_warehouse` - Update existing warehouse
- `fakt_delete_warehouse` - Delete warehouse

### 📋 WAREHOUSE DOCUMENTS (5 methods)
- `fakt_get_warehouse_documents` - List warehouse documents
- `fakt_get_warehouse_document` - Get single document
- `fakt_create_warehouse_document` - Create new document
- `fakt_update_warehouse_document` - Update existing document
- `fakt_delete_warehouse_document` - Delete document

### 🏢 DEPARTMENTS (5 methods)
- `fakt_get_departments` - List departments
- `fakt_get_department` - Get single department
- `fakt_create_department` - Create new department
- `fakt_update_department` - Update existing department
- `fakt_delete_department` - Delete department

## 🎯 Common Use Cases for AI Agents

### 1. Get Recent Invoices
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "page": 1,
      "perPage": 10,
      "period": "this_month"
    }
  }
}
```

### 2. Search for Clients
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_clients",
    "arguments": {
      "page": 1,
      "perPage": 10,
      "name": "John"
    }
  }
}
```

### 3. Create New Invoice
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_create_invoice",
    "arguments": {
      "invoiceData": {
        "kind": "vat",
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

### 4. Get Invoice by ID
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoice",
    "arguments": {
      "invoiceId": 123456
    }
  }
}
```

### 5. Update Invoice Status
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_change_invoice_status",
    "arguments": {
      "invoiceId": 123456,
      "status": "paid"
    }
  }
}
```

### 6. Send Invoice by Email
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_send_invoice_by_email",
    "arguments": {
      "invoiceId": 123456,
      "emailTo": "client@example.com"
    }
  }
}
```

### 7. Create New Client
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_create_client",
    "arguments": {
      "clientData": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+48123456789",
        "street": "Main Street 123",
        "city": "Warsaw",
        "post_code": "00-001",
        "country": "PL"
      }
    }
  }
}
```

### 8. Get Products with Pagination
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_products",
    "arguments": {
      "page": 1,
      "perPage": 20
    }
  }
}
```

## 🔐 Authentication Options

### Option 1: Include credentials in request
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "domain": "your-company",
      "apiToken": "your-api-token",
      "page": 1,
      "perPage": 10
    }
  }
}
```

### Option 2: Use Environment Variables (Recommended)
Set these in Netlify Environment Variables:
- `FAKTUROWNIA_DOMAIN=your-company`
- `FAKTUROWNIA_API_TOKEN=your-api-token`

Then just call without credentials:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "page": 1,
      "perPage": 10
    }
  }
}
```

## 🎯 Response Format

All responses follow this structure:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "JSON_DATA_HERE"
      }
    ]
  }
}
```

## ❌ Error Handling

If there's an error, you'll get:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32000,
    "message": "Error description here"
  }
}
```

## 🚀 Tips for AI Agents

1. **Always use the MCP structure** - Never send just the arguments
2. **Include pagination** - Use `page` and `perPage` for large datasets
3. **Handle errors gracefully** - Check for `error` field in response
4. **Use appropriate IDs** - Make sure `invoiceId`, `clientId` etc. are numbers
5. **Follow date formats** - Use YYYY-MM-DD for dates
6. **Check required fields** - Some methods require specific parameters

## 🔄 Common Workflows

### Invoice Management Flow
1. `fakt_get_clients` - Find or verify client exists
2. `fakt_create_client` - If client doesn't exist
3. `fakt_create_invoice` - Create invoice for client
4. `fakt_send_invoice_by_email` - Send to client
5. `fakt_change_invoice_status` - Mark as paid when payment received

### Client Management Flow
1. `fakt_get_clients` - Search for existing clients
2. `fakt_create_client` - Add new client if not found
3. `fakt_update_client` - Update client information
4. `fakt_get_invoices` - Get client's invoice history

### Product Management Flow
1. `fakt_get_products` - List available products
2. `fakt_create_product` - Add new products
3. `fakt_update_product` - Modify product details
4. Use products in `fakt_create_invoice`

## 🎯 Real-World Example for AI Agent

**Human**: "Show me all unpaid invoices from this month and send reminder emails"

**AI Agent should do**:
1. Call `fakt_get_invoices` with period "this_month"
2. Filter results for unpaid invoices
3. For each unpaid invoice, call `fakt_send_invoice_by_email`

```json
// Step 1: Get this month's invoices
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "period": "this_month",
      "page": 1,
      "perPage": 50
    }
  }
}

// Step 2: For each unpaid invoice, send email
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "fakt_send_invoice_by_email",
    "arguments": {
      "invoiceId": 123456
    }
  }
}
```

## 🎯 Remember: Always Use MCP Protocol!

**❌ WRONG** (This will fail):
```json
{
  "page": 1,
  "perPage": 10
}
```

**✅ CORRECT** (This will work):
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "page": 1,
      "perPage": 10
    }
  }
}
```

---

*This MCP server provides full access to Fakturownia.pl API through a standardized interface. Perfect for AI agents to automate invoicing, client management, and business operations.*

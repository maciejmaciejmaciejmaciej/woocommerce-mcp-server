# 🚀 Fakturownia MCP Server - Quick Reference for AI Agents

## ⚡ One-Minute Setup

**URL**: `https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server`  
**Method**: `POST`  
**Headers**: `{"Content-Type": "application/json"}`

## 🎯 MANDATORY Structure (NEVER FORGET!)

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "METHOD_NAME",
    "arguments": {
      // your params here
    }
  }
}
```

## 📋 Top 10 Most Used Methods

| Method | Purpose | Key Arguments |
|--------|---------|---------------|
| `get_invoices` | List invoices | `period`, `page`, `perPage` |
| `get_clients` | List clients | `name`, `email`, `page`, `perPage` |
| `create_invoice` | New invoice | `invoiceData` |
| `create_client` | New client | `clientData` |
| `get_invoice` | Single invoice | `invoiceId` |
| `send_invoice_by_email` | Email invoice | `invoiceId`, `emailTo` |
| `change_invoice_status` | Update status | `invoiceId`, `status` |
| `get_products` | List products | `page`, `perPage` |
| `get_payments` | List payments | `page`, `perPage` |
| `get_categories` | List categories | - |

## 🔥 Copy-Paste Examples

### Get This Month's Invoices
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_invoices",
    "arguments": {
      "period": "this_month",
      "page": 1,
      "perPage": 10
    }
  }
}
```

### Find Client by Name
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_clients",
    "arguments": {
      "name": "John",
      "page": 1,
      "perPage": 5
    }
  }
}
```

### Create Simple Invoice
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
        "sell_date": "2024-01-15",
        "issue_date": "2024-01-15",
        "payment_to": "2024-01-29",
        "buyer_name": "Client Name",
        "buyer_email": "client@example.com",
        "positions": [
          {
            "name": "Service",
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

### Send Invoice Email
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "send_invoice_by_email",
    "arguments": {
      "invoiceId": 123456
    }
  }
}
```

### Create New Client
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "create_client",
    "arguments": {
      "clientData": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+48123456789",
        "city": "Warsaw"
      }
    }
  }
}
```

## 🎯 Response Structure
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

## ❌ Error Response
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32000,
    "message": "Error description"
  }
}
```

## 📅 Period Values for get_invoices
- `"today"` - Today's invoices
- `"yesterday"` - Yesterday's invoices  
- `"this_week"` - Current week
- `"this_month"` - Current month
- `"this_year"` - Current year
- `"last_month"` - Previous month

## 💡 Pro Tips for AI Agents

1. **Always use pagination** - Include `page` and `perPage`
2. **Check for errors** - Look for `error` field in response
3. **Use specific periods** - Don't fetch all data at once
4. **Validate IDs** - Ensure `invoiceId`, `clientId` are numbers
5. **Handle empty results** - Check if arrays have items

## 🚨 Common Mistakes to Avoid

❌ **DON'T** send just arguments:
```json
{
  "page": 1,
  "perPage": 10
}
```

✅ **DO** use full MCP structure:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_invoices",
    "arguments": {
      "page": 1,
      "perPage": 10
    }
  }
}
```

## 🔧 Authentication

### Option 1: Include in request
```json
"arguments": {
  "domain": "your-company",
  "apiToken": "your-token",
  "page": 1
}
```

### Option 2: Environment variables (Recommended)
Set in Netlify:
- `FAKTUROWNIA_DOMAIN=your-company`
- `FAKTUROWNIA_API_TOKEN=your-token`

## 📊 All 37 Available Methods

### Invoices (8)
`get_invoices`, `get_invoice`, `create_invoice`, `update_invoice`, `delete_invoice`, `send_invoice_by_email`, `change_invoice_status`, `get_invoice_pdf`

### Clients (5)  
`get_clients`, `get_client`, `create_client`, `update_client`, `delete_client`

### Products (4)
`get_products`, `get_product`, `create_product`, `update_product`

### Payments (5)
`get_payments`, `get_payment`, `create_payment`, `update_payment`, `delete_payment`

### Categories (5)
`get_categories`, `get_category`, `create_category`, `update_category`, `delete_category`

### Warehouses (5)
`get_warehouses`, `get_warehouse`, `create_warehouse`, `update_warehouse`, `delete_warehouse`

### Warehouse Documents (5)
`get_warehouse_documents`, `get_warehouse_document`, `create_warehouse_document`, `update_warehouse_document`, `delete_warehouse_document`

---

**🎯 Remember: ALWAYS use the MCP protocol structure. This is not optional!**

*Need help? Check the full guides: AI-AGENT-GUIDE.md and AI-PLATFORM-EXAMPLES.md*

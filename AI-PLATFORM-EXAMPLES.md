# 🎯 AI Platform Examples - Fakturownia MCP Server

## 🤖 Claude.ai Instructions

To use this Fakturownia API, Claude should make HTTP POST requests to:
`https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server`

### Example Claude Prompt:
```
You are a Fakturownia API assistant. When users ask about invoices, clients, or payments, use these API calls:

Base URL: https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server
Method: POST
Headers: {"Content-Type": "application/json"}

Always use this structure:
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "METHOD_NAME",
    "arguments": {
      // parameters here
    }
  }
}

Available methods:
- get_invoices: List invoices
- get_clients: List clients  
- create_invoice: Create new invoice
- create_client: Create new client
- And 33 more methods...

Example: To get recent invoices:
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

## 🧠 ChatGPT Instructions

### Custom GPT Configuration:
```yaml
Name: Fakturownia Assistant
Description: Manages invoices, clients, and payments through Fakturownia API

Instructions: |
  You are a Fakturownia API assistant that helps users manage their invoicing system.
  
  API Endpoint: https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server
  
  IMPORTANT: Always use the MCP protocol structure for ALL requests:
  
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "METHOD_NAME",
      "arguments": {
        // your parameters
      }
    }
  }
  
  Available methods include:
  - get_invoices (list invoices)
  - get_clients (list clients)
  - create_invoice (create new invoice)
  - create_client (create new client)
  - get_payments (list payments)
  
  When user asks for invoices, use get_invoices with appropriate filters.
  When user wants to create invoice, use create_invoice with proper invoice data.
  Always include pagination (page, perPage) for list methods.

Actions:
- Use the provided API endpoint for all Fakturownia operations
- Always follow MCP protocol structure
- Handle errors gracefully
```

## 🎭 Make.com Scenario Templates

### Template 1: Daily Invoice Report
```json
{
  "name": "Daily Invoice Report",
  "trigger": "Schedule (Daily 9:00 AM)",
  "modules": [
    {
      "type": "HTTP",
      "url": "https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
          "name": "get_invoices",
          "arguments": {
            "period": "yesterday",
            "page": 1,
            "perPage": 100
          }
        }
      }
    },
    {
      "type": "Email",
      "subject": "Daily Invoice Report",
      "body": "{{1.result.content[0].text}}"
    }
  ]
}
```

### Template 2: New Client Welcome Flow
```json
{
  "name": "New Client Welcome",
  "trigger": "Webhook",
  "modules": [
    {
      "type": "HTTP",
      "url": "https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server",
      "method": "POST",
      "body": {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
          "name": "create_client",
          "arguments": {
            "clientData": {
              "name": "{{trigger.name}}",
              "email": "{{trigger.email}}",
              "phone": "{{trigger.phone}}"
            }
          }
        }
      }
    },
    {
      "type": "Email",
      "to": "{{trigger.email}}",
      "subject": "Welcome to our system!",
      "body": "Thank you for joining us!"
    }
  ]
}
```

## 🔗 Zapier Integration

### Zap 1: Invoice Created → Send Slack Message
```javascript
// Trigger: Webhook
// Action: HTTP POST
const body = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "get_invoice",
    arguments: {
      invoiceId: inputData.invoiceId
    }
  }
};

return {
  url: "https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(body)
};
```

### Zap 2: New Contact → Create Fakturownia Client
```javascript
const body = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "create_client",
    arguments: {
      clientData: {
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
        street: inputData.address,
        city: inputData.city
      }
    }
  }
};
```

## 🐍 Python Agent Example

```python
import requests
import json

class FakturowniaAgent:
    def __init__(self):
        self.base_url = "https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server"
        self.headers = {"Content-Type": "application/json"}
    
    def make_call(self, method_name, arguments=None):
        """Make MCP protocol call to Fakturownia API"""
        if arguments is None:
            arguments = {}
            
        payload = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "tools/call",
            "params": {
                "name": method_name,
                "arguments": arguments
            }
        }
        
        response = requests.post(self.base_url, headers=self.headers, json=payload)
        return response.json()
    
    def get_invoices(self, period="this_month", page=1, per_page=10):
        """Get list of invoices"""
        return self.make_call("get_invoices", {
            "period": period,
            "page": page,
            "perPage": per_page
        })
    
    def create_invoice(self, invoice_data):
        """Create new invoice"""
        return self.make_call("create_invoice", {
            "invoiceData": invoice_data
        })
    
    def get_clients(self, name=None, page=1, per_page=10):
        """Get list of clients"""
        args = {"page": page, "perPage": per_page}
        if name:
            args["name"] = name
        return self.make_call("get_clients", args)

# Usage example
agent = FakturowniaAgent()

# Get recent invoices
invoices = agent.get_invoices("this_week")
print(f"Found {len(invoices['result']['content'])} invoices")

# Search for clients
clients = agent.get_clients("John")
print(f"Found clients: {clients}")
```

## 🟢 Node.js Agent Example

```javascript
class FakturowniaAgent {
    constructor() {
        this.baseUrl = "https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server";
    }
    
    async makeCall(methodName, arguments = {}) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "tools/call",
                params: {
                    name: methodName,
                    arguments: arguments
                }
            })
        });
        
        return await response.json();
    }
    
    async getInvoices(period = "this_month", page = 1, perPage = 10) {
        return await this.makeCall("get_invoices", {
            period: period,
            page: page,
            perPage: perPage
        });
    }
    
    async createClient(clientData) {
        return await this.makeCall("create_client", {
            clientData: clientData
        });
    }
    
    async sendInvoiceEmail(invoiceId, emailTo = null) {
        const args = { invoiceId: invoiceId };
        if (emailTo) args.emailTo = emailTo;
        
        return await this.makeCall("send_invoice_by_email", args);
    }
}

// Usage
const agent = new FakturowniaAgent();

// Get invoices and send reminders
agent.getInvoices("this_month").then(result => {
    const invoices = JSON.parse(result.result.content[0].text);
    invoices.forEach(invoice => {
        if (invoice.status !== 'paid') {
            agent.sendInvoiceEmail(invoice.id);
        }
    });
});
```

## 📱 iOS Shortcuts

### Shortcut: "Check Today's Invoices"
```
1. Get Text from Input (URL): https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server
2. Get Contents of URL:
   - Method: POST
   - Headers: Content-Type: application/json
   - Request Body: {
       "jsonrpc": "2.0",
       "id": 1,
       "method": "tools/call",
       "params": {
         "name": "get_invoices",
         "arguments": {
           "period": "today",
           "page": 1,
           "perPage": 10
         }
       }
     }
3. Get Value for "result.content[0].text" in Contents of URL
4. Speak Text: "You have X invoices today"
```

## 🎯 Key Points for All AI Agents

1. **Always use MCP protocol structure** - Never send raw arguments
2. **Include proper error handling** - Check for `error` field in response
3. **Use pagination** - Include `page` and `perPage` for list methods
4. **Validate input** - Ensure required fields are present
5. **Handle authentication** - Use environment variables or include credentials

## 🚀 Advanced AI Agent Workflows

### Smart Invoice Management
```
1. User: "Send reminders for overdue invoices"
2. Agent: get_invoices(period="all", status="unpaid")
3. Agent: Filter for overdue invoices (payment_to < today)
4. Agent: For each overdue invoice: send_invoice_by_email(invoiceId)
5. Agent: Report back with count of reminders sent
```

### Client Relationship Management
```
1. User: "Show me clients who haven't been invoiced this month"
2. Agent: get_clients() to get all clients
3. Agent: get_invoices(period="this_month") to get recent invoices
4. Agent: Compare lists and identify clients without recent invoices
5. Agent: Present list with suggestion to follow up
```

### Financial Reporting
```
1. User: "What's my revenue this quarter?"
2. Agent: get_invoices(period="this_quarter", status="paid")
3. Agent: Parse invoice amounts and calculate totals
4. Agent: Present formatted revenue report with breakdown
```

---

*This guide ensures any AI agent can properly interact with your Fakturownia MCP server using the correct protocol and best practices.*

# 🔧 Debug Fakturownia MCP Server - Make.com Agent Hanging

## Problem Analysis
Agent zawiesza się podczas wywołań API - prawdopodobnie timeout przy łączeniu z Fakturownia.

## 🎯 SOLUTION 1: Test with explicit credentials

Zamiast polegać na environment variables, podawaj dane bezpośrednio w każdym wywołaniu:

### Example API Call with credentials:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "domain": "TWOJA-NAZWA-FIRMY",
      "apiToken": "TWÓJ-API-TOKEN",
      "page": 1,
      "perPage": 5
    }
  }
}
```

## 🎯 SOLUTION 2: Test simple endpoint first

Start with the lightest possible call:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "domain": "TWOJA-NAZWA-FIRMY",
      "apiToken": "TWÓJ-API-TOKEN",
      "page": 1,
      "perPage": 1
    }
  }
}
```

## 🎯 SOLUTION 3: Check your Fakturownia credentials

1. Go to your Fakturownia panel
2. Settings → API
3. Check if API is enabled
4. Copy the exact API token
5. Your domain is: `https://TWOJA-NAZWA.fakturownia.pl` → use just `TWOJA-NAZWA`

## 🎯 SOLUTION 4: Use HTTP module instead of MCP

If MCP continues to hang, use Make.com HTTP module:

**URL:** `https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server`
**Method:** POST
**Headers:** `Content-Type: application/json`
**Body:** 
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "domain": "TWOJA-NAZWA-FIRMY",
      "apiToken": "TWÓJ-API-TOKEN",
      "page": 1,
      "perPage": 5
    }
  }
}
```

## Common Issues:
- ❌ Wrong domain name (should not include .fakturownia.pl)
- ❌ Wrong API token 
- ❌ API not enabled in Fakturownia settings
- ❌ Network timeout (try smaller perPage values)
- ❌ Invalid Fakturownia account credentials

## Test Steps:
1. First test with explicit credentials in arguments
2. Start with very small data (perPage: 1)
3. If still hangs, use HTTP module instead of MCP
4. Check Netlify function logs for errors

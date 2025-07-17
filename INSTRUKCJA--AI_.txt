# 🤖 Instrukcja dla Claude/ChatGPT - Jak używać Fakturownia MCP Server

## Kopiuj i wklej do Claude/ChatGPT:

```
Masz dostęp do Fakturownia MCP Server API. Oto jak z niego korzystać:

ENDPOINT: https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server
METHOD: POST
HEADERS: {"Content-Type": "application/json"}

OBOWIĄZKOWA STRUKTURA (używaj ZAWSZE tej struktury):
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "NAZWA_METODY",
    "arguments": {
      // parametry tutaj
    }
  }
}

DOSTĘPNE METODY:
- get_invoices - lista faktur
- get_clients - lista klientów
- create_invoice - nowa faktura
- create_client - nowy klient
- send_invoice_by_email - wyślij fakturę mailem
- get_payments - lista płatności
- get_products - lista produktów
- I 30 więcej...

PRZYKŁADY:

1. Pobierz faktury z tego miesiąca:
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

2. Znajdź klienta po nazwie:
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_clients",
    "arguments": {
      "name": "Jan",
      "page": 1,
      "perPage": 5
    }
  }
}

3. Wyślij fakturę mailem:
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

Gdy użytkownik pyta o faktury, klientów, płatności - użyj odpowiednich metod API.
ZAWSZE używaj pełnej struktury MCP protokołu!
```

## Dla Make.com:

```
URL: https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server
Method: POST
Headers: {"Content-Type": "application/json"}

Body (przykład dla faktur):
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

## Dla Python/Node.js:

```python
import requests

url = "https://creative-stardust-4cb99d.netlify.app/.netlify/functions/fakturownia-server"
headers = {"Content-Type": "application/json"}

# Pobierz faktury
data = {
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

response = requests.post(url, headers=headers, json=data)
result = response.json()
```

## WAŻNE:
- ✅ ZAWSZE używaj pełnej struktury MCP
- ✅ Sprawdzaj błędy w odpowiedzi
- ✅ Używaj paginacji (page, perPage)
- ❌ NIE wysyłaj samych argumentów
- ❌ NIE zapomnij o nagłówkach

---

*Ta instrukcja umożliwia każdemu agentowi AI poprawne korzystanie z Fakturownia MCP Server.*

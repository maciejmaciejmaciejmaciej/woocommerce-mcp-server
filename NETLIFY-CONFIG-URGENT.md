# 🚨 URGENT: Configure Fakturownia API Credentials in Netlify

## Problem
Agent się zawiesza podczas uwierzytelniania bo brakuje danych do Fakturownia API.

## ✅ SOLUTION: Add Environment Variables

### Step 1: Go to Netlify Dashboard
1. Open https://app.netlify.com/
2. Go to your site: `creative-stardust-4cb99d`
3. Click **Site settings**
4. Click **Environment variables** (left sidebar)

### Step 2: Add These Variables
Click **Add a variable** for each:

**Variable 1:**
- Key: `FAKTUROWNIA_DOMAIN`
- Value: `your-company-name` (without .fakturownia.pl)

**Variable 2:**
- Key: `FAKTUROWNIA_API_TOKEN`  
- Value: `your-api-token-from-fakturownia`

### Step 3: How to Get Your API Token
1. Login to your Fakturownia account
2. Go to **Settings** → **API**
3. Copy your **API Token**
4. Your domain is the part before `.fakturownia.pl` in your URL

### Step 4: Deploy
After adding variables:
1. Click **Save**
2. Go to **Deploys** tab
3. Click **Trigger deploy** → **Deploy site**

## 🎯 Alternative: Include credentials in each request

If you don't want to set environment variables, add credentials to every API call:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "domain": "your-company-name",
      "apiToken": "your-api-token",
      "page": 1,
      "perPage": 10
    }
  }
}
```

## 🔥 Quick Test After Setup

Test with this simple call:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fakt_get_invoices",
    "arguments": {
      "page": 1,
      "perPage": 5
    }
  }
}
```

This should work without hanging once credentials are configured!

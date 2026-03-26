# Nursing Care HR Integration Guide

This document outlines how to connect this project with external AI agents and Supabase.

## 1. Supabase Integration

### **Sync Data**
To push the initial staff data to your Supabase project:
```bash
npm run sync:supabase
```
*Requires `VITE_SUPABASE_SERVICE_ROLE_KEY` and `VITE_SUPABASE_URL` in your environment.*

### **Agent Skills**
To install Supabase-specific skills for your AI coding tools:
```bash
npx skills add supabase/agent-skills
```

## 2. AI Agent Connectivity (MCP)

### **Nursing Care HR MCP Server**
This project includes a built-in MCP server that exposes HR data to AI tools.
To run the server:
```bash
npm run mcp
```

### **Claude MCP Integration**
To add the Supabase MCP server to your project config:
```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=topqtufiivzplbqcladol"
```

### **Authentication**
After adding the MCP server, authenticate by running:
```bash
claude /mcp
```
Select the **supabase** server and follow the authentication flow.

## 3. Webhooks (n8n)
The application is ready to receive webhooks at:
`https://ais-dev-6uvcdnyyvgghcmxc62se2y-652568600986.asia-southeast1.run.app/api/webhooks/n8n`

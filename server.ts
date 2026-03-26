import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes for external integrations (n8n, Supabase, etc.)
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Webhook endpoint for n8n
  app.post("/api/webhooks/n8n", (req, res) => {
    console.log("Received n8n webhook:", req.body);
    res.json({ message: "Webhook received successfully" });
  });

  // Data sync endpoint for Supabase/External tools
  app.get("/api/data/export", (req, res) => {
    // This could eventually pull from Firestore
    res.json({ 
      message: "Data export endpoint ready",
      instructions: "Use this endpoint to sync data with Supabase or n8n"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

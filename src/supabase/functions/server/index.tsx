import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-3fa0bf0d/health", (c) => {
  return c.json({ status: "ok" });
});

// Visitor counter endpoints
// Get current stats
app.get("/make-server-3fa0bf0d/visitor-stats", async (c) => {
  try {
    const uniqueVisitors = await kv.get("unique-visitors") || 0;
    const totalVisits = await kv.get("total-visits") || 0;
    
    return c.json({
      uniqueVisitors: Number(uniqueVisitors),
      totalVisits: Number(totalVisits)
    });
  } catch (error) {
    console.error("Error fetching visitor stats:", error);
    return c.json({ error: "Failed to fetch stats" }, 500);
  }
});

// Record a visit (increment total visits)
app.post("/make-server-3fa0bf0d/record-visit", async (c) => {
  try {
    const currentVisits = await kv.get("total-visits") || 0;
    const newVisits = Number(currentVisits) + 1;
    await kv.set("total-visits", newVisits);
    
    return c.json({ totalVisits: newVisits });
  } catch (error) {
    console.error("Error recording visit:", error);
    return c.json({ error: "Failed to record visit" }, 500);
  }
});

// Record a new unique visitor (increment both counters)
app.post("/make-server-3fa0bf0d/record-unique-visitor", async (c) => {
  try {
    const currentVisitors = await kv.get("unique-visitors") || 0;
    const currentVisits = await kv.get("total-visits") || 0;
    
    const newVisitors = Number(currentVisitors) + 1;
    const newVisits = Number(currentVisits) + 1;
    
    await kv.set("unique-visitors", newVisitors);
    await kv.set("total-visits", newVisits);
    
    return c.json({
      uniqueVisitors: newVisitors,
      totalVisits: newVisits
    });
  } catch (error) {
    console.error("Error recording unique visitor:", error);
    return c.json({ error: "Failed to record unique visitor" }, 500);
  }
});

Deno.serve(app.fetch);
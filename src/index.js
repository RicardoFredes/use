import express from "express";
import { main } from "./main.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the Dribs.");
});

app.post("/api", (req, res) => {
  if (req.is("application/x-www-form-urlencoded")) {
    req.body = Object.fromEntries(new URLSearchParams(req.body));
  }
  if (typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ error: "Invalid request body format." });
  }
  const response = main(req.body);
  res.json(response);
});

app.post("/api/debug", (req, res) => {
  return res.json({
    message: "Debug endpoint hit",
    body: req.body,
    res: JSON.stringify(req.body, null, 2),
    headers: req.headers,
    method: req.method,
    url: req.url,
    query: req.query,
    originalUrl: req.originalUrl,
    ip: req.ip,
    protocol: req.protocol,
    hostname: req.hostname,
  });
});

export default app;

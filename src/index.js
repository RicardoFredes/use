import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { main } from "./main.js";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dotenvPath = path.join(__dirname, "..", ".env");
dotenv.config({ path: dotenvPath });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "..", "index.html"));
});

app.post("/api", async (req, res) => {
  const response = await main(req.body);
  return res.json(response);
});

app.post("/api/slack", async (req, res) => {
  const response = await main(req.body);

  await fetch(req.body.response_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  }).catch((error) => {
    console.error("Erro ao enviar resposta para o Slack:", error);
  });

  return res.status(204).json();
});

export default app;

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { main } from "./main.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

export default app;

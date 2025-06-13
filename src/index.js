import express from "express";
import { main } from "./main.js";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to the Dribs.");
});

app.post("/api", (req, res) => {
  const response = main(req.body);
  res.json(response);
});

export default app;

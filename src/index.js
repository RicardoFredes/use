import express from "express";
import { main } from "./main.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Welcome to the Dribs 3.");
});

app.post("/api", async (req, res) => {
  const response = await main(req.body);
  return res.json({response});
});

export default app;

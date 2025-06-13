import express from "express";
import { main } from "./main.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Welcome to the Dribs 3.");
});

app.post("/api", (req, res) => {
  const response = main(req.body);
  res.send(JSON.stringify(response));
});

app.post("/api/debug", (req, res) => {
  return res.json({
    message: "Debug endpoint hit",
    body: req.body,
    res: JSON.stringify(req.body, null, 2),
  });
});

export default app;

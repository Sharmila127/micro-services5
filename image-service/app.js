import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🖼️ Image Service is running successfully!");
});

export default app;

import express from "express";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎓 Enrollment Service is running successfully!");
});

export default app;

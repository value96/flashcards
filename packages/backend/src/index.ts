import express from "express";

const app = express();
const port = 3001; // Используйте любой порт, который не используется

app.get("/", (req, res) => {
  res.send("Hello World from Backend!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
import data from "../data/vocabular.json";
import { WordController } from "./controllers";

const app = express();
app.use(cors());

const port = 3001; // Используйте любой порт, который не используется

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/words/:count", WordController.getSome);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

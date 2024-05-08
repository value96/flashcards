import { VocabWord } from "@flashcards/types";
import express from "express";

const app = express();
const port = 3001; // Используйте любой порт, который не используется

app.get("/", (req, res) => {
  const word: VocabWord = {
    id: 123,
    translate: {
      eng: "cat",
      rus: "кошка",
    },
  };
  res.send(JSON.stringify(word));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

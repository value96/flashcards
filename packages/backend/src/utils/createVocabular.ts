/* import { v4 as uuidv4 } from "uuid";
import { VocabWord } from "@flashcards/types";
import { mainDir } from "./mainDir";
import path from "path";
import fs from "fs";

function loadData(fileName: string, spilt_pattern = "\n"): string[] {
  const filePath = path.join(mainDir, "../data/" + fileName);
  const lines = fs.readFileSync(filePath).toString().split(spilt_pattern);
  return lines;
}
function saveData<T>(fileName: string, data: T): void {
  const filePath = path.join(mainDir, "../data/" + fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
} */

/* function createWords(englishTranslate: string[], rusTranslate: string[]) {
  const words: VocabWord[] = [];
  for (let i = 0; i < englishTranslate.length; i++) {
    words.push({
      id: uuidv4(),
      translate: {
        eng: englishTranslate[i].trim(),
        rus: rusTranslate[i].replace('"', "").replace('"', "").trim(),
      },
    });
  }
  return words;
} */

/* export function createVocab() {
  const englishTranslate = loadData("5000english_words.log");
  const rusTranslate = loadData("5000english_words_rus.log", ",\r\n");
  const words = createWords(englishTranslate, rusTranslate);
  saveData("vocabular.json", words);
  console.log("hello");
}
 */

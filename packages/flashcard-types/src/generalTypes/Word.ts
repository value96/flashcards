import { VocabWord } from "./VocabWord";

export type Word = {
  id: string;
  vocabWord: VocabWord;
  lastShowDate: string;
  futureShowDate: string;
  spaceShowSec: number;
};

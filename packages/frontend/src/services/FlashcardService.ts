import { Word } from "@flashcards/types"
import instance from "../api/api"
import { AxiosResponse } from "axios"

export default class FlashcardService {
  private static async sendWord(word: Word, path: string): Promise<any> {
    return instance.post(path, word)
  }

  static async fetchWords(count: number): Promise<AxiosResponse<Word[]>> {
    return instance.get<Word[]>(`words/${count}`)
  }
  static async sendForgottenWord(word: Word): Promise<any> {
    return this.sendWord(word, "words/forgotten-word")
  }
  static async sendRepeatedWord(word: Word): Promise<any> {
    return this.sendWord(word, "words/repeated-word")
  }
}

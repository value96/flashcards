import { Word } from "@flashcards/types"
import { AxiosError } from "axios"
import { instance } from "../api/api"

// A mock function to mimic making an async request for data
export const fetchWords = (count: number): Promise<Word[]> => {
  return instance
    .get("words" + `/${count}`)
    .then(response => response.data)
    .catch(error => {
      const errorMessage: string = error.response?.data?.message
      throw new Error(error.message + (errorMessage ? `: ${errorMessage}` : ""))
    })
}

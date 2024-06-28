import { Word } from "@flashcards/types"
import { AxiosError } from "axios"
import { instance } from "../api/api"

interface ErrorResponseData {
  message?: string
}

const handleError = (error: AxiosError): void => {
  const errorMessage: string =
    (error.response?.data as ErrorResponseData).message || "Unknown error"
  throw new Error(error.message + (errorMessage ? `: ${errorMessage}` : ""))
}

export const fetchWords = async (count: number): Promise<Word[]> => {
  return instance
    .get(`words/${count}`)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error)
    })
}

const sendWord = async (word: Word, path: string): Promise<any> => {
  return instance
    .post(path, word)
    .then(response => response.data)
    .catch((error: AxiosError) => {
      handleError(error)
    })
}

export const sendForgottenWord = async (word: Word): Promise<any> => {
  return sendWord(word, "/forgotten-word")
}

export const sendRepeatedWord = async (word: Word): Promise<any> => {
  return sendWord(word, "/repeated-word")
}

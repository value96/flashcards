import { Response } from 'express'
import { getMessage } from '../utils/handleErrors'
import { wordService } from 'services/Word'
import { wordsService } from 'services/Words'
import { AuthRequest } from '@shared/api'
import { wordModel } from 'models'

export const getAllWords = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId
    const words = await wordsService.getAllWords(userId)
    res.status(200).json(JSON.stringify(words))
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

export const addNewWordsForLearning = async (
  req: AuthRequest<{}, {}, string[]>,
  res: Response,
) => {
  try {
    const newVocabWordsIds = req.body
    const userId = req.userId
    // проверить существование всех слов с newVocabWordsIds, если хотя бы одного слова нет -> ошибка
    // проверить что для данного юзера в базе данных нет ещё ни одного слова с vocabWordId из newVocabWordsIds, в противном случае -> ошибка

    await wordsService.addNewWords(userId, newVocabWordsIds)
    res.status(204).json({})
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: 'addNewWordsForLearning->'.concat(errMassage),
    })
  }
}

export const changeWordsStatus = async (
  req: AuthRequest<{}, {}, { wordIds: string[]; status: wordModel.WordStatus }>,
  res: Response,
) => {
  try {
    const wordIds = req.body
    const userId = req.userId
    // проверить что все слова с wordIds существуют в дб, иначе ошибка
    // проверить что все они имеют одинаковый статус, иначе ошибка
    // проверить допустимость смены текущего статуса на новый, иначе ошибка
    // обновить статус всем словам wordIds
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

export const getNextBunchLearnableWords = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    // это должен быть пост запрос !!!
    // здесь мы принимаем повторённые слова из предыдущего обращения к getNextBunchLearnableWords со стороны фронтенда
    // проверяем допустимость смены их состояния, если какое то слово запрещено менять состояние то ошибка!
    // обновляем состояния
    // возвращаем следующую партию слов для повторения
    // если getNextBunchLearnableWords вызывается с пустым телом запроса, значит переходим сразу к выдаче партии слов
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

// additional functional to do later
export const changeWordComment = async (req: AuthRequest, res: Response) => {
  try {
  } catch (err) {
    const errMassage = getMessage(err)
    console.error(errMassage)
    res.status(500).json({
      message: ''.concat(errMassage),
    })
  }
}

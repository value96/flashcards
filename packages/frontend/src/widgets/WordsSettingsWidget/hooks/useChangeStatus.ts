import { useEffect, useState } from 'react'
import { wordsSettingsModel } from '@entities/WordsSettings'
import { useAppDispatch } from '@shared/store'
import { changeCategory } from '../model/thunks'
type VocabWord = wordsSettingsModel.types.VocabWord

export const useChangeStatus = (
  words: VocabWord[],
  selectedWords: {
    [key: string]: boolean
  },
) => {
  const dispatch = useAppDispatch()
  const [changeStatusButtons, setChangeStatusButtons] = useState<
    { text: string; onClick: () => void }[]
  >([])
  const [canChangeStatus, setCanChangeStatus] = useState(true)

  useEffect(() => {
    const choosenWords = words.filter(word => String(word.id) in selectedWords)
    if (choosenWords.length === 0) {
      setChangeStatusButtons([])
      setCanChangeStatus(true)
      return
    }

    if (choosenWords.every(item => Boolean(item?.word))) {
      console.log('each item has word')
      // each item has word
      const statusOfFirstWord = choosenWords[0].word!.status
      if (choosenWords.some(item => item.word!.status !== statusOfFirstWord)) {
        setChangeStatusButtons([])
        setCanChangeStatus(false)
        return
      }
      console.log('all words have same status')
      // all words have same status
      if (statusOfFirstWord === 'learning') {
        setChangeStatusButtons([
          {
            text: 'Add to idle',
            onClick: () => {
              console.log('Add to idle')
              dispatch(
                changeCategory({
                  from: 'learning',
                  to: 'idle',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
          {
            text: 'Add to Suspended',
            onClick: () => {
              console.log('Add to Suspended')
              dispatch(
                changeCategory({
                  from: 'learning',
                  to: 'suspended',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
          {
            text: 'Add to Learned',
            onClick: () => {
              console.log('Add to Learned')
              dispatch(
                changeCategory({
                  from: 'learning',
                  to: 'hasLearned',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
        ])
        setCanChangeStatus(true)
        return
      }

      if (statusOfFirstWord === 'suspended') {
        setChangeStatusButtons([
          {
            text: 'Add to idle',
            onClick: () => {
              console.log('Add to idle')
              dispatch(
                changeCategory({
                  from: 'suspended',
                  to: 'idle',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
          {
            text: 'Add to Learning',
            onClick: () => {
              console.log('Add to Learning')
              dispatch(
                changeCategory({
                  from: 'suspended',
                  to: 'learning',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
          {
            text: 'Add to Learned',
            onClick: () => {
              console.log('Add to Learned')
              dispatch(
                changeCategory({
                  from: 'suspended',
                  to: 'hasLearned',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
        ])
        setCanChangeStatus(true)
        return
      }

      if (statusOfFirstWord === 'hasLearned') {
        setChangeStatusButtons([
          {
            text: 'Add to idle',
            onClick: () => {
              console.log('Add to idle')
              dispatch(
                changeCategory({
                  from: 'hasLearned',
                  to: 'idle',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
          {
            text: 'Add to Learning',
            onClick: () => {
              console.log('Add to Learning')
              dispatch(
                changeCategory({
                  from: 'hasLearned',
                  to: 'learning',
                  vocabWords: [],
                  wordIds: choosenWords.map(w => w.word!._id),
                }),
              )
            },
          },
        ])
        setCanChangeStatus(true)
        return
      }
    }

    if (choosenWords.every(item => !Boolean(item?.word))) {
      console.log('no one item has word')
      // no one item has word
      // only one option add new words
      setChangeStatusButtons([
        {
          text: 'Add to learning',
          onClick: () => {
            console.log('Add to learning')
            dispatch(
              changeCategory({
                from: 'idle',
                to: 'learning',
                vocabWords: choosenWords.map(w => w.id),
                wordIds: [],
              }),
            )
          },
        },
        {
          text: 'Add to Learned',
          onClick: () => {
            console.log('Add to Learned')
            dispatch(
              changeCategory({
                from: 'idle',
                to: 'hasLearned',
                vocabWords: choosenWords.map(w => w.id),
                wordIds: [],
              }),
            )
          },
        },
      ])
      setCanChangeStatus(true)
      return
    }

    if (choosenWords.some(item => !Boolean(item?.word))) {
      console.log('at least one item has not word')
      // at least one item has not word
      setChangeStatusButtons([])
      setCanChangeStatus(false)
      return
    }
  }, [words, selectedWords])

  return { changeStatusButtons, canChangeStatus }
}

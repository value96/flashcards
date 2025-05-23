export { getWordAudio } from './get-word-audio'
export { getNextBunchLearnableWords } from './get-next-bunch-learnable-words'
export { changeWordsStatus } from './change-words-status'
export { removeWords } from './remove-words'
export { addNewWordsForLearning } from './add-new-words-for-learning'
export { getAllWords } from './get-all-words'

// для фронтенда будет выглядеть что для слова есть 4 состояния, и 10 переходов между состояния
// idle - начальное состояние слова, когда оно не было ещё добавлено в коллекцию юзера,
// оно существует только как vocabularWord в общем списке слов для всех юзеров
// learning - слово изучается, выдаётся в выборке getNextBunchLearnableWords
// hasLearned - изучено, на фронтенде помечается успешным цветом, не выдаётся в выборке getNextBunchLearnableWords
// suspended - приостановлено в изучении, не выдаётся в выборке getNextBunchLearnableWords

// переходы между состояниями:

// idle -> learning; реализуется вызовом addNewWordsForLearning
// idle -> hasLearned; реализуется вызовом addNewWordsForLearning + changeWordsStatus(hasLeanred)
// learning or hasLearned or suspended -> edle; реализуется вызовом removeWords

// learning -> hasLearned; changeStatus
// hasLearned -> learning; changeStatus
// learning -> suspended; changeStatus
// suspended -> learning; changeStatus
// suspended -> hasLearned; changeStatus

//реализовать // idle -> hasLearned; реализуется вызовом addNewWordsForLearning + changeWordsStatus(hasLeanred)

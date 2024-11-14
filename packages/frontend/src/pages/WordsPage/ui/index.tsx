import { WordList } from '@widgets/WordList'
import { useNavigate } from 'react-router-dom'

export const WordsPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <WordList />
      <button onClick={handleClick}>close</button>
    </>
  )
}

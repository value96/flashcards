import { WordsSettingsWidget } from '@widgets/WordsSettingsWidget'
import { useNavigate } from 'react-router-dom'

export const WordsSettingsPage = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <>
      <WordsSettingsWidget />
      <button onClick={handleClick}>close</button>
    </>
  )
}

import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { useAppDispatch } from '@shared/store'
import { wordsTrainingApi } from '@entities/WordsTraining'
type Props = {
  text: string
  id: string
  vocabWordId: number
  onClickCard: (id: string) => void
  onClickForgot: (id: string) => void
}

export const WordCard = ({
  text,
  id,
  vocabWordId,
  onClickCard,
  onClickForgot,
}: Props) => {
  const [audioUrl, setAudioUrl] = useState<string>('')

  useEffect(() => {
    const fetchAudio = async () => {
      const mp3File = await wordsTrainingApi.getMp3File(vocabWordId)
      const url = URL.createObjectURL(mp3File)
      setAudioUrl(url)
    }
    fetchAudio()
  }, [vocabWordId])

  const handlePlay = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio
        .play()
        .catch(err => console.error('Ошибка при воспроизведении:', err))
    }
  }

  console.log('render WordCard')
  return (
    <div className={styles.wordContainer}>
      <div className={styles.word} onClick={() => onClickCard(id)}>
        {text}
      </div>
      <button className={styles.forgotButton} onClick={() => onClickForgot(id)}>
        forgot
      </button>
      <button onClick={handlePlay}>voice</button>
    </div>
  )
}

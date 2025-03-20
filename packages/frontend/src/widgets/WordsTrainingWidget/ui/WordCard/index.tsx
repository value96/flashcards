import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { wordsTrainingApi } from '@entities/WordsTraining'
import clsx from 'clsx'
type Props = {
  text: string
  id: string
  vocabWordId: number
  isSuccessRepeated: boolean
  onClickCard: (id: string) => void
  onClickForgot: (id: string) => void
}

export const WordCard = ({
  text,
  id,
  vocabWordId,
  isSuccessRepeated,
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

  console.log(
    `render WordCard {id}:${id} isSuccessRepeated: ${isSuccessRepeated}`,
  )
  return (
    <div className={styles.wordContainer}>
      <button
        className={clsx(
          styles.forgotButton,
          !isSuccessRepeated && styles.active,
        )}
        onClick={() => onClickForgot(id)}
      >
        F
      </button>
      <div className={styles.word} onClick={() => onClickCard(id)}>
        {text}
      </div>

      <button className={styles.voiceButton} onClick={handlePlay}>
        {/* voice */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 4v16l12-8-12-8z" />
        </svg>
      </button>
    </div>
  )
}

import React from 'react'
import styles from './styles.module.scss'

type Props = {
  text: string
  id: string
  onClickCard: (id: string) => void
  onClickForgot: (id: string) => void
}

export const WordCard = ({ text, id, onClickCard, onClickForgot }: Props) => {
  return (
    <div className={styles.wordContainer}>
      <div className={styles.word} onClick={() => onClickCard(id)}>
        {text}
      </div>
      <button className={styles.forgotButton} onClick={() => onClickForgot(id)}>
        forgot
      </button>
      <button>voice</button>
    </div>
  )
}

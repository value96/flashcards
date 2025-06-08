import { type ReactNode } from 'react'
import styles from './styles.module.scss'

interface ModalWindowProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export const ModalWindow = ({
  isOpen,
  onClose,
  children,
}: ModalWindowProps) => {
  if (!isOpen) return null
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>
  )
}

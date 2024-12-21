import { useCallback, useRef, useState } from 'react'

type Id = string
interface Identifiable {
  id: string | number
}

export const useSelect = <T extends Identifiable>(
  isSelectedMode: boolean,
  onFastClick: (id: Id) => void, // дейстие при быстром клике при isSelectedMode === false
  onLongClick: (id: Id) => void, // дейстие при долгом клике при isSelectedMode === false
  items: T[],
) => {
  // хук для управления чекбоксами списка элементов
  // при isSelectedMode === true при быстром клике чекбокс становится выбран
  // при isSelectedMode === true при долгом клике хук запоминает с какого индекса надо будет выбрать
  // группу элементов при клике на второй элемент (даёт возможность выбора группы элементов всего лишь двумя кликами:
  // на первый и крайний элемент)

  // при isSelectedMode === false при быстром клике выполняется onFastClick
  // при isSelectedMode === false при медленном клике выполняется onLongClick

  const [selectedItems, setSelectedItems] = useState<{ [key: Id]: boolean }>({})
  const longPressItem = useRef<Id | null>(null)
  const pressTimer = useRef<NodeJS.Timeout | null>(null)
  const isItWasLongClick = useRef(false)

  const reset = () => setSelectedItems({})

  const handleSingleSelect = (id: Id) => {
    setSelectedItems(prev => {
      console.log('setSelectedItems')
      if (id in prev) {
        const { [id]: _, ...next } = prev
        return next
      } else {
        return { ...prev, [id]: true }
      }
    })
  }

  const handleShiftSelect = (startIndex: number, endIndex: number) => {
    setSelectedItems(prev => {
      const startMinIndex = Math.min(startIndex, endIndex)
      const startMaxIndex = Math.max(startIndex, endIndex)
      const newSelectedItems: { [key: string]: boolean } = {}
      for (let i = startMinIndex; i <= startMaxIndex; i++) {
        newSelectedItems[String(items[i].id)] = true
      }
      return { ...prev, ...newSelectedItems }
    })
  }

  const itemChoosen = (id: string) => {
    if (!longPressItem.current) {
      longPressItem.current = id
      const index = items.findIndex(item => String(item.id) === id)
      handleShiftSelect(index, index)
    } else {
      const startIndex = items.findIndex(
        item => String(item.id) === longPressItem.current,
      )
      const endIndex = items.findIndex(item => String(item.id) === id)
      handleShiftSelect(startIndex, endIndex)
      longPressItem.current = null
    }
  }

  const handlePressStart = useCallback(
    (id: Id) => {
      // когда нажали на кнопку но ещё не отпустили
      console.log('handlePressStart')
      const timer = setTimeout(() => {
        isItWasLongClick.current = true
        if (isSelectedMode) itemChoosen(id)
        else onLongClick(id)
      }, 300)
      pressTimer.current = timer
    },
    [isSelectedMode, onFastClick, onLongClick, items],
  )

  const handlePressEnd = useCallback(
    (id: Id) => {
      // когда отпустили кнопку
      console.log('handlePressEnd')
      clearTimeout(pressTimer.current ?? undefined)
      pressTimer.current = null
      if (!isItWasLongClick.current) {
        if (isSelectedMode) handleSingleSelect(id)
        else onFastClick(id)
      }
      isItWasLongClick.current = false
    },
    [isSelectedMode, onFastClick, onLongClick, items],
  )

  return { selectedItems, handlePressStart, handlePressEnd, reset }
}

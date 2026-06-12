import { afterEach, describe, expect, it, vi } from 'vitest'
import type { wordModel } from '../../models'

const wordRepositoryMock = vi.hoisted(() => ({
  findOneById: vi.fn(),
  updateWord: vi.fn(),
}))

vi.mock('../../models', () => {
  return {
    wordModel: {
      wordRepository: wordRepositoryMock,
    },
  }
})

import { wordService } from '../word'

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000)

const createWord = (learningHistory: wordModel.HistoryPoint[] = []) => ({
  status: 'learning',
  nextShowTranslate: 'eng' as const,
  lastShowTimeDelta: 24,
  learningHistory,
})

describe('wordService.successRepeat', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('marks word as learned when the previous repeat was successful and older than 20 days', async () => {
    vi.setSystemTime(new Date('2026-06-12T00:00:00.000Z'))
    wordRepositoryMock.findOneById.mockResolvedValue(
      createWord([
        {
          date: daysAgo(21),
          showedTranslate: 'rus',
          isSuccessRepeated: true,
        },
      ]),
    )

    await wordService.successRepeat('user1', 'word1')

    expect(wordRepositoryMock.updateWord).toHaveBeenCalledWith(
      'user1',
      'word1',
      expect.objectContaining({
        status: 'hasLearned',
      }),
    )
  })

  it('keeps word learning when the previous repeat failed', async () => {
    vi.setSystemTime(new Date('2026-06-12T00:00:00.000Z'))
    wordRepositoryMock.findOneById.mockResolvedValue(
      createWord([
        {
          date: daysAgo(21),
          showedTranslate: 'rus',
          isSuccessRepeated: false,
        },
      ]),
    )

    await wordService.successRepeat('user1', 'word1')

    expect(wordRepositoryMock.updateWord).toHaveBeenCalledWith(
      'user1',
      'word1',
      expect.objectContaining({
        status: 'learning',
      }),
    )
  })

  it('does not use older matching history points when the latest one is not a match', async () => {
    vi.setSystemTime(new Date('2026-06-12T00:00:00.000Z'))
    wordRepositoryMock.findOneById.mockResolvedValue(
      createWord([
        {
          date: daysAgo(45),
          showedTranslate: 'eng',
          isSuccessRepeated: true,
        },
        {
          date: daysAgo(23),
          showedTranslate: 'rus',
          isSuccessRepeated: true,
        },
        {
          date: daysAgo(1),
          showedTranslate: 'eng',
          isSuccessRepeated: true,
        },
      ]),
    )

    await wordService.successRepeat('user1', 'word1')

    expect(wordRepositoryMock.updateWord).toHaveBeenCalledWith(
      'user1',
      'word1',
      expect.objectContaining({
        status: 'learning',
      }),
    )
  })
})

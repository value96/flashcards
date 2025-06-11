import { describe, it, expect, vi, afterEach } from 'vitest'

const findOneAndDelete = vi.fn()
const deleteMany = vi.fn()
const updateOne = vi.fn()
const updateMany = vi.fn()
const find = vi.fn()
const countDocuments = vi.fn()

import { wordRepository } from '../word'

(wordRepository as any).model = {
  findOneAndDelete,
  deleteMany,
  updateOne,
  updateMany,
  find,
  countDocuments,
}

describe('wordRepository queries include userId', () => {
  afterEach(() => vi.clearAllMocks())

  it('updateWord uses userId filter', async () => {
    await wordRepository.updateWord('u1', 'id1', { nextShowTime: new Date(), lastShowTimeDelta: 1, learningHistory: [] })
    expect(updateOne).toHaveBeenCalledWith(
      { _id: 'id1', userId: 'u1' },
      expect.any(Object),
      { runValidators: true },
    )
  })

  it('removeWords uses userId filter', async () => {
    await wordRepository.removeWords('u1', ['1','2'])
    expect(deleteMany).toHaveBeenCalledWith({ _id: { $in: ['1','2'] }, userId: 'u1' })
  })
})

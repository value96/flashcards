import { describe, it, expect, vi, afterEach } from 'vitest'

vi.mock('../../models', () => {
  const mocks = {
    findManyByIds: vi.fn(),
    removeWords: vi.fn(),
  }
  // expose mocks for assertions
  Object.assign(globalThis, {
    mockFindManyByIds: mocks.findManyByIds,
    mockRemoveWords: mocks.removeWords,
  })
  return {
    vocabWordModel: {},
    vocabWordAudioModel: {},
    wordModel: {
      wordRepository: mocks,
    },
  }
})

import { wordsService } from '../words'

const mockFindManyByIds = globalThis.mockFindManyByIds as ReturnType<typeof vi.fn>
const mockRemoveWords = globalThis.mockRemoveWords as ReturnType<typeof vi.fn>

describe('wordsService.removeWords', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('throws when words belong to another user', async () => {
    mockFindManyByIds.mockResolvedValue([])
    await expect(wordsService.removeWords('user1', ['1'])).rejects.toThrow(
      'not all words belong to the user',
    )
  })
})

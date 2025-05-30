import { Mp3FileMongo } from '../mongo'

class VocabWordAudioRepository {
  async findOneById(id: string): Promise<Mp3FileMongo.Mp3FileType | null> {
    return await Mp3FileMongo.model.findOne({ _id: id })
  }
}

export const vocabWordAudioRepository = new VocabWordAudioRepository()

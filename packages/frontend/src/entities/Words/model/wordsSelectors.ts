import { RootState } from "vite-env"
import { wordsAdapter } from "./wordsSlice"

export const {
  selectAll: selectAllWords,
  selectById: selectWordById,
  selectIds: selectWordIds,
} = wordsAdapter.getSelectors((state: RootState) => state.words)

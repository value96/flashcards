import { RootState } from "@shared/store"

export const refreshTokenProcessStatus = (state: RootState) =>
  state.authorization.refreshTokenProcessStatus

import { RootState } from "vite-env"

export const refreshTokenProcessStatus = (state: RootState) =>
  state.authorization.refreshTokenProcessStatus

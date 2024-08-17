import { RootState } from "@shared"

export const isRefreshTokenLoading = (state: RootState) =>
  state.authorization.refreshTokenProcessStatus

import { type RootState } from 'vite-env'

export const selectAppStatus = (state: RootState) => state.app.status

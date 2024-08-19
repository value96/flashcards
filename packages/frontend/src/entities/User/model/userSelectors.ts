import { RootState } from "vite-env"

export const isAuth = (state: RootState) => state.user.isAuth

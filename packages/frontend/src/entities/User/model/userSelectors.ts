import { RootState } from "@shared/store"

export const isAuth = (state: RootState) => state.user.isAuth

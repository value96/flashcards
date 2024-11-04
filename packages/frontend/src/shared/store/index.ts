import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "vite-env"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
//export { type AppThunk, type RootState, type AppStore } from "vite-env"

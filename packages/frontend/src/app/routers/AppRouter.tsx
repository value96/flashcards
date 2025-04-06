import { type ReactNode } from "react"
import { BrowserRouter, Routes } from "react-router-dom"

type Props = {
  children: ReactNode
}

export const AppRouter =  ({ children }: Props) => {
  return (
    <BrowserRouter basename="/">
      <Routes>{children}</Routes>
    </BrowserRouter>
  )
}

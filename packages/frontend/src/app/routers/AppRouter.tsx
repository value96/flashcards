import React from "react"
import { ReactNode } from "react"
import { BrowserRouter } from "react-router-dom"

type Props = {
  children: ReactNode
}

const Router = ({ children }: Props) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

export default Router

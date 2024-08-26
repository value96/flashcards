import React from "react"
import { ReactNode } from "react"
import { BrowserRouter, Routes } from "react-router-dom"

type Props = {
  children: ReactNode
}

export default ({ children }: Props) => {
  return (
    <BrowserRouter basename="/">
      <Routes>{children}</Routes>
    </BrowserRouter>
  )
}

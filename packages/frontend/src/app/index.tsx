import React from "react"

import { App } from "./App"
import { MainProvider } from "./providers"

export default () => {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  )
}

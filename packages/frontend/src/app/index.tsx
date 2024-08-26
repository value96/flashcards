import React from "react"

import { default as App } from "./App"
import { MainProvider } from "./providers"

export default () => {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  )
}

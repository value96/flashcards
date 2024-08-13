import React from "react"

import { Router } from "./routers"
import { default as App } from "./App"
import { MainProvider } from "./providers"

export default () => {
  return (
    <MainProvider>
      <Router>
        <App />
      </Router>
    </MainProvider>
  )
}

import { App } from './App'
import { MainProvider } from './providers'
import './api/interceptors'
export const ProvidedApp = () => (
  <MainProvider>
    <App />
  </MainProvider>
)

import { createRoot } from 'react-dom/client'
import { ProvidedApp } from './app'
import './index.css'
import { ToastContainer } from 'react-toastify'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    //<React.StrictMode>
    <>
      <ToastContainer />
      <ProvidedApp />
    </>,

    //</React.StrictMode>,////
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}

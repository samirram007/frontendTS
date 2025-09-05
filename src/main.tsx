
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import * as TanstackQuery from './integrations/tanstack-query/root-provider'

// Import the generated route tree

import { AppRouter } from './AppRouter'
import { Toaster } from './components/ui/sonner'
import { FontProvider } from './core/contexts/font-context'
import { ThemeContextProvider } from './core/contexts/ThemeContextProvider'
import { AuthProvider } from './features/auth/contexts/AuthContext'
import './styles.css'



// Render the app
const rootElement = document.getElementById('root')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanstackQuery.Provider>
        <ThemeContextProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <FontProvider>

            <AuthProvider>
              <Toaster position="top-right" richColors />
              <AppRouter />
            </AuthProvider>
          </FontProvider>
        </ThemeContextProvider>
      </TanstackQuery.Provider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()

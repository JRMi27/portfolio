import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { LangProvider } from './contexts/LangContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <LangProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </LangProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

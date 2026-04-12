import { useState } from 'react'
import Preloader from './components/preLoader/Preloader'
import './App.css'
import Cursor from './components/cursor/cursor.jsx'
import LandingPage from './components/landingPage/LandingPage.jsx'
import DotGrid from './components/gridMask/gridMask.jsx'

function App() {
  // Controls whether the preloader is visible
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>

      {/* Preloader — shown while isLoading is true */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Main content — hidden behind the preloader until it finishes */}
      <main style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {/* TODO: Build your website sections here */}
        <Cursor />
        <DotGrid />
        <LandingPage />
      </main>
    </>
  )
}

export default App

import { useState } from 'react'
import Preloader from './components/preLoader/Preloader'
import './App.css'
import Cursor from './components/cursor/cursor.jsx'
import HeroSection from './components/landingPage/LandingPage.jsx'
import DotGrid from './components/gridMask/gridMask.jsx'
import Navbar from './components/Navbar/navbar.jsx'
import HorizontalScroll from './components/infiniteScroll/horizontalScroll.jsx'
import Menu from './components/Menu/Menu.jsx'
import AboutUs from './components/aboutUs/AboutUs.jsx'

function App() {
  // Controls whether the preloader is visible
  const [isLoading, setIsLoading] = useState(true);
  const [halfAnimation, setHalfAnimation] = useState(false);


  return (
    <>

      {/* Preloader — shown while isLoading is true */}
      {isLoading && (
        <Preloader onComplete={() => { setIsLoading(false);  }} />
      )}

      {/* Main content — hidden behind the preloader until it finishes */}
      <main style={{ visibility: halfAnimation ? 'hidden' : 'visible' }}>
        {/* TODO: Build your website sections here */}
        <Navbar />
        <Cursor />
        <DotGrid />
        <HeroSection />
        <HorizontalScroll />
        <Menu />
        <AboutUs />
      </main>
    </>
  )
}

export default App

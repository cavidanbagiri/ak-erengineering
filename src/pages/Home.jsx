
import React from 'react'

import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import About from '../components/About'

function Home() {

  return (
    <>
        <Navbar/>
        <Carousel/>
        <Services/>
        <About/>
        <Contact/>
        {/* <Footer/> */}
    </>
  )
}

export default Home


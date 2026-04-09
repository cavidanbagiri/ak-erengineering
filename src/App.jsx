
// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ServiceDetail from './components/ServiceDetail'

import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/technical-services/:serviceSlug" element={<TechnicalServiceDetail />} />
          <Route path="/technical-services" element={<TechnicalServicesPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App


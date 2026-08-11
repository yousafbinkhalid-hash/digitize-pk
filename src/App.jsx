import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import DedicatedResources from './components/DedicatedResources.jsx'
import Portfolio from './components/Portfolio.jsx'
import VerticalCarousel from './components/VerticalCarousel.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import ServicesPage from './components/ServicesPage.jsx'
import ContactPage from './components/ContactPage.jsx'
import PartnersPage from './components/PartnersPage.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Footer from './components/Footer.jsx'

function HomePage() {
  return (
    <>
      <Hero />
      <DedicatedResources />
      <Portfolio />
      <VerticalCarousel />
      <ServicesSection />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partners" element={<PartnersPage />} />
      </Routes>
      <WhatsAppButton
        phoneNumber="923214273257"
        message="Hi! I'd like to know more about your services."
      />
      <Footer />
    </div>
  )
}

export default App
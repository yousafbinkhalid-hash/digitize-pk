import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import DedicatedResources from './components/DedicatedResources.jsx'
import Portfolio from './components/Portfolio.jsx'
import VerticalCarousel from './components/VerticalCarousel.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Services />
      <DedicatedResources />
      <Portfolio />
      <VerticalCarousel />
      <ServicesSection />
       <WhatsAppButton
        phoneNumber="923214273257"
        message="Hi! I'd like to know more about your services."
      />
      <Footer />
    
    </div>
  )
}

export default App
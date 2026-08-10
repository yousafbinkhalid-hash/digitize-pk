import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import DedicatedResources from './components/DedicatedResources.jsx'
import Portfolio from './components/Portfolio.jsx'
import VerticalCarousel from './components/VerticalCarousel.jsx'
import ServicesSection from './components/ServicesSection.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/ChatWidget.jsx'

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
      <Footer />
      <ChatWidget
        backendUrl="https://your-backend.com/api/chat"
        greeting="Hi! 👋 How can I help you today?"
        company="digitize.pk"
      />
    </div>
  )
}

export default App
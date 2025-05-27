// client/src/App.js
import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ServicesSection from './components/ServicesSection';
import WhyHueneuSection from './components/WhyHueneuSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <StorySection />
      <ServicesSection />
      <WhyHueneuSection />
      <ContactSection />
    </div>
  );
}

export default App;

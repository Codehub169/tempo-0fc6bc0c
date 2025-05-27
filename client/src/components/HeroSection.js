// client/src/components/HeroSection.js
import React, { useState, useEffect, useRef } from 'react';
import './HeroSection.css';
import AnimatedLogo from './AnimatedLogo'; // Assumes AnimatedLogo.js is in the same directory

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current; // Capture for cleanup
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef); // Cleanup observer on component unmount
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const handleScrollDown = () => {
    const nextSection = document.getElementById('hueneu-story');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`hero-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef} id="hero">
      <div className="hero-content">
        <div className="hero-logo-container">
          {/* AnimatedLogo is expected to handle its own animation based on isVisible prop */}
          <AnimatedLogo isVisible={isVisible} />
        </div>
        <h1 className="hero-tagline">Stories find their aesthetic.</h1>
        <p className="hero-subtext">
          We craft quiet but bold designs, calm yet mysterious, always playful.
        </p>
      </div>
      <div 
        className="scroll-down-indicator" 
        onClick={handleScrollDown} 
        role="button" 
        tabIndex={0} 
        onKeyPress={(e) => e.key === 'Enter' && handleScrollDown()}
        aria-label="Scroll to next section"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

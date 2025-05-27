import React, { useState, useEffect, useRef } from 'react';
import './WhyHueneuSection.css';

const WhyHueneuSection = () => {
  // State for Intersection Observer to trigger animations
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [text1Visible, setText1Visible] = useState(false);
  const [text2Visible, setText2Visible] = useState(false);
  const [text3Visible, setText3Visible] = useState(false);

  // Refs for elements to observe
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.3, // 30% visibility
    };

    const observers = [];

    const createObserver = (ref, setVisibility) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibility(true);
            observer.unobserve(entry.target); // Animate once
          }
        });
      }, observerOptions);
      if (ref.current) {
        observer.observe(ref.current);
      }
      return observer;
    };

    observers.push(createObserver(sectionRef, setIsVisible));
    observers.push(createObserver(headerRef, setHeaderVisible));
    observers.push(createObserver(text1Ref, setText1Visible));
    observers.push(createObserver(text2Ref, setText2Visible));
    observers.push(createObserver(text3Ref, setText3Visible));

    // Cleanup observers on component unmount
    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  return (
    <section 
      id="why-hueneu" 
      className={`why-hueneu-section ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="why-hueneu-content">
        <h2 
          ref={headerRef} 
          className={`why-hueneu-title ${headerVisible ? 'is-visible' : ''}`}
        >
          Why hueneu?
        </h2>
        <p 
          ref={text1Ref} 
          className={`why-hueneu-text poetic-1 ${text1Visible ? 'is-visible' : ''}`}
        >
          We don’t just design—<span className="highlight">we decode stories.</span>
        </p>
        <p 
          ref={text2Ref} 
          className={`why-hueneu-text poetic-2 ${text2Visible ? 'is-visible' : ''}`}
        >
          Designs that speak quietly but <span className="highlight-alt">stay with you.</span>
        </p>
        <p 
          ref={text3Ref} 
          className={`why-hueneu-text poetic-3 ${text3Visible ? 'is-visible' : ''}`}
        >
          Discover the calm, embrace the mystery, find your balance. 
          That's the <span className="hueneu-emphasis">hueneu</span> way.
        </p>
      </div>
    </section>
  );
};

export default WhyHueneuSection;

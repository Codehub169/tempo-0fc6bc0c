// client/src/components/StorySection.js
import React, { useEffect, useRef, useState } from 'react';
import './StorySection.css';

const StorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const whoKnewRef = useRef(null);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const currentWhoKnewRef = whoKnewRef.current;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentSectionRef) sectionObserver.unobserve(currentSectionRef); // Animate once
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (currentSectionRef) {
      sectionObserver.observe(currentSectionRef);
    }

    // Observer for the 'Who Knew?' element specifically for its animation
    const whoKnewElementObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if(entry.target) entry.target.classList.add('animate-pop');
          if (currentWhoKnewRef) whoKnewElementObserver.unobserve(currentWhoKnewRef); // Animate once
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (currentWhoKnewRef) {
      whoKnewElementObserver.observe(currentWhoKnewRef);
    }

    return () => {
      if (currentSectionRef) {
        sectionObserver.unobserve(currentSectionRef);
      }
      if (currentWhoKnewRef) {
        whoKnewElementObserver.unobserve(currentWhoKnewRef);
      }
    };
  }, []);

  return (
    <section id="hueneu-story" className={`story-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <div className="story-content">
        <h2 className="story-title">The hueneu Story</h2>
        <p className="story-text">
          Hueneu is born from a simple yet profound idea: the vibrant energy of <span className="hue-text">“Hue”</span> – those creative color bursts that spark joy and tell a story – grounded by the calm and sophistication of <span className="neu-text">“Neu”</span> – a neutral foundation that brings balance and clarity.
        </p>
        <p className="story-text">
          We believe in designs that are quiet but bold, calm yet mysterious, and always a little playful. It's about finding that perfect equilibrium where creativity flourishes and narratives come to life with intention.
        </p>
        <div className="who-knew-container" ref={whoKnewRef}>
          <div className="who-knew-element">
            <span className="who-knew-q">Who Knew?</span>
            <span className="who-knew-pop">✨</span>
            <p className="who-knew-text">That such balance could be so... evocative.</p>
          </div>
        </div>
        <p className="story-text">
          This is the essence of hueneu – designs that whisper loud stories, creating experiences that resonate deeply and leave a lasting impression.
        </p>
      </div>
    </section>
  );
};

export default StorySection;

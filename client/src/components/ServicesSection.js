// client/src/components/ServicesSection.js
import React, { useEffect, useRef, useState } from 'react';
import './ServicesSection.css'; // CSS will be created in a subsequent step
// import ServiceIconPlaceholder from '../assets/icon_service_placeholder.svg'; // Example, if you have a generic SVG

// Placeholder for icons - using simple text/emoji for now or a div
const IconPlaceholder = ({ type }) => {
  // In a real app, this would render an actual SVG icon based on type
  let iconContent = '🎨'; // Default icon (Art Palette)
  if (type === 'Branding') iconContent = '🏷️'; // (Label)
  if (type === 'Packaging') iconContent = '📦'; // (Package)
  if (type === 'Social Media') iconContent = '📱'; // (Mobile Phone)
  if (type === 'Stationery') iconContent = '✒️'; // (Nib)
  if (type === 'Coffee Table Books') iconContent = '📚'; // (Books)
  if (type === 'Creative Projects') iconContent = '💡'; // (Light Bulb)

  return <div className="service-icon-placeholder">{iconContent}</div>;
};

const servicesData = [
  {
    id: 1,
    name: 'Branding',
    description: 'Crafting identities that tell your unique story.',
    iconType: 'Branding'
  },
  {
    id: 2,
    name: 'Packaging',
    description: 'Packaging, but make it poetic and palpable.',
    iconType: 'Packaging'
  },
  {
    id: 3,
    name: 'Social Media',
    description: 'Engaging digital narratives for your online presence.',
    iconType: 'Social Media'
  },
  {
    id: 4,
    name: 'Stationery',
    description: 'Tangible touches that leave a lasting impression.',
    iconType: 'Stationery'
  },
  {
    id: 5,
    name: 'Coffee Table Books',
    description: 'Curating beautiful chronicles, page by page.',
    iconType: 'Coffee Table Books'
  },
  {
    id: 6,
    name: 'Creative Projects',
    description: 'Exploring the beautifully unexpected, together.',
    iconType: 'Creative Projects'
  }
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animate once
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <section id="what-we-do" className={`services-section ${isVisible ? 'is-visible' : ''}`} ref={sectionRef}>
      <h2 className="services-title">What We Do</h2>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div 
            key={service.id} 
            className="service-item"
            style={{ transitionDelay: `${index * 0.1}s` }} // Staggered animation
          >
            <IconPlaceholder type={service.iconType} />
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

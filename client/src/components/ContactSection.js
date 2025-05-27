import React, { useState, useEffect, useRef } from 'react';
import './ContactSection.css';

// Placeholder for an icon, e.g., from a library like react-icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px' }} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentElement = sectionRef.current;
    if (!currentElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: result.message || "Message sent successfully! We'll be in touch." });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: result.message || 'An error occurred. Please try again.' });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again later.' });
    }
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className={`contact-section ${isVisible ? 'is-visible' : ''}`}
      ref={sectionRef}
    >
      <div className="contact-content">
        <h2 className="contact-title">Let’s Work Together</h2>
        <p className="contact-intro">
          Have a story to tell? An idea to bring to life?
          Reach out and let's craft something beautiful.
        </p>
        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Story (or message)</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <button type="submit" className="cta-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Let’s design your story'}
            </button>
            {status.message && (
              <p role="alert" className={`status-message ${status.type}`}>{status.message}</p>
            )}
          </form>
        </div>
        <div className="contact-footer">
          <p>Find us on Instagram:</p>
          <a
            href="https://instagram.com/hueneu_"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-link"
            aria-label="Visit hueneu on Instagram (opens in a new tab)"
          >
            <InstagramIcon /> @hueneu_
          </a>
          {/* Optional: Link to services deck or "Who Knew?" visual */}
          {/*
          <p className="optional-link-container">
            <a href="/path-to-services-deck.pdf" target="_blank" rel="noopener noreferrer" className="optional-link">
              Our Services Deck
            </a>
          </p>
          */}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

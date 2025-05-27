// client/src/components/AnimatedLogo.js
import React from 'react';
import './AnimatedLogo.css';
import LogoSvg from '../assets/logo_animated_placeholder.svg'; // Assumes assets are in client/src/assets

const AnimatedLogo = ({ isVisible }) => {
  return (
    <div className={`animated-logo-container ${isVisible ? 'animate' : ''}`}>
      {/* 
        Using img tag for SVG is straightforward for static display or simple CSS opacity/transform animations.
        For complex path animations or direct manipulation of SVG elements via CSS/JS,
        inlining the SVG content directly into the JSX or using an <object> tag would be more suitable.
        The current placeholder and CSS are set up for a simple fade-in of the whole logo.
      */}
      <img src={LogoSvg} alt="hueneu animated logo" className="hueneu-logo-svg" />
      {/* 
      Alternative: Inline SVG for direct path manipulation if SVG structure allows for it.
      <svg viewBox="0 0 200 50" className="hueneu-logo-svg">
        <text x="10" y="35" className="logo-hue">hue</text>
        <text x="70" y="35" className="logo-neu">neu</text>
      </svg> 
      */}
    </div>
  );
};

export default AnimatedLogo;

// src/components/AnimatedLogo.js
import React from 'react';
import './AnimatedLogo.css'; // Will resolve to src/components/AnimatedLogo.css
import LogoSvg from '../assets/logo_animated_placeholder.svg'; // Will resolve to src/assets/logo_animated_placeholder.svg

const AnimatedLogo = ({ isVisible = false }) => {
  return (
    <div className={`animated-logo-container ${isVisible ? 'animate' : ''}`}>
      {/* Using img tag for SVG to allow CSS targeting if SVG structure is complex, 
          or use SVG directly if simple enough for inline manipulation or specific needs.
          For this placeholder, an img tag is straightforward. For complex path animation, 
          inline SVG or object tag might be better. Given the CSS approach, using it as 
          a background or mask on a div, or directly as an img tag, are common.
          Let's use an img tag for simplicity with the current SVG placeholder. 
          If direct path animation from CSS is needed, the SVG content itself would be here.*/}
      <img src={LogoSvg} alt="hueneu animated logo" className="hueneu-logo-svg" />
      {/* Alternative: Inline SVG for direct path manipulation if SVG is simple
      <svg viewBox="0 0 200 50" className="hueneu-logo-svg">
        <text x="10" y="35" className="logo-hue">hue</text>
        <text x="70" y="35" className="logo-neu">neu</text>
      </svg> 
      */}
    </div>
  );
};

export default AnimatedLogo;

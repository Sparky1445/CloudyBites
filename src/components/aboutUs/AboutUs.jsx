import React, { useEffect, useState } from 'react';
import { AboutUsAnimation } from '../../GSAP/AboutUsAnimations';
import Edel2 from "../../assets/edel2.jpg";
import Edel1 from "../../assets/edel1.jpg";
import './aboutUs.css';
import DotGrid from '../gridMask/gridMask.jsx';

const AboutUs = () => {
  const text = "About Us";
  const splittedText = text.split("");
  const halfVal = Math.floor(splittedText.length / 2);

  // Owner image — replace the src below with the actual image path/import
  const [ownerImage, setOwnerImage] = useState("../../assets/edel1.jpg");

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    AboutUsAnimation();
  }, []);

  return (
    <section id="about-us" className='AboutUs'>

      {/* Interactive dot grid — subtle navy dots on the light background */}
      <DotGrid dotColor="rgba(44, 62, 80, 0.18)" zIndex={1} />

      <svg className='aboutUs-floatingLeaf aboutUs-floatingLeaf--topRight' viewBox="0 0 120 120" fill="#2C3E50">
        <path d="M60 10 C90 20, 110 50, 100 90 C80 100, 50 95, 30 70 C15 50, 20 25, 60 10Z" />
      </svg>
      <svg className='aboutUs-floatingLeaf aboutUs-floatingLeaf--bottomLeft' viewBox="0 0 120 120" fill="#2C3E50">
        <path d="M60 10 C90 20, 110 50, 100 90 C80 100, 50 95, 30 70 C15 50, 20 25, 60 10Z" />
      </svg>

      <div className='aboutUs-header ' id="Text">
        <h1>
          {splittedText.map((char, idx) => (
            <span key={idx} className={`inline-block ${idx < halfVal ? 'left' : 'right'}`}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <span className='header-line'></span>
      </div>

      <div className='aboutUs-content'>

        <div className='aboutUs-imageWrapper'>
          <div className='aboutUs-imageDecor'></div>
          <div className=' aboutUs-imageFrame aboutUs-imageAnim'>
            {ownerImage ? (
              <img src={ Edel2 } alt="Edel — Founder of Cloudy Bites" />
            ) : (
              <div className='aboutUs-imagePlaceholder'>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Owner Photo</span>
              </div>
            )}
          </div>
          <div className=' aboutUs-ownerName aboutUs-nameAnim'>
            <h3>Edel</h3>
            <p>Founder &amp; Creator</p>
          </div>
        </div>

        <div className='aboutUs-textContent aboutUs-textAnim'>
          <span className='quote-mark'>&ldquo;</span>

          <p>
            Cloudy Bites started with a simple thought—why should finding good food
            in a beautiful place feel like a challenge?
          </p>

          <p>
            As a Food Technology graduate with a passion for business, I wanted to
            create something that blends convenience with quality. In the serene
            landscapes of Sohra (Cherrapunjee), where people come to relax and
            explore, Cloudy Bites brings safe, hygienic, and thoughtfully prepared
            meals straight to you—whether you're at a homestay or out visiting
            popular tourist spots.
          </p>

          <div className='aboutUs-tagline'>
            <p>
              The idea is simple: you enjoy the experience, and we'll take care of the food.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;

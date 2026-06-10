import React, { useEffect } from 'react';
import './reviews.css';
import { ReviewsAnimation } from '../../GSAP/ReviewsAnimations';
import DotGrid from '../gridMask/gridMask.jsx';

const reviews = [
  {
    name: 'Atharwa Dewasthali',
    initials: 'AD',
    text: 'Delivery in Cherrapunji itself is a big thing and these guys are doing it well. Food was hot when it came and tasted like home food only. No complaints at all. Good job!',
    rating: 5,
  },
  {
    name: 'Sumit Kumar',
    initials: 'SK',
    text: "Didn't expect much honestly but the food was really good. Felt like proper homemade food, not some restaurant stuff. Happy that delivery is available here now. Will order again for sure.",
    rating: 5,
  },
  {
    name: 'Chang Momin',
    initials: 'CM',
    text: 'Finally some good delivery option in Cherrapunji. Food was fresh and tasty, portions also decent. The homely taste is what I liked most. Keep it up guys!',
    rating: 5,
  },
];

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="reviews-card-quote" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 28c0-7.18 5.82-13 13-13V9C12.4 9 4 17.4 4 28v11h16V28H10zm24 0c0-7.18 5.82-13 13-13V9c-10.6 0-19 8.4-19 19v11h16V28H34z" fill="currentColor" />
  </svg>
);

const Reviews = () => {
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    ReviewsAnimation();
  }, []);

  return (
    <section id="reviews" className="Reviews">

      {/* Interactive dot grid — subtle navy dots on the light background */}
      <DotGrid dotColor="rgba(44, 62, 80, 0.18)" zIndex={1} />

      {/* Decorative leaves */}
      <svg className="reviews-leaf reviews-leaf--tr" viewBox="0 0 120 120" fill="#2C3E50">
        <path d="M60 10 C90 20, 110 50, 100 90 C80 100, 50 95, 30 70 C15 50, 20 25, 60 10Z" />
      </svg>
      <svg className="reviews-leaf reviews-leaf--bl" viewBox="0 0 120 120" fill="#2C3E50">
        <path d="M60 10 C90 20, 110 50, 100 90 C80 100, 50 95, 30 70 C15 50, 20 25, 60 10Z" />
      </svg>

      {/* Section Header */}
      <div className="reviews-header" id="reviewsText">
        <h2>
          {['W', 'h', 'a', 't', '\u00A0', 'P', 'e', 'o', 'p', 'l', 'e', '\u00A0', 'S', 'a', 'y'].map((char, i) => (
            <span key={i} className={`inline-block ${i < 7 ? 'rv-left' : 'rv-right'}`}>{char}</span>
          ))}
        </h2>
        <span className="reviews-header-line" />
      </div>

      {/* Cards */}
      <div className="reviews-grid">
        {reviews.map((review, idx) => (
          <div className="reviews-card reviews-cardAnim" key={idx}>
            <QuoteIcon />

            {/* Stars */}
            <div className="reviews-stars">
              {Array.from({ length: review.rating }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* Review Text */}
            <p className="reviews-text">{review.text}</p>

            {/* Reviewer */}
            <div className="reviews-author">
              <div className="reviews-avatar">{review.initials}</div>
              <span className="reviews-name">{review.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="about-me">
        <h1>Welcome to My Art Gallery</h1>
        <p>
        
          <h3>Hi! I'm <strong>SAMBIT KUMAR NAYAK</strong>, a developer,designer, passionate artist who loves creating magical and colorful art.</h3> 
          <h5>Explore my collection and immerse yourself in a world of imagination and beauty.</h5>
        </p>
        <button className="gallery-button" onClick={() => navigate('/gallery')}>
          Explore the Gallery
        </button>
      </div>
    </div>
  );
};

export default HomePage;

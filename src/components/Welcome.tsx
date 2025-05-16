
import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/contexts/FormContext';

export const Welcome: React.FC = () => {
  const { nextStep } = useFormContext();

  useEffect(() => {
    // Create multiple comets with random positions and delays
    const createComets = () => {
      const container = document.querySelector('.welcome-container');
      if (!container) return;
      
      for (let i = 0; i < 3; i++) {
        const comet = document.createElement('div');
        comet.classList.add('comet');
        comet.style.top = `${Math.random() * 100}%`;
        comet.style.left = `${Math.random() * 100}%`;
        comet.style.animationDelay = `${Math.random() * 15}s`;
        container.appendChild(comet);
      }

      // Create planets
      const createPlanet = (size: number, color: string, posX: number, posY: number) => {
        const planet = document.createElement('div');
        planet.classList.add('planet');
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.background = color;
        planet.style.top = `${posY}%`;
        planet.style.left = `${posX}%`;
        planet.style.boxShadow = `0 0 ${size/2}px ${size/10}px ${color}44`;
        planet.style.animation = `float ${6 + Math.random() * 4}s ease-in-out infinite`;
        planet.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(planet);
      };

      createPlanet(60, '#7e69ab', 75, 20);
      createPlanet(30, '#9b87f5', 15, 70);
      createPlanet(45, '#413c5c', 80, 65);
    };

    createComets();

    return () => {
      // Cleanup comets and planets when component unmounts
      document.querySelectorAll('.comet, .planet').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="welcome-container relative min-h-screen flex flex-col items-center justify-center">
      <div className="starry-background"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-3xl px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cosmic-accent to-white bg-clip-text text-transparent">
          Welcome to Comet Card
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12">
          Create stunning digital business cards with a cosmic touch.
          Design, customize, and share your professional identity with the universe.
        </p>
        
        <Button 
          onClick={nextStep}
          className="cosmic-button text-lg group"
        >
          <span>Get Started</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </motion.div>
    </div>
  );
};

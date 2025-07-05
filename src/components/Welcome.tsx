
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
      
      for (let i = 0; i < 6; i++) {
        const comet = document.createElement('div');
        comet.classList.add('comet');
        comet.style.top = `${Math.random() * 100}%`;
        comet.style.left = `${Math.random() * 100}%`;
        comet.style.animationDelay = `${Math.random() * 20}s`;
        container.appendChild(comet);
      }

      // Create floating particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('floating-particle');
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${8 + Math.random() * 12}s`;
        container.appendChild(particle);
      }

      // Create nebula clouds
      for (let i = 0; i < 3; i++) {
        const nebula = document.createElement('div');
        nebula.classList.add('nebula-cloud');
        nebula.style.top = `${Math.random() * 100}%`;
        nebula.style.left = `${Math.random() * 100}%`;
        nebula.style.animationDelay = `${Math.random() * 15}s`;
        container.appendChild(nebula);
      }

      // Create planets with enhanced styling
      const createPlanet = (size: number, colors: string[], posX: number, posY: number) => {
        const planet = document.createElement('div');
        planet.classList.add('planet');
        planet.style.width = `${size}px`;
        planet.style.height = `${size}px`;
        planet.style.background = `radial-gradient(circle at 30% 30%, ${colors[0]}, ${colors[1]})`;
        planet.style.top = `${posY}%`;
        planet.style.left = `${posX}%`;
        planet.style.boxShadow = `0 0 ${size}px ${size/4}px ${colors[0]}33, inset -${size/4}px -${size/4}px ${size/2}px ${colors[1]}44`;
        planet.style.animation = `float ${6 + Math.random() * 4}s ease-in-out infinite`;
        planet.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(planet);
      };

      createPlanet(80, ['#9b87f5', '#7e69ab'], 75, 15);
      createPlanet(50, ['#06b6d4', '#0891b2'], 12, 65);
      createPlanet(65, ['#f97316', '#ea580c'], 85, 70);
      createPlanet(35, ['#ec4899', '#db2777'], 25, 25);
    };

    createComets();

    return () => {
      // Cleanup elements when component unmounts
      document.querySelectorAll('.comet, .planet, .floating-particle, .nebula-cloud').forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="welcome-container relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="galaxy-background"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10 max-w-4xl px-6"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-cosmic-accent to-cyan-400 bg-clip-text text-transparent leading-tight"
        >
          Welcome to Comet Card
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed"
        >
          Create stunning digital business cards with a cosmic touch.
          Design, customize, and share your professional identity across the universe.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <button 
            onClick={nextStep}
            className="glassmorphism-button group relative px-12 py-4 text-lg font-semibold text-white overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Get Started
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cosmic-accent/20 to-cyan-400/20 group-hover:from-cosmic-accent/30 group-hover:to-cyan-400/30 transition-all duration-300"></div>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

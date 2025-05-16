
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BrandPersonality, useFormContext } from '@/contexts/FormContext';

const personalityOptions: BrandPersonality[] = [
  'Vibrant',
  'Tranquil',
  'Energetic',
  'Bold',
  'Elegant',
  'Glamorous',
  'Modern',
  'Minimal',
  'Vintage',
  'Colorful'
];

export const PersonalitySelection: React.FC = () => {
  const { personalities, togglePersonality, nextStep } = useFormContext();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="starry-background"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          What words best express your brand's personality?
        </h2>
        <p className="text-lg text-gray-300 mb-2">
          Select all that apply to influence your card's design.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl mb-12"
      >
        {personalityOptions.map((personality) => (
          <motion.div
            key={personality}
            variants={item}
            className={`card-option h-20 text-xl ${personalities.includes(personality) ? 'selected' : ''}`}
            onClick={() => togglePersonality(personality)}
          >
            {personality}
          </motion.div>
        ))}
      </motion.div>

      <div className="flex gap-4">
        <Button 
          variant="outline"
          className="cosmic-button-outline"
          onClick={nextStep}
        >
          Skip
        </Button>
        
        <Button 
          className="cosmic-button"
          onClick={nextStep}
        >
          Next
        </Button>
      </div>
    </div>
  );
};


import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BrandPersonality, useFormContext } from '@/contexts/FormContext';
import { ChevronLeft } from 'lucide-react';

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

// Map personalities to default text alignments
const personalityAlignments: Record<BrandPersonality, 'left' | 'center' | 'right'> = {
  'Vibrant': 'left',
  'Tranquil': 'center',
  'Energetic': 'left',
  'Bold': 'center',
  'Elegant': 'right',
  'Glamorous': 'right',
  'Modern': 'center',
  'Minimal': 'center',
  'Vintage': 'left',
  'Colorful': 'right'
};

export const PersonalitySelection: React.FC = () => {
  const { personalities, togglePersonality, nextStep, prevStep, setPersonalities, updateCardInfo } = useFormContext();

  // Clear selected personalities when component mounts
  useEffect(() => {
    setPersonalities([]);
  }, [setPersonalities]);

  const handlePersonalitySelect = (personality: BrandPersonality) => {
    togglePersonality(personality);
    
    // Set the default text alignment based on personality
    const defaultAlignment = personalityAlignments[personality];
    updateCardInfo('textAlignment', defaultAlignment);
    
    // Auto-advance to next step after selection
    setTimeout(() => {
      nextStep();
    }, 200); // Small delay for visual feedback
  };

  const handleSkip = () => {
    nextStep();
  };

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
      
      <Button
        variant="ghost"
        onClick={prevStep}
        className="absolute top-6 left-6 text-white hover:bg-white/10 hover:text-white"
        aria-label="Go back"
      >
        <ChevronLeft className="mr-1" />
        Back
      </Button>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          What words best express your brand's personality?
        </h2>
        <p className="text-lg text-gray-300 mb-2">
          Pick one—this just helps us focus your style. You can still get creative later.
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
            onClick={() => handlePersonalitySelect(personality)}
          >
            {personality}
          </motion.div>
        ))}
      </motion.div>

      <div className="flex gap-4">
        <Button 
          variant="outline"
          className="cosmic-button-outline"
          onClick={handleSkip}
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

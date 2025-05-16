
import React from 'react';
import { motion } from 'framer-motion';
import { Industry, useFormContext } from '@/contexts/FormContext';

const industries: Industry[] = [
  'Automotive',
  'Health & Wellness',
  'Fashion & Apparel',
  'Finance & Fintech',
  'Food & Beverage',
  'Sports & Fitness',
  'Art & Creative Services',
  'Beauty & Cosmetics',
  'Real Estate'
];

export const IndustrySelection: React.FC = () => {
  const { industry, setIndustry, nextStep } = useFormContext();

  const handleSelect = (selectedIndustry: Industry) => {
    setIndustry(selectedIndustry);
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
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">What industry best describes your business?</h2>
        <p className="text-lg text-gray-300">
          This helps us tailor your card design to your specific industry needs.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl"
      >
        {industries.map((ind) => (
          <motion.div
            key={ind}
            variants={item}
            className="card-option h-20 text-xl"
            onClick={() => handleSelect(ind)}
          >
            {ind}
          </motion.div>
        ))}
        
        <motion.div
          variants={item} 
          className="card-option h-20 text-xl"
          onClick={() => handleSelect('')}
        >
          Skip
        </motion.div>
      </motion.div>
    </div>
  );
};

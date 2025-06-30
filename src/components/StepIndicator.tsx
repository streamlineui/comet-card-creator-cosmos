
import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext, StepId } from '@/contexts/FormContext';

type Step = {
  id: StepId;
  label: string;
};

const steps: Step[] = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'industry', label: 'Industry' },
  { id: 'personality', label: 'Personality' },
  { id: 'customize', label: 'Customize' },
  { id: 'export', label: 'Export' },
];

export const StepIndicator: React.FC = () => {
  const { currentStep, goToStep } = useFormContext();
  
  // Don't show for welcome screen
  if (currentStep === 'welcome') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-0 w-full flex justify-center z-10 pointer-events-none"
    >
      <div className="bg-cosmic-100 bg-opacity-50 backdrop-blur-md px-4 py-2 rounded-full flex items-center">
        {steps.slice(1).map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`step-indicator ${currentStep === step.id ? 'active' : ''}`}
              onClick={() => goToStep(step.id)}
            />
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};


import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/contexts/FormContext';

// Mock template data
const templates = [
  { id: 'template1', name: 'Cosmic Gradient' },
  { id: 'template2', name: 'Modern Minimal' },
  { id: 'template3', name: 'Bold Corporate' },
  { id: 'template4', name: 'Creative Artistic' },
  { id: 'template5', name: 'Elegant Classic' },
  { id: 'template6', name: 'Tech Futuristic' },
  { id: 'template7', name: 'Vibrant Color' },
  { id: 'template8', name: 'Simple Clean' },
  { id: 'blank', name: 'Blank Template' },
];

export const TemplateSelection: React.FC = () => {
  const { cardInfo, updateCardInfo, nextStep } = useFormContext();

  const handleSelectTemplate = (templateId: string) => {
    updateCardInfo('templateId', templateId);
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
        className="w-full max-w-5xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Select a Template</h2>
        <p className="text-lg text-gray-300">
          Choose a design template for your business card or start with a blank canvas.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        {templates.map((template) => (
          <motion.div
            key={template.id}
            variants={item}
            className="relative cursor-pointer rounded-xl overflow-hidden group"
            onClick={() => handleSelectTemplate(template.id)}
          >
            <div className={`
              w-full aspect-[1.7/1] rounded-xl border-2 border-cosmic-300 
              ${template.id === 'blank' ? 'bg-cosmic-100' : 'bg-gradient-to-br from-cosmic-200 to-cosmic-300'} 
              flex items-center justify-center group-hover:border-cosmic-accent transition-all
            `}>
              {template.id === 'blank' ? (
                <div className="text-5xl text-cosmic-accent">+</div>
              ) : (
                <div className="w-[80%] h-[70%] rounded-lg bg-cosmic-100 bg-opacity-50 
                  flex items-center justify-center p-4">
                  <div className="text-lg font-medium">
                    {template.name}
                  </div>
                </div>
              )}
            </div>
            <div className="absolute inset-0 flex items-end justify-center opacity-0 
              group-hover:opacity-100 transition-opacity pb-4">
              <Button 
                variant="default" 
                className="bg-cosmic-accent hover:bg-cosmic-highlight"
              >
                Select
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

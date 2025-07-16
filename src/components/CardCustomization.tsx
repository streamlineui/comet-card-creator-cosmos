
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/contexts/FormContext';
import { ArrowLeft } from 'lucide-react';
import { CardForm } from './card-customization/CardForm';
import { ContactManager } from './card-customization/ContactManager';
import { LogoUpload } from './card-customization/LogoUpload';
import { CardStyleControls } from './card-customization/CardStyleControls';
import { TypographyControls } from './card-customization/TypographyControls';
import { TextAlignmentControls } from './card-customization/TextAlignmentControls';
import { CardPreview } from './card-customization/CardPreview';

export const CardCustomization: React.FC = () => {
  const { nextStep, prevStep } = useFormContext();

  return (
    <div className="min-h-screen py-12 px-4 pb-16">
      <div className="starry-background"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customize Your Card</h2>
          <p className="text-lg text-gray-300">
            Personalize your business card with your information and style preferences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <CardForm />
            <ContactManager />
            <LogoUpload />
            <CardStyleControls />
            <TypographyControls />
            <TextAlignmentControls />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center order-1 lg:order-2"
          >
            <CardPreview />
          </motion.div>
        </div>

        <div className="mt-4 pt-4">
          <div className="flex justify-between max-w-6xl mx-auto">
            <Button 
              onClick={prevStep}
              variant="outline"
              className="border-cosmic-300 text-white bg-cosmic-100 hover:bg-black hover:text-white hover:border-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={nextStep}
              className="cosmic-button"
            >
              Continue to Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

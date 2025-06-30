
import React from 'react';
import { FormProvider } from '@/contexts/FormContext';
import { Welcome } from '@/components/Welcome';
import { IndustrySelection } from '@/components/IndustrySelection';
import { PersonalitySelection } from '@/components/PersonalitySelection';
import { CardCustomization } from '@/components/CardCustomization';
import { ExportOptions } from '@/components/ExportOptions';
import { StepIndicator } from '@/components/StepIndicator';
import { useFormContext } from '@/contexts/FormContext';

const CometCard: React.FC = () => {
  const { currentStep } = useFormContext();
  
  return (
    <>
      <StepIndicator />
      
      {currentStep === 'welcome' && <Welcome />}
      {currentStep === 'industry' && <IndustrySelection />}
      {currentStep === 'personality' && <PersonalitySelection />}
      {currentStep === 'customize' && <CardCustomization />}
      {currentStep === 'export' && <ExportOptions />}
    </>
  );
};

const Index = () => {
  return (
    <FormProvider>
      <CometCard />
    </FormProvider>
  );
};

export default Index;

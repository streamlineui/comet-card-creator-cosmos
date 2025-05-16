
import React, { createContext, useContext, useState } from 'react';

export type Industry = 
  | 'Automotive' 
  | 'Health & Wellness' 
  | 'Fashion & Apparel' 
  | 'Finance & Fintech'
  | 'Food & Beverage'
  | 'Sports & Fitness'
  | 'Art & Creative Services'
  | 'Beauty & Cosmetics'
  | 'Real Estate'
  | '';

export type BrandPersonality = 
  | 'Vibrant' 
  | 'Energetic' 
  | 'Elegant' 
  | 'Modern'
  | 'Vintage'
  | 'Tranquil'
  | 'Bold'
  | 'Glamorous'
  | 'Minimal'
  | 'Colorful';

export type StepId = 'welcome' | 'industry' | 'personality' | 'template' | 'customize' | 'export';

export interface CardInfo {
  fullName: string;
  businessName: string;
  role: string;
  tagline: string;
  website: string;
  contacts: { type: string; value: string }[];
  logo: string | null;
  backgroundColor: string;
  textColor: string;
  useGradient: boolean;
  cornerRadius: number;
  templateId: string;
}

export interface FormContextType {
  currentStep: StepId;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: StepId) => void;
  industry: Industry;
  setIndustry: (industry: Industry) => void;
  personalities: BrandPersonality[];
  togglePersonality: (personality: BrandPersonality) => void;
  cardInfo: CardInfo;
  updateCardInfo: (key: keyof CardInfo, value: any) => void;
  exportSettings: {
    fileType: 'pdf' | 'jpg' | 'png';
    colorMode: 'RGB' | 'CMYK';
    size: number;
  };
  updateExportSettings: (key: keyof typeof exportSettings, value: any) => void;
}

const defaultCardInfo: CardInfo = {
  fullName: '',
  businessName: '',
  role: '',
  tagline: '',
  website: '',
  contacts: [],
  logo: null,
  backgroundColor: '#1A1F2C',
  textColor: '#FFFFFF',
  useGradient: false,
  cornerRadius: 8,
  templateId: '',
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<StepId>('welcome');
  const [industry, setIndustry] = useState<Industry>('');
  const [personalities, setPersonalities] = useState<BrandPersonality[]>([]);
  const [cardInfo, setCardInfo] = useState<CardInfo>(defaultCardInfo);
  const [exportSettings, setExportSettings] = useState({
    fileType: 'pdf' as const,
    colorMode: 'RGB' as const,
    size: 50,
  });

  const nextStep = () => {
    const steps: StepId[] = ['welcome', 'industry', 'personality', 'template', 'customize', 'export'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: StepId[] = ['welcome', 'industry', 'personality', 'template', 'customize', 'export'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const goToStep = (step: StepId) => {
    setCurrentStep(step);
  };

  const togglePersonality = (personality: BrandPersonality) => {
    setPersonalities((prev) => {
      if (prev.includes(personality)) {
        return prev.filter((p) => p !== personality);
      } else {
        return [...prev, personality];
      }
    });
  };

  const updateCardInfo = (key: keyof CardInfo, value: any) => {
    setCardInfo((prev) => ({ ...prev, [key]: value }));
  };

  const updateExportSettings = (key: keyof typeof exportSettings, value: any) => {
    setExportSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        nextStep,
        prevStep,
        goToStep,
        industry,
        setIndustry,
        personalities,
        togglePersonality,
        cardInfo,
        updateCardInfo,
        exportSettings,
        updateExportSettings,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

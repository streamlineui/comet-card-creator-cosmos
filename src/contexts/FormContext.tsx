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

export type StepId = 'welcome' | 'industry' | 'personality' | 'customize' | 'export';

export type TextElement = 'fullName' | 'role' | 'businessName' | 'tagline' | 'website' | 'contacts';

export interface CardInfo {
  fullName: string;
  businessName: string;
  role: string;
  tagline: string;
  website: string;
  contacts: { type: string; value: string }[];
  logo: string | null;
  logoPosition: 'top-left' | 'top-center' | 'top-right' | 'middle-left' | 'middle-center' | 'middle-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  logoSize: number;
  backgroundColor: string;
  textColor: string;
  useGradient: boolean;
  gradientType: 'linear' | 'radial' | 'conic';
  gradientColor1: string;
  gradientColor2: string;
  cornerRadius: number;
  templateId: string;
  fontFamily: string;
  nameFontSize: number;
  roleFontSize: number;
  companyFontSize: number;
  contactFontSize: number;
  textAlignment: 'left' | 'center' | 'right';
  // Individual text alignments
  fullNameAlignment: 'left' | 'center' | 'right';
  roleAlignment: 'left' | 'center' | 'right';
  businessNameAlignment: 'left' | 'center' | 'right';
  taglineAlignment: 'left' | 'center' | 'right';
  websiteAlignment: 'left' | 'center' | 'right';
  contactsAlignment: 'left' | 'center' | 'right';
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
  setPersonalities: (personalities: BrandPersonality[]) => void;
  cardInfo: CardInfo;
  updateCardInfo: (key: keyof CardInfo, value: any) => void;
  selectedTextElement: TextElement | null;
  setSelectedTextElement: (element: TextElement | null) => void;
  exportSettings: {
    fileType: 'pdf' | 'jpg' | 'png';
    colorMode: 'RGB' | 'CMYK';
    size: number;
  };
  updateExportSettings: (key: keyof typeof defaultExportSettings, value: any) => void;
}

const defaultCardInfo: CardInfo = {
  fullName: '',
  businessName: '',
  role: '',
  tagline: '',
  website: '',
  contacts: [],
  logo: null,
  logoPosition: 'top-left',
  logoSize: 64,
  backgroundColor: '#1A1F2C',
  textColor: '#FFFFFF',
  useGradient: false,
  gradientType: 'linear',
  gradientColor1: '#6366F1',
  gradientColor2: '#8B5CF6',
  cornerRadius: 8,
  templateId: '',
  fontFamily: 'Inter',
  nameFontSize: 20,
  roleFontSize: 14,
  companyFontSize: 18,
  contactFontSize: 12,
  textAlignment: 'right',
  // Individual text alignments
  fullNameAlignment: 'right',
  roleAlignment: 'right',
  businessNameAlignment: 'right',
  taglineAlignment: 'right',
  websiteAlignment: 'right',
  contactsAlignment: 'right',
};

const defaultExportSettings = {
  fileType: 'pdf' as const,
  colorMode: 'RGB' as const,
  size: 50,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<StepId>('welcome');
  const [industry, setIndustry] = useState<Industry>('');
  const [personalities, setPersonalities] = useState<BrandPersonality[]>([]);
  const [cardInfo, setCardInfo] = useState<CardInfo>(defaultCardInfo);
  const [selectedTextElement, setSelectedTextElement] = useState<TextElement | null>(null);
  const [exportSettings, setExportSettings] = useState(defaultExportSettings);

  const nextStep = () => {
    const steps: StepId[] = ['welcome', 'industry', 'personality', 'customize', 'export'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const steps: StepId[] = ['welcome', 'industry', 'personality', 'customize', 'export'];
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

  const updateExportSettings = (key: keyof typeof defaultExportSettings, value: any) => {
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
        setPersonalities,
        cardInfo,
        updateCardInfo,
        selectedTextElement,
        setSelectedTextElement,
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

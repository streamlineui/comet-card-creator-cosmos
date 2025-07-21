
import React from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext, type TextElement } from '@/contexts/FormContext';
import { Undo } from 'lucide-react';

export const CardPreview: React.FC = () => {
  const { cardInfo, selectedTextElement, setSelectedTextElement } = useFormContext();

  // Helper function to generate gradient background
  const getGradientBackground = () => {
    if (!cardInfo.useGradient) {
      return cardInfo.backgroundColor;
    }
    
    const { gradientType, gradientColor1, gradientColor2 } = cardInfo;
    
    switch (gradientType) {
      case 'linear':
        return `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
      case 'radial':
        return `radial-gradient(circle, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
      case 'conic':
        return `conic-gradient(from 0deg, ${gradientColor1} 0%, ${gradientColor2} 50%, ${gradientColor1} 100%)`;
      default:
        return `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
    }
  };

  // Helper function to get text alignment classes for individual elements
  const getTextAlignment = (element: TextElement) => {
    const alignmentMap = {
      fullName: cardInfo.fullNameAlignment,
      role: cardInfo.roleAlignment,
      businessName: cardInfo.businessNameAlignment,
      tagline: cardInfo.taglineAlignment,
      website: cardInfo.websiteAlignment,
      contacts: cardInfo.contactsAlignment,
    };
    
    const alignment = alignmentMap[element];
    switch (alignment) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  // Helper function to handle text element click
  const handleTextElementClick = (element: TextElement) => {
    setSelectedTextElement(selectedTextElement === element ? null : element);
  };

  // Helper function to get selection styling
  const getSelectionStyling = (element: TextElement) => {
    return selectedTextElement === element 
      ? 'ring-2 ring-cosmic-accent ring-opacity-50 bg-cosmic-accent/10 rounded px-1' 
      : 'cursor-pointer hover:bg-white/10 rounded px-1';
  };

  // Helper function to get logo positioning styles
  const getLogoPosition = () => {
    const size = cardInfo.logoSize;
    const positions = {
      'top-left': { top: '12px', left: '12px' },
      'top-center': { top: '12px', left: '50%', transform: 'translateX(-50%)' },
      'top-right': { top: '12px', right: '12px' },
      'middle-left': { top: '50%', left: '12px', transform: 'translateY(-50%)' },
      'middle-center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
      'middle-right': { top: '50%', right: '12px', transform: 'translateY(-50%)' },
      'bottom-left': { bottom: '12px', left: '12px' },
      'bottom-center': { bottom: '12px', left: '50%', transform: 'translateX(-50%)' },
      'bottom-right': { bottom: '12px', right: '12px' }
    };
    
    return {
      ...positions[cardInfo.logoPosition],
      width: `${size}px`,
      height: `${size}px`
    };
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-xl font-semibold">Card Preview</h3>
      
      <div 
        className="rounded-xl overflow-hidden border-2 border-cosmic-300 shadow-lg"
        style={{ width: '384px', height: '224px' }}
      >
        <div 
          className="card-preview w-full h-full p-6 relative flex flex-col"
          style={{ 
            backgroundColor: cardInfo.backgroundColor,
            color: cardInfo.textColor,
            borderRadius: `${cardInfo.cornerRadius}px`,
            background: getGradientBackground(),
            fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
          }}
        >
          {/* Logo positioned independently */}
          {cardInfo.logo && (
            <div 
              className="absolute rounded overflow-hidden"
              style={getLogoPosition()}
            >
              <img src={cardInfo.logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
          )}
          
          {/* Text content with individual alignment and selection */}
          <div className="flex flex-col h-full">
            <div className="flex flex-col mb-auto">
              <h4 
                className={`font-bold transition-all duration-200 ${getTextAlignment('fullName')} ${getSelectionStyling('fullName')}`}
                style={{ 
                  fontSize: `${cardInfo.nameFontSize || 20}px`,
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
                onClick={() => handleTextElementClick('fullName')}
              >
                {cardInfo.fullName || 'Full Name'}
              </h4>
              <p 
                className={`transition-all duration-200 ${getTextAlignment('role')} ${getSelectionStyling('role')}`}
                style={{ 
                  fontSize: `${cardInfo.roleFontSize || 14}px`,
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
                onClick={() => handleTextElementClick('role')}
              >
                {cardInfo.role || 'Role'}
              </p>
            </div>
          
            <div className="mt-auto">
              <h5 
                className={`font-bold transition-all duration-200 ${getTextAlignment('businessName')} ${getSelectionStyling('businessName')}`}
                style={{ 
                  fontSize: `${cardInfo.companyFontSize || 18}px`,
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
                onClick={() => handleTextElementClick('businessName')}
              >
                {cardInfo.businessName || 'Business Name'}
              </h5>
              {cardInfo.tagline && (
                <p 
                  className={`italic transition-all duration-200 ${getTextAlignment('tagline')} ${getSelectionStyling('tagline')}`}
                  style={{ 
                    fontSize: `${cardInfo.contactFontSize || 12}px`,
                    fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                  }}
                  onClick={() => handleTextElementClick('tagline')}
                >
                  {cardInfo.tagline}
                </p>
              )}
              {cardInfo.website && (
                <p 
                  className={`italic transition-all duration-200 ${getTextAlignment('website')} ${getSelectionStyling('website')}`}
                  style={{ 
                    fontSize: `${cardInfo.contactFontSize || 12}px`,
                    fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                  }}
                  onClick={() => handleTextElementClick('website')}
                >
                  {cardInfo.website}
                </p>
              )}
              
              {cardInfo.contacts.length > 0 && (
                <div 
                  className={`mt-2 transition-all duration-200 ${getTextAlignment('contacts')} ${getSelectionStyling('contacts')}`}
                  onClick={() => handleTextElementClick('contacts')}
                >
                  {cardInfo.contacts.map((contact, index) => (
                    <p 
                      key={index}
                      style={{ 
                        fontSize: `${cardInfo.contactFontSize || 12}px`,
                        fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                      }}
                    >
                      {contact.type}: {contact.value}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        variant="outline"
        className="border-cosmic-300 text-white hover:bg-cosmic-200 bg-cosmic-100"
      >
        <Undo className="h-4 w-4 mr-2" />
        Undo Last Change
      </Button>
    </div>
  );
};

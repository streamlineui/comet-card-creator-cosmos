import React from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext } from '@/contexts/FormContext';
import { Undo } from 'lucide-react';

export const CardPreview: React.FC = () => {
  const { cardInfo } = useFormContext();

  // Helper function to generate gradient background
  const getGradientBackground = () => {
    if (!cardInfo.useGradient) {
      return cardInfo.backgroundColor;
    }
    
    // Use the primary background color and the second gradient color
    const firstColor = cardInfo.backgroundColor;
    const secondColor = cardInfo.gradientSecondColor;
    
    // Calculate gradient coverage
    const coverage = cardInfo.gradientCoverage;
    return `linear-gradient(135deg, ${firstColor} 0%, ${secondColor} ${coverage}%)`;
  };

  // Helper function to get text alignment classes
  const getTextAlignment = () => {
    switch (cardInfo.textAlignment) {
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

  // Helper function to get flex alignment classes
  const getFlexAlignment = () => {
    switch (cardInfo.textAlignment) {
      case 'left':
        return 'items-start';
      case 'center':
        return 'items-center';
      case 'right':
        return 'items-end';
      default:
        return 'items-start';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-xl font-semibold">Card Preview</h3>
      
      <div 
        className="rounded-xl overflow-hidden border-2 border-cosmic-300 shadow-lg"
        style={{ width: '384px', height: '224px' }}
      >
        <div 
          className="w-full h-full p-6 relative flex flex-col"
          style={{ 
            backgroundColor: cardInfo.backgroundColor,
            color: cardInfo.textColor,
            borderRadius: `${cardInfo.cornerRadius}px`,
            background: getGradientBackground(),
            fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
          }}
        >
          <div className={`flex ${cardInfo.textAlignment === 'center' ? 'flex-col items-center' : cardInfo.textAlignment === 'right' ? 'flex-col items-end' : 'justify-between items-start'}`}>
            {cardInfo.logo && cardInfo.textAlignment !== 'center' && (
              <div className="w-16 h-16 rounded overflow-hidden bg-white p-1 mb-4">
                <img src={cardInfo.logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            )}
            
            {cardInfo.logo && cardInfo.textAlignment === 'center' && (
              <div className="w-16 h-16 rounded overflow-hidden bg-white p-1 mb-4 mx-auto">
                <img src={cardInfo.logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            )}
            
            <div className={`flex flex-col ${getTextAlignment()}`}>
              <h4 
                className="font-bold"
                style={{ 
                  fontSize: `${cardInfo.nameFontSize || 20}px`,
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
              >
                {cardInfo.fullName || 'Full Name'}
              </h4>
              <p 
                style={{ 
                  fontSize: `${cardInfo.roleFontSize || 14}px`,
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
              >
                {cardInfo.role || 'Role'}
              </p>
            </div>
          </div>
          
          <div className={`mt-auto ${getTextAlignment()}`}>
            <h5 
              className="font-bold"
              style={{ 
                fontSize: `${cardInfo.companyFontSize || 18}px`,
                fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
              }}
            >
              {cardInfo.businessName || 'Business Name'}
            </h5>
            {cardInfo.tagline && (
              <p 
                className="italic"
                style={{ 
                  fontSize: `${cardInfo.contactFontSize || 12}px`,
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
              >
                {cardInfo.tagline}
              </p>
            )}
            {cardInfo.website && (
              <p 
                className="italic"
                style={{ 
                  fontSize: `${cardInfo.contactFontSize || 12}px`,
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
              >
                {cardInfo.website}
              </p>
            )}
            
            {cardInfo.contacts.length > 0 && (
              <div className="mt-2">
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

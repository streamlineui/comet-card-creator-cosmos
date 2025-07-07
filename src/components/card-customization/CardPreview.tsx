
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
    
    // Calculate gradient intensity (how much the second color differs from the base)
    const baseColor = cardInfo.backgroundColor;
    const intensity = cardInfo.gradientIntensity;
    
    // Create a darker/lighter version based on intensity
    const rgb = baseColor.match(/\w\w/g);
    if (!rgb) return baseColor;
    
    const [r, g, b] = rgb.map(x => parseInt(x, 16));
    const factor = intensity / 100;
    
    // Darken the color for gradient
    const newR = Math.max(0, Math.floor(r * (1 - factor * 0.3)));
    const newG = Math.max(0, Math.floor(g * (1 - factor * 0.3)));
    const newB = Math.max(0, Math.floor(b * (1 - factor * 0.3)));
    
    const gradientColor = `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    
    // Calculate gradient coverage
    const coverage = cardInfo.gradientCoverage;
    return `linear-gradient(135deg, ${baseColor} 0%, ${gradientColor} ${coverage}%)`;
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
        return 'text-right';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-xl font-semibold">Card Preview</h3>
      
      <div className="w-96 h-56 rounded-xl overflow-hidden border-2 border-cosmic-300 shadow-lg">
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
          <div className="flex justify-between items-start">
            {cardInfo.logo && (
              <div className="w-16 h-16 rounded overflow-hidden bg-white p-1">
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

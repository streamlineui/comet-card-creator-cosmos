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

  // Helper function to render logo based on placement
  const renderLogo = () => {
    if (!cardInfo.logo) return null;

    const logoElement = (
      <div 
        className="rounded overflow-hidden bg-white p-1 flex-shrink-0"
        style={{ 
          width: `${cardInfo.logoSize}px`, 
          height: `${cardInfo.logoSize}px` 
        }}
      >
        <img src={cardInfo.logo} alt="Logo" className="w-full h-full object-contain" />
      </div>
    );

    return logoElement;
  };

  // Helper function to get layout based on logo placement
  const getLayoutClasses = () => {
    switch (cardInfo.logoPlacement) {
      case 'top':
        return 'flex-col items-center';
      case 'bottom':
        return 'flex-col-reverse items-center';
      case 'left':
        return 'flex-row items-start';
      case 'right':
        return 'flex-row-reverse items-start';
      case 'center':
        return 'flex-col items-center justify-center';
      default:
        return 'flex-col items-center';
    }
  };

  // Helper function to get content layout
  const getContentLayout = () => {
    if (cardInfo.logoPlacement === 'center') {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          {renderLogo()}
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
          <div className={`${getTextAlignment()}`}>
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
      );
    }

    return (
      <div className={`w-full h-full flex ${getLayoutClasses()} ${cardInfo.logoPlacement === 'left' || cardInfo.logoPlacement === 'right' ? 'space-x-4' : 'space-y-4'}`}>
        {(cardInfo.logoPlacement === 'top' || cardInfo.logoPlacement === 'left') && renderLogo()}
        
        <div className="flex flex-col justify-between flex-grow min-h-0">
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
          
          <div className={`${getTextAlignment()}`}>
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

        {(cardInfo.logoPlacement === 'bottom' || cardInfo.logoPlacement === 'right') && renderLogo()}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h3 className="text-xl font-semibold">Card Preview</h3>
      
      <div 
        className="rounded-xl overflow-hidden border-2 border-cosmic-300 shadow-lg"
        style={{ width: '384px', height: '224px' }}
      >
        <div 
          className="w-full h-full p-6 relative"
          style={{ 
            backgroundColor: cardInfo.backgroundColor,
            color: cardInfo.textColor,
            borderRadius: `${cardInfo.cornerRadius}px`,
            background: getGradientBackground(),
            fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
          }}
        >
          {getContentLayout()}
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

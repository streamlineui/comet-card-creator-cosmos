
import React from 'react';
import { Label } from '@/components/ui/label';
import { useFormContext, type TextElement } from '@/contexts/FormContext';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const TextAlignmentControls: React.FC = () => {
  const { cardInfo, updateCardInfo, selectedTextElement, setSelectedTextElement } = useFormContext();

  const alignmentOptions = [
    { value: 'left', icon: AlignLeft, label: 'Left' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'right', icon: AlignRight, label: 'Right' },
  ] as const;

  // Get current alignment based on selected element
  const getCurrentAlignment = () => {
    if (!selectedTextElement) return cardInfo.textAlignment;
    
    const alignmentMap = {
      fullName: cardInfo.fullNameAlignment,
      role: cardInfo.roleAlignment,
      businessName: cardInfo.businessNameAlignment,
      tagline: cardInfo.taglineAlignment,
      website: cardInfo.websiteAlignment,
      contacts: cardInfo.contactsAlignment,
    };
    
    return alignmentMap[selectedTextElement];
  };

  // Handle alignment change
  const handleAlignmentChange = (value: 'left' | 'center' | 'right') => {
    if (selectedTextElement) {
      // Update specific element alignment
      const alignmentKey = `${selectedTextElement}Alignment` as keyof typeof cardInfo;
      updateCardInfo(alignmentKey, value);
    } else {
      // Update global text alignment
      updateCardInfo('textAlignment', value);
    }
  };

  // Get element display name
  const getElementDisplayName = (element: TextElement) => {
    const nameMap = {
      fullName: 'Full Name',
      role: 'Role',
      businessName: 'Business Name',
      tagline: 'Tagline',
      website: 'Website',
      contacts: 'Contacts',
    };
    return nameMap[element];
  };

  return (
    <div className="space-y-4 pt-4 border-t border-cosmic-300">
      <div>
        <Label>Text Placement</Label>
        {selectedTextElement && (
          <div className="mt-1">
            <span className="text-sm text-cosmic-accent">
              Selected: {getElementDisplayName(selectedTextElement)}
            </span>
            <button 
              onClick={() => setSelectedTextElement(null)}
              className="ml-2 text-xs text-white/70 hover:text-white underline"
            >
              Clear selection
            </button>
          </div>
        )}
        {!selectedTextElement && (
          <p className="text-xs text-white/70 mt-1">
            Click on any text in the preview to adjust its alignment individually
          </p>
        )}
      </div>
      
      <div className="flex space-x-2">
        {alignmentOptions.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => handleAlignmentChange(value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md border-2 transition-all duration-200 ${
              getCurrentAlignment() === value
                ? 'border-cosmic-accent bg-cosmic-accent/20 text-cosmic-accent'
                : 'border-cosmic-300 bg-cosmic-100 text-white hover:border-cosmic-accent hover:bg-cosmic-200'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

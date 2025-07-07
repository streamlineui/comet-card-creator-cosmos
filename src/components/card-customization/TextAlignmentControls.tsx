
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from '@/contexts/FormContext';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const TextAlignmentControls: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();

  return (
    <div className="space-y-4 pt-4 border-t border-cosmic-300">
      <Label>Text Placement</Label>
      <RadioGroup
        value={cardInfo.textAlignment}
        onValueChange={(value) => updateCardInfo('textAlignment', value as 'left' | 'center' | 'right')}
        className="flex space-x-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="left" id="left" />
          <Label htmlFor="left" className="flex items-center space-x-2 cursor-pointer">
            <AlignLeft className="h-4 w-4" />
            <span>Left</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="center" id="center" />
          <Label htmlFor="center" className="flex items-center space-x-2 cursor-pointer">
            <AlignCenter className="h-4 w-4" />
            <span>Center</span>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="right" id="right" />
          <Label htmlFor="right" className="flex items-center space-x-2 cursor-pointer">
            <AlignRight className="h-4 w-4" />
            <span>Right</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

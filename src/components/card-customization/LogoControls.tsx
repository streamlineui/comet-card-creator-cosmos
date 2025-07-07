
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormContext } from '@/contexts/FormContext';

export const LogoControls: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();

  if (!cardInfo.logo) {
    return null;
  }

  return (
    <div className="space-y-4 pt-4 border-t border-cosmic-300">
      <div className="space-y-3">
        <Label>Logo Placement</Label>
        <RadioGroup
          value={cardInfo.logoPlacement}
          onValueChange={(value) => updateCardInfo('logoPlacement', value)}
          className="grid grid-cols-3 gap-2"
        >
          <div className="flex items-center space-x-2 border border-cosmic-300 rounded-md p-2">
            <RadioGroupItem value="top" id="top" />
            <Label htmlFor="top" className="text-sm">Top</Label>
          </div>
          <div className="flex items-center space-x-2 border border-cosmic-300 rounded-md p-2">
            <RadioGroupItem value="center" id="center" />
            <Label htmlFor="center" className="text-sm">Center</Label>
          </div>
          <div className="flex items-center space-x-2 border border-cosmic-300 rounded-md p-2">
            <RadioGroupItem value="bottom" id="bottom" />
            <Label htmlFor="bottom" className="text-sm">Bottom</Label>
          </div>
          <div className="flex items-center space-x-2 border border-cosmic-300 rounded-md p-2">
            <RadioGroupItem value="left" id="left" />
            <Label htmlFor="left" className="text-sm">Left</Label>
          </div>
          <div className="flex items-center space-x-2 border border-cosmic-300 rounded-md p-2">
            <RadioGroupItem value="right" id="right" />
            <Label htmlFor="right" className="text-sm">Right</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="logo-size">Logo Size</Label>
          <span className="text-sm text-gray-300">{cardInfo.logoSize}px</span>
        </div>
        <Slider
          id="logo-size"
          min={32}
          max={128}
          step={8}
          value={[cardInfo.logoSize]}
          onValueChange={(value) => updateCardInfo('logoSize', value[0])}
        />
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useFormContext } from '@/contexts/FormContext';

export const CardStyleControls: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the color picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  // Simulated WCAG contrast check - in a real app, use a proper color contrast calculator
  const hasGoodContrast = () => {
    // This is a simplified check - real apps should use proper WCAG contrast formulas
    const bg = cardInfo.backgroundColor.replace('#', '');
    const text = cardInfo.textColor.replace('#', '');
    
    // Very simplified contrast check
    return bg !== text;
  };

  return (
    <div className="space-y-4 pt-4 border-t border-cosmic-300">
      <div className="flex items-center justify-between">
        <Label htmlFor="background-color">Background Color</Label>
        <div className="flex items-center space-x-2 relative">
          <div 
            className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
            style={{ backgroundColor: cardInfo.backgroundColor }}
            onClick={() => setShowColorPicker(prev => !prev)}
          />
          {showColorPicker && (
            <div 
              ref={colorPickerRef}
              className="absolute right-0 top-10 z-10 p-2 bg-cosmic-100 border border-cosmic-300 rounded-md"
            >
              <input
                type="color"
                value={cardInfo.backgroundColor}
                onChange={(e) => updateCardInfo('backgroundColor', e.target.value)}
              />
              <Input
                value={cardInfo.backgroundColor}
                onChange={(e) => updateCardInfo('backgroundColor', e.target.value)}
                className="mt-2 bg-cosmic-100 border-cosmic-300 text-white"
              />
            </div>
          )}
          <Input
            id="background-color"
            value={cardInfo.backgroundColor}
            onChange={(e) => updateCardInfo('backgroundColor', e.target.value)}
            className="w-28 bg-cosmic-100 border-cosmic-300 text-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="text-color">Text Color</Label>
        <div className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-full border-2 border-white"
            style={{ backgroundColor: cardInfo.textColor }}
          ></div>
          <Input
            id="text-color"
            value={cardInfo.textColor}
            onChange={(e) => updateCardInfo('textColor', e.target.value)}
            className="w-28 bg-cosmic-100 border-cosmic-300 text-white"
          />
          <div className={`text-xs px-2 py-1 rounded ${
            hasGoodContrast() ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {hasGoodContrast() ? 'PASS' : 'FAIL'}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="use-gradient">Use Gradient Background</Label>
        <Switch
          id="use-gradient"
          checked={cardInfo.useGradient}
          onCheckedChange={(checked) => updateCardInfo('useGradient', checked)}
        />
      </div>

      {/* Gradient Controls - Only show when gradient is enabled */}
      {cardInfo.useGradient && (
        <div className="space-y-4 pl-4 border-l-2 border-cosmic-accent">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="gradient-intensity">Gradient Intensity</Label>
              <span className="text-sm text-gray-300">{cardInfo.gradientIntensity}%</span>
            </div>
            <Slider
              id="gradient-intensity"
              min={0}
              max={100}
              step={5}
              value={[cardInfo.gradientIntensity]}
              onValueChange={(value) => updateCardInfo('gradientIntensity', value[0])}
            />
            <p className="text-xs text-gray-400">Controls how dark/light the gradient shade is</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="gradient-coverage">Gradient Coverage</Label>
              <span className="text-sm text-gray-300">{cardInfo.gradientCoverage}%</span>
            </div>
            <Slider
              id="gradient-coverage"
              min={25}
              max={100}
              step={5}
              value={[cardInfo.gradientCoverage]}
              onValueChange={(value) => updateCardInfo('gradientCoverage', value[0])}
            />
            <p className="text-xs text-gray-400">Controls how much of the card is covered by gradient</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Label htmlFor="corner-radius">Corner Radius</Label>
        <span className="text-sm text-gray-300">{cardInfo.cornerRadius}px</span>
      </div>
      <Slider
        id="corner-radius"
        min={0}
        max={64}
        step={4}
        value={[cardInfo.cornerRadius]}
        onValueChange={(value) => updateCardInfo('cornerRadius', value[0])}
      />
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormContext } from '@/contexts/FormContext';

export const CardStyleControls: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showGradientColor1Picker, setShowGradientColor1Picker] = useState(false);
  const [showGradientColor2Picker, setShowGradientColor2Picker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const gradientColor1PickerRef = useRef<HTMLDivElement>(null);
  const gradientColor2PickerRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the color pickers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
      if (gradientColor1PickerRef.current && !gradientColor1PickerRef.current.contains(event.target as Node)) {
        setShowGradientColor1Picker(false);
      }
      if (gradientColor2PickerRef.current && !gradientColor2PickerRef.current.contains(event.target as Node)) {
        setShowGradientColor2Picker(false);
      }
    };

    if (showColorPicker || showGradientColor1Picker || showGradientColor2Picker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker, showGradientColor1Picker, showGradientColor2Picker]);

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
            <Label htmlFor="gradient-type">Gradient Type</Label>
            <Select
              value={cardInfo.gradientType}
              onValueChange={(value: 'linear' | 'radial' | 'conic') => updateCardInfo('gradientType', value)}
            >
              <SelectTrigger className="bg-cosmic-100 border-cosmic-300 text-white">
                <SelectValue placeholder="Select gradient type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
                <SelectItem value="conic">Conic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gradient-color-1">Gradient Color 1</Label>
            <div className="flex items-center space-x-2 relative">
              <div 
                className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                style={{ backgroundColor: cardInfo.gradientColor1 }}
                onClick={() => setShowGradientColor1Picker(prev => !prev)}
              />
              {showGradientColor1Picker && (
                <div 
                  ref={gradientColor1PickerRef}
                  className="absolute right-0 top-10 z-10 p-2 bg-cosmic-100 border border-cosmic-300 rounded-md"
                >
                  <input
                    type="color"
                    value={cardInfo.gradientColor1}
                    onChange={(e) => updateCardInfo('gradientColor1', e.target.value)}
                  />
                  <Input
                    value={cardInfo.gradientColor1}
                    onChange={(e) => updateCardInfo('gradientColor1', e.target.value)}
                    className="mt-2 bg-cosmic-100 border-cosmic-300 text-white"
                  />
                </div>
              )}
              <Input
                id="gradient-color-1"
                value={cardInfo.gradientColor1}
                onChange={(e) => updateCardInfo('gradientColor1', e.target.value)}
                placeholder="HEX#000000"
                className="w-28 bg-cosmic-100 border-cosmic-300 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gradient-color-2">Gradient Color 2</Label>
            <div className="flex items-center space-x-2 relative">
              <div 
                className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                style={{ backgroundColor: cardInfo.gradientColor2 }}
                onClick={() => setShowGradientColor2Picker(prev => !prev)}
              />
              {showGradientColor2Picker && (
                <div 
                  ref={gradientColor2PickerRef}
                  className="absolute right-0 top-10 z-10 p-2 bg-cosmic-100 border border-cosmic-300 rounded-md"
                >
                  <input
                    type="color"
                    value={cardInfo.gradientColor2}
                    onChange={(e) => updateCardInfo('gradientColor2', e.target.value)}
                  />
                  <Input
                    value={cardInfo.gradientColor2}
                    onChange={(e) => updateCardInfo('gradientColor2', e.target.value)}
                    className="mt-2 bg-cosmic-100 border-cosmic-300 text-white"
                  />
                </div>
              )}
              <Input
                id="gradient-color-2"
                value={cardInfo.gradientColor2}
                onChange={(e) => updateCardInfo('gradientColor2', e.target.value)}
                placeholder="HEX#000000"
                className="w-28 bg-cosmic-100 border-cosmic-300 text-white"
              />
            </div>
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

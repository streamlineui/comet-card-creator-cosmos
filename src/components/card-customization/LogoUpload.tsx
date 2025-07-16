
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useFormContext } from '@/contexts/FormContext';

export const LogoUpload: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateCardInfo('logo', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="logo">Upload Logo</Label>
      <div className="flex items-center gap-4">
        {cardInfo.logo && (
          <div className="w-16 h-16 rounded-md overflow-hidden bg-white">
            <img src={cardInfo.logo} alt="Logo preview" className="w-full h-full object-contain" />
          </div>
        )}
        <Button
          variant="outline"
          onClick={() => document.getElementById('logo-upload')?.click()}
          className="border-cosmic-300 text-white hover:bg-cosmic-200 hover:text-cosmic-900 bg-cosmic-100"
        >
          Choose File
        </Button>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      
      {cardInfo.logo && (
        <>
          <div className="space-y-2">
            <Label>Logo Position</Label>
            <Select
              value={cardInfo.logoPosition}
              onValueChange={(value) => updateCardInfo('logoPosition', value)}
            >
              <SelectTrigger className="bg-cosmic-100 border-cosmic-300 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cosmic-200 border-cosmic-300">
                <SelectItem value="top-left">Top Left</SelectItem>
                <SelectItem value="top-center">Top Center</SelectItem>
                <SelectItem value="top-right">Top Right</SelectItem>
                <SelectItem value="middle-left">Middle Left</SelectItem>
                <SelectItem value="middle-center">Middle Center</SelectItem>
                <SelectItem value="middle-right">Middle Right</SelectItem>
                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                <SelectItem value="bottom-center">Bottom Center</SelectItem>
                <SelectItem value="bottom-right">Bottom Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Logo Size: {cardInfo.logoSize}px</Label>
            <Slider
              value={[cardInfo.logoSize]}
              onValueChange={(value) => updateCardInfo('logoSize', value[0])}
              min={32}
              max={128}
              step={8}
              className="w-full"
            />
          </div>
        </>
      )}
    </div>
  );
};

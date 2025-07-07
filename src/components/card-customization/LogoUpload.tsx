
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFormContext } from '@/contexts/FormContext';
import { LogoControls } from './LogoControls';

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
      <LogoControls />
    </div>
  );
};

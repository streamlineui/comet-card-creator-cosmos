
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useFormContext } from '@/contexts/FormContext';
import { removeBackground, loadImage } from '@/lib/backgroundRemoval';
import { toast } from 'sonner';

export const LogoUpload: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      toast.info("Processing logo... Removing background for better fit.");
      
      try {
        // Load the image
        const imageElement = await loadImage(file);
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        
        // Convert blob to data URL
        const reader = new FileReader();
        reader.onload = (event) => {
          updateCardInfo('logo', event.target?.result as string);
          toast.success("Logo processed successfully! Background removed for perfect fit.");
          setIsProcessing(false);
        };
        reader.readAsDataURL(processedBlob);
        
      } catch (error) {
        console.error('Background removal failed:', error);
        toast.error("Background removal failed. Using original image.");
        
        // Fallback to original image
        const reader = new FileReader();
        reader.onload = (event) => {
          updateCardInfo('logo', event.target?.result as string);
          setIsProcessing(false);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="logo">Upload Logo</Label>
      <div className="flex items-center gap-4">
        {cardInfo.logo && (
          <div className="w-16 h-16 rounded-md overflow-hidden bg-transparent border border-cosmic-300">
            <img src={cardInfo.logo} alt="Logo preview" className="w-full h-full object-contain" />
          </div>
        )}
        <Button
          variant="outline"
          onClick={() => document.getElementById('logo-upload')?.click()}
          disabled={isProcessing}
          className="border-cosmic-300 text-white hover:bg-cosmic-200 hover:text-cosmic-900 bg-cosmic-100 disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Choose File'}
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

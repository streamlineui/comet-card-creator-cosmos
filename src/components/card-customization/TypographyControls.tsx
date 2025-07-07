
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormContext, Industry } from '@/contexts/FormContext';

// Industry-specific font options with simplified descriptions
const industryFonts: Record<Industry, Array<{ value: string; label: string; description: string }>> = {
  'Automotive': [
    { value: 'Bebas Neue', label: 'Bebas Neue', description: 'Bold & powerful' },
    { value: 'Barlow', label: 'Barlow', description: 'Industrial & professional' },
    { value: 'Rajdhani', label: 'Rajdhani', description: 'Modern & technical' },
  ],
  'Fashion & Apparel': [
    { value: 'Playfair Display', label: 'Playfair Display', description: 'Elegant & editorial' },
    { value: 'Lora', label: 'Lora', description: 'Stylish & readable' },
    { value: 'Poppins', label: 'Poppins', description: 'Modern & sleek' },
  ],
  'Food & Beverage': [
    { value: 'Quicksand', label: 'Quicksand', description: 'Warm & friendly' },
    { value: 'Merriweather', label: 'Merriweather', description: 'Rustic & trustworthy' },
    { value: 'Caveat', label: 'Caveat', description: 'Handwritten & artisan' },
  ],
  'Sports & Fitness': [
    { value: 'Anton', label: 'Anton', description: 'Bold & athletic' },
    { value: 'Orbitron', label: 'Orbitron', description: 'Futuristic & energetic' },
    { value: 'Titillium Web', label: 'Titillium Web', description: 'Dynamic & active' },
  ],
  'Real Estate': [
    { value: 'Montserrat', label: 'Montserrat', description: 'Clean & upscale' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro', description: 'Professional & credible' },
    { value: 'Merriweather', label: 'Merriweather', description: 'Traditional & luxurious' },
  ],
  'Health & Wellness': [
    { value: 'Josefin Sans', label: 'Josefin Sans', description: 'Light & calming' },
    { value: 'Nunito', label: 'Nunito', description: 'Friendly & approachable' },
    { value: 'Cormorant Garamond', label: 'Cormorant Garamond', description: 'Elegant & spa-like' },
  ],
  'Finance & Fintech': [
    { value: 'Roboto', label: 'Roboto', description: 'Balanced & versatile' },
    { value: 'Inter', label: 'Inter', description: 'Digital & clear' },
    { value: 'Space Grotesk', label: 'Space Grotesk', description: 'Modern & tech-forward' },
  ],
  'Art & Creative Services': [
    { value: 'DM Serif Display', label: 'DM Serif Display', description: 'Artistic & expressive' },
    { value: 'Libre Baskerville', label: 'Libre Baskerville', description: 'Refined & thoughtful' },
    { value: 'Righteous', label: 'Righteous', description: 'Playful & bold' },
  ],
  'Beauty & Cosmetics': [
    { value: 'Cinzel', label: 'Cinzel', description: 'Luxurious & timeless' },
    { value: 'Manrope', label: 'Manrope', description: 'Clean & minimalist' },
    { value: 'Great Vibes', label: 'Great Vibes', description: 'Elegant & feminine' },
  ],
  '': [
    { value: 'Inter', label: 'Inter', description: 'Modern & clean' },
    { value: 'Playfair Display', label: 'Playfair Display', description: 'Elegant & classic' },
    { value: 'Montserrat', label: 'Montserrat', description: 'Professional & readable' },
    { value: 'Lora', label: 'Lora', description: 'Friendly & warm' },
    { value: 'Poppins', label: 'Poppins', description: 'Modern & approachable' },
  ],
};

export const TypographyControls: React.FC = () => {
  const { cardInfo, updateCardInfo, industry } = useFormContext();

  // Get font options based on selected industry
  const availableFonts = industryFonts[industry] || industryFonts[''];

  return (
    <div className="space-y-4 pt-4 border-t border-cosmic-300">
      <h4 className="text-lg font-semibold text-white">
        Typography {industry && `(${industry} Recommended)`}
      </h4>
      
      <div className="space-y-2">
        <Label htmlFor="font-family">Font Family</Label>
        <Select
          value={cardInfo.fontFamily || 'Inter'}
          onValueChange={(value) => updateCardInfo('fontFamily', value)}
        >
          <SelectTrigger className="bg-cosmic-100 border-cosmic-300 text-white">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent className="bg-cosmic-100 border-cosmic-300">
            {availableFonts.map((font) => (
              <SelectItem key={font.value} value={font.value} className="text-white hover:bg-cosmic-200">
                <div>
                  <div className="font-medium">{font.label}</div>
                  <div className="text-xs text-gray-400">{font.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="name-font-size">Name Font Size</Label>
            <span className="text-sm text-gray-300">{cardInfo.nameFontSize || 20}px</span>
          </div>
          <Slider
            id="name-font-size"
            min={16}
            max={32}
            step={1}
            value={[cardInfo.nameFontSize || 20]}
            onValueChange={(value) => updateCardInfo('nameFontSize', value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="role-font-size">Role Font Size</Label>
            <span className="text-sm text-gray-300">{cardInfo.roleFontSize || 14}px</span>
          </div>
          <Slider
            id="role-font-size"
            min={10}
            max={24}
            step={1}
            value={[cardInfo.roleFontSize || 14]}
            onValueChange={(value) => updateCardInfo('roleFontSize', value[0])}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="company-font-size">Company Font Size</Label>
            <span className="text-sm text-gray-300">{cardInfo.companyFontSize || 18}px</span>
          </div>
          <Slider
            id="company-font-size"
            min={12}
            max={28}
            step={1}
            value={[cardInfo.companyFontSize || 18]}
            onValueChange={(value) => updateCardInfo('companyFontSize', value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="contact-font-size">Contact Font Size</Label>
            <span className="text-sm text-gray-300">{cardInfo.contactFontSize || 12}px</span>
          </div>
          <Slider
            id="contact-font-size"
            min={8}
            max={18}
            step={1}
            value={[cardInfo.contactFontSize || 12]}
            onValueChange={(value) => updateCardInfo('contactFontSize', value[0])}
          />
        </div>
      </div>
    </div>
  );
};

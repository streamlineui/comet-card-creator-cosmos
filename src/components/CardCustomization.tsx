import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFormContext, Industry } from '@/contexts/FormContext';
import { Plus, Undo, ArrowLeft } from 'lucide-react';

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

export const CardCustomization: React.FC = () => {
  const { cardInfo, updateCardInfo, nextStep, prevStep, industry } = useFormContext();
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Get font options based on selected industry
  const availableFonts = industryFonts[industry] || industryFonts[''];

  const handleAddContact = () => {
    updateCardInfo('contacts', [...cardInfo.contacts, { type: 'email', value: '' }]);
  };

  const updateContact = (index: number, field: 'type' | 'value', value: string) => {
    const newContacts = [...cardInfo.contacts];
    newContacts[index][field] = value;
    updateCardInfo('contacts', newContacts);
  };

  const removeContact = (index: number) => {
    const newContacts = [...cardInfo.contacts];
    newContacts.splice(index, 1);
    updateCardInfo('contacts', newContacts);
  };

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

  // Simulated WCAG contrast check - in a real app, use a proper color contrast calculator
  const hasGoodContrast = () => {
    // This is a simplified check - real apps should use proper WCAG contrast formulas
    const bg = cardInfo.backgroundColor.replace('#', '');
    const text = cardInfo.textColor.replace('#', '');
    
    // Very simplified contrast check
    return bg !== text;
  };

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

  return (
    <div className="min-h-screen py-12 px-4 pb-16">
      <div className="starry-background"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customize Your Card</h2>
          <p className="text-lg text-gray-300">
            Personalize your business card with your information and style preferences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={cardInfo.fullName}
                  onChange={(e) => updateCardInfo('fullName', e.target.value)}
                  className="bg-cosmic-100 border-cosmic-300 text-white"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={cardInfo.role}
                  onChange={(e) => updateCardInfo('role', e.target.value)}
                  className="bg-cosmic-100 border-cosmic-300 text-white"
                  placeholder="CEO"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">Business/Company Name</Label>
              <Input
                id="businessName"
                value={cardInfo.businessName}
                onChange={(e) => updateCardInfo('businessName', e.target.value)}
                className="bg-cosmic-100 border-cosmic-300 text-white"
                placeholder="Cosmic Enterprises"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={cardInfo.website}
                  onChange={(e) => updateCardInfo('website', e.target.value)}
                  className="bg-cosmic-100 border-cosmic-300 text-white"
                  placeholder="www.example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline/Slogan</Label>
                <Input
                  id="tagline"
                  value={cardInfo.tagline}
                  onChange={(e) => updateCardInfo('tagline', e.target.value)}
                  className="bg-cosmic-100 border-cosmic-300 text-white"
                  placeholder="Reaching for the stars"
                />
              </div>
            </div>

            
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Contact Information</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddContact}
                  className="text-cosmic-accent border-cosmic-accent hover:bg-cosmic-accent hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Contact
                </Button>
              </div>
              
              {cardInfo.contacts.map((contact, index) => (
                <div key={index} className="flex gap-2">
                  <select
                    value={contact.type}
                    onChange={(e) => updateContact(index, 'type', e.target.value)}
                    className="bg-cosmic-100 border-cosmic-300 text-white rounded-md px-3 py-1"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                  </select>
                  <Input
                    value={contact.value}
                    onChange={(e) => updateContact(index, 'value', e.target.value)}
                    className="bg-cosmic-100 border-cosmic-300 text-white"
                    placeholder="Enter value"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeContact(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>

            
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
            </div>

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
                    <div className="absolute right-0 top-10 z-10 p-2 bg-cosmic-100 border border-cosmic-300 rounded-md">
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold mb-6">Card Preview</h3>
            
            
            <div className="w-full max-w-md aspect-[1.7/1] rounded-xl overflow-hidden border-2 border-cosmic-300">
              <div 
                className="w-full h-full p-6 relative flex flex-col"
                style={{ 
                  backgroundColor: cardInfo.backgroundColor,
                  color: cardInfo.textColor,
                  borderRadius: `${cardInfo.cornerRadius}px`,
                  background: getGradientBackground(),
                  fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                }}
              >
                <div className="flex justify-between items-start">
                  {cardInfo.logo && (
                    <div className="w-16 h-16 rounded overflow-hidden bg-white p-1">
                      <img src={cardInfo.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  )}
                  
                  <div className="text-right flex flex-col">
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
                      className="self-start"
                      style={{ 
                        fontSize: `${cardInfo.roleFontSize || 14}px`,
                        fontFamily: `'${cardInfo.fontFamily || 'Inter'}', sans-serif`
                      }}
                    >
                      {cardInfo.role || 'Role'}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto">
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
            </div>
            
            <div className="mt-6 w-full max-w-md flex justify-end">
              <Button 
                variant="outline"
                className="border-cosmic-300 text-white hover:bg-cosmic-200 bg-cosmic-100"
              >
                <Undo className="h-4 w-4 mr-2" />
                Undo Last Change
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="mt-4 pt-4">
          <div className="flex justify-between max-w-6xl mx-auto">
            <Button 
              onClick={prevStep}
              variant="outline"
              className="border-cosmic-300 text-white bg-cosmic-100 hover:bg-black hover:text-white hover:border-black"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <Button 
              onClick={nextStep}
              className="cosmic-button"
            >
              Continue to Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

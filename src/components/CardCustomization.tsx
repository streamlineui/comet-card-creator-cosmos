
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

// Industry-specific font options
const industryFonts: Record<Industry, Array<{ value: string; label: string; description: string }>> = {
  'Automotive': [
    { value: 'Bebas Neue', label: 'Bebas Neue', description: 'Bold, strong, all-caps font, excellent for performance and rugged branding' },
    { value: 'Barlow', label: 'Barlow', description: 'A slightly condensed, utilitarian sans-serif that feels engineered and professional' },
    { value: 'Rajdhani', label: 'Rajdhani', description: 'Modern, technical feel with squarish characters, great for an industrial look' },
  ],
  'Fashion & Apparel': [
    { value: 'Playfair Display', label: 'Playfair Display', description: 'Elegant, high-contrast serif with a fashion editorial feel' },
    { value: 'Lora', label: 'Lora', description: 'Stylish and readable, works well for both headers and text' },
    { value: 'Poppins', label: 'Poppins', description: 'Geometric and sleek sans-serif, good for modern fashion brands' },
  ],
  'Food & Beverage': [
    { value: 'Quicksand', label: 'Quicksand', description: 'Rounded and friendly, gives a warm, approachable vibe' },
    { value: 'Merriweather', label: 'Merriweather', description: 'Readable serif with a slightly rustic, trustworthy tone' },
    { value: 'Caveat', label: 'Caveat', description: 'A hand-written font that works great for artisan or casual food brands' },
  ],
  'Sports & Fitness': [
    { value: 'Anton', label: 'Anton', description: 'Bold, wide, athletic display font for strong presence' },
    { value: 'Orbitron', label: 'Orbitron', description: 'Futuristic and energetic, great for performance and fitness brands' },
    { value: 'Titillium Web', label: 'Titillium Web', description: 'Sleek and dynamic sans-serif that works well in active lifestyle contexts' },
  ],
  'Real Estate': [
    { value: 'Montserrat', label: 'Montserrat', description: 'Clean and modern sans-serif, good for upscale or urban branding' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro', description: 'Highly legible and professional, good for credibility' },
    { value: 'Merriweather', label: 'Merriweather', description: 'Serif option for traditional or luxury market appeal' },
  ],
  'Health & Wellness': [
    { value: 'Josefin Sans', label: 'Josefin Sans', description: 'Light, airy, and calm—a great match for holistic brands' },
    { value: 'Nunito', label: 'Nunito', description: 'Rounded and friendly sans-serif, great for well-being and accessibility' },
    { value: 'Cormorant Garamond', label: 'Cormorant Garamond', description: 'Elegant serif with a spa-like, high-end tone' },
  ],
  'Finance & Fintech': [
    { value: 'Roboto', label: 'Roboto', description: 'Balanced, neutral, and extremely versatile for both tech and financial services' },
    { value: 'Inter', label: 'Inter', description: 'Designed for digital clarity, highly readable in small print' },
    { value: 'Space Grotesk', label: 'Space Grotesk', description: 'Modern, slightly technical look with character for startups and fintech' },
  ],
  'Art & Creative Services': [
    { value: 'DM Serif Display', label: 'DM Serif Display', description: 'Artistic, expressive serif with flair' },
    { value: 'Libre Baskerville', label: 'Libre Baskerville', description: 'Bookish and refined for thoughtful or narrative-driven creatives' },
    { value: 'Righteous', label: 'Righteous', description: 'Playful yet sharp display font, suitable for bold personal brands' },
  ],
  'Beauty & Cosmetics': [
    { value: 'Cinzel', label: 'Cinzel', description: 'A Roman-inspired serif that feels luxurious and timeless' },
    { value: 'Manrope', label: 'Manrope', description: 'Clean and refined sans-serif for a minimalist, modern aesthetic' },
    { value: 'Great Vibes', label: 'Great Vibes', description: 'Elegant script font for high-end or feminine-focused beauty brands' },
  ],
  '': [
    { value: 'Inter', label: 'Inter', description: 'Modern Sans' },
    { value: 'Playfair Display', label: 'Playfair Display', description: 'Elegant Serif' },
    { value: 'Montserrat', label: 'Montserrat', description: 'Clean Sans' },
    { value: 'Lora', label: 'Lora', description: 'Readable Serif' },
    { value: 'Poppins', label: 'Poppins', description: 'Friendly Sans' },
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

              <div className="space-y-2">
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
            </div>

            {/* Typography Section - Updated with industry-specific fonts */}
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
          
          {/* Preview Section */}
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
                  background: cardInfo.useGradient 
                    ? `linear-gradient(135deg, ${cardInfo.backgroundColor}, #252b3b)`
                    : cardInfo.backgroundColor,
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

        {/* Navigation buttons - Positioned at bottom of page (not fixed) */}
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

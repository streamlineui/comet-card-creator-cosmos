
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useFormContext } from '@/contexts/FormContext';
import { Plus, Undo, ArrowLeft } from 'lucide-react';

export const CardCustomization: React.FC = () => {
  const { cardInfo, updateCardInfo, nextStep, prevStep } = useFormContext();
  const [showColorPicker, setShowColorPicker] = useState(false);

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
    <div className="min-h-screen py-12 px-4 pb-24">
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
                  max={24}
                  step={1}
                  value={[cardInfo.cornerRadius]}
                  onValueChange={(value) => updateCardInfo('cornerRadius', value[0])}
                />
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
                    : cardInfo.backgroundColor
                }}
              >
                <div className="flex justify-between items-start">
                  {cardInfo.logo && (
                    <div className="w-16 h-16 rounded overflow-hidden bg-white p-1">
                      <img src={cardInfo.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  )}
                  
                  <div className="text-right flex flex-col">
                    <h4 className="text-xl font-bold">{cardInfo.fullName || 'Full Name'}</h4>
                    <p className="text-sm self-start">{cardInfo.role || 'Role'}</p>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <h5 className="text-lg font-bold">
                    {cardInfo.businessName || 'Business Name'}
                  </h5>
                  {cardInfo.tagline && (
                    <p className="text-sm italic">{cardInfo.tagline}</p>
                  )}
                  {cardInfo.website && (
                    <p className="text-sm italic">{cardInfo.website}</p>
                  )}
                  
                  {cardInfo.contacts.length > 0 && (
                    <div className="mt-2">
                      {cardInfo.contacts.map((contact, index) => (
                        <p key={index} className="text-sm">
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

        {/* Navigation buttons - Fixed positioning */}
        <div className="fixed bottom-0 left-0 right-0 bg-cosmic/80 backdrop-blur-sm border-t border-cosmic-300 p-4 z-50">
          <div className="container mx-auto max-w-6xl flex justify-between">
            <Button 
              onClick={prevStep}
              variant="outline"
              className="border-cosmic-300 text-white hover:bg-cosmic-200 bg-cosmic-100"
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

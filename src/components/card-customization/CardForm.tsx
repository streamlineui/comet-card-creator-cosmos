
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from '@/contexts/FormContext';

export const CardForm: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();

  return (
    <div className="space-y-6">
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
    </div>
  );
};

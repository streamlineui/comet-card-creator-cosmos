
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from '@/contexts/FormContext';
import { Plus } from 'lucide-react';

export const ContactManager: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();

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

  return (
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
  );
};


import React from 'react';
import { Label } from '@/components/ui/label';
import { useFormContext } from '@/contexts/FormContext';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export const TextAlignmentControls: React.FC = () => {
  const { cardInfo, updateCardInfo } = useFormContext();

  const alignmentOptions = [
    { value: 'left', icon: AlignLeft, label: 'Left' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'right', icon: AlignRight, label: 'Right' },
  ] as const;

  return (
    <div className="space-y-4 pt-4 border-t border-cosmic-300">
      <Label>Text Placement</Label>
      <div className="flex space-x-2">
        {alignmentOptions.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => updateCardInfo('textAlignment', value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md border-2 transition-all duration-200 ${
              cardInfo.textAlignment === value
                ? 'border-cosmic-accent bg-cosmic-accent/20 text-cosmic-accent'
                : 'border-cosmic-300 bg-cosmic-100 text-white hover:border-cosmic-accent hover:bg-cosmic-200'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

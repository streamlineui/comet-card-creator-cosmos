import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from "sonner";
import { ChevronLeft } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportOptions: React.FC = () => {
  const { cardInfo, exportSettings, updateExportSettings, goToStep, prevStep } = useFormContext();

  // Helper function to generate gradient background
  const getGradientBackground = () => {
    if (!cardInfo.useGradient) {
      return cardInfo.backgroundColor;
    }
    
    const { gradientType, gradientColor1, gradientColor2 } = cardInfo;
    
    switch (gradientType) {
      case 'linear':
        return `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
      case 'radial':
        return `radial-gradient(circle, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
      case 'conic':
        return `conic-gradient(from 0deg, ${gradientColor1} 0%, ${gradientColor2} 50%, ${gradientColor1} 100%)`;
      default:
        return `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
    }
  };

  const handleExport = async () => {
    try {
      const cardElement = document.querySelector('.card-preview') as HTMLElement;
      if (!cardElement) {
        toast.error("Could not find card preview to export");
        return;
      }

      const scaleFactor = exportSettings.size / 100;
      const canvas = await html2canvas(cardElement, {
        scale: scaleFactor * 2, // Higher scale for better quality
        backgroundColor: null,
        useCORS: true,
        allowTaint: false
      });

      const fileName = `business-card-${cardInfo.fullName?.replace(/\s+/g, '-').toLowerCase() || 'card'}`;
      
      switch (exportSettings.fileType) {
        case 'pdf':
          const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [85.6, 53.98] // Standard business card size
          });
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 53.98);
          pdf.save(`${fileName}.pdf`);
          break;
          
        case 'png':
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob!);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }, 'image/png');
          break;
          
        case 'jpg':
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob!);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.jpg`;
            a.click();
            URL.revokeObjectURL(url);
          }, 'image/jpeg', 0.9);
          break;
          
        case 'gif':
        case 'tiff':
        case 'svg':
          // For unsupported formats, fallback to PNG
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob!);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }, 'image/png');
          toast.info(`${exportSettings.fileType.toUpperCase()} format not yet supported. Downloaded as PNG instead.`);
          break;
          
        default:
          toast.error("Unsupported file format");
          return;
      }
      
      toast.success("Business card exported successfully!", {
        description: `Your ${exportSettings.fileType.toUpperCase()} file has been downloaded.`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast.error("Failed to export business card. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="starry-background"></div>
      
      <Button
        variant="ghost"
        onClick={prevStep}
        className="absolute top-6 left-6 text-white hover:bg-white/10 hover:text-white"
        aria-label="Go back"
      >
        <ChevronLeft className="mr-1" />
        Back
      </Button>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Export</h2>
          <p className="text-lg text-gray-300">
            Choose your export options and download your business card.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">File Type</h3>
               <RadioGroup 
                value={exportSettings.fileType}
                onValueChange={(value) => updateExportSettings('fileType', value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="pdf" 
                    id="pdf" 
                    className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="pdf" className="text-white">PDF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="jpg" 
                    id="jpg" 
                    className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="jpg" className="text-white">JPG</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="png" 
                    id="png" 
                    className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="png" className="text-white">PNG</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="gif" 
                    id="gif" 
                    className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="gif" className="text-white">GIF</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="svg" 
                    id="svg" 
                    className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="svg" className="text-white">SVG</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="tiff" 
                    id="tiff" 
                    className="border-white text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                  />
                  <Label htmlFor="tiff" className="text-white">TIFF</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Color Mode</h3>
              <Select
                value={exportSettings.colorMode}
                onValueChange={(value) => updateExportSettings('colorMode', value as 'RGB' | 'CMYK')}
              >
                <SelectTrigger className="w-40 bg-cosmic-100 border-cosmic-300 text-white">
                  <SelectValue placeholder="Select color mode" />
                </SelectTrigger>
                <SelectContent className="bg-cosmic-100 border-cosmic-300 text-white">
                  <SelectItem value="RGB">RGB</SelectItem>
                  <SelectItem value="CMYK">CMYK</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400">
                Use CMYK for professional printing, RGB for digital use.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Size</h3>
                <span className="text-sm text-gray-300">{exportSettings.size}%</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm">Small</span>
                <Slider
                  min={10}
                  max={100}
                  step={5}
                  value={[exportSettings.size]}
                  onValueChange={(value) => updateExportSettings('size', value[0])}
                  className="flex-1"
                />
                <span className="text-sm">Large</span>
              </div>
            </div>
            
            <div className="pt-6 space-x-4">
              <Button 
                onClick={handleExport}
                className="bg-transparent border border-white text-white hover:bg-white/10"
              >
                Download
              </Button>
              
              <Button 
                onClick={handleExport}
                className="cosmic-button"
              >
                Export
              </Button>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="ghost"
                onClick={() => goToStep('customize')}
                className="text-cosmic-accent"
              >
                &larr; Back to Customize
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold mb-6">Preview</h3>
            
            <div className="w-full max-w-lg aspect-[1.7/1] rounded-xl overflow-hidden border-2 border-cosmic-300">
              <div 
                className="w-full h-full p-6 relative flex flex-col"
                style={{ 
                  backgroundColor: cardInfo.backgroundColor,
                  color: cardInfo.textColor,
                  borderRadius: `${cardInfo.cornerRadius}px`,
                  background: getGradientBackground()
                }}
              >
                <div className="flex justify-between items-start">
                  {cardInfo.logo && (
                    <div className="w-16 h-16 rounded overflow-hidden bg-white p-1">
                      <img src={cardInfo.logo} alt="Logo" className="w-full h-full object-contain" />
                    </div>
                  )}
                  
                  <div className="text-right">
                    <h4 className="text-xl font-bold">{cardInfo.fullName || 'Full Name'}</h4>
                    <p className="text-sm">{cardInfo.role || 'Role'}</p>
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
                    <p className="text-sm">{cardInfo.website}</p>
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
            
            <p className="mt-4 text-sm text-gray-300">
              File format: {exportSettings.fileType.toUpperCase()} | 
              Color mode: {exportSettings.colorMode} | 
              Size: {exportSettings.size}%
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

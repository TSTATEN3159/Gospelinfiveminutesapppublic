import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useImageGenerator, type ImageSettings } from '@/hooks/useImageGenerator';
import { BACKGROUND_IMAGES, getBackgroundsByCategory } from '@/config/backgroundImages';
import { safeShare } from '@/utils/capabilities';
import { Download, Share2, Loader2, Palette, Type, Image as ImageIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ScriptureImageGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialVerse: string;
  initialReference: string;
}

const TEXT_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'Light Blue', value: '#87CEEB' },
  { name: 'Cream', value: '#FFFACD' },
  { name: 'Light Gray', value: '#D3D3D3' },
];

const FONT_FAMILIES = [
  { name: 'Crimson Text', value: 'Crimson Text' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Times New Roman', value: 'Times New Roman' },
  { name: 'Arial', value: 'Arial' },
  { name: 'Helvetica', value: 'Helvetica' },
];

export default function ScriptureImageGenerator({
  open,
  onOpenChange,
  initialVerse,
  initialReference,
}: ScriptureImageGeneratorProps) {
  const { toast } = useToast();
  const { generateImage, isGenerating } = useImageGenerator();
  
  const [settings, setSettings] = useState<ImageSettings>({
    verseText: initialVerse,
    verseReference: initialReference,
    backgroundId: 'sunset',
    textPosition: 'center',
    textColor: '#FFFFFF',
    fontSize: 36,
    fontFamily: 'Crimson Text',
    textShadow: true,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedBlob, setGeneratedBlob] = useState<Blob | null>(null);

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      verseText: initialVerse,
      verseReference: initialReference,
    }));
  }, [initialVerse, initialReference]);

  useEffect(() => {
    if (open) {
      handleGeneratePreview();
    }
  }, [settings, open]);

  const handleGeneratePreview = async () => {
    try {
      const result = await generateImage(settings);
      setPreviewUrl(result.dataUrl);
      setGeneratedBlob(result.blob);
    } catch (err) {
      console.error('Preview generation failed:', err);
      toast({
        title: 'Preview generation failed',
        description: 'Unable to generate image preview. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    if (!generatedBlob) {
      toast({
        title: 'No image to share',
        description: 'Please generate an image first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const file = new File([generatedBlob], `scripture-${Date.now()}.png`, { type: 'image/png' });
      
      const shareData = {
        title: settings.verseReference,
        text: settings.verseText,
        files: [file],
      };

      const shared = await safeShare(shareData);
      
      if (shared) {
        toast({
          title: 'Image shared successfully',
          description: 'Your Scripture image has been shared.',
        });
      } else {
        handleDownload();
      }
    } catch (err) {
      console.error('Share failed:', err);
      toast({
        title: 'Share unavailable',
        description: 'Downloading image instead.',
      });
      handleDownload();
    }
  };

  const handleDownload = () => {
    if (!previewUrl) {
      toast({
        title: 'No image to download',
        description: 'Please generate an image first.',
        variant: 'destructive',
      });
      return;
    }

    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `scripture-${settings.verseReference.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'Image downloaded',
      description: 'Your Scripture image has been saved.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0">
        <div className="flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogTitle className="text-2xl">Create Scripture Image</DialogTitle>
            <DialogDescription>
              Click any background below to preview your verse on it
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1 px-6">
            <div className="py-6 space-y-6">
              {/* Preview & Actions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Preview</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleShare}
                      disabled={!previewUrl || isGenerating}
                      data-testid="button-share-image"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      onClick={handleDownload}
                      disabled={!previewUrl || isGenerating}
                      variant="outline"
                      data-testid="button-download-image"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <div className="relative aspect-square max-w-sm bg-muted rounded-lg overflow-hidden border-2 border-border shadow-md">
                  {isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Scripture preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!isGenerating && previewUrl && (
                    <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-md text-sm font-medium text-center">
                      {settings.verseReference}
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs for Background & Customization */}
              <Tabs defaultValue="backgrounds" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="backgrounds" data-testid="tab-background">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Choose Background
                  </TabsTrigger>
                  <TabsTrigger value="customize" data-testid="tab-customize">
                    <Palette className="h-4 w-4 mr-2" />
                    Customize
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="backgrounds" className="space-y-6 mt-6">
                  <div className="space-y-6">
                    {(['nature', 'water', 'sky', 'spiritual', 'solid'] as const).map((category) => {
                      const backgrounds = getBackgroundsByCategory(category);
                      if (backgrounds.length === 0) return null;

                      return (
                        <div key={category}>
                          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                            {category === 'nature' && '🏔️'}
                            {category === 'water' && '🌊'}
                            {category === 'sky' && '☁️'}
                            {category === 'spiritual' && '✝️'}
                            {category === 'solid' && '🎨'}
                            {category}
                          </h3>
                          <div className="grid grid-cols-5 gap-3">
                            {backgrounds.map((bg) => (
                              <button
                                key={bg.id}
                                onClick={() => setSettings({ ...settings, backgroundId: bg.id })}
                                className={`group relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                                  settings.backgroundId === bg.id
                                    ? 'border-primary ring-2 ring-primary ring-offset-2 shadow-lg'
                                    : 'border-border hover:border-primary/50 hover:shadow-md'
                                }`}
                                data-testid={`bg-${bg.id}`}
                                title={bg.name}
                              >
                                {bg.type === 'solid-color' ? (
                                  <div className="w-full h-full" style={{ backgroundColor: bg.color }} />
                                ) : (
                                  <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                                )}
                                {settings.backgroundId === bg.id && (
                                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                                      <span className="text-xs font-bold">✓</span>
                                    </div>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>

              <TabsContent value="customize" className="space-y-6 mt-2">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Text Position</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['top', 'center', 'bottom'] as const).map((pos) => (
                        <Button
                          key={pos}
                          onClick={() => setSettings({ ...settings, textPosition: pos })}
                          variant={settings.textPosition === pos ? 'default' : 'outline'}
                          className="capitalize"
                          data-testid={`position-${pos}`}
                        >
                          {pos}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Font Size: {settings.fontSize}px</Label>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) => setSettings({ ...settings, fontSize: value })}
                      min={20}
                      max={64}
                      step={2}
                      data-testid="slider-font-size"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Font Family</Label>
                    <div className="grid grid-cols-1 gap-2">
                      {FONT_FAMILIES.map((font) => (
                        <Button
                          key={font.value}
                          onClick={() => setSettings({ ...settings, fontFamily: font.value })}
                          variant={settings.fontFamily === font.value ? 'default' : 'outline'}
                          className="justify-start"
                          style={{ fontFamily: font.value }}
                          data-testid={`font-${font.value.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          {font.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Text Color</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {TEXT_COLORS.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setSettings({ ...settings, textColor: color.value })}
                          className={`h-12 rounded-md border-2 transition-all hover:scale-110 ${
                            settings.textColor === color.value
                              ? 'border-primary ring-4 ring-primary/30 scale-110'
                              : 'border-border'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                          data-testid={`color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <Label htmlFor="text-shadow" className="text-base font-semibold">Text Shadow</Label>
                    <Switch
                      id="text-shadow"
                      checked={settings.textShadow}
                      onCheckedChange={(checked) => setSettings({ ...settings, textShadow: checked })}
                      data-testid="switch-text-shadow"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

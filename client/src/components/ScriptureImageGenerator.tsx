import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
    fontSize: 32,
    fontFamily: 'Crimson Text',
    textShadow: true,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedBlob, setGeneratedBlob] = useState<Blob | null>(null);

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Create Scripture Image</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-muted rounded-md overflow-hidden border">
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
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                disabled={!previewUrl || isGenerating}
                className="flex-1"
                data-testid="button-share-image"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleDownload}
                disabled={!previewUrl || isGenerating}
                variant="outline"
                className="flex-1"
                data-testid="button-download-image"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <ScrollArea className="h-full pr-4">
            <Tabs defaultValue="background" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="background" data-testid="tab-background">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Background
                </TabsTrigger>
                <TabsTrigger value="text" data-testid="tab-text">
                  <Type className="h-4 w-4 mr-2" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="colors" data-testid="tab-colors">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="background" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {(['nature', 'water', 'sky', 'spiritual', 'solid'] as const).map((category) => {
                    const backgrounds = getBackgroundsByCategory(category);
                    if (backgrounds.length === 0) return null;

                    return (
                      <div key={category}>
                        <h3 className="text-sm font-semibold mb-2 capitalize">{category}</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {backgrounds.map((bg) => (
                            <button
                              key={bg.id}
                              onClick={() => setSettings({ ...settings, backgroundId: bg.id })}
                              className={`aspect-square rounded-md overflow-hidden border-2 transition-all hover-elevate ${
                                settings.backgroundId === bg.id
                                  ? 'border-primary ring-2 ring-primary ring-offset-2'
                                  : 'border-border'
                              }`}
                              data-testid={`bg-${bg.id}`}
                            >
                              {bg.type === 'solid-color' ? (
                                <div className="w-full h-full" style={{ backgroundColor: bg.color }} />
                              ) : (
                                <img src={bg.url} alt={bg.name} className="w-full h-full object-cover" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Text Position</Label>
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

                  <div className="space-y-2">
                    <Label>Font Size: {settings.fontSize}px</Label>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={([value]) => setSettings({ ...settings, fontSize: value })}
                      min={20}
                      max={64}
                      step={2}
                      data-testid="slider-font-size"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Font Family</Label>
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

                  <div className="flex items-center justify-between">
                    <Label htmlFor="text-shadow">Text Shadow</Label>
                    <Switch
                      id="text-shadow"
                      checked={settings.textShadow}
                      onCheckedChange={(checked) => setSettings({ ...settings, textShadow: checked })}
                      data-testid="switch-text-shadow"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {TEXT_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSettings({ ...settings, textColor: color.value })}
                        className={`h-12 rounded-md border-2 transition-all hover-elevate ${
                          settings.textColor === color.value
                            ? 'border-primary ring-2 ring-primary ring-offset-2'
                            : 'border-border'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                        data-testid={`color-${color.name.replace(/\s+/g, '-').toLowerCase()}`}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

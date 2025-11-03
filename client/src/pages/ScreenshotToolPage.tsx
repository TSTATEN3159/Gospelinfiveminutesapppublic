import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, Camera, Smartphone, Info } from "lucide-react";
import html2canvas from "html2canvas";

interface ScreenshotToolPageProps {
  onBack: () => void;
}

type DeviceSize = {
  name: string;
  width: number;
  height: number;
  description: string;
  required: boolean;
};

const DEVICE_SIZES: DeviceSize[] = [
  {
    name: "iPhone 6.9\" (Pro Max)",
    width: 1320,
    height: 2868,
    description: "Latest - Apple auto-scales for all iPhones",
    required: true
  },
  {
    name: "iPhone 6.5\" (Fallback)",
    width: 1242,
    height: 2688,
    description: "Fallback for older devices",
    required: false
  },
  {
    name: "iPhone 6.1\" (Standard)",
    width: 1179,
    height: 2556,
    description: "Optional - for additional coverage",
    required: false
  }
];

export default function ScreenshotToolPage({ onBack }: ScreenshotToolPageProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceSize>(DEVICE_SIZES[0]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedScreenshots, setCapturedScreenshots] = useState<string[]>([]);

  const captureScreenshot = async () => {
    setIsCapturing(true);
    
    try {
      // Get the preview iframe
      const previewFrame = document.getElementById('screenshot-preview') as HTMLIFrameElement;
      if (!previewFrame?.contentWindow) {
        alert('Preview not loaded. Please wait and try again.');
        setIsCapturing(false);
        return;
      }

      // Capture the iframe content
      const canvas = await html2canvas(previewFrame.contentWindow.document.body, {
        width: selectedDevice.width,
        height: selectedDevice.height,
        scale: 1,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false
      });

      // Convert to blob and create download URL
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCapturedScreenshots(prev => [...prev, url]);
          
          // Auto-download
          const link = document.createElement('a');
          link.download = `app-screenshot-${selectedDevice.name.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.png`;
          link.href = url;
          link.click();
        }
        setIsCapturing(false);
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      alert('Screenshot capture failed. Try using browser DevTools instead.');
      setIsCapturing(false);
    }
  };

  const downloadAll = () => {
    capturedScreenshots.forEach((url, index) => {
      const link = document.createElement('a');
      link.download = `screenshot-${index + 1}.png`;
      link.href = url;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 px-4 py-6 border-b border-border sticky top-0 z-10 shadow-lg">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="h-11 w-11 bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">App Store Screenshot Tool</h1>
            <p className="text-white/90 text-sm">Capture perfect screenshots for Apple submission</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Instructions */}
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
              <Info className="w-5 h-5" />
              Quick Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <p><strong>Easy Method:</strong> Use browser DevTools (recommended for best quality)</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Right-click anywhere → "Inspect" or press <kbd>F12</kbd></li>
              <li>Click the device toggle icon (📱) or press <kbd>Ctrl+Shift+M</kbd> / <kbd>Cmd+Shift+M</kbd></li>
              <li>Set dimensions to: <strong>1320 × 2868</strong> (iPhone 6.9")</li>
              <li>Navigate through your app and press <kbd>Ctrl+Shift+P</kbd> / <kbd>Cmd+Shift+P</kbd></li>
              <li>Type "screenshot" and select "Capture full size screenshot"</li>
            </ol>
            <p className="mt-3"><strong>Alternative:</strong> Select a device size below and click "Open App in New Window"</p>
          </CardContent>
        </Card>

        {/* Device Size Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              1. Select Device Size
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {DEVICE_SIZES.map((device) => (
              <button
                key={device.name}
                onClick={() => setSelectedDevice(device)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate ${
                  selectedDevice.name === device.name
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{device.name}</h3>
                      {device.required && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">REQUIRED</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{device.description}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      {device.width} × {device.height} pixels
                    </p>
                  </div>
                  {selectedDevice.name === device.name && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              2. Capture Screenshots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Recommended:</strong> Open your app in a new window at the exact App Store dimensions, then use your browser's screenshot tool.
              </p>
              <Button
                onClick={() => {
                  const url = window.location.origin;
                  window.open(
                    url,
                    'screenshot-preview',
                    `width=${selectedDevice.width},height=${selectedDevice.height},menubar=no,toolbar=no,location=no,status=no`
                  );
                }}
                className="w-full"
                size="lg"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Open App in New Window ({selectedDevice.width}×{selectedDevice.height})
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>After opening, use your browser's built-in screenshot tool:</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• <strong>Chrome/Edge:</strong> DevTools → Device Mode → Capture screenshot</li>
                <li>• <strong>Firefox:</strong> Right-click → "Take a Screenshot"</li>
                <li>• <strong>Safari:</strong> Develop → Show Web Inspector → Device Mode</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Requirements Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              App Store Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-foreground mb-1">Required Size:</p>
                <p className="text-muted-foreground">1320 × 2868 pixels (6.9" iPhone)</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Format:</p>
                <p className="text-muted-foreground">PNG or JPEG (no transparency)</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Quantity:</p>
                <p className="text-muted-foreground">3-10 screenshots</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">File Size:</p>
                <p className="text-muted-foreground">Under 10 MB each</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-800 dark:text-green-200 text-xs">
                <strong>✅ Pro Tip:</strong> Apple auto-scales from 6.9" to all other iPhone sizes. You only need screenshots from ONE device size!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Screenshot Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Suggested Screenshots (3-5 minimum)</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">1.</span>
                <span><strong>Daily Verse:</strong> Home page showing today's verse with beautiful imagery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">2.</span>
                <span><strong>AI Pastor:</strong> Ask page demonstrating the AI Q&A feature</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">3.</span>
                <span><strong>Reading Plans:</strong> Bible reading plans page with progress tracking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">4.</span>
                <span><strong>Bible Search:</strong> Search page showing verse results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-semibold text-foreground">5.</span>
                <span><strong>Friends:</strong> Social features page (optional)</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

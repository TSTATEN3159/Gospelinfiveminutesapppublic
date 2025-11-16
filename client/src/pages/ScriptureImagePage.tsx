import { useEffect, useRef, useState } from "react";
import { SCRIPTURE_BACKGROUNDS, getBackgroundsByCategory } from "@/config/scriptureBackgrounds";
import { drawScriptureImage } from "@/utils/scriptureImageCanvas";
import { BibleVersionCode, getInitialBibleVersion } from "@/config/bibleVersions";
import { BibleVersionSelector } from "@/components/BibleVersionSelector";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Download, Image as ImageIcon, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScriptureImagePageProps {
  initialReference?: string;
  initialText?: string;
  initialVersion?: BibleVersionCode;
  onNavigate?: (page: string) => void;
}

const CANVAS_WIDTH = 1290;
const CANVAS_HEIGHT = 2796;

export default function ScriptureImagePage({
  initialReference = "",
  initialText = "",
  initialVersion,
  onNavigate
}: ScriptureImagePageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [verseText, setVerseText] = useState(initialText);
  const [reference, setReference] = useState(initialReference);
  const [version, setVersion] = useState<BibleVersionCode>(
    initialVersion ?? getInitialBibleVersion()
  );

  const [backgroundId, setBackgroundId] = useState<string>(
    SCRIPTURE_BACKGROUNDS[0]?.id ?? ""
  );

  const [baseFontSize, setBaseFontSize] = useState<number>(72);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [isRendering, setIsRendering] = useState(false);

  const background = SCRIPTURE_BACKGROUNDS.find((b) => b.id === backgroundId) ?? SCRIPTURE_BACKGROUNDS[0];

  // Redraw whenever main inputs change
  useEffect(() => {
    if (!canvasRef.current || !background) return;
    if (!verseText || !reference) return;

    let canceled = false;

    const doDraw = async () => {
      setIsRendering(true);
      try {
        await drawScriptureImage(canvasRef.current!, {
          verseText,
          reference,
          version,
          backgroundUrl: background.imageUrl,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          baseFontSize,
          textColor
        });
      } catch (err) {
        console.error("Error drawing scripture image", err);
      } finally {
        if (!canceled) {
          setIsRendering(false);
        }
      }
    };

    void doDraw();

    return () => {
      canceled = true;
    };
  }, [verseText, reference, backgroundId, baseFontSize, textColor, version, background]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${reference.replace(/\s+/g, "_")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleBackgroundChange = (id: string) => {
    setBackgroundId(id);
  };

  const spiritualBgs = getBackgroundsByCategory('spiritual');
  const natureBgs = getBackgroundsByCategory('nature');
  const waterBgs = getBackgroundsByCategory('water');
  const skyBgs = getBackgroundsByCategory('sky');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-slate-800 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-amber-400" />
            Scripture Image
          </h1>
          <p className="text-xs text-slate-400">
            Your verse is auto-fitted and centered. You can fine-tune below.
          </p>
        </div>
        {onNavigate && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate("home")}
            data-testid="button-home"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
        )}
      </div>

      <div className="p-4 max-w-6xl mx-auto grid gap-4 lg:grid-cols-[minmax(0,2fr),minmax(0,1.4fr)]">
        {/* Left: Canvas preview */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm text-slate-200">
              Preview (1290 x 2796)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <div className="relative bg-slate-950 rounded-[2.5rem] p-3 shadow-2xl">
              <div className="w-[280px] h-[600px] rounded-[2rem] overflow-hidden bg-black">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full block"
                  aria-label="Scripture image preview"
                  data-testid="canvas-preview"
                />
              </div>
              {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs">
                  Rendering…
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleDownload} 
                disabled={!verseText || !reference}
                data-testid="button-download"
              >
                <Download className="w-4 h-4 mr-1" />
                Download PNG
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right: Controls */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-sm text-slate-200">
              Verse & Design Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Verse fields (pre-filled but editable) */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">
                Reference
              </label>
              <input
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. John 3:16"
                data-testid="input-reference"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">
                Verse Text
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm min-h-[80px]"
                value={verseText}
                onChange={(e) => setVerseText(e.target.value)}
                placeholder="Enter or paste your verse text here..."
                data-testid="textarea-verse-text"
              />
            </div>

            {/* Version */}
            <BibleVersionSelector
              label="Version (display-only label)"
              value={version}
              onChange={(v) => setVersion(v)}
            />

            {/* Font size slider */}
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold">Base Font Size</span>
                <span>{baseFontSize}px</span>
              </div>
              <Slider
                value={[baseFontSize]}
                min={30}
                max={96}
                step={2}
                onValueChange={(val) => setBaseFontSize(val[0])}
                data-testid="slider-font-size"
              />
              <p className="text-[11px] text-slate-500">
                This is the maximum size. The app will shrink it automatically if needed so
                the verse never runs off the edges.
              </p>
            </div>

            {/* Text color */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-400">
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-10 h-8 rounded-md border border-slate-700 bg-slate-950"
                  data-testid="input-text-color"
                />
                <span className="text-xs text-slate-400">{textColor}</span>
              </div>
            </div>

            {/* Background picker with tabs by category */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-400">
                Background
              </label>
              <Tabs defaultValue="spiritual" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-950">
                  <TabsTrigger value="spiritual" className="text-xs">Spiritual</TabsTrigger>
                  <TabsTrigger value="nature" className="text-xs">Nature</TabsTrigger>
                  <TabsTrigger value="water" className="text-xs">Water</TabsTrigger>
                  <TabsTrigger value="sky" className="text-xs">Sky</TabsTrigger>
                </TabsList>
                <TabsContent value="spiritual" className="space-y-2 mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    {spiritualBgs.map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => handleBackgroundChange(bg.id)}
                        className={`relative group rounded-xl overflow-hidden border ${
                          bg.id === backgroundId
                            ? "border-amber-400 ring-2 ring-amber-400/60"
                            : "border-slate-700"
                        }`}
                        data-testid={`bg-${bg.id}`}
                      >
                        <div className="aspect-[3/2] bg-slate-800">
                          <img
                            src={bg.imageUrl}
                            alt={bg.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <div className="text-[11px] font-semibold text-white line-clamp-1">
                            {bg.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="nature" className="space-y-2 mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    {natureBgs.map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => handleBackgroundChange(bg.id)}
                        className={`relative group rounded-xl overflow-hidden border ${
                          bg.id === backgroundId
                            ? "border-amber-400 ring-2 ring-amber-400/60"
                            : "border-slate-700"
                        }`}
                        data-testid={`bg-${bg.id}`}
                      >
                        <div className="aspect-[3/2] bg-slate-800">
                          <img
                            src={bg.imageUrl}
                            alt={bg.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <div className="text-[11px] font-semibold text-white line-clamp-1">
                            {bg.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="water" className="space-y-2 mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    {waterBgs.map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => handleBackgroundChange(bg.id)}
                        className={`relative group rounded-xl overflow-hidden border ${
                          bg.id === backgroundId
                            ? "border-amber-400 ring-2 ring-amber-400/60"
                            : "border-slate-700"
                        }`}
                        data-testid={`bg-${bg.id}`}
                      >
                        <div className="aspect-[3/2] bg-slate-800">
                          <img
                            src={bg.imageUrl}
                            alt={bg.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <div className="text-[11px] font-semibold text-white line-clamp-1">
                            {bg.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="sky" className="space-y-2 mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    {skyBgs.map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => handleBackgroundChange(bg.id)}
                        className={`relative group rounded-xl overflow-hidden border ${
                          bg.id === backgroundId
                            ? "border-amber-400 ring-2 ring-amber-400/60"
                            : "border-slate-700"
                        }`}
                        data-testid={`bg-${bg.id}`}
                      >
                        <div className="aspect-[3/2] bg-slate-800">
                          <img
                            src={bg.imageUrl}
                            alt={bg.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                          <div className="text-[11px] font-semibold text-white line-clamp-1">
                            {bg.name}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

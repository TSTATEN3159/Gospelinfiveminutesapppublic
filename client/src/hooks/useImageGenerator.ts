import { useState, useCallback, useRef } from 'react';
import { getBackgroundById, type BackgroundImage } from '@/config/backgroundImages';

export interface ImageSettings {
  verseText: string;
  verseReference: string;
  backgroundId: string;
  textPosition: 'top' | 'center' | 'bottom';
  textColor: string;
  fontSize: number;
  fontFamily: string;
  textShadow: boolean;
}

export interface GeneratedImage {
  dataUrl: string;
  blob: Blob;
  settings: ImageSettings;
}

const DEFAULT_CANVAS_WIDTH = 1080;
const DEFAULT_CANVAS_HEIGHT = 1080;

export function useImageGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }, []);

  const wrapText = useCallback((
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  }, []);

  const generateImage = useCallback(async (settings: ImageSettings): Promise<GeneratedImage> => {
    setIsGenerating(true);
    setError(null);

    try {
      const background = getBackgroundById(settings.backgroundId);
      if (!background) {
        throw new Error('Background not found');
      }

      const canvas = document.createElement('canvas');
      canvas.width = DEFAULT_CANVAS_WIDTH;
      canvas.height = DEFAULT_CANVAS_HEIGHT;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      if (background.type === 'solid-color' && background.color) {
        ctx.fillStyle = background.color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (background.type === 'image' && background.url) {
        const img = await loadImage(background.url);
        
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;
        
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
      }

      const maxTextWidth = canvas.width * 0.85;
      ctx.font = `${settings.fontSize}px ${settings.fontFamily}`;
      const verseLines = wrapText(ctx, settings.verseText, maxTextWidth);
      
      ctx.font = `${settings.fontSize * 0.8}px ${settings.fontFamily}`;
      const referenceLines = wrapText(ctx, settings.verseReference, maxTextWidth);
      
      const lineHeight = settings.fontSize * 1.5;
      const totalTextHeight = (verseLines.length + referenceLines.length + 1) * lineHeight;
      const padding = 40;

      let startY: number;
      switch (settings.textPosition) {
        case 'top':
          startY = canvas.height * 0.15;
          break;
        case 'bottom':
          startY = canvas.height * 0.85 - totalTextHeight;
          break;
        case 'center':
        default:
          startY = (canvas.height - totalTextHeight) / 2;
          break;
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(
        0,
        startY - padding,
        canvas.width,
        totalTextHeight + padding * 2
      );

      ctx.font = `bold ${settings.fontSize}px ${settings.fontFamily}`;
      ctx.fillStyle = settings.textColor;
      ctx.textAlign = 'center';

      if (settings.textShadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
      }

      let currentY = startY;
      
      verseLines.forEach((line) => {
        ctx.fillText(line, canvas.width / 2, currentY);
        currentY += lineHeight;
      });

      currentY += lineHeight * 0.5;
      
      ctx.font = `${settings.fontSize * 0.75}px ${settings.fontFamily}`;
      referenceLines.forEach((line) => {
        ctx.fillText(line, canvas.width / 2, currentY);
        currentY += lineHeight;
      });

      const dataUrl = canvas.toDataURL('image/png', 0.95);
      
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          },
          'image/png',
          0.95
        );
      });

      canvasRef.current = canvas;

      setIsGenerating(false);
      return { dataUrl, blob, settings };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate image';
      setError(message);
      setIsGenerating(false);
      throw err;
    }
  }, [loadImage, wrapText]);

  return {
    generateImage,
    isGenerating,
    error,
    canvasRef: canvasRef.current,
  };
}

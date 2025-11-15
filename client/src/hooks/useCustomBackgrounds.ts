import { useState, useCallback, useRef } from 'react';
import {
  BackgroundImage,
  getCustomBackgrounds,
  saveCustomBackground,
  deleteCustomBackground,
} from '@/config/backgroundImages';

const CANVAS_SIZE = 1080;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB per uploaded file (before resize)

export function useCustomBackgrounds() {
  const [customBackgrounds, setCustomBackgrounds] = useState<BackgroundImage[]>(getCustomBackgrounds());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Always returns a 1080x1080 canvas so all user images match stock sizes
  const getReusableCanvas = useCallback(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
      canvasRef.current.width = CANVAS_SIZE;
      canvasRef.current.height = CANVAS_SIZE;
    }
    return canvasRef.current;
  }, []);

  const processAndResizeImage = useCallback((file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('File must be an image'));
        return;
      }
      if (file.size > MAX_IMAGE_SIZE) {
        reject(new Error('Image must be smaller than 5MB'));
        return;
      }

      const reader = new FileReader();
      const img = new Image();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        img.src = dataUrl;
      };

      img.onload = () => {
        const canvas = getReusableCanvas();
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Center-crop + fill to 1080x1080
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        // JPEG with good quality, smaller size
        const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(resizedDataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);
    });
  }, [getReusableCanvas]);

  const addCustomBackground = useCallback(async (file: File): Promise<BackgroundImage> => {
    const resizedDataUrl = await processAndResizeImage(file);

    const newBackground: BackgroundImage = {
      id: `custom-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      type: 'image',
      url: resizedDataUrl,
      category: 'custom',
    };

    saveCustomBackground(newBackground);
    const updated = getCustomBackgrounds();
    setCustomBackgrounds(updated);

    return newBackground;
  }, [processAndResizeImage]);

  const removeCustomBackground = useCallback((id: string) => {
    deleteCustomBackground(id);
    const updated = getCustomBackgrounds();
    setCustomBackgrounds(updated);
  }, []);

  const refreshCustomBackgrounds = useCallback(() => {
    setCustomBackgrounds(getCustomBackgrounds());
  }, []);

  return {
    customBackgrounds,
    addCustomBackground,
    removeCustomBackground,
    refreshCustomBackgrounds,
  };
}

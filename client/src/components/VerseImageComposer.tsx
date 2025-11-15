import { useEffect, useRef, useState } from "react";

interface VerseImageComposerProps {
  verseText: string;
  reference?: string;
  backgroundUrl: string;
  textColor?: string;
  fontFamily?: string;
  textPosition?: 'top' | 'center' | 'bottom';
  textAlign?: 'left' | 'center' | 'right';
  showTextPanel?: boolean;
  textShadow?: boolean;
  /** user-selected max font size in px (e.g. from a slider) */
  userFontSize?: number;
}

export const VerseImageComposer: React.FC<VerseImageComposerProps> = ({
  verseText,
  reference,
  backgroundUrl,
  textColor = '#FFFFFF',
  fontFamily = 'Crimson Text',
  textPosition = 'center',
  textAlign = 'center',
  showTextPanel = true,
  textShadow = true,
  userFontSize = 32,
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // This is the *actual* font size we apply after fitting
  const [fittedFontSize, setFittedFontSize] = useState(userFontSize);

  // Whenever the verse, image, or user max size changes,
  // recompute a font size that fits inside the box.
  useEffect(() => {
    if (!boxRef.current || !textRef.current) return;

    const box = boxRef.current;
    const textEl = textRef.current;

    // Start from user max font size
    let size = userFontSize;
    textEl.style.fontSize = `${size}px`;
    textEl.style.whiteSpace = "normal";       // allow wrapping
    textEl.style.wordBreak = "break-word";    // prevent long words from overflowing

    // Give browser a layout pass first
    const fits = () =>
      textEl.scrollWidth <= box.clientWidth &&
      textEl.scrollHeight <= box.clientHeight;

    // Shrink until it fits or we hit a minimum size
    while (!fits() && size > 10) {
      size -= 1;
      textEl.style.fontSize = `${size}px`;
    }

    setFittedFontSize(size);
  }, [verseText, backgroundUrl, userFontSize, textPosition, textAlign, showTextPanel]);

  // Position class mapping
  const positionClasses = {
    top: 'justify-start',
    center: 'justify-center',
    bottom: 'justify-end',
  };

  // Text align class mapping
  const alignClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Fixed square aspect ratio (1:1) image + overlay */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-xl bg-black">
        {/* Background image */}
        <img
          src={backgroundUrl}
          alt="Verse background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Optional dark overlay to improve text contrast */}
        {showTextPanel && (
          <div className="absolute inset-0 bg-black/35" />
        )}

        {/* Verse text container: positioned + padded + constrained */}
        <div
          ref={boxRef}
          className={`
            absolute inset-8
            flex flex-col ${alignClasses[textAlign]} ${positionClasses[textPosition]}
          `}
        >
          <div
            ref={textRef}
            style={{ 
              fontSize: `${fittedFontSize}px`,
              color: textColor,
              fontFamily: fontFamily,
              textShadow: textShadow ? '2px 2px 8px rgba(0, 0, 0, 0.7)' : 'none',
            }}
            className={`
              ${alignClasses[textAlign].split(' ')[0]}
              leading-snug
              max-w-[90%]
              whitespace-normal
              break-words
            `}
          >
            {verseText}
          </div>

          {reference && (
            <div 
              style={{ 
                color: textColor,
                textShadow: textShadow ? '2px 2px 8px rgba(0, 0, 0, 0.7)' : 'none',
              }}
              className={`mt-4 opacity-90 text-sm font-semibold ${alignClasses[textAlign].split(' ')[0]}`}
            >
              {reference}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

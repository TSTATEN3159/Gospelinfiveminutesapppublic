import { useTextScale } from "../context/TextScaleContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Type } from "lucide-react";

interface TextSizeControlsProps {
  textSizeLabel?: string;
  textSizeDescription?: string;
  decreaseLabel?: string;
  increaseLabel?: string;
}

export const TextSizeControls: React.FC<TextSizeControlsProps> = ({
  textSizeLabel = "Text Size",
  textSizeDescription = "Adjust text size for better readability",
  decreaseLabel = "Decrease text size",
  increaseLabel = "Increase text size"
}) => {
  const { scale, setScale } = useTextScale();
  
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex-1">
        <Label className="font-medium flex items-center gap-2">
          <Type className="w-4 h-4" />
          {textSizeLabel}
        </Label>
        <p className="text-sm text-muted-foreground">{textSizeDescription}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setScale(scale - 0.1)}
          disabled={scale <= 0.8}
          data-testid="button-decrease-text-size"
          aria-label={decreaseLabel}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-sm font-semibold min-w-[3rem] text-center" data-testid="text-size-percentage">
          {(scale * 100).toFixed(0)}%
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setScale(scale + 0.1)}
          disabled={scale >= 1.6}
          data-testid="button-increase-text-size"
          aria-label={increaseLabel}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

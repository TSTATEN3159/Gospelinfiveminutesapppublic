import {
  BIBLE_VERSIONS,
  BibleVersionCode,
  getInitialBibleVersion,
  setPreferredBibleVersion
} from "@/config/bibleVersions";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface BibleVersionSelectorProps {
  label?: string;
  onChange?: (version: BibleVersionCode) => void;
  value?: BibleVersionCode;
  className?: string;
}

export function BibleVersionSelector({ 
  label = "Bible Version", 
  onChange, 
  value,
  className = ""
}: BibleVersionSelectorProps) {
  const [internalValue, setInternalValue] = useState<BibleVersionCode>(getInitialBibleVersion());

  const current = value ?? internalValue;

  useEffect(() => {
    if (!value) {
      setInternalValue(getInitialBibleVersion());
    }
  }, [value]);

  const handleChange = (v: string) => {
    const code = v as BibleVersionCode;
    if (!value) {
      setInternalValue(code);
      setPreferredBibleVersion(code);
    }
    onChange?.(code);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <Select value={current} onValueChange={handleChange}>
        <SelectTrigger 
          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          data-testid="select-bible-version"
        >
          <SelectValue placeholder="Choose version" />
        </SelectTrigger>
        <SelectContent>
          {BIBLE_VERSIONS.map(v => (
            <SelectItem 
              key={v.code} 
              value={v.code}
              data-testid={`version-${v.code.toLowerCase()}`}
            >
              {v.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

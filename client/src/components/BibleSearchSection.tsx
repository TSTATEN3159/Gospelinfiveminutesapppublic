import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Copy, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import openBibleImage from '@assets/generated_images/Open_used_Bible_pages_5ad97f45.png';

interface SearchResult {
  text: string;
  reference: string;
  version: string;
}

const bibleVersions = [
  { value: "NIV", label: "New International Version (NIV)" },
  { value: "ESV", label: "English Standard Version (ESV)" },
  { value: "NASB", label: "New American Standard Bible (NASB)" },
  { value: "KJV", label: "King James Version (KJV)" },
  { value: "NLT", label: "New Living Translation (NLT)" }
];

// todo: remove mock functionality - replace with real Bible API
const mockSearchResults: Record<string, SearchResult> = {
  "John 3:16": {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    version: "NIV"
  },
  "Psalm 23:1": {
    text: "The Lord is my shepherd, I lack nothing.",
    reference: "Psalm 23:1", 
    version: "NIV"
  },
  "Romans 8:28": {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    version: "NIV"
  }
};

interface BibleSearchSectionProps {
  backgroundImage?: string;
  initialSearchQuery?: string;
  onSearchUsed?: () => void;
}

export default function BibleSearchSection({ backgroundImage, initialSearchQuery, onSearchUsed }: BibleSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("NIV");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const ranInitial = useRef<string | null>(null);

  // Handle initial search query from navigation
  useEffect(() => {
    if (initialSearchQuery && initialSearchQuery.trim() && ranInitial.current !== initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      // Auto-search the initial query immediately
      handleSearch(initialSearchQuery);
      ranInitial.current = initialSearchQuery;
      onSearchUsed?.(); // Clear the search query from parent
    }
  }, [initialSearchQuery]);

  const handleSearch = async (q?: string) => {
    const query = (q ?? searchQuery).trim();
    if (!query) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch('/api/bible-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          version: selectedVersion
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to retrieve Bible text');
      }

      setSearchResult({
        text: data.text,
        reference: data.reference,
        version: data.version
      });

    } catch (error) {
      console.error('Bible search error:', error);
      
      // Fallback to a helpful message if API fails
      setSearchResult({
        text: `Sorry, I'm having trouble retrieving "${query}" right now. Please try again in a moment, or try a different Bible reference like "John 3:16" or "Psalm 23".`,
        reference: query,
        version: selectedVersion
      });
      
      toast({
        title: "Search Error",
        description: "Unable to retrieve Bible text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyVerse = async () => {
    if (!searchResult) return;
    try {
      await navigator.clipboard.writeText(`"${searchResult.text}" - ${searchResult.reference} (${searchResult.version})`);
      toast({
        title: "Verse Copied!",
        description: "The verse has been copied to your clipboard.",
      });
    } catch (err) {
      console.log("Copy failed:", err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card className="relative overflow-hidden min-h-[400px]" data-testid="card-bibleSearch">
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Book className="w-6 h-6 text-chart-3" />
          Bible Search
        </CardTitle>
        <p className="text-muted-foreground">
          Search for any Bible verse by reference (e.g., "John 3:16")
        </p>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Bible Version
            </label>
            <Select value={selectedVersion} onValueChange={setSelectedVersion}>
              <SelectTrigger data-testid="select-version">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bibleVersions.map(version => (
                  <SelectItem key={version.value} value={version.value}>
                    {version.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter verse reference (e.g., John 3:16)"
              className="flex-1"
              data-testid="input-search"
            />
            <Button 
              onClick={() => handleSearch()} 
              disabled={!searchQuery.trim() || isLoading}
              data-testid="button-search"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Searching Scripture...</p>
          </div>
        )}

        {searchResult && !isLoading && (
          <div className="space-y-4 p-6 bg-card rounded-lg border" data-testid="search-result">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{searchResult.reference}</h3>
              <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
                {searchResult.version}
              </span>
            </div>
            
            <blockquote className="text-lg leading-relaxed font-serif italic border-l-4 border-primary pl-4">
              "{searchResult.text}"
            </blockquote>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyVerse}
              data-testid="button-copyVerse"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Verse
            </Button>
          </div>
        )}

        {hasSearched && !searchResult && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No results found. Please check your verse reference and try again.</p>
          </div>
        )}
        
        {/* Open Bible Image at Bottom */}
        <div className="mt-6">
          <div className="relative">
            <img 
              src={openBibleImage}
              alt="Open Bible with worn pages"
              className="w-full h-32 object-cover rounded-lg shadow-md"
              style={{ objectPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
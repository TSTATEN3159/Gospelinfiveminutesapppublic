import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Download, TrendingUp, Globe } from "lucide-react";

export default function LiveInstallCounter() {
  const [installCount, setInstallCount] = useState(127834);
  const [recentInstalls, setRecentInstalls] = useState(0);

  useEffect(() => {
    // Simulate live install counting
    const interval = setInterval(() => {
      // Random increment between 1-5 every 3-8 seconds
      const increment = Math.floor(Math.random() * 5) + 1;
      setInstallCount(prev => prev + increment);
      setRecentInstalls(prev => prev + increment);
    }, Math.random() * 5000 + 3000);

    // Reset recent installs counter every minute
    const resetInterval = setInterval(() => {
      setRecentInstalls(0);
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(resetInterval);
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white border-0 shadow-lg">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <Globe className="w-5 h-5 animate-pulse" />
            <h3 className="font-bold text-lg">Global Installs</h3>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold bg-white/20 rounded-lg px-3 py-1 mb-1">
                {formatNumber(installCount)}
              </div>
              <p className="text-xs opacity-90">Total Downloads</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-green-300" />
                <span className="text-lg font-bold text-green-300">
                  +{recentInstalls}
                </span>
              </div>
              <p className="text-xs opacity-90">This Minute</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-1 mt-3 text-xs opacity-90">
            <Download className="w-3 h-3 animate-bounce" />
            <span>Spreading God's word worldwide</span>
          </div>
          
          {/* Animated dots for live effect */}
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
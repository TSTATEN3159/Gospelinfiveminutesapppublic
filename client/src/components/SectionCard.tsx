import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SectionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  backgroundImage?: string;
  gradientFrom: string;
  gradientTo: string;
  onClick: () => void;
  testId: string;
}

export default function SectionCard({
  title,
  description,
  icon: Icon,
  backgroundImage,
  gradientFrom,
  gradientTo,
  onClick,
  testId
}: SectionCardProps) {
  return (
    <Card 
      className="relative overflow-hidden min-h-[200px] cursor-pointer hover-elevate transition-all duration-200"
      onClick={onClick}
      data-testid={testId}
    >
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-80`}
      />
      
      <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
        <div className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Icon className="w-6 h-6" />
          </div>
          
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm leading-relaxed opacity-90">{description}</p>
        </div>

        <Button 
          variant="outline" 
          className="mt-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          Open {title}
        </Button>
      </CardContent>
    </Card>
  );
}
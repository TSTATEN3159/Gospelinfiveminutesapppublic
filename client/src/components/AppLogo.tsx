import logoImage from '@assets/Professional Logo pure white with TM_1760472370422.png';

interface AppLogoProps {
  onNavigate?: (page: string, searchQuery?: string) => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function AppLogo({ onNavigate, size = 'medium', className = '' }: AppLogoProps) {
  const sizeClasses = {
    small: 'w-48 h-48',
    medium: 'w-64 h-64',
    large: 'w-80 h-80'
  };

  const handleClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div 
      className={`w-full flex flex-col items-center ${className}`}
    >
      <div
        className="cursor-pointer transition-transform duration-200 hover:scale-105 border-2 border-gray-300/40 p-2 rounded-lg"
        onClick={handleClick}
        data-testid="logo-app"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label="The Gospel in 5 Minutes - Return to home page"
      >
        <img 
          src={logoImage} 
          alt="The Gospel in 5 Minutes - Golden clock with cross and trademark logo" 
          className={`${sizeClasses[size]} object-contain opacity-90`}
        />
      </div>
      {/* Subtle separator line */}
      <div className="w-32 h-px bg-gray-200/50 mt-4"></div>
    </div>
  );
}

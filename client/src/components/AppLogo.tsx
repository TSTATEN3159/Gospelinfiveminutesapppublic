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
      className={`w-full flex justify-center cursor-pointer transition-transform duration-200 hover:scale-105 ${className}`}
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
  );
}

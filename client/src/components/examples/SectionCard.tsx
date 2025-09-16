import SectionCard from '../SectionCard';
import { Heart } from 'lucide-react';
import handsImage from '@assets/generated_images/Caring_hands_emotional_support_20faad6c.png';

export default function SectionCardExample() {
  return (
    <SectionCard
      title="Feelings & Scripture"
      description="Find Bible verses that speak to your heart based on how you're feeling today"
      icon={Heart}
      backgroundImage={handsImage}
      gradientFrom="from-green-400"
      gradientTo="to-blue-500"
      onClick={() => console.log('Feelings & Scripture section clicked')}
      testId="card-feelings"
    />
  );
}
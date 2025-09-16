import EmotionScriptureSection from "../components/EmotionScriptureSection";
import handsImage from '@assets/generated_images/Caring_hands_emotional_support_20faad6c.png';

export default function BiblePage() {
  return (
    <div className="pb-20 px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Feelings & Scripture</h1>
        <p className="text-muted-foreground mt-2">Find Bible verses that speak to your heart</p>
      </div>

      <div className="max-w-md mx-auto">
        <EmotionScriptureSection backgroundImage={handsImage} />
      </div>
    </div>
  );
}
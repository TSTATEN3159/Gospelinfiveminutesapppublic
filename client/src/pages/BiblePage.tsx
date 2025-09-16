import AskPastorSection from "../components/AskPastorSection";
import EmotionScriptureSection from "../components/EmotionScriptureSection";
import shepherdImage from '@assets/generated_images/Peaceful_pastoral_shepherd_scene_d43b4770.png';
import handsImage from '@assets/generated_images/Caring_hands_emotional_support_20faad6c.png';

export default function AskPage() {
  return (
    <div className="pb-20 px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Ask the Pastor</h1>
        <p className="text-muted-foreground mt-2">Get Scripture-based guidance and emotional support</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Ask Pastor Section */}
        <div className="relative bg-card rounded-lg p-4 border shadow-sm">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
            style={{ backgroundImage: `url(${shepherdImage})` }}
          />
          <div className="relative z-10">
            <AskPastorSection backgroundImage={shepherdImage} />
          </div>
        </div>

        {/* Feelings & Scripture Section */}
        <div className="relative bg-card rounded-lg p-4 border shadow-sm">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 rounded-lg"
            style={{ backgroundImage: `url(${handsImage})` }}
          />
          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-primary mb-4">Feelings & Scripture</h2>
            <EmotionScriptureSection backgroundImage={handsImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
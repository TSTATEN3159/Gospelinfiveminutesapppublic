import BibleSearchSection from "../components/BibleSearchSection";
import bibleImage from '@assets/generated_images/Open_Bible_study_scene_e3a19a6e.png';

export default function SearchPage() {
  return (
    <div className="pb-20 px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Bible Search</h1>
        <p className="text-muted-foreground mt-2">Search for any Bible verse by reference</p>
      </div>

      <div className="max-w-md mx-auto">
        <BibleSearchSection backgroundImage={bibleImage} />
      </div>
    </div>
  );
}
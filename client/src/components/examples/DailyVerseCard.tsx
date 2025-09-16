import DailyVerseCard from '../DailyVerseCard';
import sunriseImage from '@assets/generated_images/Peaceful_sunrise_daily_verse_e2a3184e.png';

export default function DailyVerseCardExample() {
  const mockVerse = {
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11",
    chapter: "29",
    book: "Jeremiah"
  };

  return (
    <DailyVerseCard verse={mockVerse} backgroundImage={sunriseImage} />
  );
}
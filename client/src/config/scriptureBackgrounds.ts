// Curated spiritual backgrounds for Scripture Image Generator
import mountainPeak from '@assets/stock_images/brown_rocky_moun_a92bc14c.jpg';
import snowyMountain1 from '@assets/stock_images/snow_capped_moun_b8a2b14c.jpg';
import snowyMountain2 from '@assets/stock_images/snow_capped_moun_80b0a04d.jpg';
import oceanWaves from '@assets/stock_images/waves_of_body_o_ab801b4e.jpg';
import stormClouds from '@assets/stock_images/gray_clouds_ea809b4f.jpg';
import blueSky from '@assets/stock_images/blue_sky_36a38e4c.jpg';
import woodenBridge from '@assets/stock_images/wooden_bridge_ac920a4d.jpg';
import lakeReflection from '@assets/stock_images/reflection_of_mo_a1931f4d.jpg';
import boatShore from '@assets/stock_images/boat_on_sea_shor_aaa36e4d.jpg';
import sandyBeach from '@assets/stock_images/scenic_photo_of__a49aa94e.jpg';
import sunrise from '@assets/stock_images/sunrise_bfa02b4c.jpg';
import sunset from '@assets/stock_images/sunset_8fa3b94e.jpg';
import mountainSummit from '@assets/stock_images/aerial_view_of_r_1a72c04f.jpg';
import mountainValley from '@assets/stock_images/aerial_photograp_e992124f.jpg';
import forestSunlight from '@assets/stock_images/brown_and_green__aba2a04c.jpg';
import starryNight from '@assets/stock_images/blue_and_purple__79a42f4e.jpg';
import goldenLight from '@assets/stock_images/golden_sun_09a79c4d.jpg';
import crossSilhouette from '@assets/stock_images/silhouette_of_cr_7b8ede4e.jpg';
import abstractLightRays from '@assets/stock_images/abstract_paintin_80a2d54e.jpg';
import openBible from '@assets/stock_images/open_bible_on_a__fb901a4f.jpg';

export interface ScriptureBackground {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'spiritual' | 'nature' | 'water' | 'sky' | 'solid';
}

export const SCRIPTURE_BACKGROUNDS: ScriptureBackground[] = [
  // Spiritual
  {
    id: "cross-silhouette",
    name: "Cross Silhouette",
    description: "Peaceful cross at sunset",
    imageUrl: crossSilhouette,
    category: 'spiritual'
  },
  {
    id: "open-bible",
    name: "Open Bible",
    description: "Scripture study inspiration",
    imageUrl: openBible,
    category: 'spiritual'
  },
  {
    id: "golden-light",
    name: "Golden Light",
    description: "Divine golden rays",
    imageUrl: goldenLight,
    category: 'spiritual'
  },
  {
    id: "abstract-light-rays",
    name: "Light Rays",
    description: "Heavenly light breaking through",
    imageUrl: abstractLightRays,
    category: 'spiritual'
  },
  
  // Nature
  {
    id: "mountain-summit",
    name: "Mountain Summit",
    description: "Majestic mountain peak",
    imageUrl: mountainSummit,
    category: 'nature'
  },
  {
    id: "mountain-peak",
    name: "Rocky Mountain",
    description: "Towering mountain landscape",
    imageUrl: mountainPeak,
    category: 'nature'
  },
  {
    id: "snowy-mountain-1",
    name: "Snowy Peak",
    description: "Snow-capped mountain majesty",
    imageUrl: snowyMountain1,
    category: 'nature'
  },
  {
    id: "mountain-valley",
    name: "Mountain Valley",
    description: "Peaceful valley vista",
    imageUrl: mountainValley,
    category: 'nature'
  },
  {
    id: "forest-sunlight",
    name: "Forest Sunlight",
    description: "Sun filtering through trees",
    imageUrl: forestSunlight,
    category: 'nature'
  },
  {
    id: "wooden-bridge",
    name: "Forest Bridge",
    description: "Serene wooden path",
    imageUrl: woodenBridge,
    category: 'nature'
  },
  
  // Water
  {
    id: "ocean-waves",
    name: "Ocean Waves",
    description: "Peaceful rolling waves",
    imageUrl: oceanWaves,
    category: 'water'
  },
  {
    id: "lake-reflection",
    name: "Lake Reflection",
    description: "Mirror-like mountain lake",
    imageUrl: lakeReflection,
    category: 'water'
  },
  {
    id: "boat-shore",
    name: "Peaceful Shore",
    description: "Boat resting at shoreline",
    imageUrl: boatShore,
    category: 'water'
  },
  {
    id: "sandy-beach",
    name: "Sandy Beach",
    description: "Tranquil beach scene",
    imageUrl: sandyBeach,
    category: 'water'
  },
  
  // Sky
  {
    id: "sunrise",
    name: "Sunrise",
    description: "New day breaking",
    imageUrl: sunrise,
    category: 'sky'
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Golden evening glow",
    imageUrl: sunset,
    category: 'sky'
  },
  {
    id: "blue-sky",
    name: "Blue Sky",
    description: "Clear peaceful sky",
    imageUrl: blueSky,
    category: 'sky'
  },
  {
    id: "storm-clouds",
    name: "Storm Clouds",
    description: "Dramatic cloud formation",
    imageUrl: stormClouds,
    category: 'sky'
  },
  {
    id: "starry-night",
    name: "Starry Night",
    description: "Celestial wonder",
    imageUrl: starryNight,
    category: 'sky'
  },
];

export const getBackgroundById = (id: string): ScriptureBackground | undefined => {
  return SCRIPTURE_BACKGROUNDS.find(bg => bg.id === id);
};

export const getBackgroundsByCategory = (category: ScriptureBackground['category']): ScriptureBackground[] => {
  return SCRIPTURE_BACKGROUNDS.filter(bg => bg.category === category);
};

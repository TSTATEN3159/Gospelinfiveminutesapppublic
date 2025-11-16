// Curated spiritual backgrounds for Scripture Image Generator
import mountainPeak from '@assets/stock_images/majestic_mountain_pe_d088efcc.jpg';
import oceanWaves from '@assets/stock_images/tranquil_ocean_waves_c3c35b7f.jpg';
import stormClouds from '@assets/stock_images/dramatic_storm_cloud_d3bb5316.jpg';
import blueSky from '@assets/stock_images/beautiful_clear_blue_89ac8bb4.jpg';
import woodenBridge from '@assets/stock_images/wooden_bridge_path_t_ecc31eea.jpg';
import lakeReflection from '@assets/stock_images/serene_lake_reflecti_d14b27e0.jpg';
import boatShore from '@assets/stock_images/wooden_boat_with_oar_5dc2f445.jpg';
import sandyBeach from '@assets/stock_images/sandy_beach_footprin_ad372992.jpg';
import sunrise from '@assets/stock_images/beautiful_sunrise_go_5ee50391.jpg';
import sunset from '@assets/stock_images/stunning_sunset_vibr_a5edf99b.jpg';
import mountainSummit from '@assets/stock_images/mountain_peak_summit_c98b8f8a.jpg';
import starryNight from '@assets/stock_images/starry_night_sky_mil_683d695c.jpg';
import snowyMountain1 from '@assets/stock_images/snowy_mountain_peaks_90b9d8c2.jpg';
import cross from '@assets/stock_images/cross_silhouette_sun_9382d340.jpg';
import woodenCross from '@assets/stock_images/wooden_cross_sunset__ea9ca9d4.jpg';
import christianCross from '@assets/stock_images/christian_cross_dram_c4edf2b4.jpg';
import prayerHands from '@assets/stock_images/peaceful_prayer_hand_0c8506a2.jpg';
import forestGoldenLight from '@assets/stock_images/forest_golden_sunlig_d1e56134.jpg';
import heavenlyClouds from '@assets/stock_images/dramatic_sun_rays_br_2ba02acd.jpg';
import oceanSunrise from '@assets/stock_images/calm_ocean_sunrise_r_dd965e19.jpg';
import mountainMist from '@assets/stock_images/mountain_peaks_morni_5fadbac9.jpg';
import abstractLightRays from '@assets/stock_images/abstract_light_rays__4bf3f8b3.jpg';
import openBible from '@assets/stock_images/open_bible_pages_hol_ec935652.jpg';

export interface ScriptureBackground {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'spiritual' | 'nature' | 'water' | 'sky';
}

export const SCRIPTURE_BACKGROUNDS: ScriptureBackground[] = [
  // Spiritual
  {
    id: "cross",
    name: "Cross at Sunset",
    description: "Peaceful cross silhouette",
    imageUrl: cross,
    category: 'spiritual'
  },
  {
    id: "wooden-cross",
    name: "Wooden Cross",
    description: "Rustic wooden cross",
    imageUrl: woodenCross,
    category: 'spiritual'
  },
  {
    id: "christian-cross",
    name: "Christian Cross",
    description: "Dramatic cross scene",
    imageUrl: christianCross,
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
    id: "prayer-hands",
    name: "Prayer Hands",
    description: "Peaceful prayer moment",
    imageUrl: prayerHands,
    category: 'spiritual'
  },
  {
    id: "heavenly-clouds",
    name: "Heavenly Clouds",
    description: "Divine light breaking through",
    imageUrl: heavenlyClouds,
    category: 'spiritual'
  },
  {
    id: "abstract-light-rays",
    name: "Light Rays",
    description: "Abstract heavenly light",
    imageUrl: abstractLightRays,
    category: 'spiritual'
  },
  {
    id: "ocean-sunrise-spiritual",
    name: "Ocean Sunrise",
    description: "Peaceful ocean dawn",
    imageUrl: oceanSunrise,
    category: 'spiritual'
  },
  {
    id: "mountain-mist",
    name: "Mountain Mist",
    description: "Misty mountain peaks",
    imageUrl: mountainMist,
    category: 'spiritual'
  },
  {
    id: "forest-golden-light",
    name: "Forest Light",
    description: "Golden forest sunlight",
    imageUrl: forestGoldenLight,
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

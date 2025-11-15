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
import northernLights from '@assets/stock_images/northern_lights_auro_5fc8e95b.jpg';
import waterfall from '@assets/stock_images/powerful_waterfall_m_9c765487.jpg';
import desert from '@assets/stock_images/vast_desert_sand_dun_acd9083e.jpg';
import sunRays from '@assets/stock_images/bright_sun_rays_shin_8ba6f09d.jpg';
import rainbow from '@assets/stock_images/rainbow_after_storm__09a5138b.jpg';
import greenValley from '@assets/stock_images/lush_green_valley_mo_bd7303e6.jpg';
import eagle from '@assets/stock_images/majestic_eagle_soari_7a8606d5.jpg';
import wheatField from '@assets/stock_images/wheat_field_golden_h_fa612f71.jpg';
import cross from '@assets/stock_images/cross_silhouette_sun_9382d340.jpg';
import snowyMountain1 from '@assets/stock_images/snowy_mountain_peaks_90b9d8c2.jpg';
import snowyMountain2 from '@assets/stock_images/snowy_mountain_peaks_25a05d00.jpg';
import woodenCross from '@assets/stock_images/wooden_cross_sunset__ea9ca9d4.jpg';
import christianCross from '@assets/stock_images/christian_cross_dram_c4edf2b4.jpg';
import familyWalking from '@assets/stock_images/family_holding_hands_e0106914.jpg';
import prayerHands from '@assets/stock_images/peaceful_prayer_hand_0c8506a2.jpg';
import forestGoldenLight from '@assets/stock_images/forest_golden_sunlig_d1e56134.jpg';
import heavenlyClouds from '@assets/stock_images/dramatic_sun_rays_br_2ba02acd.jpg';
import oceanSunrise from '@assets/stock_images/calm_ocean_sunrise_r_dd965e19.jpg';
import mountainMist from '@assets/stock_images/mountain_peaks_morni_5fadbac9.jpg';
import abstractLightRays from '@assets/stock_images/abstract_light_rays__4bf3f8b3.jpg';
import openBible from '@assets/stock_images/open_bible_pages_hol_ec935652.jpg';

export type BackgroundType = 'image' | 'solid-color';

export interface BackgroundImage {
  id: string;
  name: string;
  type: BackgroundType;
  url?: string;
  color?: string;
  category: 'nature' | 'water' | 'sky' | 'spiritual' | 'solid' | 'custom';
}

export const SOLID_COLORS: BackgroundImage[] = [
  { id: 'royal-blue', name: 'Royal Blue', type: 'solid-color', color: '#4169E1', category: 'solid' },
  { id: 'deep-purple', name: 'Deep Purple', type: 'solid-color', color: '#673AB7', category: 'solid' },
  { id: 'crimson', name: 'Crimson', type: 'solid-color', color: '#DC143C', category: 'solid' },
  { id: 'forest-green', name: 'Forest Green', type: 'solid-color', color: '#228B22', category: 'solid' },
  { id: 'golden', name: 'Golden', type: 'solid-color', color: '#FFD700', category: 'solid' },
  { id: 'coral', name: 'Coral', type: 'solid-color', color: '#FF7F50', category: 'solid' },
  { id: 'rose', name: 'Rose', type: 'solid-color', color: '#FF69B4', category: 'solid' },
  { id: 'teal', name: 'Teal', type: 'solid-color', color: '#008080', category: 'solid' },
  { id: 'navy', name: 'Navy', type: 'solid-color', color: '#000080', category: 'solid' },
  { id: 'burgundy', name: 'Burgundy', type: 'solid-color', color: '#800020', category: 'solid' },
];

export const BACKGROUND_IMAGES: BackgroundImage[] = [
  { id: 'mountain-peak', name: 'Mountain Peak', type: 'image', url: mountainPeak, category: 'nature' },
  { id: 'snowy-mountain-1', name: 'Snowy Mountain Peak', type: 'image', url: snowyMountain1, category: 'nature' },
  { id: 'snowy-mountain-2', name: 'Snowy Summit', type: 'image', url: snowyMountain2, category: 'nature' },
  { id: 'ocean-waves', name: 'Ocean Waves', type: 'image', url: oceanWaves, category: 'water' },
  { id: 'storm-clouds', name: 'Storm Clouds', type: 'image', url: stormClouds, category: 'sky' },
  { id: 'blue-sky', name: 'Blue Sky', type: 'image', url: blueSky, category: 'sky' },
  { id: 'wooden-bridge', name: 'Forest Bridge', type: 'image', url: woodenBridge, category: 'nature' },
  { id: 'lake-reflection', name: 'Lake Reflection', type: 'image', url: lakeReflection, category: 'water' },
  { id: 'boat-shore', name: 'Boat at Shore', type: 'image', url: boatShore, category: 'water' },
  { id: 'sandy-beach', name: 'Sandy Beach', type: 'image', url: sandyBeach, category: 'water' },
  { id: 'sunrise', name: 'Sunrise', type: 'image', url: sunrise, category: 'sky' },
  { id: 'sunset', name: 'Sunset', type: 'image', url: sunset, category: 'sky' },
  { id: 'mountain-summit', name: 'Mountain Summit', type: 'image', url: mountainSummit, category: 'nature' },
  { id: 'starry-night', name: 'Starry Night', type: 'image', url: starryNight, category: 'sky' },
  { id: 'northern-lights', name: 'Northern Lights', type: 'image', url: northernLights, category: 'sky' },
  { id: 'waterfall', name: 'Waterfall', type: 'image', url: waterfall, category: 'water' },
  { id: 'desert', name: 'Desert Dunes', type: 'image', url: desert, category: 'nature' },
  { id: 'sun-rays', name: 'Sun Rays', type: 'image', url: sunRays, category: 'sky' },
  { id: 'rainbow', name: 'Rainbow', type: 'image', url: rainbow, category: 'spiritual' },
  { id: 'green-valley', name: 'Green Valley', type: 'image', url: greenValley, category: 'nature' },
  { id: 'eagle', name: 'Soaring Eagle', type: 'image', url: eagle, category: 'spiritual' },
  { id: 'wheat-field', name: 'Wheat Field', type: 'image', url: wheatField, category: 'nature' },
  { id: 'cross', name: 'Cross at Sunset', type: 'image', url: cross, category: 'spiritual' },
  { id: 'wooden-cross', name: 'Wooden Cross', type: 'image', url: woodenCross, category: 'spiritual' },
  { id: 'christian-cross', name: 'Christian Cross', type: 'image', url: christianCross, category: 'spiritual' },
  { id: 'family-walking', name: 'Family Together', type: 'image', url: familyWalking, category: 'spiritual' },
  { id: 'prayer-hands', name: 'Prayer Hands', type: 'image', url: prayerHands, category: 'spiritual' },
  { id: 'forest-golden-light', name: 'Forest Golden Light', type: 'image', url: forestGoldenLight, category: 'spiritual' },
  { id: 'heavenly-clouds', name: 'Heavenly Clouds', type: 'image', url: heavenlyClouds, category: 'spiritual' },
  { id: 'ocean-sunrise-spiritual', name: 'Ocean Sunrise', type: 'image', url: oceanSunrise, category: 'spiritual' },
  { id: 'mountain-mist', name: 'Mountain Mist', type: 'image', url: mountainMist, category: 'spiritual' },
  { id: 'abstract-light-rays', name: 'Abstract Light', type: 'image', url: abstractLightRays, category: 'spiritual' },
  { id: 'open-bible', name: 'Open Bible', type: 'image', url: openBible, category: 'spiritual' },
  ...SOLID_COLORS,
];

export const getBackgroundById = (id: string): BackgroundImage | undefined => {
  const standardBg = BACKGROUND_IMAGES.find(bg => bg.id === id);
  if (standardBg) return standardBg;
  
  const customBgs = getCustomBackgrounds();
  return customBgs.find(bg => bg.id === id);
};

export const getBackgroundsByCategory = (category: BackgroundImage['category']): BackgroundImage[] => {
  return BACKGROUND_IMAGES.filter(bg => bg.category === category);
};

const MAX_CUSTOM_IMAGES = 10;
const MAX_TOTAL_SIZE_MB = 3.5;

export const getCustomBackgrounds = (): BackgroundImage[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('customBackgrounds');
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveCustomBackground = (image: BackgroundImage): void => {
  if (typeof window === 'undefined') throw new Error('Storage unavailable');
  
  const customs = getCustomBackgrounds();
  
  if (customs.length >= MAX_CUSTOM_IMAGES) {
    throw new Error(`Maximum ${MAX_CUSTOM_IMAGES} custom images allowed`);
  }
  
  const newData = JSON.stringify([...customs, image]);
  const sizeInMB = new Blob([newData]).size / (1024 * 1024);
  
  if (sizeInMB > MAX_TOTAL_SIZE_MB) {
    throw new Error(`Total image storage exceeds ${MAX_TOTAL_SIZE_MB}MB limit`);
  }
  
  try {
    localStorage.setItem('customBackgrounds', newData);
  } catch (e) {
    throw new Error('Storage quota exceeded - please delete some images');
  }
};

export const deleteCustomBackground = (id: string): void => {
  if (typeof window === 'undefined') return;
  const customs = getCustomBackgrounds().filter(bg => bg.id !== id);
  localStorage.setItem('customBackgrounds', JSON.stringify(customs));
};

import stealthGrey from '../assets/model-y-stealth-grey.jpg';
import stealthGreyPerformance from '../assets/model-y-stealth-grey-performance.jpg';
import pearlWhite from '../assets/model-y-pearl-white.jpg';
import pearlWhitePerformance from '../assets/model-y-pearl-white-performance.jpg';
import deepBlue from '../assets/model-y-deep-blue-metallic.jpg';
import deepBluePerformance from '../assets/model-y-deep-blue-metallic-performance.jpg';
import solidBlack from '../assets/model-y-solid-black.jpg';
import solidBlackPerformance from '../assets/model-y-solid-black-performance.jpg';
import ultraRed from '../assets/model-y-ultra-red.jpg';
import ultraRedPerformance from '../assets/model-y-ultra-red-performance.jpg';
import quicksilver from '../assets/model-y-quicksilver.jpg';
import quicksilverPerformance from '../assets/model-y-quicksilver-performance.jpg';

import interiorDark from '../assets/model-y-interior-dark.jpg';
import interiorLight from '../assets/model-y-interior-light.jpg';

import stealthGreyBtn from '../assets/button-stealth-grey.avif';
import pearlWhiteBtn from '../assets/button-pearl-white.avif';
import deepBlueBtn from '../assets/button-deep-blue-metallic.avif';
import solidBlackBtn from '../assets/button-solid-black.avif';
import ultraRedBtn from '../assets/button-ultra-red.avif';
import quicksilverBtn from '../assets/button-quicksilver.avif';
import darkInteriorBtn from '../assets/button-dark.avif';
import lightInteriorBtn from '../assets/button-light.avif';

export const exteriorImages = {
  'Stealth Grey': { normal: stealthGrey, performance: stealthGreyPerformance, button: stealthGreyBtn },
  'Pearl White': { normal: pearlWhite, performance: pearlWhitePerformance, button: pearlWhiteBtn },
  'Deep Blue': { normal: deepBlue, performance: deepBluePerformance, button: deepBlueBtn },
  'Solid Black': { normal: solidBlack, performance: solidBlackPerformance, button: solidBlackBtn },
  'Ultra Red': { normal: ultraRed, performance: ultraRedPerformance, button: ultraRedBtn },
  'Quicksilver': { normal: quicksilver, performance: quicksilverPerformance, button: quicksilverBtn },
};

export const interiorImages = {
  Dark: { preview: darkInteriorBtn, image: interiorDark },
  Light: { preview: lightInteriorBtn, image: interiorLight },
};
import React, { useContext } from 'react';
import PricingContext from '../utils/pricingContext';
import { exteriorImages, interiorImages } from '../utils/imagePaths';

const ImageDisplay = () => {
  const { selectedColor, selectedInterior, selectedOptions } = useContext(PricingContext);
  const colorData = exteriorImages[selectedColor] || exteriorImages['Stealth Grey'];
  const exteriorImageSrc = selectedOptions['Performance Wheels'] ? colorData.performance : colorData.normal;
  const interiorImageSrc = interiorImages[selectedInterior].image;

  return (
    <div className="sticky top-24">
      <div className="h-96 bg-gray-200 flex items-center justify-center mb-4">
        <img src={exteriorImageSrc} alt="Exterior" className="max-w-full h-auto object-contain" />
      </div>
      <div className="h-96 bg-gray-200 flex items-center justify-center mb-4">
        <img src={interiorImageSrc} alt="Interior" className="max-w-full h-auto object-contain" />
      </div>
    </div>
  );
};

export default ImageDisplay;
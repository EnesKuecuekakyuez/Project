import React, { useContext } from 'react';
import PricingContext from '../utils/pricingContext';
import { exteriorImages, interiorImages } from '../utils/imagePaths';
import { pricing } from '../utils/pricing';

const ConfigPanel = () => {
  const {
    selectedColor,
    setSelectedColor,
    selectedInterior,
    setSelectedInterior,
    selectedOptions,
    setSelectedOptions,
    accessories,
    setAccessories,
    totalPrice,
    downPayment,
    monthlyPayment,
  } = useContext(PricingContext);

  const toggleOption = (key) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAccessory = (label) => {
    setAccessories((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="w-full md:w-1/3 pl-8">
      <h1 className="text-5xl text-center font-bold mb-5">Model Y</h1>
      <h2 className="text-xl text-center font-light">Customize Your Car</h2>

      {/* Exterior */}
      <div className="my-8">
        <h3 className="font-semibold mb-2">Exterior Color</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(exteriorImages).map(([color, data]) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
            >
              <img src={data.button} alt={color} className="w-20 h-12 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Interior */}
      <div className="my-8">
        <h3 className="font-semibold mb-2">Interior Color</h3>
        <div className="flex gap-4">
          {Object.entries(interiorImages).map(([label, data]) => (
            <button
              key={label}
              onClick={() => setSelectedInterior(label)}
              className={`transition-transform hover:scale-110 ${selectedInterior === label ? 'ring-2 ring-black' : ''}`}
            >
              <img src={data.preview} alt={label} className="w-12" />
            </button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">Wheels</h3>
        <button
          className={`w-full py-4 mb-2 rounded-lg ${selectedOptions['Performance Wheels'] ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
          onClick={() => toggleOption('Performance Wheels')}
        >
          Performance Wheels (+$2,500)
        </button>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Performance Package</h3>
        <button
          className={`w-full py-4 rounded-lg ${selectedOptions['Performance Package'] ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
          onClick={() => toggleOption('Performance Package')}
        >
          Add Performance Package (+$5,000)
        </button>
      </div>

      <div className="border p-4 mb-8 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Full Self-Driving</h3>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={selectedOptions['Full Self-Driving']}
            onChange={() => toggleOption('Full Self-Driving')}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Add Full Self-Driving for $8,500</span>
        </label>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold mb-2">Accessories</h3>
        {Object.entries(pricing.Accessories).map(([label, price]) => (
          <label key={label} className="flex items-center space-x-3 mb-2">
            <input
              type="checkbox"
              checked={accessories[label] || false}
              onChange={() => toggleAccessory(label)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{label} (+${price})</span>
          </label>
        ))}
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="font-bold text-xl mb-2">Total: ${totalPrice.toLocaleString()}</h3>
        <p>Down Payment (10%): ${downPayment.toLocaleString()}</p>
        <p>Monthly Payment: ${monthlyPayment.toLocaleString()}</p>
      </div>
    </aside>
  );
};

export default ConfigPanel;
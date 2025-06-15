import React, { useState, useEffect } from 'react';
import PricingContext from '../utils/pricingContext';
import ImageDisplay from '../components/imageDisplay';
import ConfigPanel from '../components/ConfigPanel';
import { pricing } from '../utils/pricing';
import '../styles/App.css';

const Configurator = () => {
  const [selectedColor, setSelectedColor] = useState('Stealth Grey');
  const [selectedInterior, setSelectedInterior] = useState('Dark');
  const [selectedOptions, setSelectedOptions] = useState({
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
  });
  const [accessories, setAccessories] = useState({});
  const [totalPrice, setTotalPrice] = useState(pricing.base);
  const [downPayment, setDownPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    let total = pricing.base;
    Object.entries(selectedOptions).forEach(([key, value]) => {
      if (value) total += pricing[key];
    });
    Object.entries(accessories).forEach(([label, isSelected]) => {
      if (isSelected) total += pricing.Accessories[label];
    });

    setTotalPrice(total);
    const down = total * 0.1;
    setDownPayment(down);
    const loan = total - down;
    const monthlyInterest = 0.03 / 12;
    const months = 60;
    const monthly = (loan * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
                    (Math.pow(1 + monthlyInterest, months) - 1);
    setMonthlyPayment(monthly);
  }, [selectedOptions, accessories]);

  return (
    <PricingContext.Provider
      value={{
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
      }}
    >
      <div className="min-h-screen bg-white">
        <main className="flex flex-col md:flex-row px-4 md:px-10 py-6 pt-28">
          <section className="w-full md:w-3/4">
            <ImageDisplay />
          </section>
          <ConfigPanel />
        </main>
      </div>
    </PricingContext.Provider>
  );
};

export default Configurator;

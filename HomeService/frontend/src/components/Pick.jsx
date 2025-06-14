import React, { useState } from 'react';
export default function HoverSplitLayout() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full h-[60vh] flex overflow-hidden pt-20">
      <div
        className={`transition-all duration-500 flex items-center justify-center text-white text-3xl font-bold cursor-pointer bg-cover bg-center 
          ${hovered === 'left' ? 'w-3/4' : hovered === 'right' ? 'w-1/4' : 'w-1/2'}`}
        onMouseEnter={() => setHovered('left')}
        onMouseLeave={() => setHovered(null)}
        style={{ backgroundImage: `url('/bild1.png')` }}
      >
        Konfigurator
      </div>
      <div
        className={`transition-all duration-500 flex items-center justify-center text-white text-3xl font-bold cursor-pointer bg-cover bg-center 
          ${hovered === 'right' ? 'w-3/4' : hovered === 'left' ? 'w-1/4' : 'w-1/2'}`}
        onMouseEnter={() => setHovered('right')}
        onMouseLeave={() => setHovered(null)}
        style={{ backgroundImage: `url('/bild2.png')` }}
      >
        Merchandise Shop
      </div>
    </div>
  );
}
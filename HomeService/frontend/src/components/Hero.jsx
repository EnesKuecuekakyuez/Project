import React, { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative flex items-center justify-center w-100vh h-100vh top-20 bg-white">
      <div className=" relative w-[80vw] h-[90vh]">
      <video
       autoPlay
        loop
        muted
        ref={videoRef}
        className="w-full h-full object-cover rounded-2xl shadow-xl"
        poster="/b517515e-3d72-4c2a-b86c-925a922029a6.png"
      >
        <source
          /*src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"*/
          src="vid2.mp4"
          type="video/mp4"
        />
        Dein Browser unterstützt dieses Video-Format nicht.
      </video>

      {/* Play/Pause Button unten rechts im Video */}
      <button
        onClick={togglePlay}
        className="absolute text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition"
        style={{
          bottom: "1.5rem",
          right: "2rem",
        }}
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </button>
      </div>
    </div>
  );
};

export default Hero;
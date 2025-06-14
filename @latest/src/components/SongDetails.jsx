import React, { useEffect, useRef, useState } from 'react'
import useMusicStore from '../store/useMusicStore';

const SongDetails = () => {
  const {currentSongIndex,musicLists,isPlaying} =  useMusicStore()

  const diskRef = useRef(null); 

  const currentSong = musicLists[currentSongIndex];


  const [rotation, setRotation] = useState(0);

  
  useEffect(() => {
    let animationId;

    const animateDisk = () => {
      setRotation((prevRotation) => (prevRotation + 0.5) % 360); 
      animationId = requestAnimationFrame(animateDisk);
    };

    if (isPlaying) {
      animationId = requestAnimationFrame(animateDisk);
    } else {
      cancelAnimationFrame(animationId);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);


  return (
    <div className="flex flex-col items-center">
     
      <div className="relative w-36 h-36 rounded-full">
        
        <img
          src={currentSong.img}
          alt={currentSong.title}
          ref={diskRef}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
          className="absolute w-full h-full object-cover object-center z-20 rounded-full"
        />
        <div
          className={`absolute top-[-5%] left-[-5%] rounded-full glow-ring w-[110%] h-[110%] bg-gradient-to-r from-green-300 to-blue-400 opacity-30 ${
            isPlaying ? "animate-pulse" : "animate-none"
          }`}
        />
      </div>

      <div className="text-center my-5">
        <h2 className="text-xl font-bold text-white"> {currentSong.title} </h2>
        <p className="text-gray-400">{currentSong.artist}</p>
      </div>
    </div>
  );
}

export default SongDetails

import React, { useEffect, useRef, useState } from 'react'
import useMusicStore from '../store/useMusicStore';

const SongDetails = () => {
  const {currentSongIndex, musicList, isPlaying} =  useMusicStore()

  const diskRef = useRef(null); 

  const currentSong = musicList[currentSongIndex];


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
     
      <div className="relative mb-4 flex items-center justify-center">
        <div
          className="absolute w-36 h-36 rounded-full bg-cyan-400 opacity-40 blur-2xl bass-tremble"
          style={{ zIndex: 0 }}
        ></div>
        <img
          src={currentSong.img}
          alt={currentSong.title}
          className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 shadow-lg relative"
          style={{ zIndex: 1 }}
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

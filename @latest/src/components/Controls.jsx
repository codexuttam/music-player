import React from 'react'
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from 'react-icons/fa';
import useMusicStore from '../store/useMusicStore';
import formatTime from "../utils/formatTime";


const Controls = () => {
  const {
    isPlaying,
    currentTime,
    setCurrentTime,
    duration,
    toggleSong,
    nextSong,
    prevSong,
  } = useMusicStore();

  const handleProgressChange = (event) => {
    const progressBar = event.target;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;
    const percentage = offsetX / width;
    const newTime = percentage * duration; 
    setCurrentTime(newTime);
  };

  return (
    <>
      <div className="relative h-1 bg-gray-700 rounded mb-4">
       
     

        <div
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          onMouseDown={(e) => handleProgressChange(e)} 
          onTouchStart={(e) => handleProgressChange(e.touches[0])} 
        />
      </div>

      <div className="flex items-center justify-between w-full mt-4">
        <span className="text-lg font-bold text-cyan-200">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="mx-4 flex-1 accent-cyan-400 h-2"
        />
        <span className="text-lg font-bold text-cyan-200">
          {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6">
        <button onClick={prevSong} className="text-3xl text-cyan-400 hover:text-cyan-200">
          <FaStepBackward />
        </button>
        <button onClick={toggleSong} className="text-4xl text-cyan-400 hover:text-cyan-200">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={nextSong} className="text-3xl text-cyan-400 hover:text-cyan-200">
          <FaStepForward />
        </button>
      </div>
    </>
  );
}

export default Controls
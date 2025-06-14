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
          className="absolute top-0 left-0 h-full bg-green-500 shadow-sm shadow-green-500 rounded"
          style={{ width: `${(currentTime / duration) * 100}%` }} 
        >
          <span className=" absolute right-0 top-[-100%] w-3 h-3 bg-green-300 rounded-full"></span>
        </div>
        <div className=" flex items-center justify-between pt-2">
          <span> {formatTime(currentTime)} </span>
          <span> {formatTime(duration)} </span>
        </div>

        <div
          className="absolute top-0 left-0 w-full h-full cursor-pointer"
          onMouseDown={(e) => handleProgressChange(e)} 
          onTouchStart={(e) => handleProgressChange(e.touches[0])} 
        />
      </div>

      <div className="flex justify-around items-center mt-10">
        <button onClick={prevSong} className=" ">
          <FaStepBackward className=" hover:text-green-600 duration-300" />
        </button>

        <div className="flex items-center justify-center">
          <button
            onClick={toggleSong}
            className="relative p-4 bg-white rounded-full shadow-lg glow-button"
          >
            {isPlaying ? (
              <FaPause className="text-black" />
            ) : (
              <FaPlay className="text-black" />
            )}{" "}
            <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-green-300 to-green-700 opacity-30 glow-ring"></div>
          </button>
        </div>

        <button onClick={nextSong} className=" ">
          <FaStepForward className=" hover:text-green-600 duration-300" />
        </button>
      </div>
    </>
  );
}

export default Controls
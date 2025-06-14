import React, { useEffect, useRef } from "react";
import SongDetails from "./SongDetails";
import Controls from "./Controls";
import useMusicStore from "../store/useMusicStore";

const MusicPlayer = () => {
  const { initAudio, musicList, currentSongIndex } = useMusicStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      initAudio(audioRef.current);
    }
  }, [initAudio]);

  if (!musicList || musicList.length === 0) {
    return <div>No songs available.</div>;
  }

  const currentSong = musicList[currentSongIndex];

  return (
    <div className="p-8 flex flex-col items-center w-96 mx-auto bg-gray-900 rounded-3xl shadow-2xl border-2 border-cyan-500">
      <SongDetails />
      <Controls />
      <audio
        ref={audioRef}
        src={currentSong.src}
        onEnded={() => useMusicStore.getState().nextSong()}
      />
    </div>
  );
};

export default MusicPlayer;
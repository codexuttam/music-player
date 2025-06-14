import React, { useEffect, useRef } from "react";
import useMusicStore from "../store/useMusicStore";
import SongDetails from "./SongDetails";
import Controls from "./Controls";

const MusicPlayer = () => {
  const { initAudio, musicList, currentSongIndex, isPlaying } = useMusicStore();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      initAudio(audioRef.current);
    }
  }, [initAudio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [currentSongIndex, isPlaying]);

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
nextSong: () => {
  const audio = get().audio;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  set((state) => ({
    currentSongIndex: (state.currentSongIndex + 1) % state.musicList.length,
    isPlaying: true,
  }));
};
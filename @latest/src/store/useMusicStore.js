import musicList from "../data/musicList";
import { create } from "zustand";

const useMusicStore = create((set, get) => ({
  isPlaying: false,
  currentSongIndex: 0,
  audio: null,
  currentTime: 0,
  duration: 0,
  musicList,

  initAudio: (audioElement) => {
    set({ audio: audioElement });

    audioElement.addEventListener("loadedmetadata", () => {
      set({ duration: audioElement.duration });
    });

    audioElement.addEventListener("timeupdate", () => {
      set({ currentTime: audioElement.currentTime });
    });
  },

  toggleSong: () => {
    const { audio, isPlaying } = get();
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      set({ isPlaying: !isPlaying });
    }
  },

  nextSong: () => {
    const { audio, currentSongIndex } = get();
    const nextIndex = (currentSongIndex + 1) % musicList.length;
    if (audio) {
      audio.src = musicList[nextIndex].src;
      audio.play();
    }
    set({ currentSongIndex: nextIndex, isPlaying: true });
  },

  prevSong: () => {
    const { audio, currentSongIndex } = get();
    const prevIndex =
      currentSongIndex === 0 ? musicList.length - 1 : currentSongIndex - 1;
    if (audio) {
      audio.src = musicList[prevIndex].src;
      audio.play();
    }
    set({ currentSongIndex: prevIndex, isPlaying: true });
  },

  setCurrentTime: (time) => {
    const { audio } = get();
    if (audio) {
      audio.currentTime = time;
      set({ currentTime: time });
    }
  },
}));

export default useMusicStore;
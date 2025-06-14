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
    const audio = get().audio;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    set((state) => ({
      isPlaying: false,
      currentSongIndex: (state.currentSongIndex + 1) % state.musicList.length,
    }));
    setTimeout(() => set({ isPlaying: true }), 0);
  },
  prevSong: () => {
    const audio = get().audio;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    set((state) => ({
      isPlaying: false,
      currentSongIndex:
        (state.currentSongIndex - 1 + state.musicList.length) % state.musicList.length,
    }));
    setTimeout(() => set({ isPlaying: true }), 0);
  },

  setCurrentTime: (time) => {
    set({ currentTime: time });
    const audio = get().audio;
    if (audio) {
      audio.currentTime = time;
    }
  },
}));

export default useMusicStore;
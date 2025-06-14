import { create } from "zustand";
import musicLists from "../data/musicLists";

const useMusicStore = create((set, get) => ({
  isPlaying: false,
  currentSongIndex: 0,
  audio: null,
  currentTime: 0,
  duration: 0,

 
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
    const nextIndex = (currentSongIndex + 1) % musicLists.length;
    if (audio) {
      audio.src = musicLists[nextIndex].src; 
      audio.play();
    }
    set({ currentSongIndex: nextIndex, isPlaying: true });
  },

 
  prevSong: () => {
    const { audio, currentSongIndex } = get();
    const prevIndex =
      currentSongIndex === 0 ? musicLists.length - 1 : currentSongIndex - 1;
    if (audio) {
      audio.src = musicLists[prevIndex].src; 
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

  musicLists,
}));

export default useMusicStore;
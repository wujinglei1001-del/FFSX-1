import { createContext, useContext } from 'react';
import useAudioControls from './useAudioControls';

const AudioContext = createContext(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children, audioSrc }) => {
  const audioControls = useAudioControls(audioSrc);

  return (
    <AudioContext.Provider value={audioControls}>
      {/* Audio element - ref is managed by the hook */}
      <audio ref={audioControls.audioRef} preload="metadata" style={{ display: 'none' }} />
      {children}
    </AudioContext.Provider>
  );
};

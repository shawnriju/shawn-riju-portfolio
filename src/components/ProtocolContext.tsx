import React, { createContext, useContext, useState, useCallback } from 'react';

interface ProtocolContextType {
  protocolActive: boolean;
  toggleProtocol: () => void;
  foundBalls: number[];
  findBall: (ballNumber: number) => void;
  summoning: boolean;
  tutorialDismissed: boolean;
  hasMobTrophy: boolean;
  unlockMobTrophy: () => void;
}

const ProtocolContext = createContext<ProtocolContextType | undefined>(undefined);

export const ProtocolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [protocolActive, setProtocolActive] = useState(false);
  const [foundBalls, setFoundBalls] = useState<number[]>([]);
  const [summoning, setSummoning] = useState(false);
  const [tutorialDismissed, setTutorialDismissed] = useState(false);
  const [hasMobTrophy, setHasMobTrophy] = useState(false);

  const toggleProtocol = useCallback(() => {
    setProtocolActive(prev => !prev);
  }, []);

  const findBall = useCallback((ballNumber: number) => {
    if (!protocolActive) return;
    setFoundBalls(prev => {
      if (prev.includes(ballNumber)) return prev;
      const next = [...prev, ballNumber];

      if (ballNumber === 1) {
        setTutorialDismissed(true);
      }

      if (next.length === 7) {
        setSummoning(true);
        setTimeout(() => setSummoning(false), 3500); // 3.5 seconds for summoning sequence
      }
      return next;
    });
  }, [protocolActive]);

  const unlockMobTrophy = useCallback(() => {
    setHasMobTrophy(true);
  }, []);

  return (
    <ProtocolContext.Provider value={{ protocolActive, toggleProtocol, foundBalls, findBall, summoning, tutorialDismissed, hasMobTrophy, unlockMobTrophy }}>
      {children}
    </ProtocolContext.Provider>
  );
};

export const useProtocol = () => {
  const context = useContext(ProtocolContext);
  if (context === undefined) {
    throw new Error('useProtocol must be used within a ProtocolProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Player, GameState, GameContextType } from '../types';

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialGameState: GameState = {
  status: 'lobby',
  players: [],
  currentRound: 0,
  totalRounds: 3,
  musicStartTime: null,
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const addPlayer = useCallback((name: string) => {
    setGameState((prev) => {
      if (prev.status !== 'lobby') return prev;
      
      const newPlayer: Player = {
        id: Math.random().toString(36).substring(2, 11),
        name,
        score: 0,
        reactionTime: null,
        joinedAt: Date.now(),
        hasPlayed: false,
      };
      
      return {
        ...prev,
        players: [...prev.players, newPlayer],
      };
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      status: 'playing',
      currentRound: 1,
      musicStartTime: Date.now(),
    }));
  }, []);

  const recordReaction = useCallback((playerId: string, reactionTime: number) => {
    setGameState((prev) => {
      const updatedPlayers = prev.players.map((p) =>
        p.id === playerId
          ? {
              ...p,
              reactionTime: Math.min(p.reactionTime || Infinity, reactionTime),
              score: p.score + Math.max(0, 1000 - reactionTime),
              hasPlayed: true,
            }
          : p
      );

      const allHavePlayed = updatedPlayers.every((p) => p.hasPlayed);
      const nextRound = prev.currentRound + 1;

      if (allHavePlayed && nextRound > prev.totalRounds) {
        return {
          ...prev,
          players: updatedPlayers,
          status: 'results',
        };
      }

      if (allHavePlayed) {
        return {
          ...prev,
          players: updatedPlayers.map((p) => ({ ...p, hasPlayed: false })),
          currentRound: nextRound,
          musicStartTime: Date.now(),
        };
      }

      return {
        ...prev,
        players: updatedPlayers,
      };
    });
  }, []);

  const getRanking = useCallback((): Player[] => {
    return [...gameState.players].sort((a, b) => b.score - a.score);
  }, [gameState.players]);

  const getWinner = useCallback((): Player | null => {
    const ranking = getRanking();
    return ranking.length > 0 ? ranking[0] : null;
  }, [getRanking]);

  const resetGame = useCallback(() => {
    setGameState(initialGameState);
  }, []);

  const value: GameContextType = {
    gameState,
    addPlayer,
    startGame,
    recordReaction,
    resetGame,
    getWinner,
    getRanking,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

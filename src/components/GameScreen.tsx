import React, { useEffect, useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import '../styles/GameScreen.css';

export const GameScreen: React.FC = () => {
  const { gameState, recordReaction } = useGame();
  const [isReady, setIsReady] = useState(false);
  const [showSignal, setShowSignal] = useState(false);
  const [hasReacted, setHasReacted] = useState<Set<string>>(new Set());
  const signalStartTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playBeep = (frequency: number, duration: number) => {
    try {
      const audioContext = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
      console.log('Web Audio API not available');
    }
  };

  useEffect(() => {
    const delayBeforeSignal = 2000 + Math.random() * 3000;
    
    setIsReady(true);
    setHasReacted(new Set());
    
    timeoutRef.current = setTimeout(() => {
      setShowSignal(true);
      signalStartTimeRef.current = Date.now();
      playBeep(800, 100);
    }, delayBeforeSignal);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [gameState.currentRound]);

  const handleReaction = (playerId: string) => {
    if (!showSignal || hasReacted.has(playerId) || !signalStartTimeRef.current) return;

    const reactionTime = Date.now() - signalStartTimeRef.current;
    recordReaction(playerId, reactionTime);
    
    setHasReacted((prev) => new Set([...prev, playerId]));
  };

  const currentPlayer = gameState.players.find((p) => !hasReacted.has(p.id));

  return (
    <div className="game-screen">
      <div className="game-header">
        <h1 className="game-title">Round {gameState.currentRound}/{gameState.totalRounds}</h1>
        <p className="game-instruction">Click when you hear the beep! ⚡</p>
      </div>

      <div className="game-content">
        <div className={`signal-indicator ${showSignal ? 'active' : ''}`}>
          {showSignal ? '🔊 BEEP! REACT NOW!' : '🎵 Waiting for signal...'}
        </div>

        <div className="players-grid">
          {gameState.players.map((player) => {
            const hasReactedPlayer = hasReacted.has(player.id);
            const playerReactionTime = player.reactionTime;
            
            return (
              <div key={player.id} className={`player-card ${hasReactedPlayer ? 'reacted' : ''}`}>
                <div className="player-name">{player.name}</div>
                {hasReactedPlayer && playerReactionTime !== null && (
                  <div className="reaction-time">
                    ⚡ {playerReactionTime}ms
                  </div>
                )}
                <button
                  onClick={() => handleReaction(player.id)}
                  disabled={hasReactedPlayer || !showSignal}
                  className={`reaction-btn ${hasReactedPlayer ? 'done' : ''}`}
                >
                  {hasReactedPlayer ? '✓ Done' : 'Click!'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="game-progress">
        <div className="progress-bar-container">
          <div 
            className="progress-bar"
            style={{ width: `${(gameState.currentRound / gameState.totalRounds) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

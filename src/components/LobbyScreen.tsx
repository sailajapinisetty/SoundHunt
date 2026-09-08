import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import '../styles/LobbyScreen.css';

export const LobbyScreen: React.FC = () => {
  const { gameState, addPlayer, startGame } = useGame();
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleStartGame = () => {
    if (gameState.players.length >= 2) {
      startGame();
    }
  };

  return (
    <div className="lobby-screen">
      <div className="lobby-container">
        <h1 className="lobby-title">🎵 Music Reaction Game</h1>
        <p className="lobby-subtitle">Test your reflexes and compete with others!</p>

        <div className="join-section">
          <form onSubmit={handleAddPlayer} className="join-form">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="player-input"
              maxLength={20}
            />
            <button type="submit" className="btn btn-add">
              Join Game
            </button>
          </form>
        </div>

        <div className="players-section">
          <h2 className="players-title">Joined Players ({gameState.players.length})</h2>
          {gameState.players.length === 0 ? (
            <p className="no-players">No players yet. Be the first to join!</p>
          ) : (
            <ul className="players-list">
              {gameState.players.map((player, index) => (
                <li key={player.id} className="player-item">
                  <span className="player-number">{index + 1}</span>
                  <span className="player-name">{player.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleStartGame}
          disabled={gameState.players.length < 2}
          className="btn btn-start"
        >
          {gameState.players.length < 2
            ? `Need at least 2 players (${gameState.players.length}/2)`
            : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

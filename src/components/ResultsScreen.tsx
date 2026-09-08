import React from 'react';
import { useGame } from '../context/GameContext';
import '../styles/ResultsScreen.css';

export const ResultsScreen: React.FC = () => {
  const { getWinner, getRanking, resetGame } = useGame();
  const winner = getWinner();
  const ranking = getRanking();

  const getMedalEmoji = (position: number) => {
    const medals = ['🥇', '🥈', '🥉'];
    return medals[position] || '🎵';
  };

  return (
    <div className="results-screen">
      <div className="results-container">
        <h1 className="results-title">Game Over! 🎉</h1>

        {winner && (
          <div className="winner-section">
            <div className="winner-badge">
              <div className="medal-large">🥇</div>
              <h2 className="winner-name">{winner.name}</h2>
              <p className="winner-subtitle">Winner!</p>
              <p className="winner-score">{winner.score} points</p>
            </div>
          </div>
        )}

        <div className="ranking-section">
          <h3 className="ranking-title">Final Rankings</h3>
          <ul className="ranking-list">
            {ranking.map((player, index) => (
              <li key={player.id} className={`ranking-item ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : ''}`}>
                <div className="ranking-position">
                  <span className="medal">{getMedalEmoji(index)}</span>
                  <span className="position">{index + 1}</span>
                </div>
                <div className="ranking-details">
                  <span className="ranking-name">{player.name}</span>
                  <span className="ranking-score">{player.score} points</span>
                </div>
                <div className="ranking-stats">
                  <span className="stat">Avg Reaction: {player.reactionTime ? `${player.reactionTime}ms` : 'N/A'}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={resetGame} className="btn btn-play-again">
          Play Again
        </button>
      </div>
    </div>
  );
};

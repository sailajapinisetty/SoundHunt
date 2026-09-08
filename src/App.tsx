import { GameProvider, useGame } from './context/GameContext';
import { LobbyScreen } from './components/LobbyScreen';
import { GameScreen } from './components/GameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import './App.css';

function GameContent() {
  const { gameState } = useGame();

  return (
    <div className="app">
      {gameState.status === 'lobby' && <LobbyScreen />}
      {gameState.status === 'playing' && <GameScreen />}
      {gameState.status === 'results' && <ResultsScreen />}
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;

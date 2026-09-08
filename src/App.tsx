import React, { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import './App.css';

const AVATARS = ['🎸', '🥁', '🎤', '🎹', '🎷', '🎺', '🎻', '🪗'];

const MUSIC_QUESTIONS = [
  {
    id: 1,
    question: 'Are you a music lover? 🎵',
    answers: ['Absolutely! Music is life', 'Yeah, pretty much', 'Kinda', 'Not really']
  },
  {
    id: 2,
    question: 'What\'s your vibe?',
    answers: ['Chill & Relaxing', 'High Energy', 'Mix of both', 'Depends on mood']
  },
  {
    id: 3,
    question: 'Favorite music era?',
    answers: ['80s & 90s Classics', '2000s Hits', '2010s Vibes', '2020s & Now']
  },
  {
    id: 4,
    question: 'Concert or Festival?',
    answers: ['Concert (intimate)', 'Festival (big crowds)', 'Both', 'Neither']
  },
  {
    id: 5,
    question: 'Lyrics or Beat? 🎶',
    answers: ['Lyrics! (story matters)', 'Beat! (groove matters)', 'Both equally', 'Neither']
  },
  {
    id: 6,
    question: 'One-hit wonder or deep cuts?',
    answers: ['Hit songs only', 'Deep album cuts', 'Mix of both', 'Artist exploration']
  },
  {
    id: 7,
    question: 'Headphones or speaker?',
    answers: ['Headphones (solo)', 'Speaker (share)', 'Both', 'Live only']
  },
  {
    id: 8,
    question: 'Workout or chill?',
    answers: ['Pump me up!', 'Keep me calm', 'Depends on day', 'Music\'s not for that']
  }
];

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  lastAnswerCorrect: boolean;
  currentAnswer?: number;
}

interface GameState {
  mode: 'admin-auth' | 'admin-lobby' | 'admin-game' | 'player-join' | 'player-lobby' | 'player-question' | 'player-leaderboard' | 'final-reveal';
  adminMode: boolean;
  players: Player[];
  currentQuestionIndex: number;
  totalQuestions: number;
  gameActive: boolean;
  showAnswerReview: boolean;
  qrCode: string;
}

function Admin({ state, setState }: any) {
  const [password, setPassword] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');

  // Generate QR code on mount
  useEffect(() => {
    const qrLink = `${window.location.origin}${window.location.pathname}?mode=player`;
    QRCode.toDataURL(qrLink, { width: 250, margin: 1, color: { dark: '#000', light: '#fff' } })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error('QR Code generation failed:', err));
  }, []);

  const handleAdminLogin = () => {
    if (password === 'admin123') {
      setState((prev: any) => ({ ...prev, mode: 'admin-lobby', adminMode: true }));
      setPassword('');
    } else {
      alert('Wrong password!');
    }
  };

  if (state.mode === 'admin-auth') {
    return (
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ background: '#0f3460', padding: '50px', borderRadius: '20px', textAlign: 'center', maxWidth: '400px' }}>
          <h1 style={{ marginBottom: '30px' }}>🎵 Admin Panel</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" style={{ padding: '12px', width: '100%', marginBottom: '15px', borderRadius: '8px', border: 'none' }} />
          <button onClick={handleAdminLogin} style={{ padding: '12px 30px', background: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', width: '100%' }}>Login</button>
        </div>
      </div>
    );
  }

  if (state.mode === 'admin-lobby') {
    return (
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', minHeight: '100vh', padding: '40px', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1>🎵 Music Personality Game - Admin</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
            {/* QR Code Side */}
            <div style={{ background: '#0f3460', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
              <h2>📱 Share with Players</h2>
              <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginTop: '20px' }}>
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="QR Code" style={{ width: '250px', height: '250px' }} />
                ) : (
                  <div style={{ width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading QR...</div>
                )}
              </div>
              <p style={{ marginTop: '15px', fontSize: '12px', color: '#aaa' }}>Players scan to join</p>
            </div>

            {/* Players & Controls */}
            <div style={{ background: '#0f3460', padding: '30px', borderRadius: '20px' }}>
              <h2>👥 Players Joined: {state.players.length}/15</h2>
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '15px' }}>
                {state.players.map((p: Player) => (
                  <div key={p.id} style={{ background: '#1a1a2e', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px', marginRight: '8px' }}>{p.avatar}</span>
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setState((prev: any) => ({ ...prev, mode: 'admin-game', gameActive: true }))} style={{ marginTop: '20px', padding: '12px 30px', background: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', width: '100%' }}>
                ▶️ Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state.mode === 'admin-game') {
    const currentQuestion = MUSIC_QUESTIONS[state.currentQuestionIndex];
    return (
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', minHeight: '100vh', padding: '40px', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1>Question {state.currentQuestionIndex + 1}/{state.totalQuestions}</h1>
            <button onClick={() => setState((prev: any) => ({ ...prev, mode: 'final-reveal' }))} style={{ padding: '10px 20px', background: '#48bb78', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              🏆 End Game
            </button>
          </div>

          <div style={{ background: '#0f3460', padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
            <h2>{currentQuestion.question}</h2>
            <div style={{ marginTop: '20px' }}>
              {currentQuestion.answers.map((ans, i) => (
                <div key={i} style={{ background: '#1a1a2e', padding: '15px', marginBottom: '10px', borderRadius: '8px' }}>
                  {ans} - {state.players.filter((p: Player) => p.currentAnswer === i).length} votes
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div style={{ background: '#0f3460', padding: '30px', borderRadius: '20px', marginBottom: '30px' }}>
            <h2>📊 Live Leaderboard</h2>
            <div style={{ marginTop: '15px' }}>
              {[...state.players].sort((a: Player, b: Player) => b.score - a.score).map((p: Player, idx) => (
                <div key={p.id} style={{ background: '#1a1a2e', padding: '12px', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '•'} {p.avatar} {p.name}</span>
                  <span>{p.score} pts</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setState((prev: any) => ({ ...prev, currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1) }))} style={{ flex: 1, padding: '12px', background: '#555', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              ⬅️ Previous
            </button>
            <button onClick={() => setState((prev: any) => ({ ...prev, currentQuestionIndex: Math.min(MUSIC_QUESTIONS.length - 1, prev.currentQuestionIndex + 1) }))} style={{ flex: 1, padding: '12px', background: '#48bb78', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Next ➡️
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function PlayerJoin({ state, setState }: any) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🎸');

  const handleJoin = () => {
    if (name.trim()) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: name.trim(),
        avatar: selectedAvatar,
        score: 0,
        streak: 0,
        lastAnswerCorrect: false
      };
      sessionStorage.setItem('current_player_id', newPlayer.id);
      setState((prev: any) => ({ ...prev, players: [...prev.players, newPlayer], mode: 'player-lobby' }));
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white' }}>
      <div style={{ background: 'white', color: '#333', padding: '50px', borderRadius: '20px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '30px' }}>🎵 Join the Game</h1>
        
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={{ padding: '12px', width: '100%', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px' }} />

        <h3>Pick Your Avatar</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '30px' }}>
          {AVATARS.map(avatar => (
            <button key={avatar} onClick={() => setSelectedAvatar(avatar)} style={{ padding: '15px', fontSize: '30px', background: selectedAvatar === avatar ? '#667eea' : '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              {avatar}
            </button>
          ))}
        </div>

        <button onClick={handleJoin} disabled={!name.trim()} style={{ padding: '12px 40px', background: name.trim() ? '#48bb78' : '#ccc', color: 'white', border: 'none', borderRadius: '8px', cursor: name.trim() ? 'pointer' : 'not-allowed', fontSize: '16px', fontWeight: 'bold', width: '100%' }}>
          ✓ Join Game
        </button>
      </div>
    </div>
  );
}

function PlayerLobby({ state, player }: any) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '50px', borderRadius: '20px', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <h1>🎵 Waiting for Game to Start...</h1>
        <div style={{ fontSize: '80px', marginTop: '30px' }}>{player?.avatar}</div>
        <h2 style={{ marginTop: '20px' }}>{player?.name}</h2>
        <p style={{ marginTop: '20px', opacity: 0.9 }}>Admin is setting up the game</p>
        <div style={{ marginTop: '30px', fontSize: '20px' }}>⏳ Ready?</div>
      </div>
    </div>
  );
}

function PlayerQuestion({ state, player, setState }: any) {
  const currentQuestion = MUSIC_QUESTIONS[state.currentQuestionIndex];
  const playerAlreadyAnswered = player?.currentAnswer !== undefined;

  const handleAnswer = (answerIdx: number) => {
    setState((prev: any) => ({
      ...prev,
      players: prev.players.map((p: Player) => p.id === player.id ? { ...p, currentAnswer: answerIdx, score: p.score + 100 } : p)
    }));
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '30px', borderRadius: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <h2>Question {state.currentQuestionIndex + 1}/{state.totalQuestions}</h2>
          <h3 style={{ marginTop: '15px', fontSize: '24px' }}>{currentQuestion.question}</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          {currentQuestion.answers.map((ans, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={playerAlreadyAnswered}
              style={{
                padding: '20px',
                background: playerAlreadyAnswered ? (player?.currentAnswer === i ? '#48bb78' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.2)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                borderRadius: '12px',
                cursor: playerAlreadyAnswered ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {playerAlreadyAnswered && player?.currentAnswer === i && '✓ '} {ans}
            </button>
          ))}
        </div>

        {playerAlreadyAnswered && <p style={{ textAlign: 'center', marginTop: '20px', opacity: 0.8 }}>Answer locked! Waiting for next question...</p>}
      </div>
    </div>
  );
}

function PlayerLeaderboard({ state }: any) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Leaderboard</h1>
        <div>
          {[...state.players].sort((a: Player, b: Player) => b.score - a.score).map((p: Player, idx) => (
            <div key={p.id} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '30px' }}>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '•'}</span>
                <span style={{ fontSize: '24px' }}>{p.avatar}</span>
                <span style={{ fontSize: '18px' }}>{p.name}</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinalReveal({ state }: any) {
  const winner = [...state.players].sort((a: Player, b: Player) => b.score - a.score)[0];

  return (
    <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', animation: 'pulse 1s infinite' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '30px', animation: 'bounce 1s infinite' }}>🎉 WINNER 🎉</h1>
        <div style={{ fontSize: '120px', marginBottom: '20px' }}>{winner?.avatar}</div>
        <h2 style={{ fontSize: '48px', marginBottom: '10px' }}>{winner?.name}</h2>
        <p style={{ fontSize: '24px', marginBottom: '30px' }}>🏆 {winner?.score} Points 🏆</p>
      </div>
    </div>
  );
}

export default function App() {
  const isPlayerMode = window.location.search.includes('mode=player');
  const GAME_STATE_KEY = 'music_game_state';
  const PLAYER_ID_KEY = 'current_player_id';

  // Initialize state from localStorage or default
  const initializeState = (): GameState => {
    const stored = localStorage.getItem(GAME_STATE_KEY);
    const baseState: GameState = {
      mode: isPlayerMode ? 'player-join' : 'admin-auth',
      adminMode: false,
      players: [],
      currentQuestionIndex: 0,
      totalQuestions: 8,
      gameActive: false,
      showAnswerReview: false,
      qrCode: ''
    };
    
    if (!stored) {
      return baseState;
    }
    
    try {
      const parsed = JSON.parse(stored);
      
      if (isPlayerMode) {
        // Player mode: inherit players and game state, but keep player mode UI
        return {
          ...baseState,
          mode: 'player-join',
          players: parsed.players || [],
          currentQuestionIndex: parsed.currentQuestionIndex || 0,
          gameActive: parsed.gameActive || false
        };
      } else {
        // Admin mode: load full state and preserve admin mode
        return {
          ...parsed,
          adminMode: true,
          mode: parsed.mode === 'admin-auth' ? parsed.mode : (parsed.adminMode ? 'admin-lobby' : 'admin-auth')
        };
      }
    } catch (e) {
      return baseState;
    }
  };

  const [state, setState] = useState<GameState>(initializeState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  }, [state]);

  // Player sync polling: fetch game state from storage every 2 seconds
  useEffect(() => {
    if (!isPlayerMode) return;
    
    const pollInterval = setInterval(() => {
      const stored = localStorage.getItem(GAME_STATE_KEY);
      const currentPlayerId = sessionStorage.getItem(PLAYER_ID_KEY);
      
      // Only sync if player has already joined
      if (!currentPlayerId) return;
      
      if (stored) {
        try {
          const sharedState = JSON.parse(stored);
          setState(prev => {
            const currentPlayer = prev.players.find(p => p.id === currentPlayerId);
            
            return {
              ...prev,
              players: sharedState.players,
              currentQuestionIndex: sharedState.currentQuestionIndex,
              gameActive: sharedState.gameActive,
              mode: sharedState.mode === 'final-reveal' ? 'final-reveal' : 
                    (sharedState.gameActive ? 'player-question' : 'player-lobby'),
              // Preserve the local player's state
              ...( currentPlayer && { players: sharedState.players.map((p: Player) => 
                p.id === currentPlayerId ? { ...p, ...currentPlayer } : p
              ) })
            };
          });
        } catch (e) {
          console.error('Sync error:', e);
        }
      }
    }, 2000);
    
    return () => clearInterval(pollInterval);
  }, [isPlayerMode]);

  // Find current player
  const currentPlayerId = sessionStorage.getItem(PLAYER_ID_KEY);
  const currentPlayer = state.players.find(p => p.id === currentPlayerId) || state.players[state.players.length - 1];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
      `}</style>

      {(state.mode === 'admin-auth' || state.mode === 'admin-lobby' || state.mode === 'admin-game') && <Admin state={state} setState={setState} />}
      {state.mode === 'player-join' && <PlayerJoin state={state} setState={setState} />}
      {state.mode === 'player-lobby' && <PlayerLobby state={state} player={currentPlayer} />}
      {state.mode === 'player-question' && <PlayerQuestion state={state} player={currentPlayer} setState={setState} />}
      {state.mode === 'player-leaderboard' && <PlayerLeaderboard state={state} />}
      {state.mode === 'final-reveal' && <FinalReveal state={state} />}
    </div>
  );
}

export interface Player {
  id: string;
  name: string;
  score: number;
  reactionTime: number | null;
  joinedAt: number;
  hasPlayed: boolean;
}

export interface GameState {
  status: 'lobby' | 'playing' | 'results';
  players: Player[];
  currentRound: number;
  totalRounds: number;
  musicStartTime: number | null;
}

export interface GameContextType {
  gameState: GameState;
  addPlayer: (name: string) => void;
  startGame: () => void;
  recordReaction: (playerId: string, reactionTime: number) => void;
  resetGame: () => void;
  getWinner: () => Player | null;
  getRanking: () => Player[];
}

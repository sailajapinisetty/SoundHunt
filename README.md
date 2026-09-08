# 🎵 Music Reaction Game

A fun, interactive multiplayer music reaction game built with React and TypeScript. Test your reflexes and compete with your friends!

## Features

- ⚡ **Multiplayer Support**: Multiple players can join and compete in the same game
- 🎵 **Sound-based Challenges**: React to audio cues as quickly as possible
- 📊 **Real-time Tracking**: See reaction times and scores in real-time
- 🏆 **Leaderboard**: View final rankings and identify the winner
- 🎨 **Beautiful UI**: Modern, responsive design that works on all devices
- 💻 **Frontend-only**: No backend required - runs entirely in the browser

## How to Play

1. **Join the Game**: Enter your name to join the lobby
2. **Wait for Players**: A minimum of 2 players are needed to start
3. **Play Rounds**: Listen for the beep and click as fast as you can
4. **View Results**: Check the leaderboard to see who won

## Game Mechanics

- **3 Rounds** of competition
- **Scoring**: Points = 1000 - reaction time (in milliseconds)
- **Fastest Reaction**: The player with the best average reaction time wins
- **Medal Awards**: 🥇🥈🥉 for top 3 players

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone or download the project
cd game

# Install dependencies
npm install

# Start the development server
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── LobbyScreen.tsx      # Player joining screen
│   ├── GameScreen.tsx        # Main game interface
│   └── ResultsScreen.tsx     # Leaderboard and winner display
├── context/
│   └── GameContext.tsx       # Game state management
├── styles/
│   ├── LobbyScreen.css
│   ├── GameScreen.css
│   └── ResultsScreen.css
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Main app component
└── main.tsx                  # Entry point
```

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Web Audio API** - Sound generation for game cues
- **CSS3** - Modern styling and animations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Deployment

This game can be easily deployed to any static hosting service:

- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: `npm run build` then drag `dist` folder
- **GitHub Pages**: Use `gh-pages` package with build output
- **AWS Amplify**: Connect your GitHub repo directly

## Future Enhancements

- 🎵 Play background music during rounds
- 🌍 Multiplayer via WebSockets
- 🎮 Different game modes (rhythm, pattern, etc.)
- 📱 Mobile app version
- 🔊 Volume control and sound options
- 🏅 Persistent leaderboard with local storage

## License

MIT License - feel free to use this project however you like!

## Contributing

Feel free to fork, modify, and improve this project!

---

**Have fun playing! 🎉**

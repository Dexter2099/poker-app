# Texas Hold 'Em Poker App

This project is a small demonstration of a Texas Hold 'Em game implemented with React and Vite. It pits you against three computer-controlled opponents in a single round of play.

The application manages shuffling and dealing a standard 52‑card deck, handles basic betting and folding actions, and determines a winner with a simplified hand evaluator. Game state is stored in React context so all components stay in sync while you progress from the pre‑flop through the showdown.

## Getting Started

Install the dependencies with npm:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

To lint the project run:

```bash
npm run lint
```

Create a production build with:

```bash
npm run build
```

After building you can preview the output locally:

```bash
npm run preview
```

## Gameplay

When the app loads, click **Deal New Game** to receive your two hole cards. Use the controls to bet, fold or advance the phase. Community cards are dealt automatically as you move through the flop, turn and river. At the showdown, the app evaluates the remaining hands and announces the winner. Start another round any time by dealing a new game.

Enjoy a quick game of poker right in your browser!

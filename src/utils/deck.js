// src/utils/deck.js

const SUITS = ['♠', '♥', '♦', '♣']
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

// 🔁 Create full deck of 52 cards
export function createDeck() {
  const deck = []
  for (let suit of SUITS) {
    for (let rank of RANKS) {
      deck.push({
        suit,
        rank,
        code: `${rank}${suit}` // e.g. "A♠", "10♥"
      })
    }
  }
  return deck
}

// 🔀 Fisher-Yates shuffle
export function shuffleDeck(deck) {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

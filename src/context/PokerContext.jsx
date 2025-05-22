import React, { createContext, useContext, useState } from 'react'
import { createDeck, shuffleDeck } from '../utils/deck'
import { determineBestHand } from '../utils/handEval'

const PokerContext = createContext()
export const usePoker = () => useContext(PokerContext)

export const PokerProvider = ({ children }) => {
  const [deck, setDeck] = useState([])
  const [players, setPlayers] = useState([])
  const [communityCards, setCommunityCards] = useState([])
  const [phase, setPhase] = useState('pre-flop') // 'flop', 'turn', 'river', 'showdown'
  const [winner, setWinner] = useState(null)
  const [pot, setPot] = useState(0)

  const initializeGame = () => {
    const newDeck = shuffleDeck(createDeck())
    const playerCount = 4
    const newPlayers = []

    for (let i = 0; i < playerCount; i++) {
      newPlayers.push({
        id: i + 1,
        name: i === 0 ? 'You' : `Bot ${i}`,
        cards: [newDeck.pop(), newDeck.pop()],
        folded: false,
        chips: 100
      })
    }

    setDeck(newDeck)
    setPlayers(newPlayers)
    setCommunityCards([])
    setPhase('pre-flop')
    setWinner(null)
    setPot(0)
  }

  const dealCommunityCards = () => {
    if (phase === 'pre-flop') {
      setCommunityCards([deck.pop(), deck.pop(), deck.pop()])
      setPhase('flop')
    } else if (phase === 'flop') {
      setCommunityCards(prev => [...prev, deck.pop()])
      setPhase('turn')
    } else if (phase === 'turn') {
      setCommunityCards(prev => [...prev, deck.pop()])
      setPhase('river')
    } else if (phase === 'river') {
      setPhase('showdown')
      determineWinner()
    }
  }

  const placeBet = (playerId, amount) => {
    setPlayers(prev =>
      prev.map(p =>
        p.id === playerId && p.chips >= amount
          ? { ...p, chips: p.chips - amount }
          : p
      )
    )
    setPot(prev => prev + amount)
  }

  const foldPlayer = playerId => {
    setPlayers(prev =>
      prev.map(p => (p.id === playerId ? { ...p, folded: true } : p))
    )
  }

  const determineWinner = () => {
    const activePlayers = players.filter(p => !p.folded)
    const result = determineBestHand(activePlayers, communityCards)
    setWinner({ ...result.winner, hand: result.handName })
  }

  return (
    <PokerContext.Provider
      value={{
        deck,
        players,
        communityCards,
        phase,
        winner,
        pot,
        initializeGame,
        dealCommunityCards,
        placeBet,
        foldPlayer,
        setWinner
      }}
    >
      {children}
    </PokerContext.Provider>
  )
}

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

  const initializeGame = () => {
    const newDeck = shuffleDeck(createDeck())
    const playerCount = 4
    const newPlayers = []

    for (let i = 0; i < playerCount; i++) {
      newPlayers.push({
        id: i + 1,
        name: i === 0 ? 'You' : `Bot ${i}`,
        cards: [newDeck.pop(), newDeck.pop()],
        folded: false
      })
    }

    setDeck(newDeck)
    setPlayers(newPlayers)
    setCommunityCards([])
    setPhase('pre-flop')
    setWinner(null)
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

  const determineWinner = () => {
    const result = determineBestHand(players, communityCards)
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
        initializeGame,
        dealCommunityCards,
        setWinner
      }}
    >
      {children}
    </PokerContext.Provider>
  )
}

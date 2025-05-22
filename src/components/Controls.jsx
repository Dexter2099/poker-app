import React from 'react'
import { usePoker } from '../context/PokerContext'

const Controls = () => {
  const { initializeGame, dealCommunityCards, phase } = usePoker()

  const canDeal = phase === 'pre-flop'
  const canAdvance = ['pre-flop', 'flop', 'turn', 'river'].includes(phase)
  const isDone = phase === 'showdown'

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Deal New Game */}
      {canDeal && (
        <button onClick={initializeGame} style={buttonStyle}>
          🔁 Deal New Game
        </button>
      )}

      {/* Advance Phase */}
      {canAdvance && (
        <button onClick={dealCommunityCards} style={buttonStyle}>
          ➡️ Next Phase
        </button>
      )}

      {/* Reset After Showdown */}
      {isDone && (
        <button onClick={initializeGame} style={buttonStyle}>
          🔄 Play Again
        </button>
      )}
    </div>
  )
}

const buttonStyle = {
  margin: '0 0.5rem',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  backgroundColor: '#222',
  color: '#fff',
  border: '1px solid #fff',
  borderRadius: '6px',
  cursor: 'pointer'
}

export default Controls

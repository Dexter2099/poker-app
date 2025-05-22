import React from 'react'
import { usePoker } from '../context/PokerContext'
import Controls from './Controls'
import Card from './Card'

const PokerTable = () => {
  const { players, communityCards, phase, winner } = usePoker()

  return (
    <div>
      <h2>Phase: {phase}</h2>

      {/* Community Cards */}
      <div style={{ display: 'flex', justifyContent: 'center',  margin: '1rem 0' }}>
        {communityCards.map((card, index) => (
          <div key={index} style={{ margin: '0 0.5rem' }}>
            <Card code={card.code} />
          </div>
        ))}
      </div>

      {/* Players */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {players.map(player => (
          <div
            key={player.id}
            style={{
              border: '1px solid white',
              padding: '1rem',
              borderRadius: '8px',
              minWidth: '120px'
            }}
          >
            <strong>{player.name}</strong>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
              {player.cards.map((card, index) => (
                <Card key={index} code={card.code} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <Controls />

      {/* Winner */}
      {phase === 'showdown' && winner && (
        <div style={{ marginTop: '2rem', fontSize: '1.5rem', color: '#FFD700' }}>
          🏆 <strong>{winner.name}</strong> wins with <em>{winner.hand}</em>!
        </div>
      )}
    </div>
  )
}

export default PokerTable

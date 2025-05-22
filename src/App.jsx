import React from 'react'
import { PokerProvider } from './context/PokerContext'
import PokerTable from './components/PokerTable'

const App = () => {
  return (
    <PokerProvider>
      <div style={{ textAlign: 'center', color: '#fff', backgroundColor: '#006400', minHeight: '100vh', padding: '1rem' }}>
        <h1>♠️ Texas Hold 'Em Poker ♣️</h1>
        <PokerTable />
      </div>
    </PokerProvider>
  )
}

export default App

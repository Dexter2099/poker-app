// src/components/Card.jsx

import React from 'react'

const Card = ({ code }) => {
  const isRed = code.includes('♥') || code.includes('♦')
  
  return (
    <div
      style={{
        width: '40px',
        height: '60px',
        backgroundColor: '#fff',
        color: isRed ? 'red' : 'black',
        border: '1px solid #222',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '1rem',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.4)',
        margin: '0 4px'
      }}
    >
      {code}
    </div>
  )
}

export default Card

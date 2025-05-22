// src/utils/handEval.js

const RANK_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

function rankToValue(rank) {
  return RANK_ORDER.indexOf(rank)
}

function countRanks(cards) {
  const counts = {}
  for (let card of cards) {
    counts[card.rank] = (counts[card.rank] || 0) + 1
  }
  return counts
}

function evaluateHand(cards) {
  const rankCounts = countRanks(cards)
  const counts = Object.values(rankCounts).sort((a, b) => b - a)

  if (counts[0] === 3) return { rank: 3, name: 'Three of a Kind' }
  if (counts[0] === 2 && counts[1] === 2) return { rank: 2, name: 'Two Pair' }
  if (counts[0] === 2) return { rank: 1, name: 'One Pair' }

  // High Card fallback
  const highest = cards.sort((a, b) => rankToValue(b.rank) - rankToValue(a.rank))[0]
  return { rank: 0, name: `High Card (${highest.rank})` }
}

export function determineBestHand(players, communityCards) {
  let bestRank = -1
  let winner = null
  let winnerHand = ''

  for (let player of players) {
    const fullHand = [...player.cards, ...communityCards]
    const evaluation = evaluateHand(fullHand)

    if (evaluation.rank > bestRank) {
      bestRank = evaluation.rank
      winner = player
      winnerHand = evaluation.name
    }
  }

  return { winner, handName: winnerHand }
}

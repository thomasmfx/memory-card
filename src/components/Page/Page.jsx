import './Page.css'
import Footer from './Footer/Footer'
import Card from '../Card/Card'
import { useState, useEffect } from 'react'
import { retrieveFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage'
import { pickRandom, shuffleArray } from '../../utils/arrayMethods'
import { fetchBrawlers } from '../../services/api'

export default function Page() {
  const [deck, setDeck] = useState([]);
  const [score, setScore] = useState(0);
  
  let nextDeckMark = 11; // Have to check it before the last brawler is clicked
  let bestScore = retrieveFromLocalStorage('bestScore')
  if (bestScore == undefined) bestScore = 0;

  useEffect(() => {
    generateDeck()
  }, [])

  function generateDeck() {
    fetchBrawlers()
      .then((data) => setDeck(pickRandom(data, 12)))
  }

  function shuffleDeck() {
    setDeck([...shuffleArray(deck)])
  }

  function resetGame() {
    if (score > bestScore) saveToLocalStorage('bestScore', score)
    setScore(0)
    generateDeck()
  }

  function isDeckOver() {
    return score === nextDeckMark
  }

  function loadNextDeck() {
    nextDeckMark += 12
    generateDeck()
  }

  function handleClick(brawlerClickedId) {
    deck.map((brawler) => {
      if (brawler.id === brawlerClickedId) {
        if (brawler.isHit) {
          resetGame()
          return
        }

        isDeckOver()
          ? loadNextDeck()
          : shuffleDeck()

        brawler.hit()
        setScore(score + 1)
      }
    })
  }

  return (
    <>
      <main className='main'>
        <div className="score-panel">
          <p>Score: {score}</p>
          <p>Best score: {bestScore}</p>
        </div>
        <div className='cards-container'>
          {deck.map((brawler) =>
            <Card
              key={brawler.id}
              onClick={() => handleClick(brawler.id)}
              brawlerId={brawler.id}
              brawlerName={brawler.name}
              brawlerImage={brawler.imageUrl3}
            />
          )}
        </div>
      </main>
      <Footer/>
    </>
  )
}

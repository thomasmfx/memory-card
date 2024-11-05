import './Page.css'
import Footer from './Footer/Footer'
import Card from '../Card/Card'
import { useState, useEffect } from 'react'
import { retrieveFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage'
import { fetchBrawlers } from '../../services/api'
import { pickRandom, shuffleArray } from '../../utils/arrayMethods'

export default function Page() {
  const [brawlers, setBrawlers] = useState([]);
  const [score, setScore] = useState(0);
  const [userFails, setUserFails] = useState(0);

  let bestScore = retrieveFromLocalStorage('bestScore')
  bestScore == undefined ? bestScore = 0 : null

  function playRound(brawlerClickedId) {
    brawlers.map((brawler) => {
      if (brawler.id === brawlerClickedId) {
        if (brawler.isHit) {
          if (bestScore < score) saveToLocalStorage('bestScore', score);          
          setScore(0);
          setUserFails(userFails + 1)
          return;
        }

        brawler.isHit = true;
        setScore(score + 1)
        setBrawlers([...shuffleArray(brawlers)])
      }
    })
  }

  useEffect(() => {
    fetchBrawlers()
      .then((data) => setBrawlers(pickRandom(data, 12)))
  }, [userFails])

  return (
    <>
      <main className='main'>
        <div className="score-panel">
          <p>Score: {score}</p>
          <p>Best score: {bestScore}</p>
        </div>
        <div className='cards-container'>
          {brawlers.map((brawler) =>
            <Card
              key={brawler.id}
              onClick={() => playRound(brawler.id)}
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

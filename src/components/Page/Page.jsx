import './Page.css'
import Footer from './Footer/Footer'
import Card from '../Card/Card'
import SoundButton from '../SoundButton/SoundButton'
import { useState, useEffect } from 'react'
import { retrieveFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage'
import { pickRandom, shuffleArray } from '../../utils/arrayMethods'
import { fetchBrawlers } from '../../services/api'

const taraPin = 'src/assets/images/tara_pin.png';
const taraGgPin = 'src/assets/images/tara_gg_pin.png';
const taraClapPin = 'src/assets/images/tara_clap_pin.png';
const taraFacepalmPin = 'src/assets/images/tara_facepalm_pin.png';
const taraPhewPin = 'src/assets/images/tara_phew_pin.png';

const backgroundSound = 'public/audios/brawzaar_menu-audio.wav';
const shufflingCardsSound = 'public/audios/shuffling-cards-audio.mp3';
const flipCardSound = 'public/audios/shuffling-cards-audio.mp3';

export default function Page() {
  const [deck, setDeck] = useState([]);
  const [score, setScore] = useState(0);
  const [showCardsFront, setShowCardsFront] = useState(false)
  const [currentTaraPin, setCurrentTaraPin] = useState(taraPin)
  const [isSoundActive, setIsSoundActive] = useState(false);

  let nextDeckMark = 11; // Have to check it before the last brawler is clicked
  let bestScore = retrieveFromLocalStorage('bestScore')
  if (bestScore == undefined) bestScore = 0;

  useEffect(() => {
    generateDeck()
  }, [])

  function generateDeck() {
    fetchBrawlers()
      .then((data) => {
        setDeck(pickRandom(data, 12))
        setTimeout(() => {
          setShowCardsFront(true)
          setCurrentTaraPin(taraPin)
        }, (1000))
      })
  }

  function shuffleDeck() {
    setDeck([...shuffleArray(deck)])
    setTimeout(() => {
      setShowCardsFront(true)
      setCurrentTaraPin(taraPin)
    }, (100));
  }

  function resetGame() {
    if (score > bestScore) saveToLocalStorage('bestScore', score)
    setScore(0)
    setTimeout(() => {
      generateDeck()
    }, (500))
  }

  function isDeckOver() {
    return score === nextDeckMark
  }

  function loadNextDeck() {
    nextDeckMark += 12
    generateDeck()
    setCurrentTaraPin(taraClapPin)
  }

  function handleClick(brawlerClickedId) {
    setShowCardsFront(false)
    deck.map((brawler) => {
      if (brawler.id === brawlerClickedId) {
        if (brawler.isHit) {
          setCurrentTaraPin(taraFacepalmPin)
          resetGame()
          return
        }
     
        brawler.hit()
        setScore(score + 1)

        brawler.name === 'Tara'
          ? setCurrentTaraPin(taraPhewPin)
          : setCurrentTaraPin(taraGgPin)

        setTimeout(() => {
          isDeckOver()
            ? loadNextDeck()
            : shuffleDeck()
        }, (400))
      }
    })
  
  }

  return (
    <>
      <main className='main'>
        <div className="score-panel">
          <div>
            <p>Score: {score}</p>
            <p>Best score: {bestScore}</p>
          </div>
          <img 
            className='tara-pin'
            src={currentTaraPin} 
            alt="Tara pin" 
          />
        </div>
        <div className='cards-container' data-show-front={showCardsFront}>
          {deck.map((brawler) =>
            <Card
              key={brawler.id}
              brawlerId={brawler.id}
              brawlerName={brawler.name}
              brawlerImage={brawler.imageUrl3}
              onClick={() => handleClick(brawler.id)}
            />
          )}
        </div>
        <SoundButton
          isSoundActive={isSoundActive}
          onClick={() => setIsSoundActive(!isSoundActive)}
        />
      </main>
      <Footer/>
    </>
  )
}

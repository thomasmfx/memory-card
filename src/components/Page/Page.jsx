import './Page.css'
import useSound from 'use-sound';
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

export default function Page() {
  const [bestScore, setBestScore] = useState(retrieveFromLocalStorage('bestScore', 0));
  const [deck, setDeck] = useState([]);
  const [score, setScore] = useState(0);
  const [nextDeckScore, setNextDeckScore] = useState(12)
  const [showCardsFront, setShowCardsFront] = useState(false)
  const [currentTaraPin, setCurrentTaraPin] = useState(taraPin)

  const [isSoundActive, setIsSoundActive] = useState(true);
  const [flipCardsSound] = useSound('public/audios/flipcard-sound.mp3', {volume: 2})
  const [shufflingCardsSound] = useSound('public/audios/shuffling-cards-audio.mp3', {volume: 3})
  
  function playSound(sound) {
    sound()
  }

  function toggleIsSoundActive() {
    const newSoundStatus = !isSoundActive;
    setIsSoundActive(newSoundStatus);
    saveToLocalStorage('isSoundActive', newSoundStatus);
  };

  useEffect(() => {
    generateDeck();
    setIsSoundActive(retrieveFromLocalStorage('isSoundActive', true));
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

  function isDeckOver() {
    // Have to check it before the last brawler is clicked
    return score === nextDeckScore - 1
  }

  function resetGame() {
    let newBestScore = score > bestScore ? score : bestScore
    saveToLocalStorage('bestScore', newBestScore);

    setBestScore(newBestScore)
    setNextDeckScore(12)
    setScore(0)
    setTimeout(() => {
      generateDeck()
    }, (500))
  }

  function loadNextDeck() {
    playSound(shufflingCardsSound)
    setNextDeckScore(nextDeckScore + 12)
    generateDeck()
    setCurrentTaraPin(taraClapPin)
  }

  function handleClick(brawlerClickedId) {
    setShowCardsFront(false)
    deck.map((brawler) => {
      if (brawler.id === brawlerClickedId) {
        if (brawler.isHit) {
          setCurrentTaraPin(taraFacepalmPin)
          playSound(shufflingCardsSound)
          resetGame()
          return
        }
     
        brawler.hit()
        setScore(score + 1)
        playSound(flipCardsSound)

        brawler.name === 'Tara'
          ? setCurrentTaraPin(taraPhewPin)
          : setCurrentTaraPin(taraGgPin)

        setTimeout(() => {
          isDeckOver()
            ? loadNextDeck()
            : shuffleDeck()
        }, (300))
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
          onClick={toggleIsSoundActive}
        />
      </main>
      <Footer/>
      {isSoundActive && <audio src={'public/audios/brawzaar_menu-audio.wav'} autoPlay loop={true} ></audio>}
    </>
  )
}

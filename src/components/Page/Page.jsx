import './Page.css'
import Footer from './Footer/Footer'
import Card from '../Card/Card'
import { pickRandom, fetchBrawlers } from '../../services/api'
import { useState, useEffect } from 'react'

export default function Page() {
  const [brawlers, setBrawlers] = useState([])

  useEffect(() => {
    fetchBrawlers()
      .then((data) => setBrawlers(pickRandom(data, 12)))
  }, [])

  return (
    <>
      <main className='main'>
        <div className='cards-container'>
          {brawlers.map((brawler) =>
            <Card
              key={brawler.id}
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

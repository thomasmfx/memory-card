import './Card.css'

export default function Card({brawlerName, brawlerImage}) {
  return (
    <div className="card">
      <div className="outer-card">
      <div className="inner-card">
        <img 
          className='card-brawler-image'
          src={brawlerImage}
          alt="" 
          />
          <p className="card-brawler-name">{brawlerName}</p>
      </div>
      </div>
    </div>
  )
}
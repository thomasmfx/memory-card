import './Card.css'

export default function Card({onClick, brawlerId, brawlerName, brawlerImage}) {
  return (
    <div className="card" data-brawler-id={brawlerId} onClick={onClick}>
      <div className="outer-card">
      <div className="inner-card">
        <img 
          className='card-brawler-image'
          src={brawlerImage}
          alt={'brawler' + brawlerName} 
          />
          <p className="card-brawler-name">{brawlerName}</p>
      </div>
      </div>
    </div>
  )
}
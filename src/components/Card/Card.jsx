import './Card.css'

export default function Card({onClick, brawlerId, brawlerName, brawlerImage}) {
  return (
    <div 
      className="card-container" 
      data-brawler-id={brawlerId} 
      onClick={() => onClick()}
    >
      <div className="card">
        <div className="card-front inner-card">
          <div className="card-front-content card-content">
            <img 
              className='card-brawler-image'
              src={brawlerImage}
              alt={'brawler' + brawlerName} 
            />
            <p className="card-brawler-name">{brawlerName}</p>
          </div>
        </div>
        <div className="card-back inner-card">
          <div className="chip"></div>
        </div>
      </div>
    </div>
  )
}
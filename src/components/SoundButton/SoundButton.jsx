import './SoundButton.css'
import soundOnImgUrl from '../../assets/images/sound_on.svg'
import soundOffImgUrl from '../../assets/images/sound_off.svg'

export default function SoundButton({isSoundActive, onClick}) {
  return (
    <button className="sound-button" onClick={onClick}>
      {isSoundActive
        ? (
          <img 
            className="sound-image"
            src={soundOnImgUrl}
            alt="Sound on"
          />
        )
        : (
          <img
            className="sound-image" 
            src={soundOffImgUrl}
            alt="Sound off"
          />
        )
      }
    </button>
  )
}
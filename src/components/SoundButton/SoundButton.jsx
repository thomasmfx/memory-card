import './SoundButton.css'

export default function SoundButton({isSoundActive, onClick}) {
  return (
    <button className="sound-button" onClick={onClick}>
      {isSoundActive
        ? (
          <img 
            className="sound-image"
            src="src/assets/images/sound_on.svg" 
            alt="Sound on"
          />
        )
        : (
          <img
            className="sound-image" 
            src="src/assets/images/sound_off.svg" 
            alt="Sound off"
          />
        )
      }
    </button>
  )
}
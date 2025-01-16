import { useState } from 'react'
import {
  faCircleExclamation,
  faCircleChevronDown,
  faCircleChevronUp
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import floodWarningIcon from '../../assets/images/flood_warning.svg'

export default function PrivateBetaHeader () {
  const [infoOpen, setInfoOpen] = useState(false)

  const toggleInfo = () => {
    setInfoOpen(!infoOpen)
  }

  return (
    <>
      <header className='govuk-header--full-width-border' style={{color: '#ffffff', background: '#1d70b8'}}>
        <div className={'govuk-width-container'} style={{display: 'flex', alignItems: 'center'}}
        >
          <FontAwesomeIcon
            icon={faCircleExclamation}
          />
          This is a test service only - do not rely on this for flood warnings
          <div >
            <FontAwesomeIcon
              icon={infoOpen ? faCircleChevronUp : faCircleChevronDown}
              onClick={() => toggleInfo()}
            />
            {!infoOpen && ('Show')}
            {infoOpen && ('Hide')}
          </div>
          {/* <button onClick={() => toggleMenu()} >
            Menu {menuOpen ? '\u{25B2}' : '\u{25BC}'}
          </button> */}
        </div>
        {infoOpen && (
          <div className={'govuk-width-container'}
          >
            Thank you
          </div>
          )}
      </header>
    </>
  )
}

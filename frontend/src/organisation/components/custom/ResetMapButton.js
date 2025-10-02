import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export default function ResetMapButton({ center, zoom = 12 }) {
  const map = useMap()

  const resetMap = () => {
    map.setView(center, zoom)
  }

  const handleKeyDown = (e) => {
    // Handle both Enter and Space key for accessiblity
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      resetMap()
    }
  }

  useEffect(() => {
    const btn = document.querySelector('.reset-map-button')
    if (btn) {
      // Disabling leafleft focus stealing removing tabindex='-1' from control wrappers and setting it to tabindex='0'
      const wrapper = btn.closest('.leaflet-control')
      if (wrapper && wrapper.getAttribute('tabindex') === '-1') {
        wrapper.setAttribute('tabindex', '0')
      }
    }
  }, [map, center])

  return (
    <div className='reset-map-button-container leaflet-bar'>
      <button
        type='button'
        className='reset-map-button'
        tabIndex={0}
        role='button'
        aria-label='Reset map to default view'
        onClick={resetMap}
        onKeyDown={handleKeyDown}
      >
        <FontAwesomeIcon icon={faRotateLeft} size='2x' />
      </button>
    </div>
  )
}

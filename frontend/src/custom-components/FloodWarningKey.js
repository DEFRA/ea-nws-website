import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const FloodWarningKey = ({ type, mobileView }) => {
  const renderKeyItem = (iconClass, text) => (
    <div className='key-items'>
      <b className='key-title'>Key</b>
      <FontAwesomeIcon
        icon={faCircle}
        size={mobileView ? '2xl' : 'xl'}
        className={`icon ${iconClass}`}
      />
      <span>{text}</span>
    </div>
  )

  return (
    <div className='flood-warning-key'>
      {type === 'both' && (
        <>
          {renderKeyItem(
            'severe',
            'Severe flood warnings and flood warnings area'
          )}
          {renderKeyItem('alert', 'Flood alert area')}
        </>
      )}
      {type === 'severe' && (
        <>
          {renderKeyItem(
            'severe',
            'Severe flood warnings and flood warnings area'
          )}
        </>
      )}
      {type === 'alert' && <>{renderKeyItem('alert', 'Flood alert area')}</>}
    </div>
  )
}

export default FloodWarningKey

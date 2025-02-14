import React from 'react'
import { Link } from 'react-router-dom'

export default function FloodTypeFilter({
  iconSrc,
  locationsCount,
  warningType,
  warningText,
  warningDescription,
  showFloodType,
  updateFloodTypeVisibility
}) {
  const backgroundColour = () => {
    switch (warningType) {
      case 'Severe':
        return '#FFD7DC'
      case 'Warning':
        return '#FCEAEC'
      case 'Alert':
        return '#FDF1E3'
      case 'Removed':
        return '#F5F5F5'
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '10px',
        paddingBottom: '10px',
        backgroundColor: backgroundColour()
      }}
    >
      <div style={{ flex: '0 0 auto', marginRight: '12px' }}>
        <img
          src={iconSrc}
          alt={`${warningType} Warning Icon`}
          style={{ width: '100px', height: '75px' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginRight: '20px'
        }}
      >
        <span className='govuk-!-font-size-27'>{locationsCount}</span>
        <span className='govuk-!-font-size-16'>locations</span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginRight: '10px'
        }}
      >
        <Link
          className='govuk-link govuk-!-font-weight-bold govuk-!-font-size-19'
          style={{ marginRight: '10px', color: '#1d70b8' }}
        >
          {warningText}
        </Link>
        <span className='govuk-caption-m govuk-!-font-size-16'>
          {warningDescription}
        </span>
      </div>

      <div
        className='govuk-checkboxes govuk-checkboxes--small custom-checkbox-container'
        style={{ flex: '0 0 auto', marginLeft: 'auto' }}
      >
        <div className='govuk-checkboxes__item'>
          <input
            className='govuk-checkboxes__input'
            type='checkbox'
            checked={showFloodType}
            onChange={() => updateFloodTypeVisibility(!showFloodType)}
          />
          <span className='govuk-label govuk-checkboxes__label' />
        </div>
      </div>
    </div>
  )
}

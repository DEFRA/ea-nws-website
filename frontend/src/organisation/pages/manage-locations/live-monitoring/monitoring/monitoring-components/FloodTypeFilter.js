// FloodTypeFilter.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function FloodTypeFilter ({
  iconSrc,
  locationsCount,
  warningType,
  warningText,
  warningDescription,
  showFloodType,
  updateFloodTypeVisibility
}) {
  const getWarningClass = () => {
    switch (warningType) {
      case 'Severe':
        return 'live-map-filter-severe'
      case 'Warning':
        return 'live-map-filter-warning'
      case 'Alert':
        return 'live-map-filter-alert'
      case 'Removed':
        return 'live-map-filter-removed'
    }
  }

  return (
    <div className={`live-map-filter-container ${getWarningClass()}`}>
      <div className='live-map-filter-icon'>
        <img
          src={iconSrc}
          alt={`${warningType} Warning Icon`}
          className='live-map-filter-image'
        />
      </div>
      <div className='live-map-filter-count'>
        <span className='govuk-!-font-size-27'>{locationsCount}</span>
        <span className='live-map-filter-locations'>locations</span>
      </div>
      <div className='live-map-filter-description'>
        <Link className='govuk-link govuk-!-font-weight-bold govuk-!-font-size-16 text-nowrap govuk-!-margin-bottom-1'>
          {warningText}
        </Link>
        <span className='live-map-filter-caption govuk-caption-m'>
          {warningDescription}
        </span>
      </div>
      <div className='live-map-filter-checkbox govuk-checkboxes govuk-checkboxes--small custom-checkbox-container'>
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

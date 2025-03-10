import React from 'react'
import CheckBox from '../../../common/components/gov-uk/CheckBox'
import MapInteractiveKey from './MapInteractiveKey'

export default function FullMapInteractiveKey ({
  showFloodWarningAreas,
  setShowFloodWarningAreas,
  showFloodAlertAreas,
  setShowFloodAlertAreas,
  showFloodExtents,
  setShowFloodExtents,
  showLocationsWithinFloodAreas,
  setShowLocationsWithinFloodAreas,
  showLocationsOutsideFloodAreas,
  setShowLocationsOutsideFloodAreas,
  showOnlyFilteredLocations,
  setShowOnlyFilteredLocations,
  locations
}) {
  const locationsInsideFloodAreas = () => (
    <div
      className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
      data-module='govuk-checkboxes'
    >
      <CheckBox
        name='WithinFloodAreas'
        onChange={() =>
          setShowLocationsWithinFloodAreas(!showLocationsWithinFloodAreas)}
        checked={showLocationsWithinFloodAreas}
      />
      <p style={{ fontSize: '14px', margin: '0px 0px 0px -15px' }}>
        Within flood areas (
        {
          locations.filter(
            (obj) => obj.additionals.other?.alertTypes?.length > 0
          ).length
        }
        )
      </p>
      <br />
    </div>
  )

  const locationsOutsideFloodAreas = () => (
    <div
      className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
      data-module='govuk-checkboxes'
    >
      <CheckBox
        name='OutsideFloodAreas'
        onChange={() =>
          setShowLocationsOutsideFloodAreas(!showLocationsOutsideFloodAreas)}
        checked={showLocationsOutsideFloodAreas}
      />
      <p
        style={{
          fontSize: '14px',
          margin: '0px 0px 0px -15px'
        }}
      >
        Outside flood areas (
        {
          locations.filter(
            (obj) => obj.additionals.other?.alertTypes?.length === 0
          ).length
        }
        )
      </p>
      <br />
    </div>
  )

  const showFilteredLocations = () => (
    <div className='govuk-radios__item '>
      <input
        className='govuk-radios__input'
        id='locations-filtered'
        name='locationFilter'
        type='radio'
        value='filteredLocations'
        checked={showOnlyFilteredLocations === true}
        onChange={() => setShowOnlyFilteredLocations(true)}
      />
      <label
        className='govuk-label govuk-radios__label'
        htmlFor='locations-filtered'
        style={{ fontSize: '16px', margin: 0 }}
      >
        Only show filtered locations
      </label>
    </div>
  )

  const showAllLocations = () => (
    <div className='govuk-radios__item govuk-!-margin-right-0'>
      <input
        className='govuk-radios__input'
        id='locations-all'
        name='locationFilter'
        type='radio'
        value='allLocations'
        checked={showOnlyFilteredLocations === false}
        onChange={() => setShowOnlyFilteredLocations(false)}
      />
      <label
        className='govuk-label govuk-radios__label'
        htmlFor='locations-all'
        style={{ fontSize: '16px', margin: 0 }}
      >
        Show all locations
      </label>
    </div>
  )

  return (
    <div>
      {/* Flood areas */}
      <MapInteractiveKey
        showFloodWarningAreas={showFloodWarningAreas}
        setShowFloodWarningAreas={setShowFloodWarningAreas}
        showFloodAlertAreas={showFloodAlertAreas}
        setShowFloodAlertAreas={setShowFloodAlertAreas}
        showFloodExtents={showFloodExtents}
        setShowFloodExtents={setShowFloodExtents}
      />

      {/* Locations */}
      {locations && (
        <>
          <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
            Locations ({locations.length})
          </div>
          {locationsInsideFloodAreas()}
          {locationsOutsideFloodAreas()}

          <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />

          {/* Location filter */}
          <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
            Location filter
          </div>
          <div
            className='govuk-radios govuk-radios--small'
            data-module='govuk-radios'
          >
            {showFilteredLocations()}
            {showAllLocations()}
          </div>

          <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />

          <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
            This is not a live flood map
          </span>
          <span className='govuk-caption-m govuk-!-font-size-16'>
            it shows fixed areas that we provide flood warnings and alerts for.
          </span>
        </>
      )}
    </div>
  )
}

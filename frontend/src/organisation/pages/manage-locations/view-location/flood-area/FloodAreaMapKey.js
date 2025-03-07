import React from 'react'
import CheckBox from '../../../../../common/components/gov-uk/CheckBox'

export default function FloodAreaMapKey ({
  showLocationsWithinFloodAreas,
  setShowLocationsWithinFloodAreas,
  showLocationsOutsideFloodAreas,
  setShowLocationsOutsideFloodAreas,
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
      <p style={{ margin: '0px 0px 0px -15px' }}>
        Within flood areas (
        {
          locations.filter(
            (obj) => obj?.within === true
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
          margin: '0px 0px 0px -15px'
        }}
      >
        Outside flood areas (
        {
          locations.filter(
            (obj) => obj?.within === false
          ).length
        }
        )
      </p>
      <br />
    </div>
  )


  return (
<>    
{/* Flood areas */}
      <div>
      <span className='govuk-heading-m govuk-!-font-size-24 govuk-!-margin-bottom-2'>
        Key
      </span>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
      <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-2 govuk-!-margin-bottom-0'>
        Flood areas
      </div>
        <div className='locations-map-key govuk-!-margin-top-2'>
          <div className='org-flood-warning-item'>
            <span className='org-flood-warning-square warning-square' style={{alignSelf: 'flex-start'}} />
            <span className='org-flood-warning-text'>
              Flood warning and <br />
              severe area
            </span>
          </div>
          <br />
        </div>
        <div className='locations-map-key govuk-!-margin-top-2'>
          <div className='org-flood-alert-item'>
            <div className='org-flood-warning-square alert-square' style={{alignSelf: 'flex-start'}} />
            <span className='org-flood-warning-text'>Flood alert area</span>
          </div>
        </div>
    </div>

      {/* Locations */}
      {locations && (
        <>
          <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
            Locations ({locations.length})
          </div>
          {locationsInsideFloodAreas()}
          {locationsOutsideFloodAreas()}

          <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
          <div style={{marginTop: 'auto'}}>
            <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
              This is not a live flood map
            </span>
            <span className='govuk-caption-m govuk-!-font-size-16'>
              It shows fixed areas we provide flood warnings and alerts for.
            </span>
          </div>
        </>
      )}
    </>
  )
}

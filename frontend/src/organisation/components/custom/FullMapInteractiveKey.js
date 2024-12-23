import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PublicSharpIcon from '@mui/icons-material/PublicSharp'
import React from 'react'
import alertIcon from '../../../common/assets/images/alert_area_icon.png'
import warningIcon from '../../../common/assets/images/warning_area_icon.png'
import CheckBox from '../../../common/components/gov-uk/CheckBox'

export default function MapInteractiveKey ({
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
  return (
    <div>
      <span className='govuk-heading-m govuk-!-font-size-18 govuk-!-margin-bottom-2'>
        Key
      </span>

      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />

      {/* Flood areas */}
      <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
        Flood areas
      </div>
      <div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodWarningAndSevereArea'
            onChange={() => setShowFloodWarningAreas(!showFloodWarningAreas)}
            checked={showFloodWarningAreas}
          />
          <img
            src={warningIcon}
            style={{
              width: '24px',
              height: 'auto',
              marginLeft: '-15px',
              marginRight: '7px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>
            Flood warning and severe area
          </p>
          <br />
        </div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodAlertArea'
            onChange={() => setShowFloodAlertAreas(!showFloodAlertAreas)}
            checked={showFloodAlertAreas}
          />
          <FontAwesomeIcon
            icon={PublicSharpIcon}
            size='xl'
            style={{ marginLeft: '-15px', marginRight: '7px' }}
          />
          <img
            src={alertIcon}
            style={{
              width: '24px',
              height: 'auto',
              marginLeft: '-15px',
              marginRight: '7px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>Flood alert area</p>
        </div>
        <div
          className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
          data-module='govuk-checkboxes'
        >
          <CheckBox
            name='FloodExtent'
            onChange={() => setShowFloodExtents(!showFloodExtents)}
            checked={showFloodExtents}
          />
          <FontAwesomeIcon
            icon={PublicSharpIcon}
            size='xl'
            style={{ marginLeft: '-15px', marginRight: '7px' }}
          />
          <img
            src={alertIcon}
            style={{
              width: '24px',
              height: 'auto',
              marginLeft: '-15px',
              marginRight: '7px'
            }}
          />
          <p style={{ fontSize: '14px', margin: 0 }}>Flood extent</p>
        </div>
      </div>

      {/* Locations */}
      <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
        Locations ({locations.length})
      </div>
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

      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />

      {/* Location filter */}
      <div className='govuk-heading-m govuk-!-font-size-16 govuk-!-margin-top-3 govuk-!-margin-bottom-2'>
        Location filter
      </div>
      <div
        className='govuk-radios govuk-radios--small'
        data-module='govuk-radios'
      >
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
      </div>

      <hr class='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />

      <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
        This is not a live flood map
      </span>
      <span className='govuk-caption-m govuk-!-font-size-16'>
        It shows fixed areas we provide flood warnings and alerts for.
      </span>
    </div>
  )
}

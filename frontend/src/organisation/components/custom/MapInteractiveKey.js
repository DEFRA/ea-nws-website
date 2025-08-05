import React from 'react'
import CheckBox from '../../../common/components/gov-uk/CheckBox'

export default function MapInteractiveKey({
  showFloodWarningAreas,
  setShowFloodWarningAreas,
  showFloodAlertAreas,
  setShowFloodAlertAreas,
  showFloodExtents,
  setShowFloodExtents
}) {
  return (
    <div>
      <h2 className='govuk-heading-m govuk-!-font-size-18 govuk-!-margin-bottom-2'>
        Key
      </h2>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
      <fieldset className='govuk-fieldset'>
        <legend
          id='map-key-flood-legend'
          className='govuk-fieldset__legend govuk-fieldset__legend--m govuk-!-font-size-14 govuk-!-margin-top-2 govuk-!-margin-bottom-0'
        >
          Flood areas
        </legend>
        <div style={{ fontSize: '14px' }}>
          <div
            className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
            data-module='govuk-checkboxes'
          >
            <CheckBox
              id='map-key-flood-warning'
              name='FloodWarningAndSevereArea'
              onChange={() => setShowFloodWarningAreas(!showFloodWarningAreas)}
              checked={showFloodWarningAreas}
            />
            <div className='org-flood-warning-item'>
              <span
                className='org-flood-warning-square warning-square'
                style={{ marginLeft: '-1rem' }}
              />
              <span className='org-flood-warning-text'>
                Flood warning and <br />
                severe area
              </span>
            </div>
            <br />
          </div>
          <div
            className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
            data-module='govuk-checkboxes'
          >
            <CheckBox
              id='map-key-flood-alert'
              name='FloodAlertArea'
              onChange={() => setShowFloodAlertAreas(!showFloodAlertAreas)}
              checked={showFloodAlertAreas}
            />
            <div className='org-flood-alert-item'>
              <div
                className='org-flood-warning-square alert-square'
                style={{ marginLeft: '-1rem' }}
              />
              <span className='org-flood-warning-text'>Flood alert area</span>
            </div>
          </div>
          <div
            className='govuk-checkboxes govuk-checkboxes--small locations-map-key'
            data-module='govuk-checkboxes'
          >
            <CheckBox
              id='map-key-flood-extent'
              name='FloodExtent'
              onChange={() => setShowFloodExtents(!showFloodExtents)}
              checked={showFloodExtents}
            />
            <div className='org-flood-alert-item'>
              <div
                className='org-flood-warning-square alert-square'
                style={{ marginLeft: '-1rem' }}
              />
              <span className='org-flood-warning-text'>Flood extent</span>
            </div>
          </div>
        </div>
      </fieldset>
      <hr className='govuk-section-break govuk-section-break--visible govuk-!-margin-top-1' />
    </div>
  )
}

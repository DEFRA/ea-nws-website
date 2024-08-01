import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../../common/components/custom/FloodWarningKey'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import CheckBox from '../../../common/components/gov-uk/CheckBox'
import InsetText from '../../../common/components/gov-uk/InsetText'

export default function LocationInAlertAreaLayout ({ continueToNextPage }) {
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const additionalAlerts = useSelector(
    (state) => state.session.additionalAlerts
  )

  const handleSubmit = () => {
    // we need to add this to the profile - TODO
    continueToNextPage()
  }

  return (
    <>
          <div className='govuk-body'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <Link onClick={() => navigate(-1)} className='govuk-back-link'>
                  Back
                </Link>
                <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                  {additionalAlerts
                    ? 'You can also get flood alerts (optional)'
                    : 'You can get flood alerts for this location'}
                </h1>
                <InsetText text={selectedLocation.name} />
              </div>
              <div className='govuk-grid-column-three-quarters'>
                <Map types={['alert']} />
                <FloodWarningKey type='alert' />
              </div>
              <div className='govuk-grid-column-two-thirds'>
                <p className='govuk-!-margin-top-6'>
                  These are early alerts of possible flooding to help you be
                  prepared.
                </p>
                <p>The following may be at risk:</p>
                <ul className='govuk-list govuk-list--bullet'>
                  <li>fields, recreational land and car parks</li>
                  <li>minor roads</li>
                  <li>farmland</li>
                  <li>coastal areas affected by spray or waves overtopping</li>
                </ul>
                <p>We usually send these:</p>
                <ul className='govuk-list govuk-list--bullet'>
                  <li>2 to 12 hours before flooding</li>
                  <li>during waking hours when possible</li>
                </ul>
                {additionalAlerts && (
                  <>
                    <CheckBox
                      onChange={() => setIsChecked(!isChecked)}
                      checked={isChecked}
                      label='Yes, I want these'
                    />
                  </>
                )}
                <Button
                  text={
                    additionalAlerts
                      ? 'Continue'
                      : 'Confirm you want this location'
                  }
                  className='govuk-button govuk-!-margin-top-5'
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
    </>
  )
}

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import Map from '../../custom-components/Map'
import Button from '../../gov-uk-components/Button'
import CheckBox from '../../gov-uk-components/CheckBox'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import {
  addLocation,
  updateLocationsFloodCategory
} from '../../services/ProfileServices'

export default function LocationInAlertAreaLayout({
  continueToNextPage,
  continueToSearchResultsPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const additionalAlerts = useSelector(
    (state) => state.session.additionalAlerts
  )

  const handleSubmit = () => {
    if (additionalAlerts && isChecked) {
      // location can also receieve alert areas as well as warning, user has checked to get notifications
      // for alert areas too

      //TODO - FIX THIS FUNCTION BELOW
      const updatedProfile = updateLocationsFloodCategory(
        profile,
        selectedLocation,
        ['severe', 'alert']
      )
      dispatch(setProfile(updatedProfile))
    } else if (additionalAlerts && !isChecked) {
      // scenario where user has pressed back and un-checked to get notifications for alert areas
      const updatedProfile = updateLocationsFloodCategory(
        profile,
        selectedLocation,
        ['severe']
      )
      dispatch(setProfile(updatedProfile))
    } else {
      // location can only receieve flood alerts
      const { postcode, ...locationWithoutPostcode } = selectedLocation

      const locationWithAlertType = {
        ...locationWithoutPostcode,
        categories: ['alert']
      }

      const updatedProfile = addLocation(profile, locationWithAlertType)
      dispatch(setProfile(updatedProfile))
    }

    // we need to add this to the profile
    continueToNextPage()
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
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
                {!additionalAlerts && (
                  <Link
                    onClick={(e) => {
                      e.preventDefault()
                      continueToSearchResultsPage()
                    }}
                  >
                    Choose different location
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

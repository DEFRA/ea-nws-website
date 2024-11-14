import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import CitizenAccountNavigation from '../../../../common/components/custom/CitizenAccountNavigation'
import FloodWarningKey from '../../../../common/components/custom/FloodWarningKey'
import Map from '../../../../common/components/custom/Map'
import Button from '../../../../common/components/gov-uk/Button'
import Details from '../../../../common/components/gov-uk/Details'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'
import AlertType from '../../../../common/enums/AlertType'
import { setProfile } from '../../../../common/redux/userSlice'
import { backendCall } from '../../../../common/services/BackendService'
import {
  getRegistrationParams,
  removeLocation,
  updateLocationsAlertTypes
} from '../../../../common/services/ProfileServices'

const floodWarningCardDetails = (
  <>
    <p>They tell you when flooding is expected and will pose a risk to:</p>
    <ul className='govuk-list govuk-list--bullet'>
      <li>life and communities</li>
      <li>homes and businesses</li>
      <li>railway lines and infrastructure</li>
      <li>roads</li>
      <li>coastal areas affected by spray or waves overtopping</li>
      <li>flood plains, including caravans park and campsites</li>
      <li>major tourist and leisure attractions</li>
    </ul>
  </>
)

const floodAlertCardDetails = (
  <>
    <p>They tell you to be prepared and flooding could pose a risk to:</p>
    <ul className='govuk-list govuk-list--bullet'>
      <li>fields, recreational land and carparks</li>
      <li>minor roads</li>
      <li>farmland</li>
      <li>coastal areas affected by spray or waves overtopping</li>
    </ul>
  </>
)

export default function ViewLocationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { type } = useParams()
  const [successMessage, setSuccessMessage] = useState('')
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  let alertTypes = selectedLocation.meta_data.location_additional.alert_types
  const [optionalAlerts, setOptionalAlerts] = useState(
    alertTypes.includes(AlertType.FLOOD_ALERT)
  )

  const areaAreas = type === 'both' ? ['severe', 'alert'] : [type]

  const deleteLocation = async () => {
    const data = {
      authToken: authToken,
      locationId: selectedLocation.id,
      partnerId: 1 // this is currently a hardcoded value - geosafe to update us
    }

    const { errorMessage } = await backendCall(
      data,
      'api/partner/unregister_location_from_partner',
      navigate
    )

    if (!errorMessage) {
      const updatedProfile = removeLocation(profile, selectedLocation.address)
      await dispatch(setProfile(updatedProfile))

      await updateGeosafeProfile()

      navigate('/manage-locations/remove', {
        state: { name: selectedLocation.address }
      })
    }
  }

  const handleOptionalAlertSave = async (e) => {
    e.preventDefault()

    if (optionalAlerts) {
      if (!alertTypes.includes(AlertType.FLOOD_ALERT)) {
        alertTypes = alertTypes.push(AlertType.FLOOD_ALERT)
      }
    } else {
      alertTypes = alertTypes.filter((type) => type !== AlertType.FLOOD_ALERT)
    }

    const data = {
      authToken: authToken,
      locationId: selectedLocation.id,
      partnerId: 1, // this is currently a hardcoded value - geosafe to update us on what it is
      params: getRegistrationParams(profile, alertTypes)
    }

    const { errorMessage } = await backendCall(
      data,
      'api/partner/update_location_registration',
      navigate
    )

    if (!errorMessage) {
      await updateLocationAlerts(alertTypes)

      await updateGeosafeProfile()

      const message = `You've turned ${
        optionalAlerts ? 'on' : 'off'
      } early flood alerts`
      setSuccessMessage(message)
    }
  }

  const updateLocationAlerts = async (alertTypes) => {
    const updatedProfile = updateLocationsAlertTypes(
      profile,
      selectedLocation,
      alertTypes
    )
    dispatch(setProfile(updatedProfile))
  }

  const updateGeosafeProfile = async () => {
    const dataToSend = { authToken: authToken, profile: profile }
    await backendCall(dataToSend, 'api/profile/update', navigate)
  }

  return (
    <>
      <CitizenAccountNavigation currentPage='/home' />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-three-quarters'>
              <BackLink onClick={() => navigate(-1)} />
              {successMessage && (
                <NotificationBanner
                  className={
                    'govuk-notification-banner govuk-notification-banner--success govuk-!-margin-top-4'
                  }
                  title={'Success'}
                  text={successMessage}
                />
              )}
              <h1 className='govuk-heading-l'>{selectedLocation.address}</h1>
              <Map types={areaAreas} />
              <FloodWarningKey type={type} />
              <h2 className='govuk-heading-m govuk-!-margin-top-5 govuk-!-margin-bottom-5'>
                Flood messages you get
              </h2>

              {/* flood warnings card */}
              {(type === 'both' || type === 'severe') && (
                <div className='govuk-summary-card'>
                  <div
                    className='govuk-summary-card__title-wrapper'
                    style={{ flexDirection: 'column' }}
                  >
                    <h2 className='govuk-summary-card__title govuk-!-font-size-24'>
                      Severe flood warnings and flood warnings
                    </h2>
                    <p className='govuk-!-margin-bottom-1 govuk-!-margin-top-0'>
                      Danger to life or property - act immediately
                    </p>
                  </div>
                  <div className='govuk-summary-card__content'>
                    <p className='govuk-body'>
                      Sent in last year: <b>6</b>
                    </p>
                    <Details
                      title='Risks when these are in force'
                      text={floodWarningCardDetails}
                    />
                  </div>
                </div>
              )}

              {/* flood alerts card */}
              {(type === 'both' || type === 'alert') && (
                <div className='govuk-summary-card'>
                  <div className='govuk-summary-card__title-wrapper govuk-!-padding-0'>
                    <div
                      className='govuk-summary-card__title-wrapper'
                      style={{ flexDirection: 'column' }}
                    >
                      <h2 className='govuk-summary-card__title govuk-!-font-size-24'>
                        Flood alerts {type === 'both' && '(optional)'}
                      </h2>
                      <p className='govuk-!-margin-bottom-1 govuk-!-margin-top-0'>
                        Early alerts that flooding is possible - be prepared
                      </p>
                    </div>
                    {type === 'both' && (
                      <div
                        className='govuk-summary-card__title-wrapper'
                        style={{ alignItems: 'center' }}
                      >
                        <div
                          className='govuk-radios govuk-radios--small govuk-radios--inline'
                          data-module='govuk-radios'
                        >
                          <div className='govuk-radios__item govuk-!-margin-right-0'>
                            <input
                              className='govuk-radios__input'
                              id='alert-on'
                              name='alert'
                              type='radio'
                              value='on'
                              checked={optionalAlerts === true}
                              onChange={() => setOptionalAlerts(true)}
                            />
                            <label
                              className='govuk-label govuk-radios__label'
                              htmlFor='alert-on'
                            >
                              On
                            </label>
                          </div>
                          <div className='govuk-radios__item govuk-!-margin-right-0'>
                            <input
                              className='govuk-radios__input'
                              id='alert-off'
                              name='alert'
                              type='radio'
                              value='off'
                              checked={optionalAlerts === false}
                              onChange={() => setOptionalAlerts(false)}
                            />
                            <label
                              className='govuk-label govuk-radios__label'
                              htmlFor='alert-off'
                            >
                              Off
                            </label>
                          </div>
                        </div>

                        <Link
                          onClick={(e) => handleOptionalAlertSave(e)}
                          className='govuk-body govuk-link inline-link govuk-!-margin-bottom-0'
                        >
                          Save
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className='govuk-summary-card__content'>
                    <p className='govuk-body'>
                      {optionalAlerts
                        ? 'You currently get these early flood alerts.'
                        : 'You turned these early flood alerts off.'}
                    </p>
                    <p className='govuk-body'>
                      Sent in last year: <b>27</b>
                    </p>
                    <Details
                      title='Risks when these are in force'
                      text={floodAlertCardDetails}
                    />
                  </div>
                </div>
              )}

              <h2 className='govuk-heading-m'>
                To stop all flood messages for this location
              </h2>
              <Button
                onClick={deleteLocation}
                className='govuk-button govuk-button--warning'
                text='Remove location'
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

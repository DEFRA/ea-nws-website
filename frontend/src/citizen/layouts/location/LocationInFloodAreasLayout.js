import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import floodAlertIcon from '../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../common/assets/images/flood_warning.svg'
import floodSevereWarningIcon from '../../../common/assets/images/severe_flood_warning.svg'
import BackLink from '../../../common/components/custom/BackLink'
import FloodMessagesTable from '../../../common/components/custom/FloodMessagesTable'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import Details from '../../../common/components/gov-uk/Details'
import AlertType from '../../../common/enums/AlertType'
import {
  getLocationOtherAdditional,
  setProfile
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import {
  addLocation,
  findPOIByAddress,
  getRegistrationParams,
  removeLocation
} from '../../../common/services/ProfileServices'

export default function LocationInSevereWarningAreaLayout({
  continueToNextPage,
  updateGeoSafeProfile = true
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const locationAlertTypes = getLocationOtherAdditional(
    selectedLocation?.additionals,
    'alertTypes'
  )
  const [floodAreas, setFloodAreas] = useState([])
  const [severeWarningAreaNames, setSevereWarningAreaNames] = useState(
    new Set()
  )
  const [alertAreaNames, setAlertAreaNames] = useState(new Set())

  // we should update this so that it is based on the enum value
  const mapAreas = locationAlertTypes.includes(AlertType.SEVERE_FLOOD_WARNING)
    ? ['severe', 'alert']
    : ['alert']
  const [partnerId, setPartnerId] = useState(false)

  async function getPartnerId() {
    const { data } = await backendCall('data', 'api/service/get_partner_id')
    setPartnerId(data)
  }

  useEffect(() => {
    getPartnerId()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    let updatedProfile

    updatedProfile = await addLocationWithinFloodArea()

    if (updateGeoSafeProfile) {
      updatedProfile = await updateGeosafeProfile(updatedProfile)

      // if user is in sign up flow, then profile returned will be undefined
      if (updatedProfile) {
        await registerLocationToPartner(updatedProfile)
        dispatch(setProfile(updatedProfile))
      }
    }
    continueToNextPage()
  }

  const addLocationWithinFloodArea = async () => {
    // geosafe doesnt accept locations with postcodes - need to remove this from the object
    const { postcode, ...locationWithoutPostcode } = selectedLocation

    const updatedProfile = addLocation(profile, locationWithoutPostcode)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const registerLocationToPartner = async (profile) => {
    const location = findPOIByAddress(profile, selectedLocation.address)

    const data = {
      authToken,
      locationId: location.id,
      partnerId,
      params: getRegistrationParams(profile, locationAlertTypes)
    }

    await backendCall(
      data,
      'api/partner/register_location_to_partner',
      navigate
    )
  }

  const handleUserNavigatingBack = async () => {
    let updatedProfile

    updatedProfile = await removeLocationWithinFloodArea()

    if (updateGeoSafeProfile) {
      updatedProfile = await updateGeosafeProfile(profile)
      // if user is in sign up flow, then profile returned will be undefined
      if (updatedProfile) {
        unregisterLocationFromPartner(updatedProfile)
        dispatch(setProfile(updatedProfile))
      }
    }

    navigate(-1)
  }

  const removeLocationWithinFloodArea = async () => {
    const updatedProfile = removeLocation(profile, selectedLocation.address)
    dispatch(setProfile(updatedProfile))

    return updatedProfile
  }

  const unregisterLocationFromPartner = async (updatedProfile) => {
    const location = findPOIByAddress(updatedProfile, selectedLocation.address)

    // accomodates situation where user presses back before the location is stored in the profile
    if (location) {
      const data = {
        authToken,
        locationId: location.id,
        partnerId
      }

      await backendCall(
        data,
        'api/partner/unregister_location_from_partner',
        navigate
      )
    }
  }

  const updateGeosafeProfile = async (updatedProfile) => {
    const dataToSend = { authToken, profile: updatedProfile }
    const { data } = await backendCall(
      dataToSend,
      'api/profile/update',
      navigate
    )

    return data.profile
  }

  useEffect(() => {
    let severeNames = new Set()
    let alertNames = new Set()
    floodAreas?.forEach((area) => {
      if (area.properties.category.toLowerCase().includes('warning')) {
        severeNames.add(area.properties.TA_Name)
      } else if (area.properties.category.toLowerCase().includes('alert')) {
        alertNames.add(area.properties.TA_Name)
      }
    })

    setSevereWarningAreaNames(severeNames)
    setAlertAreaNames(alertNames)
  }, [floodAreas])

  return (
    <>
      <BackLink onClick={() => handleUserNavigatingBack()} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              You can get flood messages for your location
            </h1>
            <Map types={mapAreas} setFloodAreas={setFloodAreas} />
            <br />
            <p>We'll send you the following flood messages.</p>
            <FloodMessagesTable
              types={locationAlertTypes}
              severeFloodWarningAreaNames={severeWarningAreaNames}
              alertFloodWarningAreaNames={alertAreaNames}
            />
            <Details
              title={'Read more on the difference between warnings and alerts'}
              text={
                <>
                  <table className='govuk-table desktop-table'>
                    <thead className='govuk-table__head'>
                      <tr className='govuk-table__row'>
                        <th
                          scope='col'
                          className='govuk-table__header govuk-!-width-one-third'
                        >
                          Type of flood message
                        </th>
                        <th
                          scope='col'
                          className='govuk-table__header govuk-!-width-one-third'
                        >
                          What it means
                        </th>
                        <th
                          scope='col'
                          className='govuk-table__header govuk-!-width-one-third'
                        >
                          What's at the risk?
                        </th>
                      </tr>
                    </thead>
                    <tbody className='govuk-table__body'>
                      <tr className='govuk-table__row'>
                        <th scope='row' className='govuk-table__header'>
                          <img
                            src={floodSevereWarningIcon}
                            alt='Severe flood warning Icon'
                            style={{ width: '33px', height: '33px' }}
                          />
                          <span className='govuk-!-padding-left-7'>
                            Severe flood warning
                          </span>
                        </th>
                        <td className='govuk-table__cell'>
                          Danger to life - act now
                        </td>
                        <td className='govuk-table__cell'>
                          Risk of severe flooding and major disruption. There
                          could be danger to life and property and you’ll need
                          to act immediately.
                        </td>
                      </tr>
                      <tr className='govuk-table__row'>
                        <th scope='row' className='govuk-table__header'>
                          <img
                            src={floodWarningIcon}
                            alt='Flood warning Icon'
                            style={{ width: '33px', height: '33px' }}
                          />
                          <span className='govuk-!-padding-left-7'>
                            Flood warning
                          </span>
                        </th>
                        <td className='govuk-table__cell'>
                          Flooding expected - act now
                        </td>
                        <td className='govuk-table__cell'>
                          Flooding may affect:
                          <ul className='govuk-list--bullet'>
                            <li>homes and businesses</li>
                            <li>roads and railway lines</li>
                            <li>
                              coastal areas affected by spray or waves
                              overtopping
                            </li>
                            <li>
                              flood plains, including caravans park and
                              campsites
                            </li>
                            <li> tourist and leisure attractions</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className='govuk-table__row'>
                        <th scope='row' className='govuk-table__header'>
                          <img
                            src={floodAlertIcon}
                            alt='Flood alert Icon'
                            style={{ width: '33px', height: '33px' }}
                          />
                          <span className='govuk-!-padding-left-7'>
                            Flood alert
                          </span>
                        </th>
                        <td className='govuk-table__cell'>
                          Early alerts of possible flooding - be prepared
                        </td>
                        <td className='govuk-table__cell'>
                          The following may be at risk:
                          <ul className='govuk-list--bullet'>
                            <li>fields, recreational land and car parks</li>
                            <li>minor roads</li>
                            <li>farmland</li>
                            <li>
                              coastal areas affected by spray or waves
                              overtopping
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className='govuk-table mobile-table'>
                    <tbody className='govuk-table__body'>
                      <tr className='govuk-table__row'>
                        <td className='govuk-table__cell govuk-!-width-one-half'>
                          <img
                            src={floodSevereWarningIcon}
                            alt='Severe flood warning Icon'
                            style={{ width: '35px', height: '33px' }}
                          />
                          <span className='govuk-!-padding-left-1 govuk-!-font-weight-bold'>
                            Severe flood warning
                          </span>
                          <p className='govuk-hint govuk-!-padding-left-9'>
                            Danger to life - act now
                          </p>
                        </td>
                        <td className='govuk-table__cell govuk-!-width-one-half'>
                          Risk of severe flooding and major disruption. There
                          could be danger to life and property and you’ll need
                          to act immediately.
                        </td>
                      </tr>
                      <tr className='govuk-table__row'>
                        <td
                          scope='row'
                          className='govuk-table__cell govuk-!-width-one-half'
                        >
                          <img
                            src={floodWarningIcon}
                            alt='Flood warning Icon'
                            style={{ width: '35px', height: '33px' }}
                          />
                          <span className='govuk-!-padding-left-1 govuk-!-font-weight-bold'>
                            Flood warning
                          </span>
                          <p className='govuk-hint govuk-!-padding-left-9'>
                            Flooding expected - act{' '}
                          </p>
                        </td>
                        <td className='govuk-table__cell govuk-!-width-one-half'>
                          Flooding may affect:
                          <ul className='govuk-list--bullet'>
                            <li>homes and businesses</li>
                            <li>roads and railway lines</li>
                            <li>
                              coastal areas affected by spray or waves
                              overtopping
                            </li>
                            <li>
                              flood plains, including caravans park and
                              campsites
                            </li>
                            <li> tourist and leisure attractions</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className='govuk-table__row'>
                        <td
                          scope='row'
                          className='govuk-table__cell govuk-!-width-one-half'
                        >
                          <img
                            src={floodAlertIcon}
                            alt='Flood alert Icon'
                            style={{ width: '35px', height: '33px' }}
                          />
                          <span className='govuk-!-padding-left-1 govuk-!-font-weight-bold'>
                            Flood alert
                          </span>
                          <p className='govuk-hint govuk-!-padding-left-9'>
                            Early alerts of possible flooding - be prepared
                          </p>
                        </td>

                        <td className='govuk-table__cell govuk-!-width-one-half'>
                          The following may be at risk:
                          <ul className='govuk-list--bullet'>
                            <li>fields, recreational land and car parks</li>
                            <li>minor roads</li>
                            <li>farmland</li>
                            <li>
                              coastal areas affected by spray or waves
                              overtopping
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              }
            />
            <Button
              text='I want these'
              className='govuk-button'
              onClick={handleSubmit}
            />
            &nbsp; &nbsp;
            <Link
              onClick={() => navigate(-1)}
              className='govuk-link'
              style={{
                display: 'inline-block',
                padding: '8px 10px 7px',
                cursor: 'pointer'
              }}
            >
              Choose different location
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

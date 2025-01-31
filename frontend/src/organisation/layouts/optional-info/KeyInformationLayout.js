import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import Details from '../../../common/components/gov-uk/Details'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  getLocationAdditionals,
  setCurrentLocationCriticality,
  setCurrentLocationName,
  setCurrentLocationReference,
  setCurrentLocationType
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'

export default function KeyInformationLayout ({ flow, navigateToNextPage }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)
  const additionalData = useSelector((state) => getLocationAdditionals(state))
  const [locationName, setLocationName] = useState(
    additionalData.locationName ? additionalData.locationName : ''
  )
  const [locationNameError, setLocationNameError] = useState('')
  const [internalReference, setInternalReference] = useState(
    additionalData.internal_reference ? additionalData.internal_reference : ''
  )
  const [businessCriticality, setBusinessCriticality] = useState(
    additionalData.business_criticality
      ? additionalData.business_criticality
      : ''
  )
  const [locationType, setLocationType] = useState(
    additionalData.location_type ? additionalData.location_type : ''
  )

  useEffect(() => {
    setLocationNameError('')
  }, [locationName])

  const handleSubmit = async () => {
    // location name can be amended when a user is editing a locations key information
    if (flow === 'edit') {
      // only execute if location name has been changed
      if (locationName !== additionalData.locationName) {
        if (locationName) {
          const dataToSend = { authToken, orgId, locationName }
          const { errorMessage } = await backendCall(
            dataToSend,
            'api/locations/check_duplicate',
            navigate
          )

          if (errorMessage) {
            if (errorMessage === 'duplicate location') {
              setLocationNameError('A location with this name exists')
            } else {
              setLocationNameError('Something went wrong, try again')
            }
            return
          } else {
            dispatch(setCurrentLocationName(locationName))
          }
        } else {
          setLocationNameError('Enter a location name')
          return
        }
      }
    }

    dispatch(setCurrentLocationReference(internalReference))
    dispatch(setCurrentLocationCriticality(businessCriticality))
    dispatch(setCurrentLocationType(locationType))

    // should update the geosafe profile here?

    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const detailsText = (
    <>
      <p>
        Providing these details will allow you to filter your organisation’s
        locations, making it quicker to find them.{' '}
      </p>
      <p>
        <h3 className='govuk-heading-s'>Internal reference</h3>
        Your internal reference, for example: PS01, unit 57, Brid_04. This can
        help you identify the location more easily.
      </p>
      <p>
        <h3 className='govuk-heading-s'>Location type</h3>
        For example, pumping station, ground floor flat, office, retail unit.
      </p>
      <p>
        <h3 className='govuk-heading-s'>Business critically</h3>
        How important the location is to your business. For example, low or
        medium business critical.
      </p>
    </>
  )

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-margin-top-5'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {locationNameError && (
              <ErrorSummary errorList={[locationNameError]} />
            )}
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              Key information
            </h1>
            <div className='govuk-body'>
              <Details title='Why add useful information?' text={detailsText} />
              {flow === 'edit' && (
                <Input
                  inputType='text'
                  name='Location name'
                  onChange={(val) => setLocationName(val)}
                  value={locationName}
                  className='govuk-input govuk-input--width-20'
                  isNameBold
                  labelSize='s'
                  error={locationNameError}
                />
              )}
              <Input
                inputType='text'
                name='Internal reference (optional)'
                onChange={(val) => setInternalReference(val)}
                value={internalReference}
                className='govuk-input govuk-input--width-20'
                isNameBold
                labelSize='s'
              />
              <Input
                inputType='text'
                name='Business criticality (optional)'
                onChange={(val) => setBusinessCriticality(val)}
                value={businessCriticality}
                className='govuk-input govuk-input--width-20'
                isNameBold
                labelSize='s'
              />
              <Input
                inputType='text'
                name='Location type (optional)'
                onChange={(val) => setLocationType(val)}
                value={locationType}
                className='govuk-input govuk-input--width-20'
                isNameBold
                labelSize='s'
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../common/components/gov-uk/Input'
import { setCurrentLocationName } from '../../../../../../common/redux/userSlice'
import { locationNameValidation } from '../../../../../../common/services/validations/LocationNameValidation'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'
import { backendCall } from '../../../../../../common/services/BackendService'

export default function LocationNamePage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const authToken = useSelector((state) => state.session.authToken)

  const locationNameUsedBefore = async (locationName) => {
    const dataToSend = { authToken, locationName }
    const { errorMessage } = await backendCall(
      dataToSend,
      'api/locations/check_duplicate',
      navigate
    )

    if (errorMessage) {
      if (errorMessage === 'duplicate location') {
        setError('')
        return errorMessage
      } else {
        setError('Something went wrong, try again')
      }
    } else{
      return
    }
  }

  const handleSubmit = async () => {
    const locationName = name.trim()
    const validationError = locationNameValidation(locationName)
    if (validationError) {
      setError(validationError)
    } else {
      const duplicateFound = await locationNameUsedBefore(locationName)
      if (error === '') {
        if (duplicateFound) {
          dispatch(setCurrentLocationName(locationName))
          navigate(orgManageLocationsUrls.add.error.alreadyExists)
        } else {
          dispatch(setCurrentLocationName(locationName))
          navigate(orgManageLocationsUrls.add.search.searchOption)
        }
      }
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>What is the location name?</h1>
            <div className='govuk-body'>
              <p>
                How you refer to the location, for example: head office, Brayton
                Water pumping station.
              </p>
              <Input
                name='Location name'
                inputType='text'
                value={name}
                onChange={(val) => setName(val)}
                error={error}
                className='govuk-input govuk-input--width-20'
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

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../../../common/components/gov-uk/Input'
import {
  setCurrentLocationPostcode,
  setLocationSearchResults
} from '../../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../../common/services/BackendService'
import { postCodeValidation } from '../../../../../../../common/services/validations/PostCodeValidation'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationPostCodeSearchPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [postCode, setPostCode] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    const postCodeValidationError = postCodeValidation(postCode)
    if (!postCodeValidationError) {
      // normalise postcode
      const dataToSend = {
        postCode: postCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
      }
      const { data, errorMessage } = await backendCall(
        dataToSend,
        'api/os-api/postcode-search',
        navigate
      )
      if (!errorMessage) {
        dispatch(setCurrentLocationPostcode(data[0].postcode))
        dispatch(setLocationSearchResults(data))
        navigate(orgManageLocationsUrls.add.search.postCodeSearchResults)
      } else {
        // show error message from OS Api postcode search
        setError(errorMessage)
      }
    } else {
      setError(postCodeValidationError)
    }
  }

  const navigateBack = async (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>

      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              What is the location's postcode?
            </h1>
            <div className='govuk-body'>
              <Input
                name='Postcode'
                inputType='text'
                value={postCode}
                onChange={(val) => setPostCode(val)}
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

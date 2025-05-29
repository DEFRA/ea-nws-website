import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import {
  setLocationPostCode,
  setLocationSearchResults,
  setLocationSearchType
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { postCodeValidation } from '../../../common/services/validations/PostCodeValidation'

export default function LocationSearchLayout({ continueToNextPage }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchOption, setSearchOption] = useState('')
  const [postCode, setPostCode] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [postCodeError, setPostCodeError] = useState('')
  const [placeNameError, setPlaceNameError] = useState('')
  const [error, setError] = useState('')

  // remove any errors if user changes search option
  useEffect(() => {
    setPostCodeError('')
    setPlaceNameError('')
    setError('')
  }, [searchOption])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!searchOption) {
      setError('Select how you want to search for your location')
    } else {
      switch (searchOption) {
        case 'Postcode': {
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
              dispatch(setLocationPostCode(data[0].postcode))
              dispatch(setLocationSearchResults(data))
              dispatch(setLocationSearchType('postcode'))
              continueToNextPage()
            } else {
              // show error message from OS Api postcode search
              setPostCodeError(errorMessage)
              setError('')
            }
            break
          } else {
            setPostCodeError(postCodeValidationError)
            break
          }
        }
        case 'TownOrPlaceName':
          if (placeName) {
            // normalise postcode
            const dataToSend = {
              name: placeName,
              filters: [
                'Bay',
                'City',
                'Coastal_Headland',
                'Estuary',
                'Group_Of_Islands',
                'Harbour',
                'Island',
                'Other_Settlement',
                'Suburban_Area',
                'Tidal_Water',
                'Town',
                'Urban_Greenspace',
                'Village'
              ],
              loop: true
            }
            const { data, errorMessage } = await backendCall(
              dataToSend,
              'api/os-api/name-search',
              navigate
            )
            if (!errorMessage) {
              dispatch(setLocationPostCode(''))
              dispatch(setLocationSearchResults(data))
              dispatch(setLocationSearchType('placename'))
              continueToNextPage()
            } else {
              // show error message from OS Api postcode search
              setPlaceNameError(errorMessage)
              setError('')
            }
            break
          } else {
            setPlaceNameError('Enter a town or place name')
            break
          }
        default:
          break
      }
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            {(error || postCodeError || placeNameError) && (
              <ErrorSummary
                errorList={[error, postCodeError, placeNameError]}
              />
            )}
            <h1 className='govuk-heading-l'>
              Check if you can get flood messages for your location
            </h1>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset'>
                <legend className='govuk-fieldset__legend'>
                  Select how you want to search
                </legend>
                {error && <p className='govuk-error-message'>{error}</p>}
                <Radio
                  label='Postcode'
                  value='Postcode'
                  name='searchOptionsRadios'
                  onChange={(e) => setSearchOption(e.target.value)}
                  conditional={searchOption === 'Postcode'}
                  conditionalHint='Postcode in England'
                  conditionalInput={(val) => setPostCode(val)}
                  conditionalError={postCodeError}
                />
                <Radio
                  label='Town or place name'
                  value='TownOrPlaceName'
                  name='searchOptionsRadios'
                  onChange={(e) => setSearchOption(e.target.value)}
                  conditional={searchOption === 'TownOrPlaceName'}
                  conditionalHint='Be as specific as possible. For example, enter a town or village, rather than a large city'
                  conditionalInput={(val) => setPlaceName(val)}
                  conditionalError={placeNameError}
                />
              </fieldset>
            </div>
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import Radio from '../../gov-uk-components/Radio'
import {
  setLocationPostCode,
  setLocationSearchResults
} from '../../redux/userSlice'
import { backendCall } from '../../services/BackendService'
import { postCodeValidation } from '../../services/validations/PostCodeValidation'

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

  const handleSubmit = async () => {
    if (!searchOption) {
      setError('Select how you want to search for your location')
    } else {
      switch (searchOption) {
        case 'AddressPostCode': {
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
        case 'PlaceNameTownOrKeyword':
          if (placeName) {
            // normalise postcode
            const dataToSend = {
              name: placeName
            }
            const { data, errorMessage } = await backendCall(
              dataToSend,
              'api/os-api/name-search',
              navigate
            )
            if (!errorMessage) {
              dispatch(setLocationPostCode(''))
              dispatch(setLocationSearchResults(data))
              continueToNextPage()
            } else {
              // show error message from OS Api postcode search
              setPlaceNameError(errorMessage)
              setError('')
            }
            break
          } else {
            setPlaceNameError('Please enter a place name, town or keyword')
            break
          }
        default:
          break
      }
    }
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <Link onClick={() => navigate(-1)} className='govuk-back-link'>
                Back
              </Link>
              {(error || postCodeError || placeNameError) && (
                <ErrorSummary
                  errorList={[error, postCodeError, placeNameError]}
                />
              )}
              <h1 className='govuk-heading-l govuk-!-margin-top-6'>
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
                    label='Address with postcode'
                    value='AddressPostCode'
                    name='searchOptionsRadios'
                    onChange={(e) => setSearchOption(e.target.value)}
                    conditional={searchOption === 'AddressPostCode'}
                    conditionalQuestion='Postcode in England'
                    conditionalInput={(val) => setPostCode(val)}
                    conditionalError={postCodeError}
                  />
                  <Radio
                    label='Place name, town or keyword'
                    value='PlaceNameTownOrKeyword'
                    name='searchOptionsRadios'
                    onChange={(e) => setSearchOption(e.target.value)}
                    conditional={searchOption === 'PlaceNameTownOrKeyword'}
                    conditionalQuestion='Enter a place name, town or keyword'
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
        </div>
        <Footer />
      </div>
    </>
  )
}

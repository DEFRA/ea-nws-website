import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Input from '../../gov-uk-components/Input'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
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
  const [postCodeError, setPostCodeError] = useState('')
  const [placeNameError, setPlaceNameError] = useState('')
  const [error, setError] = useState('')

  // remove any errors if user changes search option
  useEffect(() => {
    setPostCodeError('')
    setError('')
  }, [searchOption])

  console.log(searchOption)

  const handleSubmit = async () => {
    if (!searchOption) {
      setError('Select how you want to search for your location')
    } else {
      switch (searchOption) {
        case 'AddressPostCode':
          const postCodeValidationError = postCodeValidation(postCode)
          if (!postCodeValidationError) {
            //normalise postcode
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
        case 'PlaceNameTownOrKeyword':
          // code block
          break
        default:
          break
      }
    }
  }

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Header />
        <div className="govuk-width-container" style={{ flex: '1' }}>
          <PhaseBanner />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <Link onClick={() => navigate(-1)} className="govuk-back-link">
                Back
              </Link>
              {(error || postCodeError || placeNameError) && (
                <ErrorSummary
                  errorList={[error, postCodeError, placeNameError]}
                />
              )}
              <h1 className="govuk-heading-l govuk-!-margin-top-6">
                Check if you can get flood messages for your location
              </h1>
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend">
                    Select how you want to search
                  </legend>
                  {error && <p className="govuk-error-message">{error}</p>}
                  <div className="govuk-radios" data-module="govuk-radios">
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        type="radio"
                        value="AddressPostCode"
                        name="searchOptionsRadios"
                        onChange={(e) => setSearchOption(e.target.value)}
                        id="id-address-postcode"
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="id-address-postcode"
                      >
                        Address with postcode
                      </label>
                    </div>
                    {searchOption === 'AddressPostCode' && (
                      <div className="govuk-radios__conditional">
                        <div
                          className={
                            postCodeError
                              ? 'govuk-form-group govuk-form-group--error'
                              : 'govuk-form-group'
                          }
                        >
                          <Input
                            name="Postcode in England"
                            className="govuk-input govuk-!-width-one-half"
                            inputType="text"
                            error={postCodeError}
                            onChange={(val) => setPostCode(val)}
                          />
                        </div>
                      </div>
                    )}
                    <div className="govuk-radios__item">
                      <input
                        className="govuk-radios__input"
                        type="radio"
                        value="PlaceNameTownOrKeyword"
                        name="searchOptionsRadios"
                        onChange={(e) => setSearchOption(e.target.value)}
                        id="id-place-name"
                      />
                      <label
                        className="govuk-label govuk-radios__label"
                        htmlFor="id-place-name"
                      >
                        Place name, town or keyword
                      </label>
                    </div>
                    {searchOption === 'PlaceNameTownOrKeyword' && (
                      <div className="govuk-radios__conditional">
                        <div
                          className={
                            placeNameError
                              ? 'govuk-form-group govuk-form-group--error'
                              : 'govuk-form-group'
                          }
                        >
                          <Input
                            name="Enter a place name, town or keyword"
                            className="govuk-input govuk-!-width-one-half"
                            inputType="text"
                            error={placeNameError}
                            onChange={(val) => setPostCode(val)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </fieldset>
              </div>
              <Button
                text="Continue"
                className="govuk-button"
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

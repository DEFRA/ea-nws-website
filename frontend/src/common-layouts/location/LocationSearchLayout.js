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
import { osPostCodeApiCall } from '../../services/OrdnanceSurveyService'
import { postCodeValidation } from '../../services/validations/PostCodeValidation'

export default function LocationSearchLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchOption, setSearchOption] = useState('')
  const [postCode, setPostCode] = useState('')
  const [postCodeError, setPostCodeError] = useState('')
  const [error, setError] = useState('')

  //remove any errors if user changes search option
  useEffect(() => {
    setPostCodeError('')
    setError('')
  }, [searchOption])

  const handleSubmit = async () => {
    if (!searchOption) {
      setError('Select how you want to search for your location')
    } else {
      switch (searchOption) {
        case 'AddressPostCode':
          const postCodeValidationError = postCodeValidation(postCode)
          if (!postCodeValidationError) {
            const { responseData, errorMessage } = await osPostCodeApiCall(
              //normalise the postcode
              postCode.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
            )
            if (!errorMessage) {
              dispatch(setLocationPostCode(responseData[0].postcode))
              dispatch(setLocationSearchResults(responseData))
              navigate('/signup/register-location/search-results')
            } else {
              //show error message from OS Api postcode search
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
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <Link onClick={() => navigate(-1)} className="govuk-back-link">
              Back
            </Link>
            {(error || postCodeError) && (
              <ErrorSummary errorList={[error, postCodeError]} />
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
    </>
  )
}

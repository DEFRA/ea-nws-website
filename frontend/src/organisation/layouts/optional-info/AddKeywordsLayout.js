import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import Autocomplete from '../../../common/components/gov-uk/Autocomplete'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import {
  setCurrentLocationKeywords,
  setLocationKeywords
} from '../../../common/redux/userSlice'

export default function AddKeywordsLayout ({ keywordType, NavigateToNextPage }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orgKeywordsOriginal = useSelector((state) =>
    keywordType === 'location' && state.session.locationKeywords
      ? state.session.locationKeywords
      : []
  )
  let orgKeywords = [...orgKeywordsOriginal]

  const locationName = useSelector(
    (state) => state.session.currentLocation.name
  )

  let currentKeywords = useSelector((state) =>
    keywordType === 'location' &&
    state.session.currentLocation.meta_data.location_additional.keywords
      ? state.session.currentLocation.meta_data.location_additional.keywords
      : []
  )

  if (currentKeywords.length !== 0) { currentKeywords = currentKeywords.split(', ') }
  const checkboxArray = Array(currentKeywords.length).fill(true)
  const [keywordError, setKeywordError] = useState('')
  const [keywordsArray, setKeywordsArray] = useState([...currentKeywords])
  const [isCheckboxCheckedArray, setIsCheckboxCheckedArray] = useState([
    ...checkboxArray
  ])
  const [results, setResults] = useState(null)
  const [keywords, setKeywords] = useState([])
  const [searchInput, setSearchInput] = useState(null)

  const maxKeywords = 50
  const maxKeywordChar = 20
  const maxKeywordError =
    'You can add a maximum of ' + maxKeywords + ' keywords'
  const maxKeywordCharError =
    'Keywords must be ' + maxKeywordChar + ' characters or less'
  const duplicateKeywordError = 'This keyword already exists'
  const keywordInputError = 'Keywords cannot include commas'

  const handleCheckboxChange = (isChecked, index) => {
    isChecked
      ? (isCheckboxCheckedArray[index] = true)
      : (isCheckboxCheckedArray[index] = false)

    if (
      isCheckboxCheckedArray.filter((isChecked) => isChecked === true).length >
      50
    ) {
      setKeywordError(maxKeywordError)
      isCheckboxCheckedArray[index] = false
    } else {
      setKeywordError('')
    }

    setIsCheckboxCheckedArray([...isCheckboxCheckedArray])
  }

  const handleOnClick = (value) => {
    setSearchInput(value.name)
  }

  const handleOnChange = (value) => {
    setSearchInput(value)
    if (value) {
      const updatedFilter = keywords.filter((keyword) =>
        keyword.name.toLowerCase().includes(value.toLowerCase())
      )
      setResults(updatedFilter)
    } else {
      setResults(null)
    }
  }

  const handleAddKeyword = () => {
    if (searchInput) {
      if (searchInput.length > maxKeywordChar) {
        setKeywordError(maxKeywordCharError)
      } else if (searchInput.includes(',')) {
        setKeywordError(keywordInputError)
      } else if (
        isCheckboxCheckedArray.filter((isChecked) => isChecked === true)
          .length >
        maxKeywords - 1
      ) {
        setKeywordError(maxKeywordError)
      } else if (keywordsArray.includes(searchInput)) {
        setKeywordError(duplicateKeywordError)
      } else {
        setKeywordsArray([...keywordsArray, searchInput])
        setIsCheckboxCheckedArray([...isCheckboxCheckedArray, true])
        setSearchInput('')
      }
    }
  }

  const handleSubmit = () => {
    const firstCheckedIndex = isCheckboxCheckedArray.indexOf(true)
    let keywordsString = ''

    if (firstCheckedIndex > -1) {
      keywordsString = keywordsArray[firstCheckedIndex]
    }

    // Loop over keywords array
    for (const i in keywordsArray) {
      const currentKeyword = keywordsArray[i]
      const currentKeywordChecked = isCheckboxCheckedArray[i] === true

      // Current location keyword string
      if (currentKeywordChecked && i !== String(firstCheckedIndex)) {
        keywordsString = keywordsString.concat(', ', currentKeyword)
      }

      // Loop over organisation keywords
      let keywordExists = false
      for (const j in orgKeywords) {
        // Keyword exists
        if (currentKeyword === orgKeywords[j].name) {
          keywordExists = true

          // Remove location if it exists but keyword is unchecked
          if (
            orgKeywords[j].linked_ids.includes(locationName) &&
            !currentKeywordChecked
          ) {
            const originalArray = orgKeywords[j].linked_ids
            const indexToDelete = originalArray.indexOf(locationName)

            orgKeywords[j] = {
              name: currentKeyword,
              linked_ids: originalArray.filter(
                (_, index) => index !== indexToDelete
              )
            }
          }

          // Add location if it doesn't exist and keyword is checked
          if (
            !orgKeywords[j].linked_ids.includes(locationName) &&
            currentKeywordChecked
          ) {
            orgKeywords[j] = {
              name: currentKeyword,
              linked_ids: [...orgKeywords[j].linked_ids, locationName]
            }
          }
          break
        }
      }

      // Add keyword and location if it is checked and keyword doesn't exist
      if (!keywordExists && currentKeywordChecked) {
        orgKeywords = [
          ...orgKeywords,
          {
            name: currentKeyword,
            linked_ids: [locationName]
          }
        ]
      }
    }

    dispatch(setLocationKeywords(orgKeywords))
    dispatch(setCurrentLocationKeywords(keywordsString))
    NavigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  useEffect(() => {
    setKeywordError('')
  }, [searchInput])

  useEffect(() => {
    setKeywords(orgKeywords)
  }, [orgKeywords])

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {keywordError && <ErrorSummary errorList={[keywordError]} />}
            <h1 className='govuk-heading-l'>
              {`Keywords for this ${keywordType} (optional)`}
            </h1>
            <div className='govuk-body'>
              <p>
                You can add new keywords. Or you can remove existing keywords
                associated with this location by unticking the relevant box.
                <br /> <br />
                <strong> Why add keywords </strong>
                <br /> <br />
                Adding keywords for each location can make it easier for you to
                filter and create lists of locations you can then link to the
                people responsible for them (contacts). Contacts cannot get
                flood messages for a location unless they are linked to it.
                <br /> <br />
                For example, you may want to add ‘North’ or ‘Midlands’ or ‘Team
                A’ as keywords, then show all of the locations with that keyword
                in a list.
                <br /> <br />
                You can add a maximum of 50 keywords and each keyword can be
                single or multiple words, for example ‘South’ or ‘South West’.
                <br /> <br />
                Once you use a keyword it will be saved so you can select it for
                any other contacts.
              </p>

              {keywordsArray.length !== 0 &&
                keywordsArray.map((keyword, index) => (
                  <div className='govuk-checkboxes--small' key={index}>
                    <Checkbox
                      label={keyword}
                      checked={isCheckboxCheckedArray[index]}
                      onChange={(e) => {
                        handleCheckboxChange(e.target.checked, index)
                      }}
                    />
                  </div>
                ))}

              <div
                className={
                  keywordError
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                {keywordError && (
                  <p className='govuk-error-message'>{keywordError}</p>
                )}
              </div>
              <div className='inline-button'>
                <Autocomplete
                  inputType='text'
                  value={searchInput}
                  onChange={(val) => handleOnChange(val)}
                  onClick={(val) => handleOnClick(val)}
                  className='govuk-input govuk-input--width-20'
                  results={results}
                  position='absolute'
                  showNotFound={false}
                />
                <Button
                  text='Add keyword'
                  onClick={handleAddKeyword}
                  className='govuk-button govuk-button--secondary govuk-!-margin-top-0'
                />
              </div>

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

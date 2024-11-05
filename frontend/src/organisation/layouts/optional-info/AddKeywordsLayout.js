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
  setContactKeywords,
  setCurrentLocationKeywords,
  setLocationKeywords,
  setOrgCurrentContactKeyword
} from '../../../common/redux/userSlice'

export default function AddKeywordsLayout ({
  keywordType,
  NavigateToNextPage,
  KeywordText
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orgKeywordsOriginal = useSelector((state) =>
    keywordType === 'location'
      ? state.session.locationKeywords
        ? state.session.locationKeywords
        : []
      : state.session.contactKeywords
        ? state.session.contactKeywords
        : []
  )

  let orgKeywords = [...orgKeywordsOriginal]

  const entryName = useSelector((state) =>
    keywordType === 'location '
      ? state.session.currentLocation.name
        ? state.session.currentLocation.name
        : ''
      : state.session.orgCurrentContact.firstName &&
        state.session.orgCurrentContact.lastName
        ? state.session.orgCurrentContact.firstName +
        ' ' +
        state.session.orgCurrentContact.lastName
        : ''
  )

  let currentKeywords = useSelector((state) =>
    keywordType === 'location'
      ? state.session.currentLocation.meta_data.location_additional.keywords
        ? state.session.currentLocation.meta_data.location_additional.keywords
        : []
      : state.session.orgCurrentContact.additionals.keywords
        ? state.session.orgCurrentContact.additionals.keywords
        : []
  )
  if (currentKeywords.length > 0) currentKeywords = JSON.parse(currentKeywords)

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

  useEffect(() => {
    setKeywordError('')
  }, [searchInput])

  useEffect(() => {
    setKeywords(orgKeywordsOriginal)
  }, [orgKeywordsOriginal])

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
    const keywordsArrayChecked = []

    // Loop over keywords array
    for (const keywordIdx in keywordsArray) {
      const currentKeyword = keywordsArray[keywordIdx]
      const currentKeywordChecked = isCheckboxCheckedArray[keywordIdx] === true

      if (currentKeywordChecked) {
        keywordsArrayChecked.push(currentKeyword)
      }

      // Loop over organisation keywords
      let keywordExists = false
      for (const orgKeywordIdx in orgKeywords) {
        // Keyword exists
        if (currentKeyword === orgKeywords[orgKeywordIdx].name) {
          keywordExists = true

          if (
            orgKeywords[orgKeywordIdx].linked_ids.includes(entryName) &&
            !currentKeywordChecked
          ) {
            const originalArray = orgKeywords[orgKeywordIdx].linked_ids
            const indexToDelete = originalArray.indexOf(entryName)

            // Remove location if it exists but keyword is unchecked
            orgKeywords[orgKeywordIdx] = {
              name: currentKeyword,
              linked_ids: originalArray.filter(
                (_, index) => index !== indexToDelete
              )
            }

            // Remove keyword if no linked ids found
            if (orgKeywords[orgKeywordIdx].linked_ids.length === 0) {
              orgKeywords.splice(orgKeywordIdx, 1)
            }
          } else if (
            !orgKeywords[orgKeywordIdx].linked_ids.includes(entryName) &&
            currentKeywordChecked
          ) {
            // Add location if it doesn't exist and keyword is checked
            orgKeywords[orgKeywordIdx] = {
              name: currentKeyword,
              linked_ids: [...orgKeywords[orgKeywordIdx].linked_ids, entryName]
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
            linked_ids: [entryName]
          }
        ]
      }
    }

    if (keywordType === 'location') {
      dispatch(setLocationKeywords(orgKeywords))
      dispatch(setCurrentLocationKeywords(JSON.stringify(keywordsArrayChecked)))
    } else {
      dispatch(setContactKeywords(orgKeywords))
      dispatch(
        setOrgCurrentContactKeyword(JSON.stringify(keywordsArrayChecked))
      )
    }

    NavigateToNextPage()
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
            {keywordError && <ErrorSummary errorList={[keywordError]} />}
            <h1 className='govuk-heading-l'>
              {`Keywords for this ${keywordType} (optional)`}
            </h1>
            <div className='govuk-body'>
              {KeywordText}

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
                  nameField='name'
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

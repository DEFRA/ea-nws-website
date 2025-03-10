import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Autocomplete from '../../../common/components/gov-uk/Autocomplete'
import Button from '../../../common/components/gov-uk/Button'
import Checkbox from '../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import {
  getLocationAdditional,
  setCurrentLocationKeywords,
  setOrgCurrentContactKeywords
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { getAdditionals } from '../../../common/services/ProfileServices'

export default function KeywordsLayout ({
  keywordType,
  navigateToNextPage,
  keywordText,
  error = null
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orgId = useSelector((state) => state.session.orgId)

  const [orgKeywordsOriginal, setOrgKeywordsOriginal] = useState([])
  useEffect(() => {
    const getOrgKeywordsOriginal = async () => {
      const key =
        orgId +
        (keywordType === 'location'
          ? ':t_Keywords_location'
          : ':t_Keywords_contact')
      const dataToSend = { key }
      const { data } = await backendCall(
        dataToSend,
        'api/elasticache/get_data',
        navigate
      )
      let orgKeywords = []
      if (data) {
        orgKeywords = data
      }
      setOrgKeywordsOriginal(orgKeywords)
    }
    getOrgKeywordsOriginal()
  }, [keywordType])

  const currentObject = useSelector((state) =>
    keywordType === 'location'
      ? state.session.currentLocation
        ? state.session.currentLocation
        : null
      : state.session.orgCurrentContact
        ? state.session.orgCurrentContact
        : null
  )

  let orgKeywords = [...orgKeywordsOriginal]

  const entryId = useSelector((state) =>
    keywordType === 'location'
      ? state.session.currentLocation.id
        ? state.session.currentLocation.id
        : ''
      : state.session.orgCurrentContact.id
        ? state.session.orgCurrentContact.id
        : ''
  )

  let currentKeywords = useSelector((state) =>
    keywordType === 'location'
      ? getLocationAdditional(state, 'keywords')
        ? getLocationAdditional(state, 'keywords')
        : ''
      : getAdditionals(currentObject, 'keywords')
        ? getAdditionals(currentObject, 'keywords')
        : ''
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

  const handleAddKeyword = (event) => {
    event.preventDefault()
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

  const handleSubmit = (event) => {
    event.preventDefault()
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
            orgKeywords[orgKeywordIdx].linked_ids.includes(entryId) &&
            !currentKeywordChecked
          ) {
            const originalArray = orgKeywords[orgKeywordIdx].linked_ids
            const indexToDelete = originalArray.indexOf(entryId)

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
            !orgKeywords[orgKeywordIdx].linked_ids.includes(entryId) &&
            currentKeywordChecked
          ) {
            // Add location if it doesn't exist and keyword is checked
            orgKeywords[orgKeywordIdx] = {
              name: currentKeyword,
              linked_ids: [...orgKeywords[orgKeywordIdx].linked_ids, entryId]
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
            linked_ids: [entryId]
          }
        ]
      }
    }

    if (keywordType === 'location') {
      dispatch(setCurrentLocationKeywords(JSON.stringify(keywordsArrayChecked)))
    } else {
      dispatch(
        setOrgCurrentContactKeywords(JSON.stringify(keywordsArrayChecked))
      )
    }

    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {(keywordError || error) && (
              <ErrorSummary errorList={[keywordError, error]} />
            )}
            <h1 className='govuk-heading-l'>
              {`Add keywords for this ${keywordType} (optional)`}
            </h1>
            <div className='govuk-body'>
              {keywordText}

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

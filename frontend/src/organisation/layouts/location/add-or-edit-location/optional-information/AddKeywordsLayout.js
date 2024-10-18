import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../common/components/gov-uk/Input'
import { setLocationKeywords } from '../../../../../common/redux/userSlice'

export default function AddKeywordsLayout ({
  pageHeading,
  text,
  navigateToNextPage,
  navigateToPreviousPage
}) {
  const dispatch = useDispatch()

  const savedKeywords = useSelector((state) =>
    state.session.currentLocation.meta_data.location_additional.keywords
      ? state.session.currentLocation.meta_data.location_additional.keywords
      : []
  )

  const checkboxArray = Array(savedKeywords.length).fill(true)
  const [keywordError, setKeywordError] = useState('')
  const [keyword, setKeyword] = useState('')
  const [keywordsArray, setKeywordsArray] = useState([...savedKeywords])
  const [isCheckboxCheckedArray, setIsCheckboxCheckedArray] = useState([
    ...checkboxArray
  ])

  const maxKeywordError = 'You can add a maximum of 50 keywords'
  const maxKeywordCharError = 'Keywords must be 20 characters or less'
  const duplicateKeywordError = 'This keyword already exists'

  const handleCheckboxChange = (isChecked, index) => {
    isChecked
      ? (isCheckboxCheckedArray[index] = true)
      : (isCheckboxCheckedArray[index] = false)

    if (
      isCheckboxCheckedArray.filter((string) => string === true).length > 50
    ) {
      setKeywordError(maxKeywordError)
      isCheckboxCheckedArray[index] = false
    } else {
      setKeywordError('')
    }

    setIsCheckboxCheckedArray([...isCheckboxCheckedArray])
  }

  const handleAddKeyword = () => {
    if (keyword) {
      if (keyword.length > 20) {
        setKeywordError(maxKeywordCharError)
      } else if (
        isCheckboxCheckedArray.filter((string) => string === true).length > 49
      ) {
        setKeywordError(maxKeywordError)
      } else if (keywordsArray.includes(keyword)) {
        setKeywordError(duplicateKeywordError)
      } else {
        setKeywordsArray([...keywordsArray, keyword])
        setIsCheckboxCheckedArray([...isCheckboxCheckedArray, true])
        setKeyword('')
      }
    }
  }

  const handleButton = () => {
    let keywordsArrayDispatch = []
    for (const index in keywordsArray) {
      if (isCheckboxCheckedArray[index] === true) {
        keywordsArrayDispatch = [...keywordsArrayDispatch, keywordsArray[index]]
      }
    }

    if (
      keywordsArrayDispatch.length !== savedKeywords.length ||
      !keywordsArrayDispatch.every((val, idx) => val === savedKeywords[idx])
    ) {
      dispatch(setLocationKeywords(keywordsArrayDispatch))
    }

    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigateToPreviousPage()
  }

  useEffect(() => {
    setKeywordError('')
  }, [keyword])

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {keywordError && <ErrorSummary errorList={[keywordError]} />}
            <h1 className='govuk-heading-l'>{pageHeading}</h1>
            <div className='govuk-body'>
              {text}

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
                <Input
                  inputType='text'
                  value={keyword}
                  onChange={(val) => setKeyword(val)}
                  className='govuk-input govuk-input--width-20'
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
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

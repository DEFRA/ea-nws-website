import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import { setCurrentLocationKeywords } from '../../../../common/redux/userSlice'

export default function AddKeywordsLayout ({
  pageHeading,
  text,
  navigateToNextPage,
  navigateToPreviousPage
}) {
  const dispatch = useDispatch()

  const savedKeywords = useSelector((state) =>
    state.session.currentLocation.meta_data.location_additional.keywords !==
    null
      ? state.session.currentLocation.meta_data.location_additional.keywords
      : []
  )

  const checkboxArray = []
  if (savedKeywords.length !== 0) {
    for (let i = 0; i < savedKeywords.length; i++) {
      checkboxArray.push(true)
    }
  }

  const [keywordError, setKeywordError] = useState('')
  const [keyword, setKeyword] = useState('')
  const [keywordsArray, setKeywordsArray] = useState([...savedKeywords])
  const [isCheckboxCheckedArray, setIsCheckboxCheckedArray] = useState([
    ...checkboxArray
  ])

  const handleCheckboxChange = (isChecked, index) => {
    if (!isChecked) {
      isCheckboxCheckedArray.splice(index, 1)
      keywordsArray.splice(index, 1)
    }
    setIsCheckboxCheckedArray([...isCheckboxCheckedArray])
  }

  const handleAddKeyword = () => {
    if (keyword) {
      if (keyword.length > 20) {
        setKeywordError('Keywords must be 20 characters of less')
      } else if (keywordsArray.length > 49) {
        setKeywordError('You can add a maximum of 50 keywords')
      } else if (keywordsArray.includes(keyword)) {
        setKeywordError('This keyword already exists')
      } else {
        setKeywordsArray([...keywordsArray, keyword])
        setIsCheckboxCheckedArray([...isCheckboxCheckedArray, true])
        setKeyword('')
      }
    }
  }

  const handleButton = () => {
    if (
      keywordsArray.length !== savedKeywords.length ||
      !keywordsArray.every((val, idx) => val === savedKeywords[idx])
    ) {
      dispatch(setCurrentLocationKeywords(keywordsArray))
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
                  onChange={(val) => setKeyword(val)}
                  className='govuk-input govuk-input--width-20'
                />
                <Button text='Add keyword' onClick={handleAddKeyword} />
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

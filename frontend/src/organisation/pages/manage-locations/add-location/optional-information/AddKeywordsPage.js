import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../../common/components/gov-uk/Input'
import { setLocationKeywords } from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddKeywordsLayout () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

    navigate(orgManageLocationsUrls.add.optionalInformation.addActionPlan)
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
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
            <h1 className='govuk-heading-l'>
              Keywords for this location (optional)
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

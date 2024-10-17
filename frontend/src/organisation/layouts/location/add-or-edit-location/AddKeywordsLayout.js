import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import Checkbox from '../../../../common/components/gov-uk/CheckBox'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import { setCurrentLocationKeywords } from '../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddKeywordsLayout () {
  const navigate = useNavigate()
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

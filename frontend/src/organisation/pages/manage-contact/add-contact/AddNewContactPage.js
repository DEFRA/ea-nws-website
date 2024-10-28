import { React, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import {
  setOrgCurrentContactFirstName,
  setOrgCurrentContactLastName,
  setOrgCurrentContactPosition
} from '../../../../common/redux/userSlice'

export default function AddNewContactPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [jobTitleError, setJobTitleError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [jobTitle, setJobTitle] = useState('')

  const charLimit = 20

  useEffect(() => {
    if (firstName.length < charLimit) {
      setFirstNameError('')
    }
  }, [firstName])

  useEffect(() => {
    if (lastName.length < charLimit) {
      setLastNameError('')
    }
  }, [lastName])

  useEffect(() => {
    if (jobTitle.length < charLimit) {
      setJobTitleError('')
    }
  }, [jobTitle])

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const handleTextInputChange = (
    val,
    setFieldText,
    setFieldError,
    fieldName
  ) => {
    setFieldText(val)
    if (val.length > charLimit) {
      setFieldError(`${fieldName} must be ${charLimit} characters or less`)
    } else {
      setFieldError('')
    }
  }

  const handleSubmit = () => {
    if (!firstName) {
      setFirstNameError('Enter first name')
    }
    if (!lastName) {
      setLastNameError('Enter last name')
    }
    if (lastNameError || firstNameError || jobTitleError) {
      return
    } else {
      //continue
      console.log('everything ok')
      dispatch(setOrgCurrentContactFirstName(firstName))
      dispatch(setOrgCurrentContactLastName(firstName))
      if (jobTitle) {
        dispatch(setOrgCurrentContactPosition(jobTitle))
      }
    }
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(firstNameError || lastNameError || jobTitleError) && (
              <ErrorSummary
                errorList={[firstNameError, lastNameError, jobTitleError]}
              />
            )}
            <span class='govuk-caption-l'>Add new contact</span>
            <h1 className='govuk-heading-l'>Contact details</h1>
            <div className='govuk-body'>
              <Input
                name='First name'
                inputType='text'
                onChange={(val) =>
                  handleTextInputChange(
                    val,
                    setFirstName,
                    setFirstNameError,
                    'First name'
                  )
                }
                error={firstNameError}
                className='govuk-input govuk-input--width-20'
                isNameBold={true}
              />
              <Input
                name='Last name'
                inputType='text'
                onChange={(val) =>
                  handleTextInputChange(
                    val,
                    setLastName,
                    setLastNameError,
                    'Last name'
                  )
                }
                error={lastNameError}
                className='govuk-input govuk-input--width-20'
                isNameBold={true}
              />
              <Input
                name='Job title (optional)'
                inputType='text'
                onChange={(val) =>
                  handleTextInputChange(
                    val,
                    setJobTitle,
                    setJobTitleError,
                    'Job title'
                  )
                }
                error={jobTitleError}
                className='govuk-input govuk-input--width-20'
                isNameBold={true}
              />
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

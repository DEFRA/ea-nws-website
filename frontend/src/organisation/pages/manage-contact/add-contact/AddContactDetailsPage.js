import { React, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../../common/components/gov-uk/Input'
import {
  setOrgCurrentContactFirstName,
  setOrgCurrentContactJobTitle,
  setOrgCurrentContactLastName
} from '../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactDetailsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [firstnameError, setFirstNameError] = useState('')
  const [lastnameError, setLastNameError] = useState('')
  const [jobTitleError, setJobTitleError] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [jobTitle, setJobTitle] = useState('')

  const charLimit = 20

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

  const checkMandatory = () => {
    let mandatoryMissing = false
    if (!firstname) {
      setFirstNameError('Enter first name')
      mandatoryMissing = true
    }
    if (!lastname) {
      setLastNameError('Enter last name')
      mandatoryMissing = true
    }
    return mandatoryMissing
  }

  const validateData = () => {
    let dataValid = true
    const mandatoryMissing = checkMandatory()
    if (firstnameError || lastnameError || jobTitleError || mandatoryMissing) {
      dataValid = false
    }
    return dataValid
  }

  const handleSubmit = () => {
    const dataValid = validateData()
    if (dataValid) {
      dispatch(setOrgCurrentContactFirstName(firstname))
      dispatch(setOrgCurrentContactLastName(lastname))
      if (jobTitle) {
        dispatch(setOrgCurrentContactJobTitle(jobTitle))
      }
      navigate(orgManageContactsUrls.add.keywords)
    }
  }

  return (
    <>

      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(firstnameError || lastnameError || jobTitleError) && (
              <ErrorSummary
                errorList={[firstnameError, lastnameError, jobTitleError]}
              />
            )}
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
                  )}
                error={firstnameError}
                className='govuk-input govuk-input--width-20'
                isNameBold
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
                  )}
                error={lastnameError}
                className='govuk-input govuk-input--width-20'
                isNameBold
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
                  )}
                error={jobTitleError}
                className='govuk-input govuk-input--width-20'
                isNameBold
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

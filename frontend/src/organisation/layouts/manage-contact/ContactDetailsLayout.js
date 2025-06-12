import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Input from '../../../common/components/gov-uk/Input'
import {
  getContactAdditional,
  setOrgCurrentContactFirstName,
  setOrgCurrentContactJobTitle,
  setOrgCurrentContactLastName
} from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'

export default function ContactDetailsLayout({ navigateToNextPage, error }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orgId = useSelector((state) => state.session.orgId)

  const [firstnameError, setFirstNameError] = useState('')
  const [lastnameError, setLastNameError] = useState('')
  const [jobTitleError, setJobTitleError] = useState('')

  const [contacts, setContacts] = useState([])
  const [firstname, setFirstName] = useState(
    useSelector((state) => state.session.orgCurrentContact.firstname) || ''
  )
  const [lastname, setLastName] = useState(
    useSelector((state) => state.session.orgCurrentContact.lastname) || ''
  )
  const [jobTitle, setJobTitle] = useState(
    useSelector((state) => getContactAdditional(state, 'jobTitle')) || ''
  )

  const charLimit = 20
  const originalFirstName =
    useSelector((state) => state.session.orgCurrentContact.firstname) || ''
  const originalLastName =
    useSelector((state) => state.session.orgCurrentContact.firstname) || ''

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const dataToSend = { orgId }
        const contactsData = await backendCall(
          dataToSend,
          'api/elasticache/list_contacts',
          navigate
        )
        setContacts(contactsData.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchContacts()
  }, [])

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

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validateData()) return

    // Ensure name given is not a duplicate with existing user
    // When editing only check if name is changed
    if (originalFirstName !== firstname && originalLastName !== lastname) {
      const isDuplicate = contacts.some(
        (c) =>
          c.firstname.trim().toLowerCase() === firstname.trim().toLowerCase() &&
          c.lastname.trim().toLowerCase() === lastname.trim().toLowerCase()
      )
      if (isDuplicate) {
        setFirstNameError(
          `User ${firstname} ${lastname} already exists in your organisation - you cannot enter this person again`
        )
        return
      }
    }

    dispatch(setOrgCurrentContactFirstName(firstname))
    dispatch(setOrgCurrentContactLastName(lastname))
    jobTitle != null && dispatch(setOrgCurrentContactJobTitle(jobTitle))

    navigateToNextPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {(firstnameError || lastnameError || jobTitleError || error) && (
              <ErrorSummary
                errorList={[
                  firstnameError && { text: firstnameError, href: '#first-name' },
                  lastnameError && { text: lastnameError, href: '#last-name' },
                  jobTitleError && { text: jobTitleError, href: '#job-title' },
                  error && { text: error, href: '#main-body' }
                ].filter(Boolean)}
              />
            )}
            <h1 className='govuk-heading-l'>User details</h1>
            <div id='main-body' className='govuk-body'>
              <Input
                id='first-name'
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
                value={firstname}
                error={firstnameError}
                className='govuk-input govuk-input--width-20'
                isNameBold
                nameSize='s'
              />
              <Input
                id='last-name'
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
                value={lastname}
                error={lastnameError}
                className='govuk-input govuk-input--width-20'
                isNameBold
                nameSize='s'
              />
              <Input
                id='job-title'
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
                value={jobTitle}
                error={jobTitleError}
                className='govuk-input govuk-input--width-20'
                isNameBold
                nameSize='s'
              />
              <div className='govuk-!-margin-top-8'>
                <Button
                  text='Continue'
                  className='govuk-button'
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

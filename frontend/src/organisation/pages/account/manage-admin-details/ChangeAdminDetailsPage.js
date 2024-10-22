import React, { useState, useEffect } from 'react'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Button from '../../../../common/components/gov-uk/Button'
import Input from '../../../../common/components/gov-uk/Input'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
export default function ChangeAdminDetailsPage () {
  const firstName = useSelector(
    (state) => state.session.profile.firstname
  )
  const lastName = useSelector(
    (state) => state.session.profile.lastname
  )
  const emails = useSelector(
    (state) => state.session.profile.emails[0]
  )

  const [email, setEmail] = useState(emails)
  const [fullName, setFullName] = useState(firstName + ' ' + lastName)
  const navigate = useNavigate()
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  useEffect(() => {
    setErrorEmail('')
  }, [errorEmail])

  useEffect(() => {
    setErrorName('')
  }, [errorName])

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const handleSubmit = () => {

  }
  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half' />
          {(errorEmail||errorName) &&(
            <ErrorSummary 
                errorList={[errorEmail,errorName]}
            />
          ) }
          <h1 className='govuk-heading-l'>
            Change administrator details
          </h1>

          <Input
            inputType='text'
            value={fullName}
            name='Full name'
            onChange={(val) => setFullName(val)}
            error={errorName}
            className='govuk-input govuk-input--width-20'
            defaultValue={fullName}
            isNameBold
          />

          <Input
            inputType='text'
            value={email}
            name='Email address'
            onChange={(val) => setEmail(val)}
            error={errorEmail}
            className='govuk-input govuk-input--width-20'
            defaultValue={email}
            isNameBold
          />

          <Button
            text='Save'
            className='govuk-button'
            onClick={handleSubmit}
          />
        </div>
      </main>
    </>
  )
}

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../common/components/gov-uk/Radio'
import { setProfile } from '../../../common/redux/userSlice'
import {
  getOrganisationAdditionals,
  updateOrganisationAdditionals
} from '../../../common/services/ProfileServices'

export default function MainAdminLayout({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const dispatch = useDispatch()
  const [adminDetails, addAdminDetails] = useState(null)
  const [error, setError] = useState('')
  const profile = useSelector((state) => state.session.profile)

  const handleSubmit = () => {
    if (adminDetails === null) {
      setError('Select whether you will be the main administrator or not')
      return
    }

    const organisation = Object.assign({}, getOrganisationAdditionals(profile))
    organisation.isAdminRegistering = adminDetails

    const updatedProfile = updateOrganisationAdditionals(profile, organisation)
    dispatch(setProfile(updatedProfile))
    NavigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              Will you be the main administrator on this account?
            </h1>
            <div className='govuk-body'>
              <div
                className={
                  error
                    ? 'govuk-form-group govuk-form-group--error'
                    : 'govuk-form-group'
                }
              >
                <p className='govuk-hint'>
                  An administrator can set up flood warnings, locations and
                  users.
                </p>
                {error && (
                  <p className='govuk-error-message'>
                    <br />
                    {error}
                  </p>
                )}
                <div className='govuk-radios'>
                  <Radio
                    key='radio_yes'
                    name='adminRadio'
                    value='adminRadio'
                    label='Yes'
                    onChange={() => addAdminDetails(true)}
                  />
                  <Radio
                    key='radio_no'
                    name='adminRadio'
                    value='notAdminRadio'
                    label='No, it will be someone else'
                    onChange={() => addAdminDetails(false)}
                  />
                  <br />
                </div>
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

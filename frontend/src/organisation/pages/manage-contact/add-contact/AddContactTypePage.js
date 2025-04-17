import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Details from '../../../../common/components/gov-uk/Details'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactTypePage () {
  const navigate = useNavigate()

  const [userType, setUserType] = useState('')
  const [reasonError, setReasonError] = useState('')

  useEffect(() => {
    setReasonError('')
  }, [userType])

  const handleButton = async (event) => {
    event.preventDefault()
    let isValidInput = true

    // Check if reason is selected
    if (!userType) {
      setReasonError('Select type of new user')
      isValidInput = false
    }

    if (isValidInput) {
      navigate(orgManageContactsUrls.add.details, {
        state: {
          type: userType
        }
      })
    }
  }

  const promoteDetails = (
    <>
      <p className='govuk-!-font-weight-bold'>
        How to promote an existing contact to admin
      </p>
      <p>
        1. Go to your <Link to={orgManageContactsUrls.view.dashboard}>users dashboard</Link>
      </p>
      <p>
        2. Choose the contact you want to promote
      </p>
      <p>
        3. On the contact's profile page, select button 'Promote to admin'
      </p>
    </>
  )

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      {/* Main body */}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {/* Error summary */}
            {(reasonError) && (
              <ErrorSummary
                errorList={[reasonError]}
              />
            )}
            <h1 className='govuk-heading-l'>
              Select type of new user
            </h1>
            <div className='govuk-body'>
              <div>
                <div className='govuk-radios' data-module='govuk-radios'>
                  <div
                    className={reasonError && 'govuk-form-group govuk-form-group--error'}
                  >
                    {reasonError && (
                      <p className='govuk-error-message'>{reasonError}</p>
                    )}
                    <Radio
                      key='contact'
                      name='userTypeSelectionRadios'
                      label='Contact'
                      value='contact'
                      hint='Gets flood messages by email, text or phone call.'
                      onChange={(e) =>
                        setUserType(e.target.value)}
                    />
                    <Radio
                      key='admin'
                      name='serviceSelectionRadios'
                      label='Admin'
                      value='admin'
                      hint='Manages contacts, locations and organisation account. Can get flood messages by email, text or phone call.'
                      onChange={(e) =>
                        setUserType(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <br />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleButton}
              />
              <Details
                title='I want to promote an existing contact to admin'
                text={promoteDetails}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

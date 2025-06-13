import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import Details from '../../../../common/components/gov-uk/Details'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import UserType from '../../../../common/enums/UserType'
import { setAddingAdminFlow } from '../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactTypePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userType, setUserType] = useState('')
  const [reasonError, setReasonError] = useState('')
  const userTypeId = 'user-type'

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

    if (userType === UserType.Admin) {
      dispatch(setAddingAdminFlow(true))
    } else {
      dispatch(setAddingAdminFlow(false))
    }

    if (isValidInput) {
      navigate(orgManageContactsUrls.add.details)
    }
  }

  const promoteDetails = (
    <>
      <p className='govuk-!-font-weight-bold'>
        How to promote an existing contact to admin
      </p>
      <p>
        1. Go to your{' '}
        <Link to={orgManageContactsUrls.view.dashboard}>users dashboard</Link>
      </p>
      <p>2. Choose the contact you want to promote</p>
      <p>3. On the contact's profile page, select button 'Promote to admin'</p>
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
            {reasonError && <ErrorSummary errorList={[{text: reasonError, componentId: userTypeId}]} />}
            <h1 id={userTypeId} className='govuk-heading-l'>Select type of new user</h1>
            <div className='govuk-body'>
              <div
                className={
                  reasonError ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
                }
              >
                {reasonError && (
                  <p className='govuk-error-message'>
                    <span className='govuk-visually-hidden'>Error:</span> {reasonError}</p>
                )}
                <fieldset className='govuk-fieldset'>
                  <Radio
                    name='userTypeSelectionRadios'
                    label='Contact'
                    value={UserType.Contact}
                    hint='Gets flood messages by email, text or phone call.'
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <Radio
                    name='userTypeSelectionRadios'
                    label='Admin'
                    value={UserType.Admin}
                    hint='Manages contacts, locations and organisation account. Can get flood messages by email, text or phone call.'
                    onChange={(e) => setUserType(e.target.value)}
                  />
                </fieldset>
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

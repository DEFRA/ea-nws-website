import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ConfirmationPanel from '../../../common/components/gov-uk/Panel'
import { clearAuth } from '../../../common/redux/userSlice'

export default function AccountDeleteConfirmPage () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAuth())
  })

  return (
    <>

      {/* Main body */}
      <main className='govuk-main-wrapper'>
        {/* Account deletion confirmation panel */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <ConfirmationPanel
              title='Account deleted'
              body="You'll no longer get flood warnings"
            />
          </div>
        </div>

        <br />

        {/* Other text */}
        <h2 className='govuk-heading-m'>If you change your mind</h2>
        <p className='govuk-body govuk-!-margin-bottom-6'>
          You'll need to{' '}
          <Link to='/signup/register-location/search' className='govuk-link'>
            sign up again
          </Link>
          .
        </p>
        <p className='govuk-body govuk-!-margin-bottom-6'>
          <Link to='/survey' className='govuk-link'>
            What do you think of this service?
          </Link>{' '}
          Takes 30 seconds
        </p>
        <h2 className='govuk-heading-m'>More about flooding</h2>
        <p className='govuk-body govuk-!-margin-bottom-6'>
          Find out how to{' '}
          <Link to='https://gov.uk/flood' className='govuk-link'>
            protect yourself and your property online from flooding
          </Link>
          .
        </p>
      </main>
    </>
  )
}

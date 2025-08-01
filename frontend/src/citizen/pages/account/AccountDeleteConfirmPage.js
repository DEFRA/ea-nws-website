import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import ConfirmationPanel from '../../../common/components/gov-uk/Panel'
import { clearAuth } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'

export default function AccountDeleteConfirmPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.session.profile)
  const [servicePhase, setServicePhase] = useState(false)

  async function getServicePhase() {
    const { data } = await backendCall('data', 'api/service/get_service_phase')
    setServicePhase(data)
  }

  async function notifyAccountDeletionSuccess() {
    const dataToSend = {
      email: profile.emails[0],
      fullName: profile.firstname + ' ' + profile.lastname
    }

    await backendCall(dataToSend, 'api/notify/account_deletion', navigate)
  }

  useEffect(() => {
    getServicePhase()
    if (profile.emails[0] && profile.firstname && profile.lastname) {
      notifyAccountDeletionSuccess()
    }
    dispatch(clearAuth())
  }, [])

  return (
    <>
      <Helmet>
        <title>Account deleted - Get flood warnings - GOV.UK</title>
      </Helmet>
      {/* Main body */}
      <main className='govuk-main-wrapper'>
        {/* Account deletion confirmation panel */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div id='main-content' aria-label='Account deleted'>
              <ConfirmationPanel
                title='Account deleted'
                body="You'll no longer get flood warnings"
                preTitle={servicePhase === 'beta' ? 'TESTING PHASE ONLY' : ''}
              />
            </div>
          </div>
        </div>

        <br />

        {/* Other text */}
        <h2 className='govuk-heading-m'>If you change your mind</h2>
        <p className='govuk-body govuk-!-margin-bottom-6'>
          You'll need to{' '}
          <Link
            to='/signup/service-selection'
            className='govuk-link'
            style={{ cursor: 'pointer' }}
          >
            sign up again
          </Link>
          .
        </p>
        {servicePhase !== 'beta' && (
          <div>
            <p className='govuk-body govuk-!-margin-bottom-6'>
              <Link
                to='/survey'
                className='govuk-link'
                style={{ cursor: 'pointer' }}
              >
                What do you think of this service?
              </Link>{' '}
              Takes 30 seconds
            </p>
            <h2 className='govuk-heading-m'>More about flooding</h2>
            <p className='govuk-body govuk-!-margin-bottom-6'>
              Find out how to{' '}
              <Link
                to='https://gov.uk/flood'
                className='govuk-link'
                style={{ cursor: 'pointer' }}
              >
                protect yourself and your property online from flooding
              </Link>
              .
            </p>
          </div>
        )}
        {servicePhase === 'beta' && (
          <div>
            <h1 className='govuk-heading-m govuk-!-margin-top-6'>
              Now answer some questions about closing your account
            </h1>
            <Button
              text='Continue'
              className='govuk-button'
              onClick={(event) => {
                event.preventDefault()
                window.location.href = 'https://forms.office.com/e/Rd76JZqNbV'
              }}
            />
          </div>
        )}
      </main>
    </>
  )
}

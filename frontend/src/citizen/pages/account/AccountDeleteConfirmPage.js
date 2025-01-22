import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ConfirmationPanel from '../../../common/components/gov-uk/Panel'
import Button from '../../../common/components/gov-uk/Button'
import { clearAuth } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'

export default function AccountDeleteConfirmPage () {
  const dispatch = useDispatch()
  const [servicePhase, setServicePhase] = useState(false)

  async function getServicePhase () {
    const { data } = await backendCall(
      'data',
      'api/service/get_service_phase'
    )
    setServicePhase(data)
  }

  useEffect(() => {
    dispatch(clearAuth())
  })

  useEffect(() => {
    getServicePhase()
  }, [])

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
              preTitle={(servicePhase === 'beta' ? 'TESTING PHASE ONLY' : '')}
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
        {servicePhase !== 'beta' && (
          <div>
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
          </div>
        )}
        {servicePhase === 'beta' && (
          <div>
            <h1 className='govuk-heading-m govuk-!-margin-top-6'>
              Now answer some questions about closing your account
            </h1>
            <a className='govuk-link' href='https://forms.office.com/e/Rd76JZqNbV'>
              <Button
                text='Continue'
                className='govuk-button'
              />
            </a>
          </div>
        )}
      </main>
    </>
  )
}

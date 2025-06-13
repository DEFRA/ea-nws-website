import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../../common/components/gov-uk/Button'
import ConfirmationPanel from '../../../../common/components/gov-uk/Panel'
import { backendCall } from '../../../../common/services/BackendService'

export default function SignUpSuccessPage() {
  const navigate = useNavigate()
  const profile = useSelector((state) => state.session.profile)
  const [servicePhase, setServicePhase] = useState(false)

  async function getServicePhase() {
    const { data } = await backendCall('data', 'api/service/get_service_phase')
    setServicePhase(data)
  }

  async function notifySignUpSuccess() {
    const dataToSend = {
      email: profile.emails[0],
      fullName: profile.firstname + ' ' + profile.lastname
    }

    await backendCall(dataToSend, 'api/notify/sign_up', navigate)
  }

  useEffect(() => {
    getServicePhase()
    notifySignUpSuccess()
  }, [])

  const handleContinue = (event) => {
    event.preventDefault()
    window.location.href = 'https://forms.office.com/e/XgucY9mkPV'
  }

  // need to check for authToken
  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div
            className='govuk-grid-column-two-thirds'
            id='main-content'
            aria-label='sign up success confirmation'
          >
            <ConfirmationPanel
              title='Your flood messages are set up'
              body="You've also created your account."
              preTitle={servicePhase === 'beta' ? 'TESTING PHASE ONLY' : ''}
            />
            <div className='govuk-body govuk-!-margin-top-6'>
              <h2
                className='govuk-heading-m govuk-!-margin-top-6'
                id='main-content'
              >
                What happens next
              </h2>
              <p>
                We've sent you an email confirmation. If you have not received
                this within 2 hours, check your spam.
              </p>
              {servicePhase !== 'beta' && (
                <div>
                  <p className='govuk-!-margin-top-6'>
                    You'll now receive flood messages for your location. If any
                    are issued.
                  </p>
                  <p className='govuk-!-margin-top-6'>
                    These will be sent from Floodline at the Environment Agency.
                  </p>
                </div>
              )}
              <p className='govuk-body govuk-!-margin-top-6'>
                You can now use your account to add more:
              </p>
              <ul>
                <li>
                  <Link
                    to='/home'
                    className='govuk-link'
                    style={{ cursor: 'pointer' }}
                  >
                    locations
                  </Link>
                </li>
                <li>
                  <Link
                    to='/managecontacts'
                    className='govuk-link'
                    style={{ cursor: 'pointer' }}
                  >
                    email addresses or phone numbers
                  </Link>
                </li>
              </ul>
              {servicePhase !== 'beta' && (
                <p className='govuk-!-margin-top-6'>
                  {' '}
                  <Link
                    to='/signup/feedback'
                    className='govuk-link'
                    style={{ cursor: 'pointer' }}
                  >
                    What do you think of the service?
                  </Link>
                  &nbsp; (takes 30 seconds)
                </p>
              )}
              {servicePhase === 'beta' && (
                <div>
                  <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                    Now answer some questions about the sign up process
                  </h2>
                  <Button
                    text='Continue'
                    className='govuk-button'
                    onClick={handleContinue}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

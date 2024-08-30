import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import ConfirmationPanel from '../../../../common/components/gov-uk/Panel'

export default function SignUpSuccessPage() {
  // need to check for authToken
  const navigate = useNavigate()

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <BackLink onClick={() => navigate(-1)} />
            <ConfirmationPanel title='Organisation details submitted for approval' />
            <div className='govuk-body govuk-!-margin-top-6'>
              <h1 class='govuk-heading-m govuk-!-margin-top-6'>
                What happens next
              </h1>
              <p className='govuk-!-margin-top-6'>
                We'll check the details you've submitted so we can verify your
                organisation.
              </p>
              <p className='govuk-!-margin-top-6'>
                This usually takes 2 to 3 working days.
              </p>
              <p className='govuk-!-margin-top-6'>
                Once approved, we will email you and explain how the service can
                be accessed.
              </p>
              <h1 class='govuk-heading-m govuk-!-margin-top-6'>
                Help us improve this service
              </h1>
              <p className='govuk-!-margin-top-6'>
                <Link to='/signup/feedback' className='govuk-link'>
                  What do you think of the service?
                </Link>
                &nbsp; (takes 30 seconds)
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

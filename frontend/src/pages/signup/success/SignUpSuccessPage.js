import { Link } from 'react-router-dom'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'
import ConfirmationPanel from '../../../gov-uk-components/Panel'

export default function SuccessPage () {
  //need to check for authToken
  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <ConfirmationPanel
                title='Your flood messages are set up'
                body="You've also created your account."
              />
            <div className='govuk-body govuk-!-margin-top-6'>
            <p>
              We have sent you an email confirmation. If you have not received this within 2 hours, check your spam.
            </p>
            <h1 class='govuk-heading-m govuk-!-margin-top-6'>Next Steps</h1>
            <p className='govuk-!-margin-top-6'>
              You'll now receive flood messages for your location. If any are issued.
            </p>
            <p className='govuk-!-margin-top-6'>
              These will be sent from Floodline at the Environment Agency.
            </p>
            <h2 class='govuk-heading-m govuk-!-margin-top-6'>If you want to add more locations or contacts</h2>
            <p className='govuk-body govuk-!-margin-top-6'>
              You can now use your account to add more {' '}
              <Link to='/home' className='govuk-link'>
                locations.
              </Link>
            </p>
            <p className='govuk-!-margin-top-6'>
              You can also add more {' '}
              <Link to='/managecontacts' className='govuk-link'>
                email addresses or phone numbers 
              </Link>
              &nbsp;
              to receive flood messages.
            </p>
            <p className='govuk-!-margin-top-6'>
              {' '}
              <Link to='/signup/feedback' className='govuk-link'>
                What do you think of the service?
              </Link>
              &nbsp;
              (takes 30 seconds)
            </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

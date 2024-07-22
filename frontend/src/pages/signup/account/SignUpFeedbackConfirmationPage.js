import { Link } from 'react-router-dom'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'

export default function FeedbackConfirmationPage() {
  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <Link to='/signup' className='govuk-back-link'>
            Back
          </Link>
          <h1 className='govuk-heading-l'>Thank you for your feedback!</h1>
          <div className='govuk-body'>
            Your feedback has been received. We appreciate you taking the time
            to give us your thoughts.
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function NotCompletedSignUpLayout ({ nextPage }) {
  const navigate = useNavigate()

  const handleSubmit = async () => {
    navigate(nextPage)
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-row'>
            <div className='govuk-grid-column-two-thirds'>
              <Link onClick={() => navigate(-1)} className='govuk-back-link'>
                Back
              </Link>
              <div className='govuk-body govuk-!-margin-top-6'>
                <h1 className='govuk-heading-l govuk-!-margin-top-7'>
                  You need to finish signing up before we can send you flood
                  messages
                </h1>
                <Button
                  text='Continue'
                  className='govuk-button govuk-!-margin-top-2'
                  onClick={handleSubmit}
                />
                &nbsp; &nbsp;
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

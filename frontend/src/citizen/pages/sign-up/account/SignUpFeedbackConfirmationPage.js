import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'

export default function FeedbackConfirmationPage () {
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>Thank you for your feedback - Get flood warnings - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>Thank you for your feedback</h1>
            <div className='govuk-body'>
              We'll use your answers to help improve this service.
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

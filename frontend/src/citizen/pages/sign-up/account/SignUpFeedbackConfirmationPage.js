import { Link, useNavigate } from 'react-router-dom'

export default function FeedbackConfirmationPage () {
  const navigate = useNavigate()
  return (
    <>
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-two-thirds'>
          <Link onClick={() => navigate(-1)} className='govuk-back-link'>
            Back
          </Link>
          <h1 className='govuk-heading-l'>Thank you for your feedback</h1>
          <div className='govuk-body'>
            We'll use your answers to help improve this service.
          </div>
        </div>
      </div>
    </>
  )
}

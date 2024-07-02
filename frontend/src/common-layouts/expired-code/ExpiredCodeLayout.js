import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function ExpiredCodeLayout ({ getNewCode }) {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link onClick={() => navigate(-1)} className='govuk-back-link'>
          Back
        </Link>
        <h2 className='govuk-heading-l'>Your code has expired</h2>
        <Button text='Get a new code' className='govuk-button' onClick={getNewCode} />
       &nbsp; &nbsp;
      </div>
      <Footer />
    </>
  )
}

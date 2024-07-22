import { Link, useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function NotCompletedSignUpLayout ({nextPage}) {
  const navigate = useNavigate()
  
  const handleSubmit = async (event) => {
    console.log("next page", nextPage)
    navigate(nextPage)
  }
  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <Link onClick={() => navigate(-1)} className='govuk-back-link'>
          Back
        </Link>
        <h2 className='govuk-heading-l'>Your need to finish signing up before we can send you flood messages.</h2>
        <Button text='Continue' className='govuk-button' onClick={handleSubmit} />
       &nbsp; &nbsp;
      </div>
      <Footer />
    </>
  )
}
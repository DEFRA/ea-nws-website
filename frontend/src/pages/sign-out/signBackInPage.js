import { useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
export default function SignBackIn () {
  const navigate = useNavigate()

  function redirect () {
    navigate('/signin')
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <h1 className='govuk-heading-l'>
            You need to sign back in to view this page
          </h1>
          <Button text='Sign in' className='govuk-button' onClick={redirect} />
        </div>
        <Footer />
      </div>
    </>
  )
}

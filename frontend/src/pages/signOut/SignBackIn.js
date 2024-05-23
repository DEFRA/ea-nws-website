import { useNavigate } from 'react-router-dom'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'

export default function SignBackIn() {
  const navigate = useNavigate()

  function redirect() {
    navigate('/signin')
    navigate(0)
  }

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <h1 className="govuk-heading-l">
          You need to sign back in to view this page
        </h1>
        <Button
          text={'Sign in'}
          className={'govuk-button'}
          onClick={redirect}
        />
      </div>
      <Footer />
    </>
  )
}

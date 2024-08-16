import { useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
export default function SignBackInPage () {
  const navigate = useNavigate()

  function redirect () {
    const currentRoute = window.location.pathname
    if (currentRoute.includes('/organisation/')) {
      navigate('/organisation/signin')
    } else {
      navigate('/signin')
    }
  }

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              You need to sign back in to view this page
            </h1>
            <Button
              text='Sign in'
              className='govuk-button'
              onClick={redirect}
            />
          </div>
        </div>
      </main>
    </>
  )
}

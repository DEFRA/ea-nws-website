import { useNavigate, useLocation } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
import CitizenAccountNavigation from '../../components/custom/CitizenAccountNavigation'
export default function SignBackInPage () {
  const navigate = useNavigate()
  const isOrgRoute = !!window.location.pathname.includes('/organisation/')

  function redirect () {
    isOrgRoute ? navigate('/organisation/signin') : navigate('/signin')
  }

  return (
    <>
      <CitizenAccountNavigation currentPage={useLocation().pathname} />
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

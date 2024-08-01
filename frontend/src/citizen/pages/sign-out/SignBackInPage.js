import { useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'
export default function SignBackInPage () {
  const navigate = useNavigate()

  function redirect () {
    navigate('/signin')
  }

  return (
    <>
          <h1 className='govuk-heading-l'>
            You need to sign back in to view this page
          </h1>
          <Button text='Sign in' className='govuk-button' onClick={redirect} />
    </>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../common/components/gov-uk/Button'

export default function ExpiredCodeLayout ({ getNewCode }) {
  const navigate = useNavigate()

  return (
    <>
          <Link onClick={() => navigate(-1)} className='govuk-back-link'>
            Back
          </Link>
          <h2 className='govuk-heading-l'>Your code has expired</h2>
          <Button text='Get a new code' className='govuk-button' onClick={getNewCode} />
       &nbsp; &nbsp;
    </>
  )
}

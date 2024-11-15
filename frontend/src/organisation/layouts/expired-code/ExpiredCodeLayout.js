import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'

export default function ExpiredCodeLayout ({ getNewCode }) {
  const navigate = useNavigate()

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h2 className='govuk-heading-l'>Your code has expired</h2>
            <Button text='Get a new code' className='govuk-button' onClick={getNewCode} />
          </div>
        </div>
      </main>
    </>
  )
}

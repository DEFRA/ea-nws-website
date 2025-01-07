import { useNavigate, useLocation } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import CitizenAccountNavigation from '../../../common/components/custom/CitizenAccountNavigation'
export default function NotCompletedSignUpLayout ({ nextPage }) {
  const navigate = useNavigate()

  const handleSubmit = async () => {
    navigate(nextPage)
  }

  return (
    <>
      <CitizenAccountNavigation currentPage={useLocation().pathname} />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l govuk-!-margin-top-7'>
                You need to finish signing up before we can send you flood
                messages
              </h1>
              <Button
                text='Continue'
                className='govuk-button govuk-!-margin-top-2'
                onClick={handleSubmit}
              />
                &nbsp; &nbsp;
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

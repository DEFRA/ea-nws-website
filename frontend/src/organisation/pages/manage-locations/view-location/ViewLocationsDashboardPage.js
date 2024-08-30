import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../common/components/gov-uk/NotificationBanner'

export default function ViewLocationsDashboardPage() {
  const navigate = useNavigate()

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-body'>
            <NotificationBanner
              className={
                'govuk-notification-banner govuk-notification-banner--success'
              }
              title={'Success'}
              text={'100 new locations added'}
            />
            <h1 className='govuk-heading-l'>Your organisation's locations</h1>
            <Button
              text={'Add locations'}
              className={'govuk-button govuk-button--secondary'}
            />
            <Link>Back to settings</Link>
            <p>
              Last updated: by you at 11:15am, 10 May 2024,{' '}
              <a>View all updates</a>
            </p>
            <Button
              text={'Filter locations'}
              className={'govuk-button govuk-button--secondary'}
            />
            <p>700 locations</p>
          </div>
        </div>
      </main>
    </>
  )
}

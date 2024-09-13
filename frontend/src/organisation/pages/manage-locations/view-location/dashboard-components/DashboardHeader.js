import { Link } from 'react-router-dom'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'

export default function DashboardHeader ({ LocationsAdded, LastUpdated }) {
  return (
    <>
      <NotificationBanner
        className='govuk-notification-banner govuk-notification-banner--success'
        title='Success'
        text='100 new locations added'
        // Update this to not be hardcoded
      />
      <h1 className='govuk-heading-l'>Your organisation's locations</h1>
      <Button
        text='Add locations'
        className='govuk-button govuk-button--secondary'
      />
      <Link className='govuk-link inline-link'>Back to settings</Link>
      <p className='govuk-caption-m govuk-!-margin-bottom-9'>
        {/* Update this to not be hardcoded */}
        Last updated: by you at 11:15am, 10 May 2024,{' '}
        <Link>View all updates</Link>
      </p>
    </>
  )
}

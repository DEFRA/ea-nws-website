import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../common/assets/images/live-monitoring-flood-alert-icon.png'
import floodWarningIcon from '../../../../common/assets/images/live-monitoring-flood-warning-icon.png'
import floodWarningRemovedIcon from '../../../../common/assets/images/live-monitoring-removed-icon.png'
import floodSevereWarningIcon from '../../../../common/assets/images/live-monitoring-severe-flood-warning-icon.png'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../common/components/gov-uk/Button'
import FloodTypeFilter from './monitoring-components/FloodTypeFilter'
import LiveMap from './monitoring-components/LiveMap'

export default function LiveFLoodMonitoringPage() {
  const navigate = useNavigate()
  const [activeLocations, setActiveLocations] = useState(true)

  return (
    <>
      <OrganisationAccountNavigation />

      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4 govuk-body'>
        <div className='govuk-grid-row'>
          <div class='govuk-grid-column-full'>
            <h1 class='govuk-heading-l'>Live flood warnings</h1>
            <h2
              class='govuk-heading-m govuk-link'
              style={{ color: '#1d70b8', marginBottom: '0' }}
            >
              202 locations currently affected
            </h2>
            <p style={{ marginTop: '0' }}>Updated 10:00pm on 12 June 2024</p>
          </div>
        </div>
        <div class='govuk-grid-row govuk-!-padding-top-4'>
          <div class='govuk-grid-column-one-third'>
            {activeLocations ? (
              <>
                <FloodTypeFilter
                  iconSrc={floodSevereWarningIcon}
                  locationsCount={2}
                  warningType='Severe'
                  warningText='Severe flood warning'
                  warningDescription='Severe flooding - danger to life'
                />
                <br />
                <FloodTypeFilter
                  iconSrc={floodWarningIcon}
                  locationsCount={33}
                  warningType='Warning'
                  warningText='Flood warning'
                  warningDescription='Flooding expected - act now'
                />
                <br />
                <FloodTypeFilter
                  iconSrc={floodAlertIcon}
                  locationsCount={167}
                  warningType='Alert'
                  warningText='Flood alert'
                  warningDescription='Early alert of possible flooding - be prepared'
                />
                <br />
                <p className='govuk-body govuk-!-font-weight-bold'>
                  Warnings removed in the last 24 hours
                </p>
                <FloodTypeFilter
                  iconSrc={floodWarningRemovedIcon}
                  locationsCount={3}
                  warningType='Removed'
                  warningText='Warnings removed'
                  warningDescription=''
                />
                <Button
                  text='Apply filter'
                  className='govuk-button govuk-button--primary govuk-!-margin-top-3'
                />
              </>
            ) : (
              <>
                <h2 class='govuk-heading-m'>Latest warnings</h2>
                <p className='govuk-!-padding-top-0'>0 to display</p>
                <br />
                <p>
                  You’ll only see flood warnings here when you{' '}
                  <Link href='#' class='govuk-link'>
                    add locations
                  </Link>
                </p>
              </>
            )}
          </div>
          <div class='govuk-grid-column-two-thirds'>
            <LiveMap />
            <br />

            {/* <p className='govuk-body govuk-!-font-weight-bold'>
              Locations affected
            </p> */}
          </div>
        </div>
      </main>
    </>
  )
}

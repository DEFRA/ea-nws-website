import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../common/assets/images/flood_warning.svg'
import floodWarningRemovedIcon from '../../../common/assets/images/flood_warning_removed.svg'
import floodSevereWarningIcon from '../../../common/assets/images/severe_flood_warning.svg'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import { orgFloodReportsUrls } from '../../routes/flood-reports/FloodReportsRoutes'
import { infoUrls } from '../../routes/info/InfoRoutes'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'
import FloodTypeFilter from './monitoring-components/FloodTypeFilter'
import LiveMap from './monitoring-components/LiveMap'

export default function LiveFloodMonitoringPage() {
  const navigate = useNavigate()
  const [showSevereLocations, setShowSevereLocations] = useState(true)
  const [showWarningLocations, setShowWarningLocations] = useState(true)
  const [showAlertLocations, setShowAlertLocations] = useState(true)
  const [showRemovedLocations, setShowRemovedLocations] = useState(true)
  const [filters, setFilters] = useState({
    severeAreas: true,
    warningAreas: true,
    alertAreas: true,
    removedAreas: true
  })
  const [floodData, setFloodData] = useState({
    locationsAffected: 0,
    severeFloodAreasAmount: 0,
    warningFloodAreasAmount: 0,
    alertFloodAreasAmount: 0,
    removedFloodAreasAmount: 0
  })
  const [accountHasLocations, setAccountHasLocations] = useState(true)

  const handleFloodAreasUpdate = (data) => {
    setFloodData(data)
  }

  const applyFilter = () => {
    setFilters({
      severeAreas: showSevereLocations,
      warningAreas: showWarningLocations,
      alertAreas: showAlertLocations,
      removedAreas: showRemovedLocations
    })
  }

  const lastUpdated = () => {
    const now = new Date()

    let hours = now.getHours()
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'

    // Convert to 12-hour format
    hours = hours % 12 || 12 // Convert 0 to 12 for 12 AM and keep other
    const time = `${hours}:${minutes}${ampm}`

    const date = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    return `${time} on ${date}`
  }

  return (
    <>
      <Helmet>
        <title>
          Live flood warnings - Get flood warnings (professional) - GOV.UK
        </title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-5 govuk-body'>
        <div className='govuk-grid-row'>
          <div class='govuk-grid-column-two-thirds'>
            <h1 class='govuk-heading-l' id='main-content'>
              Live flood warnings
            </h1>
            {accountHasLocations && (
              <>
                <Link
                  class='govuk-heading-m govuk-link'
                  style={{ color: '#1d70b8', marginBottom: '0' }}
                  to={orgFloodReportsUrls.live}
                >
                  {floodData.locationsAffected} of your organisation's locations
                  currently affected
                </Link>
                <p className='govuk-!-font-size-16' style={{ marginTop: '0' }}>
                  Updated {lastUpdated()}
                </p>
              </>
            )}
          </div>
        </div>
        <div class='govuk-grid-row govuk-!-padding-top-4'>
          <div class='govuk-grid-column-one-third'>
            {accountHasLocations ? (
              floodData.locationsAffected > 0 ? (
                <>
                  <FloodTypeFilter
                    iconSrc={floodSevereWarningIcon}
                    locationsCount={floodData.severeFloodAreasAmount}
                    warningType='Severe'
                    warningText='Severe flood warning'
                    warningDescription='Severe flooding - danger to life'
                    showFloodType={showSevereLocations}
                    updateFloodTypeVisibility={setShowSevereLocations}
                    urlLink={orgFloodReportsUrls.live}
                  />
                  <br />
                  <FloodTypeFilter
                    iconSrc={floodWarningIcon}
                    locationsCount={floodData.warningFloodAreasAmount}
                    warningType='Warning'
                    warningText='Flood warning'
                    warningDescription='Flooding expected - act now'
                    showFloodType={showWarningLocations}
                    updateFloodTypeVisibility={setShowWarningLocations}
                    urlLink={orgFloodReportsUrls.live}
                  />
                  <br />
                  <FloodTypeFilter
                    iconSrc={floodAlertIcon}
                    locationsCount={floodData.alertFloodAreasAmount}
                    warningType='Alert'
                    warningText='Flood alert'
                    warningDescription='Early alert of possible flooding - be prepared'
                    showFloodType={showAlertLocations}
                    updateFloodTypeVisibility={setShowAlertLocations}
                    urlLink={orgFloodReportsUrls.live}
                  />
                  <br />
                  <p className='govuk-body govuk-!-font-weight-bold'>
                    Warnings removed in the last 24 hours
                  </p>
                  <FloodTypeFilter
                    iconSrc={floodWarningRemovedIcon}
                    locationsCount={floodData.removedFloodAreasAmount}
                    warningType='Removed'
                    warningText='Warnings removed'
                    warningDescription=''
                    showFloodType={showRemovedLocations}
                    updateFloodTypeVisibility={setShowRemovedLocations}
                    urlLink={orgFloodReportsUrls.removed}
                  />
                  <Button
                    text='Apply filter'
                    className='govuk-button govuk-button--primary govuk-!-margin-top-3'
                    onClick={(event) => {
                      applyFilter(event)
                    }}
                  />
                </>
              ) : (
                <p>
                  There are currently no warnings in force across your
                  locations.
                </p>
              )
            ) : (
              <>
                <h2 class='govuk-heading-m govuk-!-margin-bottom-0'>
                  Latest warnings
                </h2>
                <p className='govuk-!-margin-top-0'>0 to display</p>
                <p>
                  You'll only see flood warnings here when you{' '}
                  <Link
                    to={orgManageLocationsUrls.add.options}
                    className='govuk-link'
                  >
                    add locations.
                  </Link>
                </p>

                <p className='govuk-!-font-weight-bold govuk-!-margin-top-6 govuk-!-margin-bottom-0'>
                  If you need help
                </p>
                <p>
                  You can read a step-by-step{' '}
                  <Link to={infoUrls.help} className='govuk-link'>
                    guide
                  </Link>{' '}
                  to setting up your account
                </p>
              </>
            )}
          </div>
          <div class='govuk-grid-column-two-thirds'>
            <LiveMap
              showSevereLocations={filters.severeAreas}
              showWarningLocations={filters.warningAreas}
              showAlertLocations={filters.alertAreas}
              showRemovedLocations={filters.removedAreas}
              onFloodAreasUpdate={handleFloodAreasUpdate}
              isDisabled={!accountHasLocations}
              setAccountHasLocations={(val) => setAccountHasLocations(val)}
            />
          </div>
        </div>
      </main>
    </>
  )
}

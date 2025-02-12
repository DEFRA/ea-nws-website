import { faSquareFull } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import floodAlertIcon from '../../../../common/assets/images/flood_alert.svg'
import floodWarningIcon from '../../../../common/assets/images/flood_warning.svg'
import floodWarningRemovedIcon from '../../../../common/assets/images/flood_warning_removed.svg'
import floodSevereWarningIcon from '../../../../common/assets/images/severe_flood_warning.svg'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { orgFloodReportsUrls } from '../../../routes/flood-reports/FloodReportsRoutes'
import FloodTypeFilter from './monitoring-components/FloodTypeFilter'
import LiveMap from './monitoring-components/LiveMap'

export default function LiveFLoodMonitoringPage() {
  const navigate = useNavigate()
  const [activeLocations] = useState(true)
  const [showSevereLocations, setShowSevereLocations] = useState(true)
  const [showWarningLocations, setShowWarningLocations] = useState(true)
  const [showAlertLocations, setShowAlertLocations] = useState(true)
  const [floodData, setFloodData] = useState({
    severeFloodAreas: [],
    warningFloodAreas: [],
    alertFloodAreas: []
  })

  const handleFloodAreasUpdate = (data) => {
    setFloodData(data)
  }

  const totalLocations =
    floodData.severeFloodAreas.length +
    floodData.warningFloodAreas.length +
    floodData.alertFloodAreas.length

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4 govuk-body'>
        <div className='govuk-grid-row'>
          <div class='govuk-grid-column-one-third'>
            <h1 class='govuk-heading-l'>Live flood warnings</h1>
            <Link
              class='govuk-heading-m govuk-link'
              style={{ color: '#1d70b8', marginBottom: '0' }}
              to={orgFloodReportsUrls.live}
            >
              {totalLocations} locations currently affected
            </Link>
            <p style={{ marginTop: '0' }}>Updated 10:00pm on 12 June 2024</p>
          </div>
        </div>
        <div class='govuk-grid-row govuk-!-padding-top-4'>
          <div class='govuk-grid-column-one-third'>
            {activeLocations ? (
              <>
                <FloodTypeFilter
                  iconSrc={floodSevereWarningIcon}
                  locationsCount={floodData.severeFloodAreas.length}
                  warningType='Severe'
                  warningText='Severe flood warning'
                  warningDescription='Severe flooding - danger to life'
                  showFloodType={showSevereLocations}
                  updateFloodTypeVisibility={setShowSevereLocations}
                />
                <br />
                <FloodTypeFilter
                  iconSrc={floodWarningIcon}
                  locationsCount={floodData.warningFloodAreas.length}
                  warningType='Warning'
                  warningText='Flood warning'
                  warningDescription='Flooding expected - act now'
                  showFloodType={showWarningLocations}
                  updateFloodTypeVisibility={setShowWarningLocations}
                />
                <br />
                <FloodTypeFilter
                  iconSrc={floodAlertIcon}
                  locationsCount={floodData.alertFloodAreas.length}
                  warningType='Alert'
                  warningText='Flood alert'
                  warningDescription='Early alert of possible flooding - be prepared'
                  showFloodType={showAlertLocations}
                  updateFloodTypeVisibility={setShowAlertLocations}
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
            <LiveMap
              showSevereLocations={showSevereLocations}
              showWarningLocations={showWarningLocations}
              showAlertLocations={showAlertLocations}
              onFloodAreasUpdate={handleFloodAreasUpdate}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                paddingBottom: '10px',
                backgroundColor: '#F3F2F1'
              }}
            >
              <div style={{ flex: '0 0 auto', marginRight: '12px' }}>
                <FontAwesomeIcon
                  icon={faSquareFull}
                  style={{ color: '#E1414B' }}
                  size='lg'
                  className='govuk-!-margin-left-4'
                />
                <span className='govuk-!-font-size-19 govuk-!-margin-left-2'>
                  Severe flood warnings and flood warnings area
                </span>
                <FontAwesomeIcon
                  icon={faSquareFull}
                  style={{ color: '#ED9E4A' }}
                  size='lg'
                  className='govuk-!-margin-left-6'
                />
                <span className='govuk-!-font-size-19 govuk-!-margin-left-2'>
                  Flood alert area
                </span>
              </div>
            </div>
            <br />
          </div>
        </div>
      </main>
    </>
  )
}

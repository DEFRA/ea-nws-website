import { React } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import {
  getLocationAdditional,
  getLocationOther
} from '../../../../../../common/redux/userSlice'
import FloodWarningKey from '../../../../../components/custom/FloodWarningKey'
import Map from '../../../../../components/custom/Map'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationNotInEnglandInfoPage () {
  const navigate = useNavigate()

  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const currentAddress = useSelector((state) =>
    getLocationOther(state, 'full_address')
  )
  const formattedAddress = currentAddress ? currentAddress.split(',') : ''
  const currentPostCode = useSelector((state) =>
    getLocationOther(state, 'postcode')
  )
  const xCoord = useSelector((state) => getLocationOther(state, 'x_coordinate'))
  const yCoord = useSelector((state) => getLocationOther(state, 'y_coordinate'))

  const handleSubmit = (event) =>
    event.preventDefault()
  navigate(orgManageLocationsUrls.unmatchedLocations.notInEngland.find)

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l '>Location not in England</h1>
            <h2 className='govuk-heading-m govuk-!-margin-top-8'>
              {locationName}
            </h2>
            <hr />

            {currentAddress && (
              <>
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Address
                </h3>
                <p>
                  {formattedAddress.map((line, index) => {
                    return (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  })}
                  {currentPostCode && currentPostCode}
                </p>
              </>
            )}

            {xCoord && yCoord && (
              <>
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-top-4 govuk-!-margin-bottom-0'>
                  X and Y coordinates
                </h3>
                <p>
                  {xCoord}
                  {', '}
                  {yCoord}
                </p>
              </>
            )}

            <p className='govuk-!-margin-top-8'>
              This location is not in England. If you think this is not correct
              you can change the position of this location by using a postcode,
              using different X and Y coordinates or dropping a pin on a map.
            </p>

            <div className='govuk-!-margin-top-8'>
              <Button
                text='Change location'
                className='govuk-button'
                onClick={handleSubmit}
              />
              &nbsp;
              <Link onClick={navigateBack} className='govuk-link inline-link'>
                Cancel
              </Link>
            </div>
          </div>
          <div
            className='govuk-grid-column-one-half'
            style={{ marginTop: '95px' }}
          >
            <Map showMapControls={false} zoomLevel={14} />
            <FloodWarningKey />
            <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
              This is not a live flood map
            </span>
            <span className='govuk-caption-m govuk-!-font-size-16'>
              it shows fixed areas that we provide flood warnings and alerts for
            </span>
          </div>
        </div>
      </main>
    </>
  )
}

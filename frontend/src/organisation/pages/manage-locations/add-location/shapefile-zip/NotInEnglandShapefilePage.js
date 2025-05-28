import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import { getLocationAdditional } from '../../../../../common/redux/userSlice'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'

export default function NotInEnglandShapeFilePage () {
  const navigate = useNavigate()
  const location = useLocation()
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const shapeArea = location.state?.shapeArea

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Location Not In England - GOV.UK</title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-body govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>Location not in England</h1>
            <h2 className='govuk-heading-m govuk-!-margin-top-8 govuk-!-margin-bottom-0'>
              {locationName}
            </h2>
            <hr />
            <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
              Polygon
            </h3>
            <p>{shapeArea} square metres</p>
            <p className='govuk-!-margin-top-8 govuk-!-margin-bottom-8'>
              This location is not in England. If you think this is not correct
              and the location is in England you'll need to upload a different
              shapefile.
            </p>
            <p>
              To get flood messages for location in Scotland or Wales go to:
            </p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>
                <a
                  href='https://floodline.sepa.org.uk/floodingsignup/'
                  className='govuk-link'
                >
                  The Scottish Environment Protection Agency (SEPA)
                </a>{' '}
                for flood messages in Scotland
              </li>
              <li>
                <a
                  href='https://naturalresources.wales/splash?orig=%2fflooding%2fsign-up-to-receive-flood-warnings%2f&lang=cy'
                  className='govuk-link'
                >
                  Natural Resources Wales
                </a>{' '}
                for flood messages in Wales
              </li>
            </ul>
            <p>
              Use flood maps to{' '}
              <a
                href='https://www.nidirect.gov.uk/articles/check-risk-flooding-your-area'
                className='govuk-link'
              >
                check flooding risk in Northern Ireland
              </a>
              .
            </p>
          </div>

          <div
            className='govuk-grid-column-one-half'
            style={{ marginTop: '95px' }}
          >
            <Map showMapControls={false} zoomLevel={14} />
            <div className='govuk-!-column-one-third'>
              <FloodWarningKey />
            </div>
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

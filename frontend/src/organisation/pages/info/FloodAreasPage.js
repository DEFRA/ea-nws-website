import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Details from '../../../common/components/gov-uk/Details'
import WarningText from '../../../common/components/gov-uk/WarningText'
import { infoUrls } from '../../routes/info/InfoRoutes'

export default function FloodAreasPage () {
  const navigate = useNavigate()

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const detailsMessage = (
    <div>
      <p>
        There may be no measurement guages in the area of the location. Or the
        location is in an area where not many people live or work.
      </p>
      <p>
        Locations may still be at risk even if you cannot get flood messages for
        that area.
      </p>
      <p>
        If you cannot get flood messages for your organisation's locations you
        may be able to link these locations to nearby flood areas that can get
        flood messages.
      </p>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>What are flood areas? - GOV.UK</title>
      </Helmet>
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l govuk-!-margin-top-3'>
              What are flood areas?
            </h1>
            <p>
              A flood area is a zone in England that's monitored for flooding.
            </p>
            <p className='govuk-!-margin-top-6'>
              Your organisations's location may be in an area that can get:
            </p>
            <ul className='govuk-list govuk-list--bullet govuk-!-margin-top-6'>
              <li>
                severe flood warnings and flood warnings (flood warning area)
              </li>
              <li>flood alerts (flood alert area)</li>
              <li>
                severes flood warnings, flood warnings and flood alerts (when
                location is in both a flood warning and a flood alert area)
              </li>
              <li>no flood messages</li>
            </ul>

            <br />
            <Details
              title='Why can you not get flood messages for all locations?'
              text={detailsMessage}
            />

            <h5 className='govuk-heading-s'>Flood warning areas</h5>
            <p>
              Flood warning areas usually cover smaller areas where people live
              or work, such as cities, towns or villages.
            </p>

            <br />
            <h5 className='govuk-heading-s'>Flood alert areas</h5>
            <p>
              Flood alert areas tend to be larger than flood warning areas. They
              can overlap several flood warning areas.
            </p>
            <p>
              Flood alerts are sent earlier than flood warnings to provide
              advance notice of possible flooding.
            </p>

            <br />
            <h5 className='govuk-heading-s'>No flood messages</h5>
            <p>
              Not all locations are in places that can get flood warnings or
              flood alerts.
            </p>
            <WarningText text='Your locations may still be at risk even if there are no warnings sent in that area.' />

            <h5 className='govuk-heading-s'>Flood extent</h5>
            <p>
              Flood extent shows the area that could be affected by flooding.
              This may extend beyond the flood warning or flood alert area a
              location is in.
            </p>

            <br />
            <h5 className='govuk-heading-s'>Flood risk</h5>
            <p>
              Flood risk is based on a combination of likelihood and impact –
              how likely it is that flooding will happen and the effect that
              will have on people. buildings and services.
            </p>

            <p>
              <Link to={infoUrls.levels} className='govuk-link'>
                Find out more about how we measure river, sea and groundwater
                levels.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

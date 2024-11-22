import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import { infoUrls } from '../../../../../routes/info/InfoRoutes'
import { urlManageKeywordsOrg } from '../../../../../routes/manage-keywords/ManageKeywordsRoutes'
import { urlManageOrgAddLocations } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DashboardHeader ({ locations }) {
  const navigate = useNavigate()

  const floodRiskDetails = (
    <>
      Flood risk is based on a combination of likelihood and impact – how likely
      it is that flooding will happen and the effect that flooding will have on
      people, buildings and services. Flood risk can fall into the following
      categories:
      <h4 className='govuk-heading-m govuk-!-margin-top-6'>Rivers and sea</h4>
      <p className='govuk-!-margin-top-4'>
        <strong>High risk</strong>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        greater than 1 in 30.
      </p>
      <p className='govuk-!-margin-top-4'>
        <strong>Medium risk</strong>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 100 and 1 in 30.
      </p>
      <p className='govuk-!-margin-top-4'>
        <strong>Low risk</strong>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 1000 and 1 in 100.
      </p>
      <h4 className='govuk-heading-m  govuk-!-margin-top-6'>Groundwater</h4>
      <p className='govuk-!-margin-top-4'>
        <strong>Possible</strong>
        <br />
        Flooding is possible in the local area when groundwater levels are high.
      </p>
      <p className='govuk-!-margin-top-4'>
        <strong>Unlikely</strong>
        <br />
        It's unlikely the location will be affected by groundwater flooding.
      </p>
    </>
  )

  const noContactsDetails = (
    <>
      <p>
        If no flood warnings or flood alerts are available for a location you
        may be able to link to nearby flood areas that get them.
      </p>

      <p>
        To link locations to nearby flood areas, go to an individual location
        screen then link to nearby flood areas in the Flood areas and message
        setting section.
      </p>
    </>
  )

  const handleFloodAreas = (event) => {
    event.preventDefault()
    navigate(infoUrls.floodAreas)
  }

  const FloodBanner = ({ type }) => {
    const count = []
    const message = []
    const heading = []

    if (type === 'floodMessages') {
      heading[0] = 'Locations that will get flood messages'
      count.push(
        locations.filter((obj) => obj.alert_categories.length > 0).length
      )
      message[0] = 'in flood areas'
    } else if (type === 'noFloodMessages') {
      heading[0] = 'Locations that do not currently get flood messages'

      const mediumHighRisk = locations.filter(
        (obj) =>
          (obj.riverSeaRisk === 'Medium risk' ||
            obj.riverSeaRisk === 'High risk') &&
          obj.alert_categories.length === 0
      ).length
      count.push(mediumHighRisk)
      message[0] = 'at medium or high flood risk'

      const lowRisk = locations.filter(
        (obj) =>
          obj.riverSeaRisk === 'Low risk' && obj.alert_categories.length === 0
      ).length
      count.push(lowRisk)
      message.push('at low flood risk')
    } else if (type === 'noContacts') {
      heading[0] = 'Locations not linked to contacts'
      count.push(0)
      message[0] = 'not linked to contacts'
    }

    return (
      <div
        className='govuk-!-margin-top-1'
        style={{
          width: '100%',
          padding: '0.5rem 0.5rem'
        }}
      >
        <p>
          <strong>{heading}</strong>
        </p>
        <div
          style={{
            border: '2px solid lightGrey',
            padding: '1.5rem 1.5rem',
            height: '10rem'
          }}
        >
          {(type === 'floodMessages' || type === 'noContacts') && (
            <>
              <h1
                style={{ color: type === 'noContacts' ? 'crimson' : 'black' }}
              >
                <strong>{count[0]}</strong>
              </h1>
              <Link className='govuk-link'>
                {count[0] === 1 ? 'location' : 'locations'} {message[0]}
              </Link>
            </>
          )}
          {type === 'noFloodMessages' && (
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  borderRight: '2px solid lightGrey',
                  width: '100%',
                  padding: '0rem 1rem 0rem 0rem'
                }}
              >
                <h1 style={{ color: 'coral' }}>
                  <strong>{count[0]}</strong>
                </h1>
                <Link className='govuk-link'>
                  {count[0] === 1 ? 'location' : 'locations'} {message[0]}
                </Link>
              </div>
              <div style={{ width: '100%', padding: '0rem 1.5rem' }}>
                <h1>
                  <strong>{count[1]}</strong>
                </h1>
                <Link className='govuk-link'>
                  {count[1] === 1 ? 'location' : 'locations'} {message[1]}
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className='govuk-!-margin-top-2'>
          {type === 'floodMessages' && (
            <Link className='govuk-link' onClick={handleFloodAreas}>
              What are flood areas?
            </Link>
          )}
          {type === 'noFloodMessages' && (
            // TODO: Add route to link locations
            <Link className='govuk-link'>
              Link these locations to nearby flood areas to get flood messages
            </Link>
          )}
          {type === 'noContacts' && (
            <Details
              title='Linking locations to contacts so that they can get flood messages'
              text={noContactsDetails}
            />
          )}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className='govuk-grid-column-full govuk-body govuk-!-margin-top-6'>
        <div style={{ display: 'flex' }}>
          <h1 className='govuk-heading-l'>
            Manage your organisation's {locations.length} locations
          </h1>
          <div style={{ marginLeft: 'auto' }}>
            <Button
              text='Add locations'
              className='govuk-button govuk-button--secondary'
              onClick={() => navigate(urlManageOrgAddLocations)}
            />
            &nbsp; &nbsp;
            <Button
              text='Manage keywords'
              className='govuk-button govuk-button--secondary'
              onClick={() => navigate(urlManageKeywordsOrg)}
            />
          </div>
        </div>

        <span style={{ display: 'flex', fontSize: '18px' }}>
          <FloodBanner type='floodMessages' />
          <FloodBanner type='noFloodMessages' />
          <FloodBanner type='noContacts' />
        </span>
      </div>

      <div className='govuk-grid-column-one-half'>
        <Details title='What is flood risk?' text={floodRiskDetails} />
      </div>
    </>
  )
}

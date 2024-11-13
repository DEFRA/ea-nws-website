import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import { urlManageKeywordsOrg } from '../../../../../routes/manage-keywords/ManageKeywordsRoutes'
import { urlManageOrgAddLocations } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DashboardHeader ({
  LocationsAdded,
  LastUpdated,
  locations
}) {
  const navigate = useNavigate()

  const detailsMessage = (
    <>
      Flood risk is based on a combination of likelihood and impact – how likely
      it is that flooding will happen and the effect that flooding will have on
      people, buildings and services. Flood risk can fall into the following
      categories:
      <h4 className='govuk-!-margin-top-6'>
        <strong>Rivers and sea</strong>
      </h4>
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
      <h4 className='govuk-!-margin-top-6'>
        <strong>Groundwater</strong>
      </h4>
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

  const handleFloodAreas = async (event) => {
    event.preventDefault()
    navigate('/organisation/info/flood-areas')
  }

  const nFloodMessages = locations.filter(
    (item) => item.alert_categories.length > 0
  ).length

  return (
    <>
      <div
        className='govuk-grid-column-full govuk-body govuk-!-margin-top-6'
        style={{ fontSize: '18px' }}
      >
        <div style={{ display: 'flex' }}>
          <h1 className='govuk-heading-l'>
            Manage your organisation's locations
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

        {/* <div style={{ display: 'flex' }}> */}
        <div className='govuk-!-margin-top-3' style={{ paddingBottom: '10px' }}>
          <p>
            <strong>Locations that will get flood messages</strong>
          </p>
          <div
            style={{
              border: '2px solid lightGrey',
              padding: '30px 0px 50px 20px',
              width: '100%'
            }}
          >
            <h1>
              <strong>{nFloodMessages}</strong>
            </h1>
            <Link className='govuk-link'>
              {' '}
              {nFloodMessages === 1 ? 'location' : 'locations'} in flood areas
            </Link>
          </div>
        </div>
        <Link className='govuk-link' onClick={handleFloodAreas}>
          What are flood areas?
        </Link>
        {/* </div> */}
      </div>

      <div className='govuk-grid-column-one-half govuk-!-margin-top-6'>
        <Details title='What is flood risk?' text={detailsMessage} />
      </div>
    </>
  )
}

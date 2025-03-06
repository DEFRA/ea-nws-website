import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import LinkBanner from '../../../../../components/custom/LinkBanner'
import { infoUrls } from '../../../../../routes/info/InfoRoutes'
import { urlManageKeywordsOrg } from '../../../../../routes/manage-keywords/ManageKeywordsRoutes'
import { urlManageOrgAddLocations } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DashboardHeader ({
  locations,
  onClickLinked,
  linkContacts,
  selectedLocations,
  onOnlyShowSelected,
  linkSource
}) {
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
        locations.filter((obj) => obj.additionals.other?.alertTypes?.length > 0)
          .length
      )
      message[0] = 'in flood areas'

      count.push(
        locations.filter(
          (item) =>
            item.additionals.other?.childrenIDs?.length > 0 &&
            item.additionals.other?.alertTypes?.length > 0
        ).length
      )
      message.push('linked to nearby flood areas')
    } else if (type === 'noFloodMessages') {
      heading[0] = 'Locations that do not currently get flood messages'

      const mediumHighRisk = locations.filter(
        (obj) =>
          (obj.riverSeaRisk?.title === 'Medium risk' ||
            obj.riverSeaRisk?.title === 'High risk') &&
          obj.additionals.other?.alertTypes?.length === 0
      ).length
      count.push(mediumHighRisk)
      message[0] = 'at medium or high flood risk'

      const lowRisk = locations.filter(
        (obj) =>
          obj.riverSeaRisk?.title === 'Low risk' &&
          obj.additionals.other?.alertTypes?.length === 0
      ).length
      count.push(lowRisk)
      message.push('at low flood risk')
    } else if (type === 'noContacts') {
      heading[0] = 'Locations not linked to contacts'
      count.push(
        locations.filter((item) => item.linked_contacts?.length === 0).length
      )
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
          {type === 'floodMessages' && (
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  width: '100%',
                  padding: '0rem 1rem 0rem 0rem'
                }}
              >
                <h1>
                  <strong>{count[0]}</strong>
                </h1>
                <Link
                  className='govuk-link'
                  onClick={() => onClickLinked('messages')}
                >
                  {count[0] === 1 ? 'location' : 'locations'} {message[0]}
                </Link>
              </div>
              {locations.filter(
                (item) =>
                  item.additionals.other?.childrenIDs?.length > 0 &&
                  item.additionals.other?.alertTypes?.length > 0
              ).length > 0 && (
                <div
                  style={{
                    width: '100%',
                    padding: '0rem 1.5rem',
                    borderLeft: '2px solid lightGrey'
                  }}
                >
                  <h1>
                    <strong>{count[1]}</strong>
                  </h1>
                  <Link
                    className='govuk-link'
                    onClick={() => onClickLinked('linked-locations')}
                  >
                    {count[1] === 1 ? 'location' : 'locations'} {message[1]}
                  </Link>
                </div>
              )}
            </div>
          )}
          {type === 'noFloodMessages' && (
            <div style={{ display: 'flex' }}>
              {locations.filter(
                (item) =>
                  (item.riverSeaRisk?.title === 'Medium risk' ||
                    item.riverSeaRisk?.title === 'High risk') &&
                  item.additionals.other?.alertTypes?.length === 0
              ).length > 0 && (
                <div style={{ width: '100%', padding: '0rem 1rem 0rem 0rem' }}>
                  <h1 style={{ color: 'coral' }}>
                    <strong>{count[0]}</strong>
                  </h1>
                  <Link
                    className='govuk-link'
                    onClick={() => onClickLinked('high-medium-risk')}
                  >
                    {count[0] === 1 ? 'location' : 'locations'} {message[0]}
                  </Link>
                </div>
              )}
              {locations.filter(
                (item) =>
                  (item.riverSeaRisk?.title === 'Medium risk' ||
                    item.riverSeaRisk?.title === 'High risk') &&
                  item.additionals.other?.alertTypes?.length === 0
              ).length > 0 &&
                locations.filter(
                  (item) =>
                    item.riverSeaRisk?.title === 'Low risk' &&
                    item.additionals.other?.alertTypes?.length === 0
                ).length > 0 && (
                  <div
                    style={{
                      borderRight: '2px solid lightGrey'
                    }}
                  />
              )}
              {locations.filter(
                (item) =>
                  item.riverSeaRisk?.title === 'Low risk' &&
                  item.additionals.other?.alertTypes?.length === 0
              ).length > 0 && (
                <div style={{ width: '100%', padding: '0rem 1.5rem' }}>
                  <h1>
                    <strong>{count[1]}</strong>
                  </h1>
                  <Link
                    className='govuk-link'
                    onClick={() => onClickLinked('low-risk')}
                  >
                    {count[1] === 1 ? 'location' : 'locations'} {message[1]}
                  </Link>
                </div>
              )}
            </div>
          )}
          {type === 'noContacts' && (
            <>
              <h1 style={{ color: 'crimson' }}>
                <strong>{count[0]}</strong>
              </h1>
              <Link
                className='govuk-link'
                onClick={() => onClickLinked('no-links')}
              >
                {count[0] === 1 ? 'location' : 'locations'} {message[0]}
              </Link>
            </>
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
              // TODO: Reduce text font to match others
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
      <div className='govuk-body govuk-!-margin-top-6'>
        {!linkContacts || linkContacts.length === 0
          ? (
            <>
              <div style={{ display: 'flex' }}>
                <h1 className='govuk-heading-l'>
                  Manage your organisation's{' '}
                  {locations.length > 1 ? locations.length : null} locations
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
                {(locations.filter(
                  (item) =>
                    (item.riverSeaRisk?.title === 'Medium risk' ||
                    item.riverSeaRisk?.title === 'High risk') &&
                  item.additionals.other?.alertTypes?.length === 0
                ).length > 0 ||
                locations.filter(
                  (item) =>
                    item.riverSeaRisk?.title === 'Low risk' &&
                    item.additionals.other?.alertTypes?.length === 0
                ).length > 0) && <FloodBanner type='noFloodMessages' />}
                {locations.filter((item) => item.linked_contacts?.length === 0)
                  .length > 0 && <FloodBanner type='noContacts' />}
              </span>

              <div className='govuk-grid-column-one-half'>
                <Details title='What is flood risk?' text={floodRiskDetails} />
              </div>
            </>
            )
          : (
            <>
              <h1 className='govuk-heading-l'>Link contact to locations</h1>
              <p>
                Select the locations you want to link to this contact from the
                list. Then select
                <br />
                Link contact to locations.
              </p>
              <LinkBanner
                linkContacts={linkContacts}
                selectedLocations={selectedLocations}
                onOnlyShowSelected={onOnlyShowSelected}
                linkSource={linkSource}
              />
            </>
            )}
      </div>
    </>
  )
}

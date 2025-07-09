import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import {
  GROUND_WATER_RISK_ORDER,
  RIVER_SEA_RISK_ORDER
} from '../../../../../../common/enums/RiskType'
import LinkBanner from '../../../../../components/custom/LinkBanner'
import { infoUrls } from '../../../../../routes/info/InfoRoutes'
import { urlManageKeywordsOrg } from '../../../../../routes/manage-keywords/ManageKeywordsRoutes'
import { urlManageOrgAddLocations } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

const isMediumHighOrUnavailableRisk = (location) => {
  const riverRisk = location.riverSeaRisk?.title
  const groundRisk = location.groundWaterRisk?.title

  return (
    [
      RIVER_SEA_RISK_ORDER['High risk'],
      RIVER_SEA_RISK_ORDER['Medium risk'],
      RIVER_SEA_RISK_ORDER['Unavailable']
    ].includes(RIVER_SEA_RISK_ORDER[riverRisk]) ||
    [
      GROUND_WATER_RISK_ORDER['Possible'],
      GROUND_WATER_RISK_ORDER['Unavailable']
    ].includes(GROUND_WATER_RISK_ORDER[groundRisk])
  )
}

const isLowRisk = (location) => {
  const riverRisk = location.riverSeaRisk?.title
  const groundRisk = location.groundWaterRisk?.title

  return (
    [
      RIVER_SEA_RISK_ORDER['Low risk'],
      RIVER_SEA_RISK_ORDER['Very low risk']
    ].includes(RIVER_SEA_RISK_ORDER[riverRisk]) && groundRisk === 'Unlikely'
  )
}

const FloodBanner = React.memo(function FloodBanner({
  type,
  locations,
  onClickLinked,
  handleFloodAreas
}) {
  const count = []
  const message = []
  const heading = []

  if (type === 'floodMessages') {
    heading[0] = 'Locations that will get flood messages'
    count.push(
      locations.filter(
        (obj) =>
          obj?.within === true &&
          obj?.additionals?.other?.alertTypes?.length > 0
      ).length
    )
    message[0] = 'in flood areas'

    count.push(
      locations.filter(
        (item) =>
          item.additionals.other?.childrenIDs?.length > 0 &&
          item.additionals.other?.alertTypes?.length > 0 &&
          item.within !== true
      ).length
    )
    message.push('linked to nearby flood areas')
  } else if (type === 'noFloodMessages') {
    heading[0] = 'Locations that do not currently get flood messages'

    const mediumHighRisk = locations.filter(
      (obj) =>
        isMediumHighOrUnavailableRisk(obj) &&
        obj.additionals.other?.alertTypes?.length === 0
    ).length
    count.push(mediumHighRisk)
    message[0] = 'at flood risk'

    const lowRisk = locations.filter(
      (obj) => isLowRisk(obj) && obj.additionals.other?.alertTypes?.length === 0
    ).length
    count.push(lowRisk)
    message.push('potentially at flood risk')
  } else if (type === 'noContacts') {
    heading[0] = 'Locations not linked to contacts'
    count.push(
      locations.filter((item) => item.linked_contacts === 0).length
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
      <h2 className='govuk-body govuk-!-font-weight-bold'>{heading}</h2>
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
              <p className='body-text-strong'>{count[0]}</p>
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
                item.additionals.other?.alertTypes?.length > 0 &&
                item.within !== true
            ).length > 0 && (
              <div
                style={{
                  width: '100%',
                  padding: '0rem 1.5rem',
                  borderLeft: '2px solid lightGrey'
                }}
              >
                <p className='body-text-strong'>{count[1]}</p>
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
                isMediumHighOrUnavailableRisk(item) &&
                item.additionals.other?.alertTypes?.length === 0
            ).length > 0 && (
              <div style={{ width: '100%', padding: '0rem 1rem 0rem 0rem' }}>
                <p className='body-text-strong' style={{ color: '#FD6214' }}>
                  {count[0]}
                </p>
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
                isMediumHighOrUnavailableRisk(item) &&
                item.additionals.other?.alertTypes?.length === 0
            ).length > 0 &&
              locations.filter(
                (item) =>
                  isLowRisk(item) &&
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
                isLowRisk(item) &&
                item.additionals.other?.alertTypes?.length === 0
            ).length > 0 && (
              <div style={{ width: '100%', padding: '0rem 1.5rem' }}>
                <p className='body-text-strong'>{count[1]}</p>
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
            <p className='body-text-strong' style={{ color: 'crimson' }}>
              {count[0]}
            </p>
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
          <Link
            className='govuk-link'
            to='#'
            onClick={(e) => {
              e.preventDefault()
              handleFloodAreas()
            }}
          >
            What are flood areas?
          </Link>
        )}
        {type === 'noFloodMessages' && (
          <Link to='#' className='govuk-link'>
            Link these locations to nearby flood areas to get flood messages
          </Link>
        )}
      </p>
    </div>
  )
})

export default function DashboardHeader({
  locations,
  onClickLinked,
  linkContacts,
  selectedLocations,
  onOnlyShowSelected,
  linkSource,
  setErrorMessage
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
        <span className='govuk-!-font-weight-bold'>High risk</span>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        greater than 1 in 30.
      </p>
      <p className='govuk-!-margin-top-4'>
        <span className='govuk-!-font-weight-bold'>Medium risk</span>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 100 and 1 in 30.
      </p>
      <p className='govuk-!-margin-top-4'>
        <span className='govuk-!-font-weight-bold'>Low risk</span>
        <br />
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 1000 and 1 in 100.
      </p>
      <h4 className='govuk-heading-m  govuk-!-margin-top-6'>Groundwater</h4>
      <p className='govuk-!-margin-top-4'>
        <span className='govuk-!-font-weight-bold'>Possible</span>
        <br />
        Flooding is possible in the local area when groundwater levels are high.
      </p>
      <p className='govuk-!-margin-top-4'>
        <span className='govuk-!-font-weight-bold'>Unlikely</span>
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

  return (
    <>
      <div className='govuk-body govuk-!-margin-top-6'>
        {!linkContacts || linkContacts.length === 0 ? (
          <>
            <div style={{ display: 'flex' }}>
              <h1 className='govuk-heading-l' id='main-content'>
                Manage your organisation's{' '}
                {locations.length > 1 ? locations.length : null} locations
              </h1>
              <div style={{ marginLeft: 'auto' }}>
                <Button
                  text='Add locations'
                  className='govuk-button govuk-button--secondary'
                  onClick={(event) => {
                    event.preventDefault()
                    navigate(urlManageOrgAddLocations)
                  }}
                />
                &nbsp; &nbsp;
                <Button
                  text='Manage keywords'
                  className='govuk-button govuk-button--secondary'
                  onClick={(event) => {
                    event.preventDefault()
                    navigate(urlManageKeywordsOrg)
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', fontSize: '18px' }}>
              <FloodBanner
                type='floodMessages'
                locations={locations}
                onClickLinked={onClickLinked}
                handleFloodAreas={() => {
                  navigate(infoUrls.floodAreas)
                }}
              />
              {(locations.filter(
                (item) =>
                  isMediumHighOrUnavailableRisk(item) &&
                  item.additionals.other?.alertTypes?.length === 0
              ).length > 0 ||
                locations.filter(
                  (item) =>
                    isLowRisk(item) &&
                    item.additionals.other?.alertTypes?.length === 0
                ).length > 0) && (
                <FloodBanner
                  type='noFloodMessages'
                  locations={locations}
                  onClickLinked={onClickLinked}
                />
              )}
              {locations.filter((item) => item.linked_contacts === 0)
                .length > 0 && (
                <div style={{ width: '100%' }}>
                  <FloodBanner
                    type='noContacts' 
                    locations={locations}
                    onClickLinked={onClickLinked}
                  />
                  <div style={{ paddingLeft: '0.5rem' }}>
                    <Details
                      title='Linking locations to contacts so that they can get flood messages'
                      text={noContactsDetails}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className='govuk-grid-column-one-half'>
              <Details title='What is flood risk?' text={floodRiskDetails} />
            </div>
          </>
        ) : (
          <>
            <h1 className='govuk-heading-l' id='main-content'>Link contact to locations</h1>
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
              setErrorMessage={setErrorMessage}
            />
          </>
        )}
      </div>
    </>
  )
}

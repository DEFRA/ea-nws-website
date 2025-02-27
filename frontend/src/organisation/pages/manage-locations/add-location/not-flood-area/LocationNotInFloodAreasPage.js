import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import Details from '../../../../../common/components/gov-uk/Details'
import InsetText from '../../../../../common/components/gov-uk/InsetText'
import { getLocationAdditional } from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { backendCall } from '../../../../../common/services/BackendService'

export default function LocationNotInFloodAreaPage () {
  const navigate = useNavigate()
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const orgId = useSelector((state) => state.session.orgId)

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const onSkipLink = async () => {
    const dataToSend = { orgId }
    const { data } = await backendCall(
      dataToSend,
      'api/elasticache/list_contacts',
      navigate
    )
    if (data && data.length > 0) {
      navigate(orgManageLocationsUrls.add.linkLocationToContacts)
    } else {
      navigate(orgManageLocationsUrls.add.addContacts)
    }
  }

  const insetTextInfo = (
    <>
      <strong>{locationName} is at medium or high risk of flooding.</strong>
      <p>
        You may be able to link it to nearby flood areas to get flood messages
      </p>
    </>
  )

  const floodRiskInfo = (
    <>
      <p>
        Flood risk is based on a combination of likelihood and impact - how
        likely it is that flooding will happen and the effect that flooding will
        have on people, buildings and services. Flood risk can fall into the
        following categories:
      </p>
      <p className='govuk-!-font-weight-bold govuk-!-font-size-24'>
        Rivers and sea
      </p>
      <p className='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
        High risk
      </p>
      <p className=' govuk-!-margin-top-0'>
        Each year there's a chance of flooding from rivers and the sea of
        greater than 1 in 30.
      </p>
      <p className='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
        Medium risk
      </p>
      <p className=' govuk-!-margin-top-0'>
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 100 and 1 in 30.
      </p>
      <p className='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
        Low risk
      </p>
      <p className=' govuk-!-margin-top-0'>
        Each year there's a chance of flooding from rivers and the sea of
        between 1 in 1000 and 1 in 100.
      </p>
      <p className='govuk-!-font-weight-bold govuk-!-font-size-24'>
        Groundwater
      </p>
      <p className='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
        Possible
      </p>
      <p className=' govuk-!-margin-top-0'>
        Flooding is possible in the local area when groundwater levels are
        high.
      </p>
      <p className='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
        Unlikely
      </p>
      <p className=' govuk-!-margin-top-0'>
        It's unlikely the location will be affected by groundwater flooding.
      </p>
    </>
  )

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-margin-top-5'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half govuk-body'>
            <h1 class='govuk-heading-l'>
              Flood messages are not available for {locationName}
            </h1>
            <InsetText text={insetTextInfo} />
            <Details title='What is flood risk' text={floodRiskInfo} />
            <p class='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
              Why are flood messages unavailable for some locations?
            </p>
            <p className='govuk-!-margin-top-0'>
              This may be because there are no measurement gauges in the area of
              the location. Or the location is in an area where not many people
              live or work.
            </p>
            <p>
              Locations may still be at risk of flooding even if you cannot get
              flood messages for them.
            </p>
            <p class='govuk-!-font-weight-bold govuk-!-margin-bottom-0'>
              How to get flood messages for this location
            </p>
            <p className='govuk-!-margin-top-0 govuk-!-margin-bottom-7'>
              You may be able to link this location to any nearby locations that
              can get flood messages.
            </p>
            <Button
              className='govuk-button'
              text='Link to nearby flood areas'
              onClick={() =>
                navigate(
                  orgManageLocationsUrls.add.notInFloodArea
                    .selectNearbyFloodAreas
                )}
            />
            &nbsp; &nbsp;
            <Link
              onClick={() => onSkipLink()}
              className='govuk-link inline-link'
            >
              I'll do this later
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

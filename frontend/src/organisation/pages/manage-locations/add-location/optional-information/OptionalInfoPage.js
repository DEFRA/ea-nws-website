import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import LocationDataType from '../../../../../common/enums/LocationDataType'
import {
  getLocationAdditional,
  getLocationOther
} from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
import { useVerifyLocationInFloodArea } from '../not-flood-area/verfiyLocationInFloodAreaAndNavigate'

export default function OptionalLocationInformationPage () {
  const navigate = useNavigate()
  const verifyLocationInFloodAreaAndNavigate = useVerifyLocationInFloodArea()
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const locationType = useSelector((state) =>
    getLocationOther(state, 'location_data_type')
  )
  const postcode = useSelector((state) => getLocationOther(state, 'postcode'))
  const navigateToNextPage = (event) => {
    event.preventDefault()
    if (postcode) {
      navigate(orgManageLocationsUrls.add.optionalInformation.addKeyInformation)
    } else {
      navigate(orgManageLocationsUrls.add.optionalInformation.optionalLocation)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const skipOptionalInformation = async (event) => {
    event.preventDefault()
    if (locationType === LocationDataType.X_AND_Y_COORDS) {
      await verifyLocationInFloodAreaAndNavigate(
        orgManageLocationsUrls.add.linkLocationToContacts
      )
    } else if (locationType === LocationDataType.BOUNDARY) {
      navigate(orgManageLocationsUrls.add.linkLocationToContacts)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add Optional Information - Next Warning Service GOV.UK</title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
              title='Success'
              text={`${locationName} added`}
            />
            &nbsp; &nbsp;
            <h1 className='govuk-heading-l'>
              Useful information you can include to help you easily identify
              this location
            </h1>
            <p className='govuk-body'>
              Providing these details will allow you to filter your
              organisation’s locations, making it quicker to find them.
            </p>

            <h3 className='govuk-heading-s govuk-!-margin-bottom-2'>
              Address
            </h3>

            <p className='govuk-body'>
              If you add a location as X and Y coordinates you can add an address. This address will then be associated with the location.
            </p>

            <h3 className='govuk-heading-s'>
              Key information
            </h3>
            <ul className='govuk-list govuk-list--bullet'>
              <li>
                <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                  Internal reference
                </h3>
                <p>
                  Your internal reference, for example:
                  PS01, unit 57, Brid_04.
                  This can help you identify the location more easily.
                </p>
              </li>

              <li>
                <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                  Business criticality
                </h3>
                <p>
                  How important the location is to your business.
                  For example, low or medium, business critical.
                </p>
              </li>

              <li>
                <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                  Location type
                </h3>
                <p>
                  For example, pumping station, ground floor flat, office, retail unit.
                </p>
              </li>

            </ul>

            <h3 className='govuk-heading-s govuk-!-margin-bottom-2'>
              Keywords for locations
            </h3>
            <p className='govuk-body'>
              Adding keywords for each location can make it easier for you to
              filter and create lists of locations you can then link to the
              people responsible for them (contacts). Contacts cannot get flood
              messages for a location unless they are linked to it.
            </p>
            <p className='govuk-body'>
              For example, you may want to add ‘North’ or ‘Midlands’ or ‘Team A’
              as keywords, then show all of the locations with that keyword in a
              list.
            </p>
            <p className='govuk-body'>
              You can add a maximum of 50 keywords and each keyword can be
              single or multiple words, for example ‘South’ or ‘South West’.
            </p>
            <h3 className='govuk-heading-s govuk-!-margin-bottom-2'>
              Action to be taken
            </h3>
            <p className='govuk-body'>
              Use this section to indicate what you can do to reduce the
              potential effects of flooding. For example, inspect the location
              then move stock to the top floor and evacuate.
            </p>
            <p className='govuk-body'>
              You can add a maximum of 500 characters.
            </p>
            <h3 className='govuk-heading-s govuk-!-margin-bottom-2'>Notes</h3>
            <p className='govuk-body'>
              Include any notes that could be helpful to someone not familiar
              with the site. For example, John Smith has the flood plan for this
              location and his contact number is 01234 567 890.
            </p>
            <p className='govuk-body'>
              You can add a maximum of 500 characters.
            </p>
            <Button
              className='govuk-button govuk-!-margin-top-4'
              text='Add useful information now'
              onClick={navigateToNextPage}
            />
            &nbsp; &nbsp;
            <Link
              className='govuk-link inline-link govuk-!-margin-top-4'
              onClick={skipOptionalInformation}
            >
              I'll do this later
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

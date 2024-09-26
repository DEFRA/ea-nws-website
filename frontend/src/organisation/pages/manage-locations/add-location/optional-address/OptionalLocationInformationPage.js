import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
export default function OptionalLocationInformationPage () {
  const navigate = useNavigate()
  const postcode = useSelector(
    (state) =>
      state.session.currentLocation.meta_data.location_additional.postcode
  )
  const navigateToNextPage = () => {
    if (postcode) {
      navigate(orgManageLocationsUrls.optionalAddress.addKeyInformation)
    } else {
      navigate(orgManageLocationsUrls.optionalAddress.optionalLocation)
    }
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <NotificationBanner
              className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-0 govuk-!-margin-top-4'
              title='Success'
              text='Location added'
            />
            &nbsp; &nbsp;
            <h1 className='govuk-heading-l'>
              Add optional information for this location
            </h1>
            <h2 className='govuk-heading-m'>
              How adding optional information can help
            </h2>
            <p className='govuk-body'>
              Adding optional information allows you to filter your
              organisation's locations and helps you identify them more easily.
            </p>
            <h2 className='govuk-heading-m'>
              Optional information you can include:
            </h2>
            <ul className='govuk-list'>
              <li>
                <h3 className='govuk-heading-s'>Address</h3>
                <p className='govuk-body'>
                  If you add a location as X and Y coordinate you can add an
                  address. This address will then be associated with the
                  location.
                </p>
              </li>
              <li>
                <h3 className='govuk-heading-s'>Key information</h3>
                <ul className='govuk-list govuk-list--bullet'>
                  <li>
                    <h3 className='govuk-heading-s'>Internal reference</h3>
                    <p className='govuk-body'>
                      Your internal reference, for example: PS01, unit 57,
                      Brid_04. This can help you identify the location more
                      easily.
                    </p>
                  </li>
                  <li>
                    <h3 className='govuk-heading-s'>Business criticality</h3>
                    <p className='govuk-body'>
                      How important the location is to your Business. For
                      example, low or medium, business critical.
                    </p>
                  </li>
                  <li>
                    <h3 class='govuk-heading-s'>Location type</h3>
                    <p className='govuk-body'>
                      For example, pumping station, ground floor flat, office,
                      retail unit.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <h3 className='govuk-heading-s'>Keywords of locations</h3>
                <p className='govuk-body'>
                  Adding keywords for each location can make it easier for you
                  to filter and create lists of locations you can then link to
                  the people responsible for them (contacts). Contacts cannot
                  get flood messages for a location unless they are linked to
                  it.
                </p>
                <p className='govuk-body'>
                  For example, you may want to add 'North' or 'Midlands' or
                  'Team A' as keywords, then show all of the locations with that
                  keyword in a list.
                </p>
              </li>
              <li>
                <h3 className='govuk-heading-s'>Action to be taken</h3>
                <p className='govuk-body'>
                  What you can do to reduce the potential effects of flooding,
                  for example, inspect the location, use sandbags, move stock,
                  evacuate.
                </p>
              </li>
              <li>
                <h3 className='govuk-heading-s'>Notes</h3>
                <p className='govuk-body'>
                  Any notes that could be helpful to someone not familiar with
                  the site. For example, John Smith has the flood plan for this
                  location, the last time this location flooded we used
                  sandbags.
                </p>
              </li>
            </ul>
            <Button
              className='govuk-button'
              text='Add optional information now'
              onClick={navigateToNextPage}
            />
            &nbsp; &nbsp;
            <Link
              to='/' // this will change when page is created
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

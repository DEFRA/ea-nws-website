import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function OptionalInformationLayout () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.add.optionalInformation.addKeywords)
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
              text='Predefined boundary location added'
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
            <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
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
            <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
              Action plan
            </h3>
            <p className='govuk-body'>
              Use this section to indicate what you can do to reduce the
              potential effects of flooding. For example, inspect the location
              then move stock to the top floor and evacuate.
            </p>
            <p className='govuk-body'>
              You can add a maximum of 500 characters.
            </p>
            <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>Notes</h3>
            <p className='govuk-body'>
              Include any notes that could be helpful to someone not familiar
              with the site. For example, John Smith has the flood plan for this
              location and his contact number is 01234 567 890.
            </p>
            <p className='govuk-body'>
              You can add a maximum of 500 characters.
            </p>
            <Button
              className='govuk-button'
              text='Add useful information now'
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

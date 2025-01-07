import { Link, useLocation } from 'react-router-dom'
import Button from '../../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../../common/components/gov-uk/NotificationBanner'
import WarningText from '../../../../../../../common/components/gov-uk/WarningText'

export default function LocationsNotFoundDashboardPage () {
  const location = useLocation()
  const locations = []

  // Default values for null location.state
  const addedLocations = location?.state?.added || 0
  const notAddedLocations = location?.state?.notAdded || 0

  const handleButton = () => {
    // TODO: Add route to next page
  }

  return (
    <>
      <NotificationBanner
        className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-top-5'
        title='Success'
        text={`${addedLocations} locations added`}
      />
      <main className='govuk-main-wrapper govuk-!-padding-top-1'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              {notAddedLocations} locations not found
            </h1>
            <div className='govuk-body'>
              <p>
                Some of the locations uploaded could not be found. This may be
                because the information in the template was not added correctly
                or has details missing. For example, the X and Y coordinates
                contained a letter in them or the street name did not match the
                postcode.
              </p>

              <p>
                You can choose how you want to find these locations manually in
                this account, then add them to your organisation's locations.
              </p>

              <Button
                className='govuk-button govuk-button--secondary govuk-!-margin-top-3'
                text='Print locations not found'
                // onClick={handleButton} // TODO: Add print format
              />

              <WarningText
                text={
                  <>
                    Any locations not found cannot be added to this account and
                    will not be saved if you do not find them now.
                    <br />
                    <br />
                    If you want to add these locations to this account later
                    you'll need to either reupload them in a new CSV file or add
                    each one manually to this account.
                  </>
                }
              />
            </div>
          </div>

          <div className='govuk-grid-column-full'>
            <p className='govuk-!-margin-bottom-0 locations-table-panel'>
              {notAddedLocations}
              {notAddedLocations === 1 ? ' location' : ' locations'}{' '}
            </p>
            <table class='govuk-table govuk-table--small-text-until-tablet'>
              <thead class='govuk-table__head'>
                <tr class='govuk-table__row'>
                  <th scope='col' class='govuk-table__header'>
                    Location name
                  </th>
                  <th scope='col' class='govuk-table__header'>
                    Address uploaded
                  </th>
                  <th scope='col' class='govuk-table__header'>
                    Postcode
                  </th>
                  <th scope='col' class='govuk-table__header'>
                    X and Y coordinates
                  </th>
                  <th scope='col' class='govuk-table__header' />
                </tr>
              </thead>
              <tbody class='govuk-table__body'>
                {locations &&
                  locations.map((location, index) => {
                    return (
                      <tr class='govuk-table__row' key={index}>
                        <th scope='row' class='govuk-table__header'>
                          {location.additionals.locationName}
                        </th>
                        <td class='govuk-table__cell'>
                          {location.additionals.other.full_address}
                        </td>
                        <td class='govuk-table__cell'>
                          {location.additionals.other.postcode}
                        </td>
                        <td class='govuk-table__cell'>
                          {location.additionals.other.x_coordinate},{' '}
                          {location.additionals.other.y_coordinate}
                        </td>
                        <td class='govuk-table__cell'>
                          <Link>Find this location</Link>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>

            <div className='govuk-body govuk-!-padding-top-5'>
              <Button
                text='Finish finding locations'
                className='govuk-button govuk-button'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

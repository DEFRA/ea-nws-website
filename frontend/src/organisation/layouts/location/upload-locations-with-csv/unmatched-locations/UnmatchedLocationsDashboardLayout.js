import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import WarningText from '../../../../../common/components/gov-uk/WarningText'
import {
  setCurrentLocationEasting,
  setCurrentLocationFullAddress,
  setCurrentLocationName,
  setCurrentLocationNorthing,
  setCurrentLocationPostcode
} from '../../../../../common/redux/userSlice'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'

export default function UnmatchedLocationsDashboardLayout ({
  navigateToNextPage,
  flow
}) {
  const location = useLocation()
  const dispatch = useDispatch()

  // Default values for null location.state
  const addedLocations = location?.state?.added || 0
  const notAddedLocations = location?.state?.notAdded || 0
  const notAddedLocationsDataGeoSafe =
    location?.state?.notAddedLocations || null

  const notAddedLocationsData = []
  if (notAddedLocationsDataGeoSafe) {
    notAddedLocationsDataGeoSafe.forEach((location) => {
      notAddedLocationsData.push(geoSafeToWebLocation(location))
    })
  }

  const unmatchedLocationText =
    (flow === 'unmatched-locations-not-found' && 'not found') ||
    (flow === 'unmatched-locations-not-in-england' && 'not in England')

  // Location info
  const info = () => {
    if (flow === 'unmatched-locations-not-found') {
      return (
        <>
          <p>
            Some of the locations uploaded could not be found. This may be
            because the information in the template was not added correctly or
            has details missing. For example, the X and Y coordinates contained
            a letter in them or the street name did not match the postcode.
          </p>
          <p>
            You can choose how you want to find these locations manually in this
            account, then add them to your organisation's locations.
          </p>
        </>
      )
    } else if (flow === 'unmatched-locations-not-in-england') {
      return (
        <>
          <p>
            Some of the locations uploaded are not in England and cannot be
            added to this account.
          </p>
          <p>
            If you think this is not correct and some locations are in England
            you can check each location's details and change them, either by
            using a postcode, X and Y coordinates or by dropping a pin on a map.
          </p>
        </>
      )
    }
  }

  // Location warning text
  const warningText = () => {
    if (flow === 'unmatched-locations-not-found') {
      return (
        <WarningText
          text={
            <>
              Any locations not found cannot be added to this account and will
              not be saved if you do not find them now.
              <br />
              <br />
              If you want to add these locations to this account later you'll
              need to either reupload them in a new CSV file or add each one
              manually to this account.
            </>
          }
        />
      )
    } else if (flow === 'unmatched-locations-not-in-england') {
      return (
        <WarningText
          text={
            <>
              Locations not in England cannot be added to this account and will
              not be saved if you do not check them now.
              <br />
              <br />
              If you want to check these locations later and then add them to
              this account you'll need to either reupload them in a new CSV file
              or add each one manually.
            </>
          }
        />
      )
    }
  }

  const handleButton = () => {
    // TODO: Add route to next page
  }

  const findLocation = (e, index) => {
    e.preventDefault()
    dispatch(
      setCurrentLocationName(
        notAddedLocationsData[index].additionals.locationName
      )
    )
    dispatch(
      setCurrentLocationFullAddress(
        notAddedLocationsData[index].additionals.other.full_address
      )
    )
    dispatch(
      setCurrentLocationPostcode(
        notAddedLocationsData[index].additionals.other.postcode
      )
    )
    dispatch(
      setCurrentLocationEasting(
        notAddedLocationsData[index].additionals.other.x_coordinate
      )
    )
    dispatch(
      setCurrentLocationNorthing(
        notAddedLocationsData[index].additionals.other.y_coordinate
      )
    )
    navigateToNextPage()
  }

  return (
    <>
      {addedLocations > 0 && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-top-5 govuk-!-margin-bottom-0'
          title='Success'
          text={`${addedLocations} locations added`}
        />
      )}
      <main className='govuk-main-wrapper govuk-!-margin-top-3'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              {notAddedLocations} locations {unmatchedLocationText}
            </h1>
            <div className='govuk-body'>
              {info()}

              <Button
                className='govuk-button govuk-button--secondary govuk-!-margin-top-3'
                text={`Print locations ${unmatchedLocationText}`}
                // onClick={handleButton} // TODO: Add print format
              />

              {warningText()}
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
                {notAddedLocationsData &&
                  notAddedLocationsData.map((location, index) => {
                    return (
                      <tr class='govuk-table__row' key={index}>
                        <td class='govuk-table__cell'>
                          {location.additionals.locationName}
                        </td>
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
                          <Link
                            className='govuk-link'
                            onClick={(e) => findLocation(e, index)}
                          >
                            {(flow === 'unmatched-locations-not-found' &&
                              'Find this') ||
                              (flow === 'unmatched-locations-not-in-england' &&
                                'Check')}{' '}
                            location
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>

            <div className='govuk-body govuk-!-padding-top-5'>
              <Button
                text={`Finish ${
                  (flow === 'unmatched-locations-not-found' && 'finding') ||
                  (flow === 'unmatched-locations-not-in-england' && 'checking')
                } locations`}
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

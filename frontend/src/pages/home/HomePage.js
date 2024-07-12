import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import AccountNavigation from '../../custom-components/AccountNavigation'
import Button from '../../gov-uk-components/Button'
import Details from '../../gov-uk-components/Details'
import ErrorSummary from '../../gov-uk-components/ErrorSummary'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import NotificationBanner from '../../gov-uk-components/NotificationBanner'
import Pagination from '../../gov-uk-components/Pagination'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10

  const profile = useSelector((state) => state.session.profile)
  let locations = profile.pois
  const location = useLocation()

  if (
    location.state !== null &&
    !location.state.removedAddressFail &&
    location.state.removedAddress
  ) {
    console.log(locations)
    console.log(
      `Removing location from array: ${location.state.removedAddress}`
    )
    const add1 = locations.indexOf(0)
    //locations.splice(add1, 1)
    if (location.state.removedAddress === 'Exeter, United Kingdom') {
      locations = [
        {
          address: 'Exmouth, United Kingdom',
          coordinates: {
            latitude: '50726037',
            longitude: '-3527489'
          }
        }
      ]
    }
    if (location.state.removedAddress === 'Exmouth, United Kingdom') {
      locations = [
        {
          address: 'Exeter, United Kingdom',
          coordinates: {
            latitude: '50726037',
            longitude: '-3527489'
          }
        }
      ]
    }
    console.log(`Found location from array at: ${locations}`)
  }

  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  const navigate = useNavigate()
  const handleButton = () => {
    navigate('/managelocations/add')
  }

  const detailsMessage = (
    <div>
      <p>You must keep at least one location on your account.</p>
      <p>
        <Link to='/managelocations/add' className='govuk-link'>
          Add a new location
        </Link>
        &nbsp;before removing any you do not need.
      </p>
      <p>
        Or you could&nbsp;
        <Link to='/deleteaccount' className='govuk-link'>
          Delete your account
        </Link>
        &nbsp;instead.
      </p>
    </div>
  )

  const locationTable = () => {
    const viewColumn = (location) => {
      return (
        <td className='govuk-table__cell'>
          <Link
            to='/managelocations/view'
            state={{
              address: location.address
            }}
            className='govuk-link'
          >
            View
          </Link>
        </td>
      )
    }

    const removeColumn = (location) => {
      return (
        <td className='govuk-table__cell'>
          <Link
            to='/managelocations/remove'
            state={{
              address: location.address
            }}
            className='govuk-link'
          >
            Remove
          </Link>
        </td>
      )
    }

    const addressColumn = (location) => {
      return (
        <td className='govuk-table__cell govuk-!-width-full'>
          {location.address}
        </td>
      )
    }

    const tableBody = () => {
      return (
        <div>
          <tbody className='govuk-table__body'>
            {displayedLocations.map((location, index) => (
              <tr key={index} className='govuk-table__row'>
                {addressColumn(location)}
                {locations.length === 1 && (
                  <td className='govuk-table__cell'></td>
                )}
                {viewColumn(location)}
                {locations.length > 1 && removeColumn(location)}
              </tr>
            ))}
          </tbody>
        </div>
      )
    }

    const tableHead = () => {
      return (
        <thead class='govuk-table__head'>
          <tr class='govuk-table__row'>
            <th colspan='3' scope='colspan' className='govuk-table__header'>
              {'Your locations (' + locations.length + ')'}
            </th>
          </tr>
        </thead>
      )
    }

    return (
      <table className='govuk-table'>
        {tableHead()}
        {tableBody()}
      </table>
    )
  }

  return (
    <>
      <Header />
      <div className='govuk-width-container'>
        <PhaseBanner />
        <AccountNavigation currentPage={useLocation().pathname} />
        <br></br>
        {location.state !== null &&
        !location.state.removedAddressFail &&
        location.state.removedAddress ? (
          <NotificationBanner
            className='govuk-notification-banner govuk-notification-banner--success'
            title='Success'
            heading='Location removed'
            text={location.state.removedAddress}
          />
        ) : null}
        {location.state !== null && location.state.removedAddressFail ? (
          <ErrorSummary
            errorList={[
              'An error occured trying to remove a location.  ' +
                location.state.removedAddress +
                ' has not been removed.'
            ]}
          />
        ) : null}
        <main className='govuk-main-wrapper'>
          <div class='govuk-grid-row'>
            <div class='govuk-grid-column-full'>
              <h1 className='govuk-heading-l'>Home</h1>
              <div className='govuk-body'>
                {locations.length > 0 && locationTable()}
                <Pagination
                  totalPages={Math.ceil(locations.length / locationsPerPage)}
                  onPageChange={(val) => setCurrentPage(val)}
                />
                <Button
                  text='Add new location'
                  className='govuk-button govuk-button--secondary'
                  onClick={handleButton}
                />
                {locations.length === 1 && (
                  <Details
                    title='If you want to remove this location'
                    text={detailsMessage}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

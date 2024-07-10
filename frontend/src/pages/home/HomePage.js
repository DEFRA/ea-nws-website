import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import AccountNavigation from '../../custom-components/AccountNavigation'
import Button from '../../gov-uk-components/Button'
import Details from '../../gov-uk-components/Details'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Pagination from '../../gov-uk-components/Pagination'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const locationsPerPage = 10

  const profile = useSelector((state) => state.session.profile)
  const locations = profile.pois

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
        <Link to="/managelocations/add" className="govuk-link">
          Add a new location
        </Link>
        &nbsp;before removing any you do not need.
      </p>
      <p>
        Or you could&nbsp;
        <Link to="/deleteaccount" className="govuk-link">
          Delete your account
        </Link>
        &nbsp;instead.
      </p>
    </div>
  )

  const locationTable = () => {
    const viewColumn = (location) => {
      return (
        <td className="govuk-table__cell">
          <Link
            to="/managelocations/view"
            state={{
              address: location.address
            }}
            className="govuk-link"
          >
            View
          </Link>
        </td>
      )
    }

    const removeColumn = (location) => {
      return (
        <td className="govuk-table__cell">
          <Link
            to="/managelocations/remove"
            state={{
              address: location.address
            }}
            className="govuk-link"
          >
            Remove
          </Link>
        </td>
      )
    }

    const addressColumn = (location) => {
      return (
        <td className="govuk-table__cell govuk-!-width-full">
          {location.address}
        </td>
      )
    }

    const tableBody = () => {
      return (
        <tbody className="govuk-table__body">
          {displayedLocations.map((location, index) => (
            <tr key={index} className="govuk-table__row">
              {addressColumn(location)}
              {locations.length === 1 && (
                <td className="govuk-table__cell"></td>
              )}
              {viewColumn(location)}
              {locations.length > 1 && removeColumn(location)}
            </tr>
          ))}
        </tbody>
      )
    }

    const tableHead = () => {
      return (
        <thead class="govuk-table__head">
          <tr class="govuk-table__row">
            <th colspan="3" scope="colspan" className="govuk-table__header">
              {'Your locations (' + locations.length + ')'}
            </th>
          </tr>
        </thead>
      )
    }

    return (
      <table className="govuk-table">
        {tableHead()}
        {tableBody()}
      </table>
    )
  }

  return (
    <>
      <div className="page-container">
        <Header />
        <div className="govuk-width-container body-container">
          <PhaseBanner />
          <AccountNavigation currentPage={useLocation().pathname} />
          <main className="govuk-main-wrapper">
            <div class="govuk-grid-row">
              <div class="govuk-grid-column-full">
                <h1 className="govuk-heading-l">Home</h1>
                <div className="govuk-body">
                  {locations.length > 0 && locationTable()}
                  <Pagination
                    totalPages={Math.ceil(locations.length / locationsPerPage)}
                    onPageChange={(val) => setCurrentPage(val)}
                  />
                  <Button
                    text="Add new location"
                    className="govuk-button govuk-button--secondary"
                    onClick={handleButton}
                  />
                  {locations.length === 1 && (
                    <Details
                      title="If you want to remove this location"
                      text={detailsMessage}
                    />
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

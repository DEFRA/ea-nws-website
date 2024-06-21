import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Details from '../../../gov-uk-components/Details'
import Footer from '../../../gov-uk-components/Footer'
import Header from '../../../gov-uk-components/Header'
import Pagination from '../../../gov-uk-components/Pagination'
import PhaseBanner from '../../../gov-uk-components/PhaseBanner'

export default function LocationSearchResultsPage() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const addressesPerPage = 10

  const detailsMessage = (
    <div>
      You can view flood message areas&nbsp;
      <a href="#" className="govuk-link">
        near this postcode
      </a>
    </div>
  )

  const addresses = [
    '10 Downing Street, London',
    '221B Baker Street, London',
    '1 The Crescent, Leeds',
    '25 The Grove, Manchester',
    '50 High Street, Edinburgh',
    '2 Park Lane, Birmingham',
    '14 Market Street, Bristol',
    "30 Queen's Road, Belfast",
    '18 Castle Street, Cardiff',
    '5 Albert Road, Glasgow',
    '7 Victoria Road, Oxford',
    '12 Bridge Street, Cambridge',
    '3 Windsor Avenue, Liverpool',
    '9 Station Road, Newcastle',
    '6 Hilltop Drive, Sheffield',
    '15 Queensway, Southampton',
    '4 Elm Street, Nottingham',
    '8 Green Lane, Plymouth',
    '11 Riverside, Swansea',
    '22 Church Street, Coventry',
    '17 Hillside Avenue, York',
    '20 Victoria Square, Brighton',
    '27 Park Road, Norwich',
    '13 Ivy Lane, Canterbury',
    '19 Grove Terrace, Aberdeen',
    '16 King Street, Dundee',
    '24 The Mall, Reading',
    '21 Highfield Lane, Portsmouth',
    '23 Hillcrest, Derby'
  ]

  const displayedAddresses = addresses.slice(
    (currentPage - 1) * addressesPerPage,
    currentPage * addressesPerPage
  )

  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <PhaseBanner />
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-body">
              <Link onClick={() => navigate(-1)} className="govuk-back-link">
                Back
              </Link>
              <h1 className="govuk-heading-l govuk-!-margin-top-6">
                Select an address
              </h1>
              <p className="govuk-body">
                Postcode: SL7 2AA{'   '}
                <Link
                  to="/signup/register-location/search"
                  className="govuk-link govuk-!-padding-left-5"
                >
                  Change postcode
                </Link>
              </p>
              <table class="govuk-table">
                <tbody class="govuk-table__body">
                  <tr class="govuk-table__row">
                    <td class="govuk-table__cell"></td>
                  </tr>
                  {displayedAddresses.map((address, index) => (
                    <tr key={index} class="govuk-table__row">
                      <td class="govuk-table__cell">
                        <Link className="govuk-link" to="/dgfd">
                          {address}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Details
                title={'I cannot find my address here'}
                text={detailsMessage}
              />
              <Pagination
                totalPages={Math.ceil(addresses.length / addressesPerPage)}
                onPageChange={(val) => setCurrentPage(val)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

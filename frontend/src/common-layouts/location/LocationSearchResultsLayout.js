import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Details from '../../gov-uk-components/Details'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import Pagination from '../../gov-uk-components/Pagination'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setSelectedLocation } from '../../redux/userSlice'

export default function LocationSearchResultsLayout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const locations = useSelector((state) => state.session.locationSearchResults)
  const locationPostCode = useSelector(
    (state) => state.session.locationPostCode
  )
  const locationsPerPage = 20
  const displayedLocations = locations.slice(
    (currentPage - 1) * locationsPerPage,
    currentPage * locationsPerPage
  )

  console.log(locations)

  const handleSelectedLocation = (event, location) => {
    event.preventDefault()
    console.log(location)

    //need to do some validation here to stop the user from selecting
    //an address they already have

    dispatch(setSelectedLocation(location))

    //need to dertermine in here if location is in danger area or not
    //navigate('/signup/register-location/no-danger')
  }

  const detailsMessage = (
    <div>
      You can view flood message areas&nbsp;
      <a href="#" className="govuk-link">
        near this postcode
      </a>
    </div>
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
                Postcode: {locationPostCode}
                {'   '}
                <Link
                  to="/signup/register-location/search"
                  className="govuk-link govuk-!-padding-left-5"
                >
                  Change postcode
                </Link>
              </p>
              <table className="govuk-table">
                <tbody className="govuk-table__body">
                  <tr className="govuk-table__row">
                    <td className="govuk-table__cell" />
                  </tr>
                  {displayedLocations.map((location, index) => (
                    <tr key={index} className="govuk-table__row">
                      <td className="govuk-table__cell">
                        <Link
                          className="govuk-link"
                          onClick={(event) =>
                            handleSelectedLocation(event, location)
                          }
                        >
                          {location.address}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Details
                title="I cannot find my address here"
                text={detailsMessage}
              />
              <Pagination
                totalPages={Math.ceil(locations.length / locationsPerPage)}
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

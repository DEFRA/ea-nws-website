import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import { setOrganizationAddress } from '../../../common/redux/userSlice'

export default function SelectAddressLayout({
  navigateToNextPage,
  navigateToPreviousPage,
  addAddressPage,
  enterAddressManuallyPage
}) {
  const dispatch = useDispatch()
  const locations = useSelector((state) => state.session.locationSearchResults)
  const locationPostCode = useSelector(
    (state) => state.session.locationPostCode
  )
  const handleSelectedLocation = (event, selectedLocation) => {
    event.preventDefault()
    dispatch(setOrganizationAddress(selectedLocation.address))
    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <div className='govuk-body'>
                {locations?.length ? (
                  <>
                    <h1 className='govuk-heading-l' id='main-content'>
                      Select an address
                    </h1>
                    <p>
                      {location?.length} addresses found for{' '}
                      <span className='govuk-!-font-weight-bold'>
                        {locationPostCode}
                      </span>
                      {/* waiting on feedback from UCD on what the 'All Saints' part is in figma */}
                      <Link to={addAddressPage}>Search again</Link>
                    </p>
                    <table className='govuk-table'>
                      <tbody className='govuk-table__body'>
                        <tr className='govuk-table__row'>
                          <td className='govuk-table__cell' />
                        </tr>
                        {locations.map((location, index) => (
                          <tr key={index} className='govuk-table__row'>
                            <td className='govuk-table__cell'>
                              <Link
                                className='govuk-link'
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
                    <br />
                    <h2 class='govuk-heading-m'>
                      If you cannot see your organisation's address
                    </h2>
                    <p>
                      You can{' '}
                      <Link to={'/home'}>enter the address manually.</Link>
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className='govuk-heading-l' id='main-content'>
                      No address found
                    </h1>
                    <p>
                      We could not find an address that matches{' '}
                      <span className='govuk-!-font-weight-bold'>
                        {locationPostCode}
                      </span>
                      . You can search again or enter the address manually.
                    </p>
                    <br />
                    <Link to={addAddressPage}>Search again</Link>
                    <br />
                    <Link to={enterAddressManuallyPage}>
                      Enter address manually
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

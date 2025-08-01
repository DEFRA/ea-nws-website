import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import {
  setEnterAddressManuallyFlow,
  setOrganizationAddress,
  setPreviousOrgAddress
} from '../../../common/redux/userSlice'

export default function SearchAddressResultsLayout({
  navigateToNextPage,
  navigateToPreviousPage,
  navigateToManualAddressEntry
}) {
  const dispatch = useDispatch()
  const locations = useSelector((state) => state.session.locationSearchResults)
  const orgPostcode = useSelector(
    (state) => state.session.organization.postalCode
  )
  const orgBuildingName = useSelector((state) => state.session.orgBuildingName)

  // reset enter address manually flow
  useEffect(() => {
    dispatch(setEnterAddressManuallyFlow(null))
    dispatch(setPreviousOrgAddress(null))
  }, [])

  const handleSelectedLocation = (event, selectedLocation) => {
    event.preventDefault()
    dispatch(setPreviousOrgAddress(''))
    dispatch(setOrganizationAddress(selectedLocation.address))
    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigateToPreviousPage()
  }

  const navigateToManuallyEnterAddress = (event) => {
    event.preventDefault()
    navigateToManualAddressEntry()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-two-thirds'>
              <div className='govuk-body'>
                {locations?.length > 0 ? (
                  <>
                    <h1 className='govuk-heading-l' id='main-content'>
                      Select an address
                    </h1>
                    <p>
                      {locations?.length} addresses found for{' '}
                      <span className='govuk-!-font-weight-bold'>
                        {orgPostcode} {!orgBuildingName && '.'}
                      </span>
                      {orgBuildingName && (
                        <>
                          {' '}
                          and
                          <span className='govuk-!-font-weight-bold'>
                            {' '}
                            {orgBuildingName}.
                          </span>
                        </>
                      )}
                      &nbsp; &nbsp;
                      <Link onClick={navigateBack}>Search again</Link>
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
                      <Link onClick={navigateToManuallyEnterAddress}>
                        enter the address manually.
                      </Link>
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
                        {orgPostcode} {!orgBuildingName && '.'}
                      </span>
                      {orgBuildingName && (
                        <>
                          {' '}
                          and
                          <span className='govuk-!-font-weight-bold'>
                            {' '}
                            {orgBuildingName}.
                          </span>
                        </>
                      )}
                      . You can search again or enter the address manually.
                    </p>
                    <br />
                    <Link onClick={navigateBack}>Search again</Link>
                    <br />
                    <Link onClick={navigateToManuallyEnterAddress}>
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

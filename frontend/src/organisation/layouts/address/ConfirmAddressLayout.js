import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import InsetText from '../../../common/components/gov-uk/InsetText'
import {
  setOrganizationAddress,
  setPreviousOrgAddress
} from '../../../common/redux/userSlice'

export default function ConfirmAddressLayout({
  navigateToNextPage,
  navigateToEnterAddressManuallyPage,
  navigateToAddAddressPage,
  navigateToSearchResultsPage
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const organization = useSelector((state) => state.session.organization)
  const organizationAdditionals = JSON.parse(organization.description)
  const address = organizationAdditionals.address
  const locations = useSelector((state) => state.session.locationSearchResults)
  const orgPostcode = useSelector(
    (state) => state.session.organization.postalCode
  )
  const orgBuildingName = useSelector((state) => state.session.orgBuildingName)
  const enterAddressManuallyFlow = useSelector(
    (state) => state.session.enterAddressManuallyFlow
  )
  const previousOrgAddress = useSelector(
    (state) => state.session.previousOrgAddress
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const orgAddress =
      enterAddressManuallyFlow && address
        ? address
        : previousOrgAddress
        ? previousOrgAddress
        : address
    dispatch(setOrganizationAddress(orgAddress))

    navigateToNextPage()
  }

  const navigateToManuallyEnterAddress = (event) => {
    event.preventDefault()
    // need a way to remember the previous address selected if user navigates through manual entry
    dispatch(
      setPreviousOrgAddress(previousOrgAddress ? previousOrgAddress : address)
    )
    navigateToEnterAddressManuallyPage()
  }

  const navigateAddAddress = (event) => {
    event.preventDefault()
    navigateToAddAddressPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    if (enterAddressManuallyFlow) {
      navigateToEnterAddressManuallyPage()
    } else {
      navigateToSearchResultsPage()
    }
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4 govuk-body'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l' id='main-content'>
              Confirm address
            </h1>
            {!enterAddressManuallyFlow && (
              <p>
                {locations?.length} addresses found for{' '}
                <span className='govuk-!-font-weight-bold'>
                  {orgPostcode}
                  {!orgBuildingName && '.'}
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
                <Link onClick={navigateAddAddress}>Search again</Link>
              </p>
            )}
            <InsetText
              text={
                enterAddressManuallyFlow && address
                  ? address
                  : previousOrgAddress
                  ? previousOrgAddress
                  : address
              }
            />
            <Button
              text='Confirm'
              className='govuk-button'
              onClick={handleSubmit}
            />
            {!enterAddressManuallyFlow && (
              <p>
                <Link onClick={() => navigate(-1)} className='govuk-link'>
                  Select a different address
                </Link>
                <br />
                <br />
                <Link
                  onClick={navigateToManuallyEnterAddress}
                  className='govuk-link'
                >
                  Enter address manually
                </Link>
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

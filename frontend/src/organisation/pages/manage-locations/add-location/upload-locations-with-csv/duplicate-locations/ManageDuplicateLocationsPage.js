import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../../common/components/gov-uk/Button'
import WarningText from '../../../../../../common/components/gov-uk/WarningText'

export default function ManageDuplicateLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const location = useLocation()
  const bulkUploadData = location?.state?.bulkUploadData
  const [duplicateLocations, setDuplicateLocations] = useState([])

  useEffect(() => {
    const duplicateLocations = bulkUploadData.invalid.filter(
      (invalid) =>
        Array.isArray(invalid.error) && invalid.error.includes('duplicate')
    )
    setDuplicateLocations(duplicateLocations)
  }, [])

  const handlePrint = () => {
    // TODO
  }

  const handleCompareDetails = async (event, location) => {
    event.preventDefault()
  }

  const handleSubmit = async () => {
    navigate('/organisation/manage-locations/view-locations')
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      {/* TODO: do we need something like this to show result of compare? */}
      {/* {location.state && (
        <NotificationBanner
          className={`govuk-notification-banner ${
            location.state === 'Added' && 'govuk-notification-banner--success'
          } govuk-!-margin-bottom-0 govuk-!-margin-top-4`}
          title={location.state === 'Added' ? 'Success' : 'Information'}
          text={
            location.state === 'Added'
              ? '1 Location Added'
              : "1 location cannot be added because it's not in England"
          }
        />
      )} */}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              Manage {duplicateLocations.length} duplicate locations
            </h1>
            <div className='govuk-!-padding-bottom-4'>
              You need to choose if you want to keep or replace all of them.
            </div>
            <WarningText text='Any new locations uploaded that are duplicates will not be saved to this account if you do not manage them now. The existing location with the same name will be kept in this account' />
            <Button
              className='govuk-button govuk-button--secondary'
              text='Print duplicate locations'
              onClick={handlePrint}
            />
            <div>{duplicateLocations.length} locations</div>
            <div className='govuk-body govuk-!-padding-top-2'>
              <table class='govuk-table govuk-table--small-text-until-tablet'>
                <thead class='govuk-table__head'>
                  <tr class='govuk-table__row'>
                    <th scope='col' class='govuk-table__header'>
                      Location name
                    </th>
                    <th scope='col' class='govuk-table__header' />
                  </tr>
                </thead>
                <tbody class='govuk-table__body'>
                  {duplicateLocations &&
                    duplicateLocations.map((location, index) => {
                      return (
                        <tr class='govuk-table__row' key={index}>
                          <td class='govuk-table__cell'>
                            {location.Location_name}
                          </td>
                          <td class='govuk-table__cell'>
                            <Link
                              onClick={(event) =>
                                handleCompareDetails(event, location)}
                            >
                              Compare details
                            </Link>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
            <Button
              className='govuk-button'
              text='Finish managing duplicate locations'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}

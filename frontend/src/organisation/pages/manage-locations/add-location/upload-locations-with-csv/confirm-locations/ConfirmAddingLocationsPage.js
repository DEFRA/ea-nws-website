import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../../../common/components/gov-uk/Button'
import Details from '../../../../../../common/components/gov-uk/Details'
import { backendCall } from '../../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ConfirmLocationsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const validLocations = location?.state?.valid || 0
  const duplicateLocations = location?.state?.duplicates || 0
  const notInEnglandLocations = location?.state?.notInEngland || 0
  const notFoundLocations = location?.state?.notFound || 0
  const fileName = location?.state?.fileName || ''
  const authToken = useSelector((state) => state.session.authToken)

  const handleLocations = async (event) => {
    event.preventDefault()

    const dataToSend = { authToken, fileName }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/bulk_uploads/save_locations',
      navigate
    )
    if (!errorMessage) {
      navigate(orgManageLocationsUrls.unmatchedLocations.index, {
        state: {
          added: data.valid,
          notAdded: data.invalid
        }
      })
    } else {
      // got to some sort of error page
    }
  }

  const handleCancel = async (event) => {
    event.preventDefault()
    // cancel the upload and return to setting screen
    navigate('/organisation/home')
  }

  const detailsMessage = (
    <div className='govuk-body'>
      <h1 className='govuk-heading-s'>Location partly matches an address</h1>
      <p>
        A location is recognised as an address but some of the information does
        not match ours, for example the street name or postcode.
      </p>
      <p>
        To find the correct address if it's partly matched, you can search from
        a drop-down list, match it to an address and then add it to your
        locations.
      </p>
      <h2 className='govuk-heading-s'>Address not found</h2>
      <p>
        A location is not recognised, for example it may be a new address or
        uses a building name instead of a street address. Or it may be because
        the information is incorrectly typed or formatted.
      </p>
      <p>
        To find an address you can drop a pin on a map to select the address
        location. This can then be added to your locations.
      </p>
    </div>
  )

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              {validLocations} of{' '}
              {duplicateLocations + notFoundLocations + notInEnglandLocations}{' '}
              locations can be added
            </h1>
            <div className='govuk-body'>
              <div className='govuk-inset-text'>
                {duplicateLocations > 0 && (
                  <div>
                    <strong>{duplicateLocations}</strong> locations already
                    exist with the same name in this account. You can choose to
                    keep the existing locations or replace them with the new
                    locations uploaded.
                  </div>
                )}
                {notFoundLocations > 0 && (
                  <div>
                    {/* Only need a break if there is text above */}
                    {duplicateLocations > 0 && <br />}
                    <div>
                      <strong>{notFoundLocations}</strong> locations need to be
                      found manually in this account before they can be added.
                    </div>
                  </div>
                )}
                {notInEnglandLocations > 0 && (
                  <div>
                    {/* Only need a break if there is text above */}
                    {(duplicateLocations > 0 || notFoundLocations > 0) && (
                      <br />
                    )}
                    <div>
                      <strong>{notInEnglandLocations}</strong> locations cannot
                      be added because they are not in England. You can check
                      each of the location's details and change them if you
                      think this is not correct.
                    </div>
                  </div>
                )}
              </div>
              <Details
                title='Why are some locations not found?'
                text={detailsMessage}
              />
              You can do this after you add the {validLocations} locations that
              can be added now.
            </div>
            <br />
            <Button
              text='Add and continue'
              className='govuk-button govuk-button'
              onClick={handleLocations}
            />
            &nbsp; &nbsp;
            <Button
              text='Cancel upload'
              className='govuk-button govuk-button--warning inline-block'
              onClick={handleCancel}
            />
          </div>
        </div>
      </main>
    </>
  )
}

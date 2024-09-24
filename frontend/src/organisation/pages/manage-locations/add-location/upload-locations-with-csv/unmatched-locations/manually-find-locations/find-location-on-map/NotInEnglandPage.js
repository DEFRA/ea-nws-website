import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotInEnglandPage () {
  const navigate = useNavigate()

  const handleSubmit = async () => {
    navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.index, {
      state: 'NotAdded'
    })
  }

  return (
    <>
      <BackLink onClick={() => navigate(orgManageLocationsUrls.unmatchedLocations.manuallyfind.map)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>This location is not in England and cannot be added to this account</h1>
            <div className='govuk-body'>
              <p>
                You can only get flood messages for locations in England.
              </p>
              <p>
                When you finish manually finding locations, you can download a file of any locations that were not found or are not in England.
              </p>
            </div>
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}

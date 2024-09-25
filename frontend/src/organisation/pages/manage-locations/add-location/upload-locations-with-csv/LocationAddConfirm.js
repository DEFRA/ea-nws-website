import React from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddUploadFilePage () {
  const navigate = useNavigate()

  const upload = () => {
    console.log('Upload clicked')
  }

  const cancel = () => {
    navigate(orgManageLocationsUrls.add.addressInfo) // TODO: Should link to settings page (not made yet)
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-column-two-thirds'>
          <h1 className='govuk-heading-l'>X locations can be added</h1>{' '}
          {/* Must replace X with number of locations */}
          <Button
            text='Add and continue'
            className='govuk-button'
            onClick={upload}
          />{' '}
          <Button
            text='Cancel upload'
            className='govuk-button govuk-button--warning'
            onClick={cancel}
          />
        </div>
      </main>
    </>
  )
}

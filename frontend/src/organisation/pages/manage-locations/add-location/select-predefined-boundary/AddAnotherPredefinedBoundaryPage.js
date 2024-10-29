import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddAnotherPredefinedBoundaryPage () {
  const navigate = useNavigate()

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>Add another predefined boundary</h1>
            <div className='govuk-body'>
              <Button
                className='govuk-button'
                text='Add predefined boundary'
                onClick={() =>
                  navigate(orgManageLocationsUrls.add.predefinedBoundary.select)}
              />
              <Link
                onClick={() => navigate(orgManageLocationsUrls.add.options)}
                className='govuk-body govuk-link inline-link govuk-!-margin-left-2'
              >
                I'm finished
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

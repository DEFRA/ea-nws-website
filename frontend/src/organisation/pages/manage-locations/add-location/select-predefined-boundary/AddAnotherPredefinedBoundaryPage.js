import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { setConsecutiveBoundariesAdded } from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddAnotherPredefinedBoundaryPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const consecutiveBoundariesAdded = useSelector(
    (state) => state.session.consecutiveBoundariesAdded
  )

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const navigateToNextPage = (event) => {
    event.preventDefault()

    const multipleBoundariesAdded = consecutiveBoundariesAdded > 1

    dispatch(setConsecutiveBoundariesAdded(0))

    multipleBoundariesAdded
      ? navigate(orgManageLocationsUrls.view.dashboard)
      : navigate(orgManageLocationsUrls.view.viewLocation)
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
                  navigate(orgManageLocationsUrls.add.predefinedBoundary.select)
                }
              />
              <Link
                onClick={navigateToNextPage}
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

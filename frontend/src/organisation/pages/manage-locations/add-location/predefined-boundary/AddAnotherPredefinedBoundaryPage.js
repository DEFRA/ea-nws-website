import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import {
  setConsecutiveBoundariesAdded,
  setPredefinedBoundaryFlow,
  setSelectedBoundary,
  setSelectedBoundaryType
} from '../../../../../common/redux/userSlice'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function AddAnotherPredefinedBoundaryPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const consecutiveBoundariesAdded = useSelector(
    (state) => state.session.consecutiveBoundariesAdded
  )
  const notificationText = location.state?.successMessage

  // Clear any previous boundary selection
  useEffect(() => {
    dispatch(setSelectedBoundary(null))
    dispatch(setSelectedBoundaryType(null))
  }, [dispatch])

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  const navigateToNextPage = (event) => {
    event.preventDefault()

    const multipleBoundariesAdded = consecutiveBoundariesAdded > 1

    dispatch(setConsecutiveBoundariesAdded(0))
    dispatch(setPredefinedBoundaryFlow(false))

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
            {notificationText && (
              <NotificationBanner
                className='govuk-notification-banner govuk-notification-banner--success'
                title='Success'
                text={notificationText}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              Add another predefined boundary
            </h1>
            <div className='govuk-body'>
              <Button
                className='govuk-button'
                text='Add predefined boundary'
                onClick={(event) => {
                  event.preventDefault()
                  navigate(orgManageLocationsUrls.add.predefinedBoundary.select)
                }}
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

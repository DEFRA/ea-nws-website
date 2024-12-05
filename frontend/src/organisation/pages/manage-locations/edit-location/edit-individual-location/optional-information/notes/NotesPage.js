import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getLocationAdditional } from '../../../../../../../common/redux/userSlice'
import NotesLayout from '../../../../../../layouts/optional-info/NotesLayout'
import { orgManageLocationsUrls } from '../../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function NotesPage () {
  const navigate = useNavigate()
  const locationName = useSelector(
    (state) => getLocationAdditional(state, 'locationName')
  )

  const navigateToNextPage = () => {
    navigate(orgManageLocationsUrls.view.viewLocation, {
      state: { successMessage: `${locationName} notes changed` }
    })
  }

  return (
    <>
      <NotesLayout
        navigateToNextPage={navigateToNextPage}
        keywordType='location'
      />
    </>
  )
}

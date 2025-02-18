import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import {
  getLocationAdditional,
  setCurrentLocation
} from '../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAlreadyExists () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orgId = useSelector((state) => state.session.orgId)
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const [error, setError] = useState(null)

  const handleEditLocation = async () => {
    const dataToSend = {
      orgId,
      locationName,
      type: 'valid'
    }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/locations/search',
      navigate
    )

    if (data) {
      dispatch(setCurrentLocation(data[0]))
      navigate(orgManageLocationsUrls.view.viewLocation)
    } else {
      errorMessage
        ? setError(errorMessage)
        : setError('Oops, something went wrong')
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds' />
          {error && <ErrorSummary errorList={[error]} />}
          <h1 className='govuk-heading-l'>
            {locationName} already exists in this account
          </h1>
          <h2 className='govuk-heading-m'>What do you want to do next?</h2>
          <p className='govuk-body'> You can:</p>
          <ul className='govuk-list govuk-list--bullet'>
            <li>
              <Link to={orgManageLocationsUrls.add.name} className='govuk-link'>
                use a different location name for this location
              </Link>
            </li>
            <li>
              <Link onClick={() => handleEditLocation()} className='govuk-link'>
                edit the existing location in this account
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

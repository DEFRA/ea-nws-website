import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../../../../../common/components/gov-uk/Button'
import NotificationBanner from '../../../../../../../common/components/gov-uk/NotificationBanner'
import WarningText from '../../../../../../../common/components/gov-uk/WarningText'
import { setCurrentLocation } from '../../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../../common/services/BackendService'

export default function ManuallyFindLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const [locations, setLocations] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const getInvLocations = async () => {
      const dataToSend = { authToken }
      const { data } = await backendCall(
        dataToSend,
        'api/bulk_uploads/get_invalid_locations',
        navigate
      )
      if (data) {
        setLocations(data)
      } else {
        console.log('no invalid locations')
      }
    }
    getInvLocations()
  }, [])

  const handleSubmit = async () => {
    navigate('/organisation/manage-locations/view-locations')
  }

  const handleFind = async (event, location) => {
    event.preventDefault()
    const poi = location
    dispatch(setCurrentLocation(poi))
    navigate('/organisation/manage-locations/find-location')
  }

  return (
    <>
      {location.state &&
         (
           <NotificationBanner
             className={`govuk-notification-banner ${location.state === 'Added' && 'govuk-notification-banner--success'} govuk-!-margin-bottom-0 govuk-!-margin-top-4`}
             title={location.state === 'Added' ? 'Success' : 'Information'}
             text={location.state === 'Added' ? '1 Location Added' : '1 location cannot be added because it\'s not in England'}
           />
         )}

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Manually find locations</h1>
            <div className='govuk-body'>
              <p>
                <>
                  <Link
                    to='/' // link to download file of all locations not matched
                    className='govuk-link'
                  >
                    Download a file of all the locations not matched
                  </Link>
                  , update it and reupload later.
                </>
              </p>
              <h2 className='govuk-heading-m govuk-!-margin-top-6'>
                {locations?.length} locations not matched
              </h2>

              <table class='govuk-table govuk-table--small-text-until-tablet'>
                <thead class='govuk-table__head'>
                  <tr class='govuk-table__row'>
                    <th scope='col' class='govuk-table__header'>
                      Location name
                    </th>
                    <th scope='col' class='govuk-table__header'>
                      Address uploaded
                    </th>
                    <th scope='col' class='govuk-table__header'>
                      Postcode
                    </th>
                    <th scope='col' class='govuk-table__header' />
                  </tr>
                </thead>
                <tbody class='govuk-table__body'>
                  {locations &&
                  locations.map((location, index) => {
                    return (
                      <tr class='govuk-table__row' key={index}>
                        <th scope='row' class='govuk-table__header'>
                          {location.name}
                        </th>
                        <td class='govuk-table__cell'>
                          {location.meta_data.location_additional.full_address}
                        </td>
                        <td class='govuk-table__cell'>{location.meta_data.location_additional.postcode}</td>
                        <td class='govuk-table__cell'>
                          <Link
                            onClick={(event) => handleFind(event, location)}
                          >
                            Find this location
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <WarningText text='Any locations not matched cannot be added to this account' />
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

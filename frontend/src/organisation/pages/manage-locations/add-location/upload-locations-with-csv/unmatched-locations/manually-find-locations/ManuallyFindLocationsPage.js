import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../../common/components/gov-uk/Button'
import WarningText from '../../../../../../../common/components/gov-uk/WarningText'
import { setCurrentLocation } from '../../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../../common/services/BackendService'

export default function ManuallyFindLocationsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.session.authToken)
  const [locations, setLocations] = useState(null)

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
      <BackLink onClick={() => navigate(-1)} />
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
                          {location.Location_name}
                        </th>
                        <td class='govuk-table__cell'>
                          {location.Full_address}
                        </td>
                        <td class='govuk-table__cell'>{location.Postcode}</td>
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

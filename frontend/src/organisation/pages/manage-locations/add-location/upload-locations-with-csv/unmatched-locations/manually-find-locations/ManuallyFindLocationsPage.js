import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../../common/components/gov-uk/Button'
import WarningText from '../../../../../../../common/components/gov-uk/WarningText'
import {
  setCurrentLocation,
  setLocationSearchResults
} from '../../../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../../../common/services/BackendService'

export default function ManuallyFindLocationsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // dumy data this will be updated to come from the upload.
  const locations = [
    {
      Location_name: 'Location 1',
      Full_address: '25a belgrave road',
      Postcode: 'SO17 3EA',
      X_coordinates: 'X coordinates',
      Y_coordinates: 'Y coordinates',
      Internal_reference: 'Internal reference',
      Business_criticality: 'Business criticality',
      Location_type: 'Location type',
      Action_plan: 'Action plan',
      Notes: 'Notes',
      Keywords: [Array]
    },
    {
      Location_name: 'Location 2',
      Full_address: 'Bythesea Road',
      Postcode: 'BA14 8JN',
      X_coordinates: 'X coordinates',
      Y_coordinates: 'Y coordinates',
      Internal_reference: 'Internal reference',
      Business_criticality: 'Business criticality',
      Location_type: 'Location type',
      Action_plan: 'Action plan',
      Notes: 'Notes',
      Keywords: [Array]
    },
    {
      Location_name: 'Location 3',
      Full_address: '1000 Parkwaye, Whiteley',
      Postcode: 'PO15 7AA',
      X_coordinates: 'X coordinates',
      Y_coordinates: 'Y coordinates',
      Internal_reference: 'Internal reference',
      Business_criticality: 'Business criticality',
      Location_type: 'Location type',
      Action_plan: 'Action plan',
      Notes: 'Notes',
      Keywords: [Array]
    },
    {
      Location_name: 'Location 4',
      Full_address: 'Station Rd',
      Postcode: 'SO51 7LP',
      X_coordinates: 'X coordinates',
      Y_coordinates: 'Y coordinates',
      Internal_reference: 'Internal reference',
      Business_criticality: 'Business criticality',
      Location_type: 'Location type',
      Action_plan: 'Action plan',
      Notes: 'Notes',
      Keywords: [Array]
    },
    {
      Location_name: 'Location 5',
      Full_address: 'Romsey Office, Cannal Walk, Romsey',
      Postcode: 'SO51 8DU',
      X_coordinates: 'X coordinates',
      Y_coordinates: 'Y coordinates',
      Internal_reference: 'Internal reference',
      Business_criticality: 'Business criticality',
      Location_type: 'Location type',
      Action_plan: 'Action plan',
      Notes: 'Notes',
      Keywords: [Array]
    }
  ]

  const handleSubmit = async () => {
    navigate('/organisation/manage-locations/view-locations')
  }

  const locationToPOI = (location) => {
    return {
      name: location.Location_name,
      // address is the UPRN
      address: null,
      // Coordinates in dd (degrees decimal)
      coordinates: null,
      alert_categories: null,
      meta_data: {
        location_additional: {
          full_address: location.Full_address,
          postcode: location.Postcode,
          // Easting EPSG: 27700
          x_coordinate: location.X_coordinates,
          // Northing EPSG: 27700
          y_coordinate: location.Y_coordinates,
          internal_reference: location.Internal_reference,
          business_criticality: location.Business_criticality,
          location_type: location.Location_type,
          action_plan: location.Action_plan,
          notes: location.Notes,
          keywords: location.Keywords
        }
      }
    }
  }

  const findAvailableAddresses = async (location) => {
    const dataToSend = {
      name: location,
      minmatch: 0.5
    }
    const { data, errorMessage } = await backendCall(
      dataToSend,
      'api/os-api/name-minmatch-search',
      navigate
    )
    if (errorMessage) {
      // If there was an error message, return false
      return false
    } else {
      // Otherwise, dispatch results and return true
      dispatch(setLocationSearchResults(data))
      return true
    }
  }

  const handleFind = async (event, location) => {
    event.preventDefault()
    const poi = locationToPOI(location)
    dispatch(setCurrentLocation(poi))
    const isAddressValid = findAvailableAddresses(
      location.meta_data.location_additional.full_address
    )
    // If there is results for the unmatched address, navigate to the radio screen
    // where user can select how to find the address
    if (isAddressValid) {
      navigate(
        '/organisation/manage-locations/unmatched-locations/find-location'
      )
    } else {
      // otherwise, navigate to find on map directly
      navigate('/') //Link to map
    }
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
                {locations.length} locations not matched
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
                  {locations.map((location, index) => {
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

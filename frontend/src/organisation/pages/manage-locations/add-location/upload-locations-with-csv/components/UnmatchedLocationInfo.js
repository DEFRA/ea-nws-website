import { React } from 'react'
import { useSelector } from 'react-redux'
import {
  getLocationAdditional,
  getLocationOther
} from '../../../../../../common/redux/userSlice'

export default function UnmatchedLocationInfo () {
  const locationName = useSelector((state) =>
    getLocationAdditional(state, 'locationName')
  )
  const locationFullAddress = useSelector((state) =>
    getLocationOther(state, 'full_address')
  )
  const locationPostCode = useSelector((state) =>
    getLocationOther(state, 'postcode')
  )
  const locationXcoordinate = useSelector((state) =>
    getLocationOther(state, 'x_coordinate')
  )
  const locationYcoordinate = useSelector((state) =>
    getLocationOther(state, 'y_coordinate')
  )

  const coordinatesAvailable = !!(locationXcoordinate && locationYcoordinate)

  return (
    <div className='govuk-inset-text'>
      <strong>{locationName}</strong>
      {locationFullAddress && (
        <>
          <br />
          {locationFullAddress}
          {locationPostCode && <>, {locationPostCode}</>}
          {coordinatesAvailable && (
            <>
              <br />
            </>
          )}
        </>
      )}
      {coordinatesAvailable && (
        <>
          <br />
          {typeof locationXcoordinate === 'number'
            ? Math.round(locationXcoordinate)
            : locationXcoordinate}
          ,{' '}
          {typeof locationYcoordinate === 'number'
            ? Math.round(locationYcoordinate)
            : locationYcoordinate}
        </>
      )}
    </div>
  )
}

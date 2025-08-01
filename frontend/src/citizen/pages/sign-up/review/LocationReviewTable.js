import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAdditional } from '../../../../common/redux/userSlice'

export default function LocationReviewTable() {
  const navigate = useNavigate()
  const locationsSelected = useSelector((state) => state.session.profile.pois)

  const firstLocation = locationsSelected[0]

  const locationName = getAdditional(firstLocation.additionals, 'locationName')

  const location = locationName === '' ? firstLocation.address : locationName

  const selectLocationToBeChanged = (event) => {
    event.preventDefault()
    navigate('/signup/review/change-location-search')
  }

  return (
    <div className='govuk-!-padding-bottom-4'>
      <h2 className='govuk-heading-m'>Location you selected</h2>
      {location && (
        <table className='govuk-table check-your-answers-table'>
          <tbody className='govuk-table__body'>
            <tr className='govuk-table__row'>
              <th
                className='govuk-table__header govuk-!-width-one-third'
                scope='row'
              >
                Location
              </th>
              <td className='govuk-table__cell govuk-!-width-full'>
                {location}
              </td>

              <td className='govuk-table__cell'>
                <Link
                  onClick={(e) => selectLocationToBeChanged(e)}
                  className='govuk-link'
                  style={{ cursor: 'pointer' }}
                  aria-label={`Change address for location ${location}`}
                >
                  Change
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

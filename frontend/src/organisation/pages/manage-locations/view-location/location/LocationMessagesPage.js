import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import Radio from '../../../../../common/components/gov-uk/Radio'
import LocationHeader from './LocationHeader'

export default function LocationMessagesPage () {
  const navigate = useNavigate()
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const additionalData = currentLocation.meta_data.location_additional
  const messageSettingsText = [
    'Severe flood warnings',
    'Flood warnings',
    'Flood alerts'
  ]

  const messageSettingsSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Message settings
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      <p>
        You can choose which flood messages to get for each location if they're
        available.
        <br />
      </p>
      <p>
        <Link to='/' className='govuk-link'>
          What are the different types of flood messages?
        </Link>
      </p>
      <br />

      <table className='govuk-table govuk-table--small-text-until-tablet'>
        <tbody className='govuk-table__body'>
          {messageSettingsText.map((text, index) => (
            <tr className='govuk-table__row' key={index}>
              <td
                className='govuk-table__cell'
                style={{ verticalAlign: 'middle' }}
              >
                <strong>{text}</strong>
              </td>
              <td className='govuk-table__cell'>
                <Radio label='On' small name={'Radio' + index} />
              </td>
              <td className='govuk-table__cell'>
                <Radio label='Off' small name={'Radio' + index} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        text='Save message settings'
        className='govuk-button'
        // onClick={() => setIsFilterVisible(!isFilterVisible)}
      />
    </>
  )

  const floodAreasSection = (
    <>
      <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
        Flood areas
      </h2>
      <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
      <p>
        {additionalData.location_name} can get flood messages for these areas.
        You may be also able to link {additionalData.location_name} to nearby
        flood areas that get flood messages.
      </p>
      <p>
        <Link to='/' className='govuk-link'>
          What are flood areas?
        </Link>
      </p>

      <Button
        text='Link to nearby flood areas'
        className='govuk-button govuk-button--secondary'
        // onClick={() => setIsFilterVisible(!isFilterVisible)}
      />
    </>
  )

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-4'>
        <LocationHeader currentPage='/organisation/manage-locations/location/view-messages' />

        {/* details */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {messageSettingsSection}
          </div>
        </div>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full govuk-!-margin-top-9'>
            {floodAreasSection}
          </div>
        </div>
      </main>
    </>
  )
}

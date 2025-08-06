import 'leaflet/dist/leaflet.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import Button from '../../../common/components/gov-uk/Button'
import InsetText from '../../../common/components/gov-uk/InsetText'

export default function LocationCannotGetFloodMessagesLayout({
  navigateToNearbyFloodAreas,
  navigateToSearchResultsPage
}) {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              You cannot get flood messages for this location
            </h1>
            <InsetText text={selectedLocation.address} />
            <p>Possible reasons are:</p>
            <ul className='govuk-list govuk-list--bullet'>
              <li>the risk of flooding is very low</li>
            </ul>
            <p>You may still be at risk of flooding.</p>
            <div className='govuk-!-margin-top-7'>
              <Button
                text='View nearby areas you can monitor'
                className='govuk-button govuk-!-margin-right-2'
                onClick={() => navigate(navigateToNearbyFloodAreas)}
              />
              <Button
                text='Enter different location'
                className='govuk-button  govuk-button--secondary'
                onClick={() => navigate(navigateToSearchResultsPage)}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Map from '../../custom-components/Map'
import Header from '../../gov-uk-components/Header'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'

export default function ViewLocationPage() {
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )
  const selectedFloodWarningArea = useSelector(
    (state) => state.session.selectedLocation
  )
  const selectedFloodAlertArea = useSelector(
    (state) => state.session.selectedLocation
  )
  const showOnlySelectedFloodArea = useSelector(
    (state) => state.session.showOnlySelectedFloodArea
  )

  console.log('selectedLocation', selectedLocation)
  console.log('selectedFloodWarningArea', selectedFloodWarningArea)
  console.log('selectedFloodAlertArea', selectedFloodAlertArea)
  console.log('showOnlySelectedFloodArea', showOnlySelectedFloodArea)

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          {/* <AccountNavigation
            currentPage={'/' + location.pathname.split('/')[1]}
          /> */}
          <Link onClick={() => navigate(-1)} className='govuk-back-link'>
            Back
          </Link>
          <main className='govuk-main-wrapper govuk-!-padding-top-2'>
            <div className='govuk-body'>
              <div className='govuk-grid-row'>
                <div className='govuk-grid-column-three-quarters'>
                  <h1 className='govuk-heading-l'>{selectedLocation.name}</h1>

                  <Map types={['severe', 'alert']} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

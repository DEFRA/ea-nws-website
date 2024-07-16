import 'leaflet/dist/leaflet.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../custom-components/FloodWarningKey'
import Map from '../../custom-components/Map'
import Button from '../../gov-uk-components/Button'
import Footer from '../../gov-uk-components/Footer'
import Header from '../../gov-uk-components/Header'
import InsetText from '../../gov-uk-components/InsetText'
import PhaseBanner from '../../gov-uk-components/PhaseBanner'
import { setProfile } from '../../redux/userSlice'
import { addLocation } from '../../services/ProfileServices'

export default function LocationInSevereWarningAreaLayout ({
  continueToNextPage
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.session.profile)
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  const handleSubmit = () => {
    // geosafe doesnt accept locations with postcodes - need to remove this from the object
    const { postcode, ...locationWithoutPostcode } = locationWithoutPostcode
    dispatch(setProfile(addLocation(profile, locationWithoutPostcode)))
    continueToNextPage()
  }

  return (
    <>
      <div className='page-container'>
        <Header />
        <div className='govuk-width-container body-container'>
          <PhaseBanner />
          <div className='govuk-body'>
            <div className='govuk-grid-row'>
              <div className='govuk-grid-column-two-thirds'>
                <Link onClick={() => navigate(-1)} className='govuk-back-link'>
                  Back
                </Link>
                <h1 className='govuk-heading-l govuk-!-margin-top-6'>
                  You can get severe flood warnings and flood warnings for this
                  location
                </h1>
                <InsetText text={selectedLocation.name} />
              </div>
              <div className='govuk-grid-column-three-quarters'>
                <Map types={['warning']} />
                <FloodWarningKey type='severe' />
              </div>

              <div className='govuk-grid-column-two-thirds'>
                <p className='govuk-!-margin-top-6'>
                  These warnings tell you when flooding:
                </p>
                <ul className='govuk-list govuk-list--bullet'>
                  <li>is expected</li>
                  <li>could be a danger to life or property</li>
                </ul>
                <p>You'll need to act immediately.</p>
                <p>The following may be affected:</p>
                <ul className='govuk-list govuk-list--bullet'>
                  <li>life and communities</li>
                  <li>homes and business</li>
                  <li>roads, railway lines and infrastructure</li>
                  <li>coastal areas affected by spray or waves overtopping</li>
                  <li>flood plains, including caravan parks and campsites</li>
                  <li>major tourist and leisure attractions</li>
                </ul>
                <p>
                  Flood warnings are usually sent 30 minutes to 2 hours before
                  flooding
                </p>
                <p>
                  Severe flood warnings will be sent at any time when life is at
                  risk.
                </p>
                <Button
                  text='Confirm you want this location'
                  className='govuk-button'
                  onClick={handleSubmit}
                />
                &nbsp; &nbsp;
                <Link
                  onClick={() => navigate(-1)}
                  className='govuk-link'
                  style={{
                    display: 'inline-block',
                    padding: '8px 10px 7px'
                  }}
                >
                  Choose different location
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

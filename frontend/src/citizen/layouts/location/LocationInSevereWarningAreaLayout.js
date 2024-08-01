import 'leaflet/dist/leaflet.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import FloodWarningKey from '../../../common/components/custom/FloodWarningKey'
import Map from '../../../common/components/custom/Map'
import Button from '../../../common/components/gov-uk/Button'
import InsetText from '../../../common/components/gov-uk/InsetText'
import { setProfile } from '../../../common/redux/userSlice'
import { addLocation } from '../../../common/services/ProfileServices'

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
    // eslint-disable-next-line no-use-before-define
    const { postcode, ...locationWithoutPostcode } = selectedLocation
    console.log('location', locationWithoutPostcode)
    dispatch(setProfile(addLocation(profile, locationWithoutPostcode)))
    continueToNextPage()
  }

  return (
    <>
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
    </>
  )
}

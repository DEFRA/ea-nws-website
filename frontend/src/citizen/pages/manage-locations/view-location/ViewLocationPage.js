import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AccountNavigation from '../../../../common/components/custom/AccountNavigation'
import BackLink from '../../../../common/components/custom/BackLink'
import FloodWarningKey from '../../../../common/components/custom/FloodWarningKey'
import Map from '../../../../common/components/custom/Map'
import Button from '../../../../common/components/gov-uk/Button'
import Details from '../../../../common/components/gov-uk/Details'

const floodWarningCardDetails = (
  <>
    <p>They tell you when flooding is expected and will pose a risk to:</p>
    <ul className='govuk-list govuk-list--bullet'>
      <li>life and communities</li>
      <li>homes and businesses</li>
      <li>railway lines and infrastructure</li>
      <li>roads</li>
      <li>coastal areas affected by spray or waves overtopping</li>
      <li>flood plains, including caravans park and campsites</li>
      <li>major tourist and leisure attractions</li>
    </ul>
  </>
)

const floodAlertCardDetails = (
  <>
    <p>They tell you to be prepared and flooding could pose a risk to:</p>
    <ul className='govuk-list govuk-list--bullet'>
      <li>fields, recreational land and carparks</li>
      <li>minor roads</li>
      <li>farmland</li>
      <li>coastal areas affected by spray or waves overtopping</li>
    </ul>
  </>
)

export default function ViewLocationPage () {
  const navigate = useNavigate()
  const { type } = useParams()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  const areaAreas = type === 'both' ? ['severe', 'alert'] : [type]

  const removeLocation = () => {
    navigate('/manage-locations/remove', {
      state: { name: selectedLocation.name }
    })
  }

  return (
    <>
      <AccountNavigation currentPage='/home' />
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-body'>
          <div className='govuk-grid-row'>
            <div className='govuk-grid-column-three-quarters'>
              <h1 className='govuk-heading-l'>{selectedLocation.name}</h1>

              <Map types={areaAreas} />
              <FloodWarningKey type={type} />
              <h2 className='govuk-heading-m govuk-!-margin-top-5 govuk-!-margin-bottom-5'>
                Flood messages you get
              </h2>

              {/* flood warnings card */}
              {(type === 'both' || type === 'severe') && (
                <div className='govuk-summary-card'>
                  <div
                    className='govuk-summary-card__title-wrapper'
                    style={{ flexDirection: 'column' }}
                  >
                    <h2 className='govuk-summary-card__title govuk-!-font-size-24'>
                      Severe flood warnings and flood warnings
                    </h2>
                    <p className='govuk-!-margin-bottom-1 govuk-!-margin-top-0'>
                      Danger to life or property - act immediately
                    </p>
                  </div>
                  <div className='govuk-summary-card__content'>
                    <p className='govuk-body'>
                      Sent in last year: <b>6</b>
                    </p>
                    <Details
                      title='Risks when these are in force'
                      text={floodWarningCardDetails}
                    />
                  </div>
                </div>
              )}

              {/* flood alerts card */}
              {(type === 'both' || type === 'alert') && (
                <div className='govuk-summary-card'>
                  <div className='govuk-summary-card__title-wrapper govuk-!-padding-0'>
                    <div
                      className='govuk-summary-card__title-wrapper'
                      style={{ flexDirection: 'column' }}
                    >
                      <h2 className='govuk-summary-card__title govuk-!-font-size-24'>
                        Flood alerts {type === 'both' && '(optional)'}
                      </h2>
                      <p className='govuk-!-margin-bottom-1 govuk-!-margin-top-0'>
                        Early alerts that flooding is possible - be prepared
                      </p>
                    </div>
                    {type === 'both' && (
                      <div
                        className='govuk-summary-card__title-wrapper'
                        style={{ alignItems: 'center' }}
                      >
                        <div
                          className='govuk-radios govuk-radios--small govuk-radios--inline'
                          data-module='govuk-radios'
                        >
                          <div className='govuk-radios__item govuk-!-margin-right-0'>
                            <input
                              className='govuk-radios__input'
                              id='alert-on'
                              name='alert'
                              type='radio'
                              checked
                              value='on'
                            />
                            <label
                              className='govuk-label govuk-radios__label'
                              htmlFor='alert-on'
                            >
                              On
                            </label>
                          </div>
                          <div className='govuk-radios__item govuk-!-margin-right-0'>
                            <input
                              className='govuk-radios__input'
                              id='alert-off'
                              name='alert'
                              type='radio'
                              value='off'
                            />
                            <label
                              className='govuk-label govuk-radios__label'
                              htmlFor='alert-off'
                            >
                              Off
                            </label>
                          </div>
                        </div>

                        <Link
                          to='/home'
                          className='govuk-body govuk-link inline-link govuk-!-margin-bottom-0'
                        >
                          Save
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className='govuk-summary-card__content'>
                    <p className='govuk-body'>
                      You turned these early flood alerts off.
                    </p>
                    <p className='govuk-body'>
                      Sent in last year: <b>27</b>
                    </p>
                    <Details
                      title='Risks when these are in force'
                      text={floodAlertCardDetails}
                    />
                  </div>
                </div>
              )}

              <h2 className='govuk-heading-m'>
                To stop all flood messages for this location
              </h2>
              <Button
                onClick={removeLocation}
                className='govuk-button govuk-button--warning'
                text='Remove location'
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

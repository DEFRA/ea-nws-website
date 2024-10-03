import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import Details from '../../../../../common/components/gov-uk/Details'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'
import ViewLocationSubNavigation from './location-information-components/ViewLocationSubNavigation'

export default function LocationInformationLayout() {
  const currentLocation = useSelector((state) => state.session.currentLocation)

  const address = '49, south street, Greenock'
  const formattedAddress = address.split(',')

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-4'>
        <div class='govuk-grid-row'>
          <div class='govuk-grid-column-one-half'>
            <span class='govuk-caption-l'>View location</span>
            <h1 class='govuk-heading-l'>Location_ID01</h1>
          </div>
          <div
            class='govuk-grid-column-one-half right'
            style={{
              marginLeft: 'auto',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              text={'Delete location'}
              className={'govuk-button govuk-button--secondary'}
            />
          </div>
        </div>

        {/* flood risk bannner */}
        <div class='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <div className='flood-risk-banner govuk-!-margin-top-2'>
              <div className='flood-risk-banner-item'>
                <h3 className='flood-risk-banner-title govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Rivers and sea flood risk
                </h3>
                <p className='flood-risk-banner-label low-risk govuk-!-padding-1 govuk-!-margin-0'>
                  Low Risk
                </p>
              </div>
              <div className='flood-risk-banner-item'>
                <h3 className='flood-risk-banner-title govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Groundwater flood risk
                </h3>
                <p className='flood-risk-banner-label unlikely-risk govuk-!-padding-1 govuk-!-margin-0'>
                  Unlikely
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* view location navigation */}
        <div className='govuk-!-margin-top-6 govuk-!-margin-bottom-9'>
          <ViewLocationSubNavigation currentPage={'/location/view-location'} />
        </div>

        {/* details */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {/* Address details*/}
            {currentLocation.name && (
              <>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Address
                </h2>
                <Link
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
                  //to={}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                  Address
                </h3>
                <p>
                  {formattedAddress.map((line, index) => {
                    return (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    )
                  })}
                </p>
              </>
            )}
            {/* Location details */}
            <div className={currentLocation.name ? `govuk-!-margin-top-7` : ''}>
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                Location
              </h2>
              <Link
                className='govuk-link govuk-!-display-inline-block'
                style={{ float: 'right' }}
                //to={}
              >
                Change
              </Link>
              <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
              <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                X and Y Coordinates
              </h3>
              <p>
                457891
                {', '}
                303313
              </p>
            </div>
            {/* Key Information details */}
            <div className='govuk-!-margin-top-7'>
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                Key Information
              </h2>
              <Link
                className='govuk-link govuk-!-display-inline-block'
                style={{ float: 'right' }}
                //to={}
              >
                Change
              </Link>
              <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
              <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                Location name
              </h3>
              <p>Location_ID01</p>
              {currentLocation.meta_data.location_additional
                .internal_reference && (
                <>
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Internal reference
                  </h3>
                  <p>PS01, unit 57, HighW_07</p>
                </>
              )}
              {currentLocation.meta_data.location_additional
                .business_criticality && (
                <>
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Business criticality
                  </h3>
                  <p>Medium</p>
                </>
              )}
              {currentLocation.meta_data.location_additional.location_type && (
                <>
                  <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                    Location type
                  </h3>
                  <p>Office</p>
                </>
              )}
            </div>

            {/* Keywords details */}
            {currentLocation.meta_data.location_additional.keywords && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Keywords
                </h2>
                <Link
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
                  //to={}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>Midlands</p>
              </div>
            )}

            {/* Action plan details */}
            {currentLocation.meta_data.location_additional.action_plan && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Action Plan
                </h2>
                <Link
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
                  //to={}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <pre>
                  1. Inspect the location <br />
                  2. Move stock
                  <br />
                  3. Evacuate
                </pre>
              </div>
            )}

            {/* Notes details */}
            {currentLocation.meta_data.location_additional.notes && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Notes
                </h2>
                <Link
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
                  //to={}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>
                  John smith has the flood plan for this location. His contact
                  number is 01234 567 890.
                </p>
              </div>
            )}

            {/* Add more info links */}
            <div className='govuk-!-font-size-16 govuk-!-margin-top-7'>
              {currentLocation.name == null && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add address
                </Link>
              )}
              {currentLocation.meta_data.location_additional
                .internal_reference == null && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add internal reference
                </Link>
              )}
              {currentLocation.meta_data.location_additional
                .business_criticality == null && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add business criticality
                </Link>
              )}
              {currentLocation.meta_data.location_additional.location_type ==
                null && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add location type
                </Link>
              )}
              {currentLocation.meta_data.location_additional.keywords ==
                null && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add keywords
                </Link>
              )}
              {currentLocation.meta_data.location_additional.action_plan ==
                null && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add action plan
                </Link>
              )}
              {currentLocation.meta_data.location_additional.notes == null && (
                <Link className='govuk-!-display-block'>Add notes</Link>
              )}
            </div>
            {/* flood risk details */}
            <div className='govuk-!-margin-top-7'>
              <Details title={'What is a flood risk?'} />
            </div>
          </div>

          {/* other half - map */}
          <div className='govuk-grid-column-one-half'>
            <Map showMapControls={false} zoomLevel={14} />
            <div className='govuk-!-margin-top-4'>
              <FloodWarningKey type='both' />
            </div>
            <span className='govuk-caption-m govuk-!-font-size-16 govuk-!-font-weight-bold govuk-!-margin-top-4'>
              This is not a live flood map
            </span>
            <span className='govuk-caption-m govuk-!-font-size-16'>
              It shows fixed areas we provide flood warnings and alerts for
            </span>
            <div className=' govuk-!-margin-top-4'>
              <RoomOutlinedIcon style={{ fontSize: 30 }} />
              <Link>Open Map</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

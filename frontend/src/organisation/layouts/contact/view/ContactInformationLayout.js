import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import FloodWarningKey from '../../../../components/custom/FloodWarningKey'
import Map from '../../../../components/custom/Map'
import ViewLocationSubNavigation from './location-information-components/ViewLocationSubNavigation'

export default function ContactInformationLayout() {
  const navigate = useNavigate()
  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact.firstName + ' ' + currentContact.lastName
  const keywords = currentContact.additionals.find(
    (item) => item.id === 'keywords'
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
        <div class='govuk-grid-row'>
          <div class='govuk-grid-column-one-half'>
            <span class='govuk-caption-l'>Contact</span>
            <h1 class='govuk-heading-l'>{contactName}</h1>
          </div>
        </div>

        {/* view contact navigation */}
        <div className='govuk-!-margin-top-6 govuk-!-margin-bottom-9'>
          <ViewLocationSubNavigation currentPage='/contact/view-contact' />
        </div>

        {/* details */}
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <>
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                Key information
              </h2>
              <Link
                className='govuk-link govuk-!-display-inline-block'
                style={{ float: 'right' }}
                // TODO to={}
              >
                Change
              </Link>
              <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
              <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                Name
              </h3>
              <p>{contactName}</p>
              <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                Job title
              </h3>
              <p>{currentContact.position ? currentContact.position : '-'}</p>
            </>

            <>
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                Email addresses and numbers
              </h2>
              <Link
                className='govuk-link govuk-!-display-inline-block'
                style={{ float: 'right' }}
                // TODO to={}
              >
                Change
              </Link>
              <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
              <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                Email addresses
              </h3>
              <p>
                {currentContact.emails.map((email, index) => {
                  return { email }
                })}
              </p>
              <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                UK mobile numbers for texts
              </h3>
              <p>
                {currentContact.mobilePhone.map((number, index) => {
                  return { number }
                })}
              </p>
              <h3 className='govuk-heading-s govuk-!-font-size-16 govuk-!-margin-bottom-0'>
                UK telephone numbers for voice messages
              </h3>
              <p>{currentContact.position ? currentContact.position : '-'}</p>
            </>

            {/* Keywords details */}
            {keywords.value && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Keywords
                </h2>
                <Link
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
                  // TODO to={}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>{keywords.value}</p>
              </div>
            )}

            {/* Notes details */}
            {currentContact.comments && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Notes
                </h2>
                <Link
                  className='govuk-link govuk-!-display-inline-block'
                  style={{ float: 'right' }}
                  // TODO to={}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>{currentContact.comments}</p>
              </div>
            )}

            {/* Add more info links */}
            <div className='govuk-!-font-size-19 govuk-!-margin-top-7'></div>

            {/* other half - map */}
            <div className='govuk-grid-column-one-half'>
              <Map showMapControls={false} zoomLevel={14} />
              <div className='govuk-!-margin-top-4'>
                <FloodWarningKey type='both' />
              </div>
              <div className=' govuk-!-margin-top-4'>
                <RoomOutlinedIcon style={{ fontSize: 30 }} />
                <Link>Open Map</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

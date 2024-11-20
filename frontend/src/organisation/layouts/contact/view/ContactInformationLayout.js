import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../common/components/custom/OrganisationAccountNavigation'
import ContactMap from './contact-information-components/ContactMap'
import ViewContactSubNavigation from './contact-information-components/ViewContactSubNavigation'
export default function ContactInformationLayout () {
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
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <strong className='govuk-tag govuk-tag--green govuk-!-margin-bottom-3'>
              Contact
            </strong>
            <h1 className='govuk-heading-l govuk-!-margin-bottom-1'>
              {contactName}
            </h1>
          </div>
        </div>
        {/* view contact navigation */}
        <div className='govuk-!-margin-top-6 govuk-!-margin-bottom-9'>
          <ViewContactSubNavigation currentPage='/location/view-location' />
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
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>Name</h3>
              <p>{contactName}</p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
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
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                Email addresses
              </h3>
              <p>
                {currentContact.emails
                  ? currentContact.emails.map((email, index) => {
                    return (
                      <span key={index}>
                        {email}
                        <br />
                      </span>
                    )
                  })
                  : '-'}
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                UK mobile numbers for texts
              </h3>
              <p>
                {currentContact.mobilePhones
                  ? currentContact.mobilePhones.map((number, index) => {
                    return (
                      <span key={index}>
                        {number}
                        <br />
                      </span>
                    )
                  })
                  : '-'}
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                UK telephone numbers for voice messages
              </h3>
              <p>
                {currentContact.homePhones
                  ? currentContact.homePhones.map((number, index) => {
                    return (
                      <span key={index}>
                        {number}
                        <br />
                      </span>
                    )
                  })
                  : '-'}
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                Position
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
                <p>
                  {keywords.value
                    .replace('[', '')
                    .replace(']', '')
                    .replace(/"/g, '')
                    .replace(/,/g, ', ')}
                </p>
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
          </div>
          {/* other half - map */}
          <div className='govuk-grid-column-one-half'>
            <ContactMap zoomLevel={14} mobileView={isMobile} />

            <div className=' govuk-!-margin-top-4'>
              <RoomOutlinedIcon style={{ fontSize: 30 }} />
              <Link className='govuk-link'>Open Map</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

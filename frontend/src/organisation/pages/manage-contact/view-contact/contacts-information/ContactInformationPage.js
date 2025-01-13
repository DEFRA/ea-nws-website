import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import locationPin from '../../../../../common/assets/images/location_pin.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import { getContactAdditional } from '../../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import ContactHeader from './contact-information-components/ContactHeader'
import ContactMap from './contact-information-components/ContactMap'

export default function ContactInformationPage() {
  const navigate = useNavigate()
  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const contactName = currentContact?.firstName + ' ' + currentContact?.lastName
  const jobTitle = useSelector((state) =>
    getContactAdditional(state, 'jobTitle')
  )
  const notes = useSelector((state) => getContactAdditional(state, 'notes'))
  const keywords = useSelector((state) =>
    getContactAdditional(state, 'keywords')
  )
  const locations = currentContact?.pois

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body govuk-!-margin-top-4'>
        <ContactHeader
          contactName={contactName}
          currentPage={orgManageContactsUrls.view.viewContact}
        />
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
              <p>{jobTitle ? JSON.parse(jobTitle) : '-'}</p>
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
            </>

            {/* Keywords details */}
            {keywords && (
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
                <p>{JSON.parse(keywords).join(', ')}</p>
              </div>
            )}

            {/* Notes details */}
            {notes && (
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
                <p>{JSON.parse(notes)}</p>
              </div>
            )}

            {/* Add more info links */}
            <div className='govuk-!-font-size-19 govuk-!-margin-top-7'>
              {!keywords && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add keywords
                </Link>
              )}
              {!notes && (
                <Link className='govuk-!-display-block govuk-!-margin-bottom-1'>
                  Add notes
                </Link>
              )}
            </div>
          </div>

          {/* other half - map */}
          <div className='govuk-grid-column-one-half'>
            <ContactMap locations={locations} />

            <div
              className='govuk-!-margin-top-4'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src={locationPin}
                alt='Location Pin'
                style={{ width: 36, height: 40, transform: 'translateY(6px)' }}
              />
              <Link className='govuk-link'>Open map</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

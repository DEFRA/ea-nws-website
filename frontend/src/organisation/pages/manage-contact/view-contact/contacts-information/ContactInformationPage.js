import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import locationPin from '../../../../../common/assets/images/location_pin.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import { getContactAdditional } from '../../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import FullscreenMap from '../../../manage-locations/view-location/FullscreenMap'
import ContactHeader from './contact-information-components/ContactHeader'
import ContactMap from './contact-information-components/ContactMap'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'

export default function ContactInformationPage () {
  const navigate = useNavigate()
  const currentContact = useSelector((state) => state.session.orgCurrentContact)

  const jobTitle = useSelector((state) =>
    getContactAdditional(state, 'jobTitle')
  )
  const contactKeywords = useSelector((state) =>
    getContactAdditional(state, 'keywords')
  )
  const keywords = contactKeywords ? JSON.parse(contactKeywords) : []
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const [locations, setLocations] = useState([])
  const [showMap, setShowMap] = useState(false)
  const currentLocation = useSelector((state) => state.session.currentLocation)
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  const navigateBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const openMap = () => {
    setShowMap(true)
  }

  useEffect(() => {
    const getLocations = async () => {
      const dataToSend = { authToken, orgId, contact: currentContact }
      const linkLocationsRes = await backendCall(
        dataToSend,
        'api/elasticache/list_linked_locations',
        navigate
      )

      if (linkLocationsRes.data) {
        setLocations(linkLocationsRes.data)
      }
    }

    getLocations()
  }, [])

  return (
    <>
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
                className='govuk-link right'
                to={orgManageContactsUrls.edit.details}
              >
                Change
              </Link>
              <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
              <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>Name</h3>
              <p>{contactName}</p>

              {jobTitle && (
                <>
                  <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                    Job title
                  </h3>
                  <p>{jobTitle}</p>
                </>
              )}
            </>

            <div className='govuk-!-margin-top-7'>
              <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                Email addresses and numbers
              </h2>
              <Link
                className='govuk-link right'
                to={orgManageContactsUrls.edit.channels}
              >
                Change
              </Link>
              <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
              {currentContact.emails?.length > 0 && (
                <>
                  <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                    Email addresses
                  </h3>
                  <p>
                    {currentContact.emails.map((email, index) => {
                      return (
                        <span key={index}>
                          {email}
                          <br />
                        </span>
                      )
                    })}
                  </p>
                </>
              )}
              {currentContact.mobilePhones?.length > 0 && (
                <>
                  <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                    UK mobile numbers for texts
                  </h3>
                  <p>
                    {currentContact.mobilePhones.map((number, index) => {
                      return (
                        <span key={index}>
                          {number}
                          <br />
                        </span>
                      )
                    })}
                  </p>
                </>
              )}
              {currentContact.homePhones?.length > 0 && (
                <>
                  <h3 className='govuk-heading-s govuk-!-margin-bottom-0'>
                    UK telephone numbers for voice messages
                  </h3>
                  <p>
                    {currentContact.homePhones.map((number, index) => {
                      return (
                        <span key={index}>
                          {number}
                          <br />
                        </span>
                      )
                    })}
                  </p>
                </>
              )}
            </div>

            {/* Keywords details */}
            {keywords.length > 0 && (
              <div className='govuk-!-margin-top-7'>
                <h2 className='govuk-heading-m govuk-!-margin-bottom-0 govuk-!-display-inline-block'>
                  Keywords
                </h2>
                <Link
                  className='govuk-link right'
                  to={orgManageContactsUrls.edit.keywords}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>{keywords.join(', ')}</p>
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
                  to={orgManageContactsUrls.edit.notes}
                >
                  Change
                </Link>
                <hr className='govuk-!-margin-top-1 govuk-!-margin-bottom-3' />
                <p>{currentContact.comments}</p>
              </div>
            )}

            {/* Add more info links */}
            <div className='govuk-!-font-size-19 govuk-!-margin-top-7 govuk-!-display-block'>
              {keywords.length === 0 && (
                <div className='govuk-!-margin-bottom-1'>
                  <Link
                    className='govuk-link'
                    to={orgManageContactsUrls.edit.keywords}
                  >
                    Add keywords
                  </Link>
                </div>
              )}
              {!currentContact.comments && (
                <div>
                  <Link
                    className='govuk-link'
                    to={orgManageContactsUrls.edit.notes}
                  >
                    Add notes
                  </Link>
                </div>
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
              <Link className='govuk-link' onClick={openMap}>
                Open map
              </Link>
              {showMap && (
                <FullscreenMap
                  showMap={showMap}
                  setShowMap={setShowMap}
                  locations={[currentLocation]}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

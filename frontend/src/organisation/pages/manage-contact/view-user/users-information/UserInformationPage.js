import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import locationPin from '../../../../../common/assets/images/location_pin.svg'
import BackLink from '../../../../../common/components/custom/BackLink'
import NotificationBanner from '../../../../../common/components/gov-uk/NotificationBanner'
import UserType from '../../../../../common/enums/UserType'
import { setAddingAdminFlow } from '../../../../../common/redux/userSlice'
import { backendCall } from '../../../../../common/services/BackendService'
import { geoSafeToWebLocation } from '../../../../../common/services/formatters/LocationFormatter'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import FullscreenMap from '../../../manage-locations/view-location/FullscreenMap'
import UserHeader from './user-information-components/UserHeader'
import UserMap from './user-information-components/UserMap'

export default function UserInformationPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const jobTitle = currentContact.additionals.jobTitle
  const keywords = currentContact.additionals.keywords
  const contactName = currentContact?.firstname + ' ' + currentContact?.lastname
  const role = () => {
    if (currentContact?.role) {
      return UserType.Admin
    }
    if (currentContact?.pendingRole) {
      return UserType.PendingAdmin
    }
    return UserType.Contact
  }
  const userType = role()
  const [locations, setLocations] = useState([])
  const [showMap, setShowMap] = useState(false)
  const authToken = useSelector((state) => state.session.authToken)
  const orgId = useSelector((state) => state.session.orgId)

  useEffect(() => {
    dispatch(setAddingAdminFlow(false))
  }, [])

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
        const convertedLocations = linkLocationsRes.data.map((loc) =>
          geoSafeToWebLocation(loc)
        )
        setLocations(convertedLocations)
      }
    }

    getLocations()
  }, [])

  const pendingAdminLinks = (
    <>
      <Link className='govuk-link'>Resend invitation</Link>
      <span style={{ color: '#1d70b8', margin: '0 5px' }}>|</span>
      <Link className='govuk-link'>Withdraw invitation</Link>
    </>
  )

  return (
    <>
      <BackLink onClick={(e) => navigateBack(e)} />
      <main className='govuk-main-wrapper govuk-body'>
        {userType === UserType.PendingAdmin && (
          <NotificationBanner
            className={'govuk-notification-banner'}
            title={'Important'}
            heading={`${contactName} has not yet accepted their invitation to join as admin`}
            text={pendingAdminLinks}
          />
        )}
        <UserHeader
          contactName={contactName}
          userType={userType}
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
            <UserMap locations={locations} />

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
                  locations={locations}
                  filteredLocations={locations}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

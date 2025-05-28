import React from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { setOrgCurrentContact } from '../../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function ContactLinkInfoPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const profile = useSelector((state) => state.session.profile)

  const handleContactInfo = (e) => {
    e.preventDefault()

    dispatch(setOrgCurrentContact(profile))

    navigate(orgManageContactsUrls.view.viewContact)
  }

  return (
    <>
      <Helmet>
        <title>Link Users - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              If people in your organisation need<br />
              flood message for these locations
            </h1>
            <div className='govuk-body'>
              <p>
                You'll need to add these as{' '}
                <Link
                  className='govuk-link'
                  to={orgManageContactsUrls.view.dashboard}
                >
                  contacts
                </Link>
                {' '}and then link them to these<br />
                locations.
              </p>
              <p>
                If you need flood messages personally, go to your own{' '}
                <Link
                  className='govuk-link'
                  onClick={(e) => handleContactInfo(e)}
                >
                  contact profile
                </Link>
                {' '}<br />and link yourself to these locations.
              </p>

              <Button
                text='Finish'
                className='govuk-button govuk-!-margin-top-8'
                onClick={(event) => {
                  event.preventDefault()
                  navigate(orgManageLocationsUrls.monitoring.view)
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

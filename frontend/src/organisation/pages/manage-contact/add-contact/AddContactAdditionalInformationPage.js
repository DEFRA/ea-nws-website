import { React } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import BackLink from '../../../../common/components/custom/BackLink'
import Button from '../../../../common/components/gov-uk/Button'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'

export default function AddContactAdditionalInformationPage() {
  const currentContact = useSelector((state) => state.session.orgCurrentContact)
  const navigate = useNavigate()

  const skipOptionalInformation = (event) => {
    event.preventDefault()
    navigate(orgManageContactsUrls.add.linkContactToLocations)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(orgManageContactsUrls.add.channels)
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <Helmet>
        <title>Do you want to add more information about {currentContact?.firstname} {currentContact?.lastname}? - Manage users - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              Do you want to add more information about{' '}
              {currentContact?.firstname} {currentContact?.lastname}?
            </h1>
            <div className='govuk-body'>
              <p>For example:</p>
              <ul className='govuk-list govuk-list--bullet'>
                <li>more email addresses and telephone numbers</li>
                <li>keywords to group users together</li>
                <li>notes</li>
              </ul>
              <p>Or they can do this themselves once they join as an admin.</p>
              <div className='govuk-!-margin-top-8'>
                <Button
                  text='Yes, add now'
                  className='govuk-button'
                  onClick={handleSubmit}
                />
                &nbsp; &nbsp;
                <Link
                  className='govuk-link inline-link'
                  onClick={skipOptionalInformation}
                >
                  No, skip - do this later
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Accordion from '../../../common/components/gov-uk/Accordion'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import InsetText from '../../../common/components/gov-uk/InsetText'
import Radio from '../../../common/components/gov-uk/Radio'
import { setOrgCurrentContact } from '../../../common/redux/userSlice'
import { backendCall } from '../../../common/services/BackendService'
import { updateAdditionals } from '../../../common/services/ProfileServices'
import { geoSafeToWebContact } from '../../../common/services/formatters/ContactFormatter'
import { infoUrls } from '../../routes/info/InfoRoutes'
import { orgManageContactsUrls } from '../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../routes/manage-locations/ManageLocationsRoutes'

export default function InitialLoginAdminPage() {
  const navigate = useNavigate()
  const [nextPage, setNextPage] = useState(null)
  const [errorText, setErrorText] = useState('')
  const adminNextActionId = 'admin-next-action'
  const authToken = useSelector((state) => state.session.authToken)
  const profile = useSelector((state) => state.session.profile)
  const dispatch = useDispatch()

  const infoSections = [
    {
      heading: 'Live flood warnings',
      content: (
        <>
          <p className='govuk-body'>You’ll have access to maps to check:</p>
          <ul className='govuk-list govuk-list--bullet'>
            <li>locations currently affected by flood warnings</li>
            <li>severity of warnings in force</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Locations and flood messages',
      content: (
        <>
          <p className='govuk-body'>You'll be able to:</p>
          <ul className='govuk-list govuk-list--bullet'>
            <li>add, edit or delete locations</li>
            <li>link locations to users</li>
            <li>choose which flood messages to get for each location</li>
          </ul>
          <InsetText
            text={
              'You must link yourself to locations if you need flood messages personally.'
            }
          />
        </>
      )
    },
    {
      heading: 'Users',
      content: (
        <>
          <p className='govuk-body'>You'll be able to:</p>
          <ul className='govuk-list govuk-list--bullet'>
            <li>add, edit or delete users</li>
            <li>manage contact details</li>
            <li>set them up to get flood messages</li>
          </ul>
        </>
      )
    },
    {
      heading: 'Reports',
      content: (
        <>
          <p className='govuk-body'>Create reports on:</p>
          <ul className='govuk-list govuk-list--bullet'>
            <li>live and historic flood warnings</li>
            <li>locations</li>
            <li>users</li>
            <li>flood messages your organisation is getting</li>
          </ul>
        </>
      )
    }
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!nextPage) {
      setErrorText('Select what you would like to do first')
    } else {
      const updatedProfile = updateAdditionals(profile, [
        { id: 'firstLogin', value: { s: 'false' } }
      ])
      const dataToSend = { profile: updatedProfile, authToken: authToken }
      const { errorMessage } = await backendCall(
        dataToSend,
        'api/profile/update',
        navigate
      )

      if (!errorMessage) {
        if (nextPage === orgManageContactsUrls.view.viewContact) {
          dispatch(setOrgCurrentContact(geoSafeToWebContact(updatedProfile)))
          navigate(nextPage)
        } else {
          navigate(nextPage)
        }
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>
          Organisation admin controls - Get flood warnings (professional) -
          GOV.UK
        </title>
      </Helmet>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {errorText && (
              <ErrorSummary
                errorList={[
                  { text: errorText, componentId: adminNextActionId }
                ]}
              />
            )}
            <h1 className='govuk-heading-l' id='main-content'>
              You've now joined as an admin for your organisation and can manage
              the following.
            </h1>
            <Accordion id='admin-controls-accordion' sections={infoSections} />
            <div
              className={
                errorText
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset'>
                <h1 className='govuk-heading-m'>
                  What would you like to do first?
                </h1>
                {errorText && (
                  <p className='govuk-error-message'>
                    <span className='govuk-visually-hidden'>Error:</span>{' '}
                    {errorText}
                  </p>
                )}
                <div
                  id={adminNextActionId}
                  className='govuk-radios'
                  data-module='govuk-radios'
                >
                  <Radio
                    key='start'
                    name='radios'
                    label='Start using the service'
                    hint='Add locations and users to set up your account'
                    onChange={() =>
                      setNextPage(orgManageLocationsUrls.monitoring.view)
                    }
                  />
                  <Radio
                    key='guide'
                    name='radios'
                    label='Read a guide on how to set up the account'
                    hint="Always available under 'Help', if you need it"
                    onChange={() => setNextPage(infoUrls.help)}
                  />
                </div>
              </fieldset>
            </div>
            <Button
              className='govuk-button'
              text='Continue'
              onClick={(event) => handleSubmit(event)}
            />
          </div>
        </div>
      </main>
    </>
  )
}

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Accordion from '../../../../common/components/gov-uk/Accordion'
import Button from '../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../common/components/gov-uk/ErrorSummary'
import Radio from '../../../../common/components/gov-uk/Radio'
import { setOrgCurrentContact } from '../../../../common/redux/userSlice'
import { orgManageContactsUrls } from '../../../routes/manage-contacts/ManageContactsRoutes'
import { orgManageLocationsUrls } from '../../../routes/manage-locations/ManageLocationsRoutes'

export default function AdminJoinedPage () {
  const navigate = useNavigate()
  const [nextPage, setNextPage] = useState(null)
  const [errorText, setErrorText] = useState('')
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
        <p className='govuk-body'>Introductions, methods, core features.</p>
      )
    }
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!nextPage) {
      setErrorText('Select what you would like to do first')
    } else {
      if (nextPage === orgManageContactsUrls.view.viewContact) {
        dispatch(setOrgCurrentContact(profile))
      }
      navigate(nextPage)
    }
  }

  return (
    <>
      <main className='govuk-main-wrapper'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {errorText && <ErrorSummary errorList={[errorText]} />}
            <h1 className='govuk-heading-l'>
              You've now joined as admin for your organisation and can manage
              the following.
            </h1>

            <Accordion id='admin-accordion' sections={infoSections} />

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
                  <p className='govuk-error-message'>{errorText}</p>
                )}
                <div className='govuk-radios' data-module='govuk-radios'>
                  <Radio
                    key='check_profile'
                    name='radios'
                    label='Check my profile and contact details'
                    onChange={() =>
                      setNextPage(orgManageContactsUrls.view.viewContact)}
                  />
                  <Radio
                    key='start'
                    name='radios'
                    label='Start using the service'
                    hint='Check warnings, locations, users and reports'
                    onChange={() =>
                      setNextPage(orgManageLocationsUrls.monitoring.view)}
                  />{' '}
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

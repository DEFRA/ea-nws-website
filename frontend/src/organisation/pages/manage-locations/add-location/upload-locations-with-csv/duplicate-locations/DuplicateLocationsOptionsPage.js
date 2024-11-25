import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../../common/components/gov-uk/ErrorSummary'
import NotificationBanner from '../../../../../../common/components/gov-uk/NotificationBanner'
import Radio from '../../../../../../common/components/gov-uk/Radio'
import WarningText from '../../../../../../common/components/gov-uk/WarningText'
import { orgManageLocationsUrls } from '../../../../../routes/manage-locations/ManageLocationsRoutes'

export default function DuplicateLocationsOptionsPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [option, setOption] = useState('')
  const [error, setError] = useState('')
  const location = useLocation()
  const addedLocations = location?.state?.addedLocations || 0
  const bulkUploadData = location?.state?.bulkUploadData
  const duplicateLocations = location?.state?.duplicateLocations || 0

  const options = [
    {
      value: 'KeepAll',
      label: 'Keep all existing locations already in this account'
    },
    {
      value: 'ReplaceAll',
      label:
        'Replace all the existing locations with the new locations uploaded'
    },
    {
      value: 'ViewDetails',
      label:
        "View the location's details and manually choose which ones to keep or replace"
    }
  ]

  // remove any errors if user changes search option
  useEffect(() => {
    setError('')
  }, [option])

  const handleSubmit = async () => {
    if (!option) {
      setError('Select what you want to do with the duplicate locations')
    } else {
      switch (option) {
        case options[0].value: {
          break
        }
        case options[1].value: {
          break
        }
        case options[2].value: {
          navigate(orgManageLocationsUrls.add.manageDuplicateLocationsPage, {
            state: {
              bulkUploadData
            }
          })
          break
        }
        default:
          break
      }
    }
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      {addedLocations > 0 && (
        <NotificationBanner
          className='govuk-notification-banner govuk-notification-banner--success govuk-!-margin-bottom-10 govuk-!-margin-top-5'
          title='Success'
          text={`${addedLocations} locations added`}
        />
      )}
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row govuk-body'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>
              {duplicateLocations} locations already exist with the same name in
              this account
            </h1>
            <div
              className={
                error
                  ? 'govuk-form-group govuk-form-group--error'
                  : 'govuk-form-group'
              }
            >
              <fieldset className='govuk-fieldset'>
                <legend className='govuk-fieldset__legend'>
                  What do you want to do with the duplicate locations?
                </legend>
                {error && <p className='govuk-error-message'>{error}</p>}
                {options.map((option) => (
                  <Radio
                    key={option.value}
                    id={option.value}
                    name='optionsRadios'
                    label={option.label}
                    type='radio'
                    value={option.value}
                    onChange={() => setOption(option.value)}
                  />
                ))}
              </fieldset>
            </div>
            <WarningText text='Any new locations uploaded that are duplicates will not be saved to this account if you do not manage them now. The existing location with the same name will be kept in this account.' />
            <div className='govuk-body'>
              If you view the location's details, you can print a list of all
              the duplicate locations. If you want to then replace the existing
              locations with new ones, you'll need to either reupload them in a
              new CSV file or replace each one manually in this account.
            </div>
            <br />
            <Button
              text='Continue'
              className='govuk-button'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </main>
    </>
  )
}

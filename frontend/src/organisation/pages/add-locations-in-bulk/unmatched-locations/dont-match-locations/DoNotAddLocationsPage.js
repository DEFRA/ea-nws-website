import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import WarningText from '../../../../../common/components/gov-uk/WarningText'

export default function DoNotAddLocationsPage () {
  const navigate = useNavigate()

  const handleSubmit = async () => {
    navigate('/organisation/home')
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l govuk-!-margin-top-6'>Do not add locations</h1>
            <div className='govuk-body'>
              <WarningText text='If you continue, any locations not matched will not be added to this account and cannot be saved.' />
              <p>
                <>
                  {' '}
                  <Link to='/' className='govuk-link'>
                    Download a file of all the locations not matched
                  </Link>{' '}
                  if you want to add these later. You'll need to update these address and reupload them.
                </>
              </p>
            </div>
            <br />
            <Button
              className='govuk-button'
              text='Continue'
              onClick={handleSubmit}
            />
          </div>

        </div>
      </main>
    </>
  )
}

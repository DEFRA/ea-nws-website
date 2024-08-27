import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'

export default function DoNotAddLocationsPage () {
  const navigate = useNavigate()

  const handleSubmit = async (event) => {}

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div className='govuk-body'>
              <h1 className='govuk-heading-l'>Do not add locations</h1>
              <>
                {' '}
                <Link to='/' className='govuk-link'>
                    Download a file of all the locations not matched
                </Link>{' '}
                    if you want to add these later, You'll need to update these address and reupload them.
                </>
                <Button
                    className='govuk-button'
                    text='Continue'
                    onClick={handleSubmit}
                />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

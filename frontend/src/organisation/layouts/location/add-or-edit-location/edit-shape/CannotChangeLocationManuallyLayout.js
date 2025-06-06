import React from 'react'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../common/components/custom/BackLink'

export default function CannotChangeLocationManuallyLayout({ LocationType }) {
  const navigate = useNavigate()

  return (
    <>
      <BackLink
        onClick={(e) => {
          e.preventDefault()
          navigate(-1)
        }}
      />
      <main className='govuk-main-wrapper govuk-!-padding-top-8'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l' id='main-content'>
              You cannot change the location of a {LocationType} manually in
              this account
            </h1>
            <div className='govuk-body'>
              <p>
                If you want to change the location of the {LocationType} your
                organisation has created, you need to upload the new location as
                a shapefile in a .ZIP file.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

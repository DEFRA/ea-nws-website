import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../../common/components/custom/BackLink'
import Button from '../../../../../../common/components/gov-uk/Button'

export default function LocationAddShapefile() {
  const navigate = useNavigate()

  const handleButton = async () => {
    navigate('#')
  }

  return (
    <>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              How to upload a location as a shapefile in a ZIP
            </h1>
            <div className='govuk-body'>
              Contents
              <p>
                -{' '}
                <a className='govuk-link ' href='#'>
                  How to upload a shapefile
                </a>
              </p>
              <p>
                -{' '}
                <a className='govuk-link ' href='#'>
                  Information you need to include
                </a>
              </p>
              <p>
                -{' '}
                <a className='govuk-link ' href='#'>
                  Useful information you can include to help easily identify
                  each location
                </a>
              </p>
              <h2 className='govuk-heading-m'>How to upload a shapefile</h2>
              <p className='govuk-!-margin-bottom-6 govuk-!-margin-top-6'>
                You cannot create a shapefile in this account. You need to
                create a shapefile and then upload it.{' '}
              </p>
              <p>
                Each shapefile can only contain 1 location in it. But a
                shapefile can contain multiple shapes in it that refer to a
                single location.
                <br />
                For example, you could upload a shapefile of a railway line that
                has multiple parts along it.{' '}
              </p>
              <p>Each shapefile must be included in a single ZIP file.</p>
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

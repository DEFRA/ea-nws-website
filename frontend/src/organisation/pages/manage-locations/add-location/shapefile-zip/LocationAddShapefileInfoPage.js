import React, { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddShapefileInfoPage() {
  const navigate = useNavigate()

  // References used to scroll to certain elements on page
  const howToUploadRef = useRef(null)

  const handleScrollToSection = (e, ref) => {
    e.preventDefault()
    if (ref.current) {
      ref.current?.focus() //Move keyboard focus
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>How to upload a location as a shapefile - Manage locations - Get flood warnings (professional) - GOV.UK</title>
      </Helmet>
      <BackLink onClick={() => navigate(-1)} />

      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {/* Contents section */}
            <h1 className='govuk-heading-l'>
              How to upload a location as a shapefile in a ZIP
            </h1>
            <div className='govuk-body'>
              <p>Contents</p>
              <p>
                -{' '}
                <Link
                  className='govuk-link'
                  onClick={(e) => handleScrollToSection(e, howToUploadRef)}
                >
                  How to upload a shapefile
                </Link>
              </p>
              <br />

              {/* How to upload section */}
              <h2
                ref={howToUploadRef}
                tabIndex='-1'
                role='region'
                className='govuk-heading-m'
              >
                How to upload a shapefile
              </h2>
              <p className='govuk-!-margin-bottom-6 govuk-!-margin-top-6'>
                You cannot create a shapefile in this account. You need to
                create a shapefile and then upload it.{' '}
              </p>
              <p>
                Each shapefile can only contain 1 location in it. But a
                shapefile can contain multiple shapes in it that refer to a
                single location. For example, you could upload a shapefile of a
                railway line that has multiple parts along it.{' '}
              </p>
              <p>Each shapefile must be included in a single ZIP file.</p>
              <p>
                The ZIP file must contain the following files:
                <br />
                .shp (main file)
                <br />
                .shx (index file)
                <br />
                .dbf (database file)
              </p>
              <p>
                Each file must have the same prefix, for example:
                <br />
                locations.shp
                <br />
                locations.shx
                <br />
                locations.dbf
              </p>
              <p>
                Your shapefile name will be used for the location name in this
                service. You can change this later, if you need to.
              </p>
              <p>
                If you have any problems uploading your shapefile, contact
                getfloodwarnings@environment-agency.gov.uk to get some support.
              </p>
              <br />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={(event) => {
                  event.preventDefault()
                  navigate(
                    orgManageLocationsUrls.add.uploadLocationsWithShapefile
                  )
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

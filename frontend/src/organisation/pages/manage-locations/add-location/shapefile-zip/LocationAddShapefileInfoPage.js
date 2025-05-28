import React, { useRef } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddShapefileInfoPage () {
  const navigate = useNavigate()

  // References used to scroll to certain elements on page
  const howToUploadRef = useRef(null)
  const infoNeededRef = useRef(null)
  const usefulInfoRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>Shapefile information page - GOV.UK</title>
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
                  onClick={() => scrollToSection(howToUploadRef)}
                >
                  How to upload a shapefile
                </Link>{' '}
                <br />-{' '}
                <Link
                  className='govuk-link '
                  onClick={() => scrollToSection(infoNeededRef)}
                >
                  Information you need to include
                </Link>
                <br />-{' '}
                <Link
                  className='govuk-link '
                  onClick={() => scrollToSection(usefulInfoRef)}
                >
                  Useful information you can include to help easily identify
                  each location
                </Link>
              </p>
              <br />

              {/* How to upload section */}
              <h2 ref={howToUploadRef} className='govuk-heading-m'>
                How to upload a shapefile
              </h2>
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
                If you have any problems uploading your shapefile, contact
                getfloodwarnings@environment-agency.gov.uk to get some support.
              </p>
              <br />

              {/* Information to include section */}
              <h2 ref={infoNeededRef} className='govuk-heading-m'>
                Information you need to include
              </h2>
              <p>
                <b>Location name</b> <br />
                How you refer to the location, for example: head office, Brayton
                Water, pumping station. This needs to be unique so cannot be
                used for multiple locations.
              </p>
              <br />

              {/* Useful information section */}
              <h2 ref={usefulInfoRef} className='govuk-heading-m'>
                Useful information you can include to help you easily identify
                the location
              </h2>
              <p>
                <b>Address</b>
                <br />
                If you add a location as a shapefile you can add an address.
                This address will then be associated with the location.
              </p>
              <p>
                <b>Key information</b>
                <ul className='govuk-list govuk-list--bullet'>
                  <li>
                    <b>Internal reference</b> <br />
                    Your internal reference, for example: PS01, unit 57,
                    Brid_04. This can help you identify the location more
                    easily.
                  </li>
                  <li>
                    <b>Business criticality</b> <br />
                    How important the location is to your business. For example,
                    low or medium, business critical.
                  </li>
                  <li>
                    <b>Location type</b> <br />
                    For example, pumping stations, ground floor flat, office,
                    retail unit.
                  </li>
                </ul>{' '}
              </p>
              <p>
                <b>Keywords for locations</b>
                <br />
                Adding keywords for each location can make it easier for you to
                filter and create lists of locations you can then link to the
                people responsible for them (contacts). Contacts cannot get
                flood messages for a location unless they are linked to it.
              </p>
              <p>
                For example, you may want to add 'North' or 'Midlands' or 'Team
                A' as keywords, then show all of the locations with that keyword
                in a list.
              </p>
              <p>
                You can add a maximum of 50 keywords and each keyword cna be
                single or multiple words, for example 'South' or 'South West'.
              </p>
              <p>
                <b>Action plan</b>
                <br />
                Use this section to indicate what you can do to reduce the
                potential effects of flooding. For example, inspect the location
                then move stock to the top floor and evacuate.
              </p>
              <p>You can add a maximum of 500 characters.</p>
              <p>
                <b>Notes</b>
                <br />
                Include any notes that could be helpful to someone not familiar
                with the site. For example, John Smith has the flood plan for
                this location and his contact number is 01234 567 890.
              </p>
              <p>You can add a maximum of 500 characters.</p>
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

import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'
export default function LocationAddAddressInfoPage () {
  const navigate = useNavigate()
  const [templateUrl, setTemplateUrl] = useState(null)
  const helpAddingLocRef = useRef(null)
  const infoNeededRef = useRef(null)
  const usefulInfoRef = useRef(null)
  const downloadTemplateRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  async function getTemplateUrl () {
    const { data } = await backendCall(
      'data',
      'api/bulk_uploads/download_template'
    )
    setTemplateUrl(data)
  }

  useEffect(() => {
    getTemplateUrl()
  })

  const handleButton = async () => {
    navigate(orgManageLocationsUrls.add.uploadFile)
  }

  return (
    <>
      
      <BackLink onClick={() => navigate(-1)} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            <h1 className='govuk-heading-l'>
              Uploading a file with addresses and <br /> postcodes or X and Y
              coordinates
            </h1>
            <div className='govuk-body'>
              <p>Contents</p>
              <p className='govuk-!-margin-top-4'>
                -{' '}
                <Link
                  className='govuk-link'
                  onClick={() => scrollToSection(helpAddingLocRef)}
                >
                  Help with adding locations to the file
                </Link>
                <br />-{' '}
                <Link
                  className='govuk-link '
                  onClick={() => scrollToSection(infoNeededRef)}
                >
                  Information you need to include
                </Link>
                <br />-{' '}
                <Link
                  className='govuk-link'
                  onClick={() => scrollToSection(usefulInfoRef)}
                >
                  Useful information you can include to help easily identify
                  each location
                </Link>
                <br />-{' '}
                <Link
                  className='govuk-link '
                  onClick={() => scrollToSection(downloadTemplateRef)}
                >
                  Download the template and open in Excel, save it as a CSV file
                  and upload it
                </Link>
              </p>
              <h2
                ref={helpAddingLocRef}
                className=' govuk-heading-m govuk-!-margin-top-7'
              >
                Help with adding locations to the file
              </h2>
              <p>
                When you add your organisation’s details into the file check
                you’re entering the information into the corresponding column
                names.
              </p>
              <p>
                You can add a maximum of 50 keywords and each keyword can be
                single or multiple words, for example ‘South’ or ‘South West’.
                Each keyword needs to be entered into a separate field.
              </p>
              <p>You cannot use multiple tabs to add the information.</p>
              <p>
                Any formatting, for example if you make something bold, put
                information on multiple lines, or open any additional tabs,
                cannot be saved.
              </p>

              <h2
                ref={infoNeededRef}
                className='govuk-heading-m govuk-!-margin-top-9'
              >
                Information you need to include
              </h2>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Location name
              </h3>
              <p className='govuk-!-margin-bottom-4'>
                How you refer to the location, for example: head office, Brayton
                Water pumping station. This needs to be unique so cannot be used
                for multiple locations.
              </p>
              <h3 className='govuk-heading-s'>
                You also need to add either a full address and postcode or X and
                Y coordinates. Or you can add both of these options.
              </h3>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Full address
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                Without postcode, for example: Richard Fairclough House,
                Knutsford Road, Latchford, Warrington
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Postcode
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                Full postcode, for example: WA4 1HT
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                X coordinates
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                A number representing how far east or west a location is (also
                known as an ‘easting’), for example: 362105.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Y coordinates
              </h3>
              <p className='govuk-!-margin-bottom-9'>
                A number representing how far north or south a location is (also
                known as a ‘northing’), for example: 387217.
              </p>

              <h2 ref={usefulInfoRef} className='govuk-heading-m'>
                Useful information you can include to help you easily identify
                the location
              </h2>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Address
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                If you add a location as shapefile you can add an address. This
                address will then be associated with the location.
              </p>

              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Key information
              </h3>
              <ul class='govuk-list govuk-list--bullet'>
                <li>
                  <b>Internal reference</b>
                  <br />
                  Your internal reference, for example: PS01, unit 57, Brid_04.
                  This can help you identify the location more easily.
                </li>
                <li>
                  <b>Business criticality</b>
                  <br />
                  How important the location is to your business. For example,
                  low or medium, business critical.
                </li>
                <li>
                  <b>Location type</b>
                  <br />
                  For example, pumping station, ground floor flat, office,
                  retail unit.
                </li>
              </ul>
              <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-1'>
                Keywords for locations
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                Adding keywords for each location can make it easier for you to
                filter and create lists of locations you can then link to the
                people responsible for them (contacts). Contacts cannot get
                flood messages for a location unless they’re linked to it.
              </p>
              <p className='govuk-!-margin-bottom-6'>
                For example, you may want to add ‘North’ or ‘Midlands’ or ‘Team
                A’ as keywords, then show all of the locations with that keyword
                in a list.
              </p>
              <p className='govuk-!-margin-bottom-6'>
                You can add a maximum of 50 keywords and each keyword can be
                single or multiple words, for example ‘South’ or ‘South West’.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-1'>
                Action plan
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                Use this section to indicate what you can do to reduce the
                potential effects of flooding. For example, inspect the location
                then move stock to the top floor and evacuate.
              </p>
              <p className='govuk-!-margin-bottom-6'>
                You can add a maximum of 500 characters.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-top-5 govuk-!-margin-bottom-1'>
                Notes
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                Include any notes that could be helpful to someone not familiar
                with the site. For example, John Smith has the flood plan for
                this location and his contact number is 01234 567 890.
              </p>
              <p className='govuk-!-margin-bottom-6'>
                You can add a maximum of 500 characters.
              </p>

              <h2
                ref={downloadTemplateRef}
                className='govuk-heading-m govuk-!-margin-top-9'
              >
                Download the file and open in Excel, save it as a CSV file and
                upload it
              </h2>
              <p className='govuk-!-margin-bottom-6'>
                You may find it easier to add the location details if you open
                the file in Excel. But you’ll need to save it as a CSV file.
              </p>
              <p className='govuk-!-margin-bottom-6'>
                When you’ve finished adding all of the locations, you need to
                save the file as a CSV and upload it to this account.
              </p>
              <p className='govuk-!-margin-bottom-6'>
                <a className='govuk-link ' href={templateUrl}>
                  Download the template.
                </a>
              </p>

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

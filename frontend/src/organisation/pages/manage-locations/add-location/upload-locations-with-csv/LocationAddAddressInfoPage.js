import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'
import { backendCall } from '../../../../../common/services/BackendService'
import { orgManageLocationsUrls } from '../../../../routes/manage-locations/ManageLocationsRoutes'

export default function LocationAddAddressInfoPage () {
  const navigate = useNavigate()
  const [templateUrl, setTemplateUrl] = useState(null)

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
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              How to upload a file with addresses and postcodes
            </h1>
            <div className='govuk-body'>
              <a className='govuk-link ' href={templateUrl}>
                Download this template spreadsheet.
              </a>
              <p className='govuk-!-margin-bottom-9 govuk-!-margin-top-6'>
                Enter your information and then upload it. The column names, or
                'fields', will automatically match the ones in the system.
              </p>

              {/* Mandatory information */}
              <h2 className='govuk-heading-m'>
                Information you need to include in the file
              </h2>
              <p className='govuk-!-margin-bottom-6 govuk-!-margin-top-6'>
                We need all of this information to be able to upload a location:
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Location name
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                How you refer to the location, for example: head office, Brayton
                Water pumping station
              </p>
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
              <p className='govuk-!-margin-bottom-9'>
                Full postcode, for example: WA4 1HT
              </p>

              {/* Optional information */}
              <h2 className='govuk-heading-m'>
                Optional information you can include in the file
              </h2>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Location reference
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                Your internal reference, for example: PS01, unit 57, Brid_04.
                This can help you identify the location more easily.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Location type
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                For example, pumping station, ground floor flat, office, retail
                unit.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Business criticality
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                How important the location is to your business, for example, low
                or medium, business critical.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Keywords for locations
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                Adding keywords for each location can make it easier for you to
                filter and create lists of locations you can then link to the
                people responsible for them (contacts). Contacts cannot get
                flood messages for a location unless they are linked to it.
              </p>
              <p className='govuk-!-margin-top-3'>
                For example, you may want to add 'North' or 'South' as a
                keyword, then show all of the locations with that keyword in a
                list.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>
                Action to be taken
              </h3>
              <p className='govuk-!-margin-bottom-6'>
                What you can do to reduce the potential effects of flooding, for
                example, inspect the location , use sandbags, move stock,
                evacuate.
              </p>
              <h3 className='govuk-heading-s govuk-!-margin-bottom-1'>Notes</h3>
              <p className='govuk-!-margin-bottom-9'>
                Any notes that could be helpful to someone not familiar with the
                site. For example, John Smith has the flood plan for this
                location, the last time this location flooded we used sandbags.
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

import React from 'react'
import Button from '../../../../common/components/gov-uk/Button'
import InsetText from '../../../../common/components/gov-uk/InsetText'
import Details from '../../../../common/components/gov-uk/Details'

export default function ConfirmLocationsPage () {
  const detailsMessage = (
    <div>
      <h1 className='govuk-heading-s'>Location partly matched an address</h1>
      <p>
        A location is recognised as an address but some of the information does not match ours, for example the street name or postcode.
      </p>
      <p>
        To find the correct address if its partly matched, you can search from a drop-down list, match it to an address and then add it to your locations.
      </p>
      <h2 className='govuk-heading-s'>Address no found</h2>
      <p>
        A location is not recognised, for example it may be a new address or uses a building name instead of a street address. Or it may be because the information is incorrectly typed or formatted.
      </p>
      <p>
        To find an address you can drop a pin on a map to select the address location. This can then be added to your locations.
      </p>
    </div>
  )

  return (
    <>
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>
              ? out of ? locations can be added
            </h1>
            <div className='govuk-body'>
              <InsetText text='? locations need to be matched before they can be added. You can match them after you add the locations that have been found.' />
              <Details
                title='Why do some locations not match?'
                text={detailsMessage}
              />
            </div>
            <Button
              text='Add and continue'
              className='govuk-button govuk-button'
              onClick=''
            />
                &nbsp; &nbsp;
            <Button
              text='Cancel upload'
              className='govuk-button govuk-button--warning inline-block'
              onClick=''
            />
          </div>
        </div>
      </main>
    </>
  )
}

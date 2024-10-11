import React from 'react'
import BackLink from '../../../../../common/components/custom/BackLink'
import Button from '../../../../../common/components/gov-uk/Button'

export default function NotInEnglandLayout ({
  NavigateToNextPage,
  NavigateToPreviousPage
}) {
  const handleSubmit = () => {
    NavigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    NavigateToPreviousPage()
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <h1 className='govuk-heading-l'>
              This location is not in England and cannot be added to this
              account
            </h1>
            <div className='govuk-body'>
              <p>You can only get flood messages for locations in England.</p>
              <p>
                When you finish manually finding locations, you can download a
                file of any locations that were not found or are not in England.
              </p>
            </div>
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

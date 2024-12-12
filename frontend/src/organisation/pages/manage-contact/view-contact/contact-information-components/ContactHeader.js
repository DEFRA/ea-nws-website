import Button from '../../../../../common/components/gov-uk/Button'
import ViewContactSubNavigation from './ViewContactSubNavigation'

export default function ContactHeader({ contactName, currentPage }) {
  return (
    <>
      <div className='govuk-grid-row'>
        <div className='govuk-grid-column-one-half'>
          <strong className='govuk-tag govuk-tag--green govuk-!-margin-bottom-3'>
            Contact
          </strong>
          <h1 className='govuk-heading-l govuk-!-margin-bottom-1'>
            {contactName}
          </h1>
        </div>
        <div
          class='govuk-grid-column-one-half right'
          style={{
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            text='Delete contact'
            className='govuk-button govuk-button--secondary'
            style={{
              marginTop: 'auto' /* Push the button to the bottom */
            }}
          />
        </div>
      </div>

      {/* view contact navigation */}
      <div className='govuk-!-margin-top-6 govuk-!-margin-bottom-9'>
        <ViewContactSubNavigation currentPage={currentPage} />
      </div>
    </>
  )
}

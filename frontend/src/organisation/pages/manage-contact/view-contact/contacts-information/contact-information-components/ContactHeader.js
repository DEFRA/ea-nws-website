import Button from '../../../../../../common/components/gov-uk/Button'
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
          className='govuk-grid-column-one-half right'
          style={{
            marginLeft: 'auto',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            text='Promote to admin'
            className='govuk-button govuk-button--secondary govuk-!-margin-right-5 '
            style={{
              marginTop: 'auto'
            }}
          />
          <Button
            text='Delete user'
            className='govuk-button govuk-button--secondary'
            style={{
              marginTop: 'auto'
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

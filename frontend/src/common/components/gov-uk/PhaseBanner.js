export default function Header () {
  return (
    <>
      <div className='govuk-phase-banner govuk-body'>
        <p className='govuk-phase-banner__content'>
          <strong className='govuk-tag govuk-phase-banner__content__tag'>
            Alpha
          </strong>
          <span className='govuk-phase-banner__text'>
            This is a new service – your{' '}
            <a className='govuk-link' href='/signup/feedback' target='_blank'>
              feedback
            </a>{' '}
            will help us to improve it.
          </span>
        </p>
      </div>
    </>
  )
}

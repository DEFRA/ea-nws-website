import { Link } from 'react-router-dom'

export default function Header ({ 
  type,
  phase
 }) {
  return (
    <>
      <div className='govuk-phase-banner govuk-body'>
        <div className={`${
          type === 'org'
            ? 'custom-width-container'
            : 'govuk-width-container'
        }`}
        >
          <p className='govuk-!-margin-bottom-0 ' style={{ display: 'flex', alignItems: 'center' }}>
            {phase === 'beta' && (
              <strong className='govuk-tag govuk-phase-banner__content__tag'>
                Beta
              </strong>)}
            <span className='govuk-phase-banner__text'>
              This is a new service. Help us improve it and {' '}
              <Link className='govuk-link' to='https://forms.office.com/e/YpBL2ecL2a' target='_blank'>
                give your feedback (opens in new tab)
              </Link>{' '}

            </span>
          </p>
        </div>

      </div>
    </>
  )
}

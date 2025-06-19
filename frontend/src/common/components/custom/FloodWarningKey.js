import { isMobile } from 'react-device-detect'

export default function FloodWarningKey({ type }) {
  // Larger circle for mobile, default otherwise
  const iconSize = isMobile ? 'xl' : 'lg'

  return (
    <>
      <div
        className={`flood-warning-key ${
          isMobile && 'flood-warning-key-mobile'
        }`}
      >
        {type === 'both' && (
          <>
            <span
              className='org-flood-warning-square warning-square govuk-!-margin-left-1 govuk-!-margin-right-1 govuk-!-display-inline-block'
              style={{ verticalAlign: 'middle' }}
            />
            Severe flood warnings and flood warnings area
            <span
              className='org-flood-warning-square alert-square govuk-!-margin-right-1 govuk-!-margin-left-4 govuk-!-display-inline-block'
              style={{ verticalAlign: 'middle' }}
            />
            Flood alert area
          </>
        )}
        {type === 'severe' && (
          <>
            <span
              className='org-flood-warning-square warning-square govuk-!-margin-left-1 govuk-!-margin-right-1 govuk-!-display-inline-block'
              style={{ verticalAlign: 'middle' }}
            />
            Severe flood warnings and flood warnings area
          </>
        )}
        {type === 'alert' && (
          <>
            <span
              className='org-flood-warning-square alert-square govuk-!-margin-left-1 govuk-!-margin-right-1 govuk-!-display-inline-block'
              style={{ verticalAlign: 'middle' }}
            />
            Flood alert area
          </>
        )}
      </div>
    </>
  )
}

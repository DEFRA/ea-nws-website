import { ProgressBar, Spinner } from 'react-bootstrap'

export default function LoadingSpinner({
  text,
  loadingText = 'loading...',
  percent = null
}) {
  return (
    <>
      <div className='loading-spinner-container'>
        {text && <h2 className='govuk-heading-m'>{text}</h2>}
        <div className='loading-spinner'>
          {percent ? (
            <ProgressBar
              now={parseInt(percent)}
              label={`${parseInt(percent)}%`}
              style={{ width: '15rem', height: '2rem' }}
            />
          ) : (
            <Spinner
              animation='border'
              variant='primary'
              style={{ width: '3rem', height: '3rem' }}
            />
          )}
        </div>
        {loadingText}
      </div>
    </>
  )
}

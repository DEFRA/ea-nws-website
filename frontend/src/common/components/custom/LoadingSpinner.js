import Spinner from 'react-bootstrap/Spinner'

export default function LoadingSpinner({ text, loadingText = 'loading...' }) {
  return (
    <>
      <div className='loading-spinner-container'>
        {text && <h2 className='govuk-heading-m'>{text}</h2>}
        <div className='loading-spinner'>
          <Spinner
            animation='border'
            style={{ width: '3rem', height: '3rem' }}
          />
        </div>
        {loadingText}
      </div>
    </>
  )
}

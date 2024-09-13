import Spinner from 'react-bootstrap/Spinner'

export default function LoadingSpinner({ text, loadingText = 'loading...' }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '3rem'
        }}
      >
        <h2 className='govuk-heading-m'>{text}</h2>
        <div style={{ marginTop: '0.2rem' }}>
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

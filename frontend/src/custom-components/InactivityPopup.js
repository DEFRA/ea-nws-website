import React from 'react'

export default function InactivityPopup ({ onStayLoggedIn }) {
  return (
    <div className='inactivity-warning'>
      <div className='inactivity-warning-content'>
        <p>You have been inactive for a while. You will be signed out soon.</p>
        <button onClick={onStayLoggedIn}>Stay Logged In</button>
      </div>
    </div>
  )
}

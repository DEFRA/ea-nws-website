import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { setSigninType } from '../../../common/redux/userSlice'

export default function HomePage () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSigninType('org'))
  })

  return (
    <>
      <main className='govuk-main-wrapper'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Organisation Home Page</h1>
          </div>
        </div>
      </main>
    </>
  )
}

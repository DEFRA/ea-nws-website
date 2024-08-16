import React from 'react'
import { useLocation } from 'react-router'
import AccountNavigation from '../../../common/components/custom/AccountNavigation'

export default function HomePage() {
  return (
    <>
      <AccountNavigation currentPage={useLocation().pathname} />
      <main className='govuk-main-wrapper'>
        <div class='govuk-grid-row'>
          <div class='govuk-grid-column-full'>
            <h1 className='govuk-heading-l'>Organisation Home Page</h1>
          </div>
        </div>
      </main>
    </>
  )
}

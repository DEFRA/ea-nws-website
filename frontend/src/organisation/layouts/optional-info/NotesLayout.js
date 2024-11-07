import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../common/components/gov-uk/TextArea'
import { setCurrentLocationNotes } from '../../../common/redux/userSlice'

export default function NotesLayout({ navigateToNextPage }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentNotes = useSelector(
    (state) => state.session.currentLocation.meta_data.location_additional.notes
  )
  const [notes, setNotes] = useState(currentNotes || '')
  const [error, setError] = useState('')
  const charLimit = 500

  useEffect(() => {
    if (notes.length > charLimit) {
      setError(`You can enter up to ${charLimit} characters`)
    } else {
      setError('')
    }
  }, [notes])

  const handleSubmit = () => {
    if (error) return

    dispatch(setCurrentLocationNotes(notes))

    // should we update geosafe profile here?

    navigateToNextPage()
  }

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <OrganisationAccountNavigation />
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-margin-top-5'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-one-half'>
            {error && <ErrorSummary errorList={[error]} />}
            <h1 className='govuk-heading-l'>Notes (optional)</h1>
            <div className='govuk-body'>
              <p>
                Any notes that may be helpful to someone not familiar with this
                location.
              </p>
              <TextArea
                error={error}
                inputType='text'
                rows='5'
                onChange={(val) => setNotes(val)}
                value={notes}
                className='govuk-textarea'
                additionalInfo={`You can enter up to ${charLimit} characters`}
              />
              <Button
                text='Continue'
                className='govuk-button'
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

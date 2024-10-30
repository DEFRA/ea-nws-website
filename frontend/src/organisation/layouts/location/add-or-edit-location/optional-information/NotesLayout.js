import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../../../common/components/gov-uk/TextArea'
import { setCurrentLocationNotes } from '../../../../../common/redux/userSlice'

export default function NotesLayout({ flow, navigateToNextPage }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentNotes = useSelector(
    (state) => state.session.currentLocation.meta_data.location_additional.notes
  )
  const [notes, setNotes] = useState(currentNotes ? currentNotes : '')
  const [error, setError] = useState('')
  const charLimit = 200

  useEffect(() => {
    if (notes.length > charLimit) {
      setError('You can enter up to 200 characters')
    } else {
      setError('')
    }
  }, [notes])

  const handleSubmit = () => {
    if (error) return

    if (notes) {
      dispatch(setCurrentLocationNotes(notes))
    }

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
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            {error && <ErrorSummary errorList={[error]} />}
            {flow === 'edit' && (
              <span class='govuk-caption-l'>Edit location</span>
            )}
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
                className='govuk-textarea'
              />
              <p className='govuk-hint'>You can enter up to 200 characters.</p>
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

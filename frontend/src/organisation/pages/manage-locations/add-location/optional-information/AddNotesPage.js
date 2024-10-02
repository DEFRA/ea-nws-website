import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackLink from '../../../../../common/components/custom/BackLink'
import OrganisationAccountNavigation from '../../../../../common/components/custom/OrganisationAccountNavigation'
import Button from '../../../../../common/components/gov-uk/Button'
import ErrorSummary from '../../../../../common/components/gov-uk/ErrorSummary'
import TextArea from '../../../../../common/components/gov-uk/TextArea'
import { setCurrentLocationNotes } from '../../../../../common/redux/userSlice'
export default function AddNotesPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const charLimit = 200
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (notes.length > charLimit) {
      setError('You can enter up to 200 characters')
    } else {
      setError('')
    }
  }, [notes])

  const handleButton = () => {
    if (error) return
    if (notes) {
      dispatch(setCurrentLocationNotes(notes))
    }
    navigate('/') // View Location page
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
                onClick={handleButton}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

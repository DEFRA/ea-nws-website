import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import BackLink from '../../../../../../common/components/custom/BackLink'

export default function ConfirmLocationPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const selectedLocation = useSelector(
    (state) => state.session.selectedLocation
  )

  const handleSubmit = () => {}

  const navigateBack = (event) => {
    event.preventDefault()
    navigate(-1)
  }

  return (
    <>
      <BackLink onClick={navigateBack} />
      <main className='govuk-main-wrapper govuk-!-padding-top-4'>
        <div className='govuk-grid-row'>
          <div className='govuk-grid-column-two-thirds'>
            <div class='govuk-grid-column-one-half'>
              <h1 className='govuk-heading-l'>Confirm Location</h1>
            </div>
            <div class='govuk-grid-column-one-half'>
              <p>govuk-grid-column-one-half</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

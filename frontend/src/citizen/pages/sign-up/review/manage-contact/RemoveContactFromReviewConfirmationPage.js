import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import ConfirmDeleteContactDetailsLayout from '../../../../layouts/contact-management/ConfirmDeleteContactDetailsLayout'

export default function RemoveContactFromReviewConfirmationPage () {
  const navigate = useNavigate()

  const navigateToNextPage = (type, contact) => {
    navigate('/signup/review', {
      state: {
        removedType: type,
        removedContact: contact
      }
    })
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <>
      <Helmet>
        <title>Are You Sure You want to Remove Contact - Get flood warnings - GOV.UK</title>
      </Helmet>
      <ConfirmDeleteContactDetailsLayout
        navigateToNextPage={() => navigateToNextPage()}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}

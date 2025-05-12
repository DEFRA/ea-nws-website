import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import AddLandlineLayout from '../../../layouts/landline/AddLandlineLayout'

export default function AddLandlinePhonePage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate('/managecontacts/validate-landline')
  }

  const NavigateToPreviousPage = () => {
    navigate('/managecontacts')
  }

  return (
    <>
      <Helmet>
        <title>Enter a Telephone Number - Next Warning Service GOV.UK</title>
      </Helmet>
      <AddLandlineLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}

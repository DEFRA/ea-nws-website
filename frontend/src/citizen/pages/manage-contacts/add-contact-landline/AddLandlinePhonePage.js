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
      <AddLandlineLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={NavigateToPreviousPage}
      />
    </>
  )
}

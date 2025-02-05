import { useNavigate } from 'react-router'
import AddNameLayout from '../../layouts/name/AddNameLayout'

export default function AddNamePage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => navigate('/organisation/sign-up/main-admin')

  const NavigateToPreviousPage = () => {
    navigate(-1)
  }

  return (
    <AddNameLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

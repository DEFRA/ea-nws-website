import { useNavigate } from 'react-router'
import MainAdminLayout from '../../../layouts/admin/MainAdminLayout'

export default function MainAdminPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/organisation/sign-up/admin-details')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up')
  }

  return (
    <MainAdminLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

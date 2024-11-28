import { useNavigate } from 'react-router'
import MainAdminLayout from '../../../layouts/admin/MainAdminLayout'

export default function MainAdminPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/sign-up/admin-details')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/sector')
  }

  return (
    <MainAdminLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

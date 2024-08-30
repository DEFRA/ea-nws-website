import { useNavigate } from 'react-router'
import MainAdminLayout from '../../../layouts/admin/MainAdminLayout'

export default function MainAdminPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    navigate('/organisation/register/admin-details')
  }

  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/sector')
  }

  return (
    <MainAdminLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

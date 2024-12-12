import { useNavigate } from 'react-router'
import AdminDetailsLayout from '../../../layouts/admin/AdminDetailsLayout'

export default function AdminDetailsPage () {
  const navigate = useNavigate()

  const navigateToNextPage = () => {
    navigate('/organisation/sign-up/admin-email-confirm')
  }
  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/main-admin')
  }

  return (
    <AdminDetailsLayout
      navigateToNextPage={navigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

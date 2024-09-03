import { useNavigate } from 'react-router'
import AdminDetailsLayout from '../../../layouts/admin/AdminDetailsLayout'

export default function AdminDetailsPage() {
  const navigate = useNavigate()

  const NavigateToNextPage = (adminDetails) => {
    navigate('/organisation/sign-up/admin-email-confirm')
  }
  const NavigateToPreviousPage = () => {
    navigate('/organisation/sign-up/main-admin')
  }

  return (
    <AdminDetailsLayout
      NavigateToNextPage={() => NavigateToNextPage()}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

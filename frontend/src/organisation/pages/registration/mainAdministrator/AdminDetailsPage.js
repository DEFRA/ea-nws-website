import { useNavigate } from 'react-router'
import AdminDetailsLayout from '../../../layouts/admin/AdminDetailsLayout'

export default function AdminDetailsPage () {
  const navigate = useNavigate()

  const NavigateToNextPage = (adminDetails) => {
    navigate('/organisation/register/admin-email-confirm')
  }
  const NavigateToPreviousPage = () => {
    navigate('/organisation/register/main-admin')
  }

  return (
    <AdminDetailsLayout
      NavigateToNextPage={() => NavigateToNextPage()}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

import { useNavigate } from 'react-router'
import AdminDetailsLayout from '../../layouts/admin/AdminDetailsLayout'

export default function AdminDetailsPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = (email) =>
    navigate('/organisation/register/admin-details', {
      state: {
        adminEmail: email
      }
    })
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

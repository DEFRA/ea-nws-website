import { useNavigate } from 'react-router'
import MainAdminLayout from '../../layouts/admin/MainAdminLayout'

export default function MainAdminPage() {
  const navigate = useNavigate()
  const NavigateToNextPage = (adminDetails) => {
    navigate('/organisation/register/admin-details', {
      state: {
        isAdmin: adminDetails
      }
    })
  }

  const NavigateToPreviousPage = (adminDetails) => {
    navigate('/organisation/register/sector')
  }

  return (
    <MainAdminLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
    />
  )
}

import { useNavigate } from 'react-router'
import AddEmailLayout from '../../../../../common-layouts/email/AddEmailLayout'

export default function AddEmailContactStartPage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/signup/review/validate-email')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/review')
  }

  return (
    <AddEmailLayout NavigateToNextPage={NavigateToNextPage} NavigateToPreviousPage={NavigateToPreviousPage} />
  )
}

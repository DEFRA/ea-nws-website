import { useNavigate } from 'react-router-dom'
import AddEmailLayout from '../../../layouts/email/AddEmailLayout'

export default function AddEmailPage () {
  const navigate = useNavigate()
  const navigateToNextPage = () => {
    navigate('/managecontacts/validate-email')
  }

  return (
    <>
      <AddEmailLayout navigateToNextPage={navigateToNextPage} />
    </>
  )
}

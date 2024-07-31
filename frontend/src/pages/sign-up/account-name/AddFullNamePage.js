import { useNavigate } from 'react-router'
import AddAccountNameLayout from '../../../common-layouts/account-name/AddAccountNameLayout'
import { useDispatch, useSelector } from 'react-redux'
import { updateAdditionals } from '../../../services/ProfileServices'
import { setProfile } from '../../../redux/userSlice'

export default function AddFullNamePage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session)

  const NavigateToNextPage = () => {
    const updatedProfile = updateAdditionals(session.profile, [{ id: 'lastAccessedUrl', value: '/declaration' }])
    dispatch(setProfile(updatedProfile))
    navigate('/declaration')
  }

  const NavigateToPreviousPage = () => {
    navigate('/signup/contactpreferences')
  }

  return (
    <AddAccountNameLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={NavigateToPreviousPage}
      buttonText='Continue'
    />
  )
}

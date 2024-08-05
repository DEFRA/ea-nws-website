import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addContactPreference } from '../../../../../../common/redux/userSlice'
import ValidateLandlineLayout from '../../../../../layouts/landline/ValidateLandlineLayout'

export default function ValidateLandlineContactPage () {
  const dispatch = useDispatch()

  const contactPreferences = useSelector(
    (state) => state.session.contactPreferences
  )
  const navigate = useNavigate()

  const NavigateToNextPage = () => {
    if (!contactPreferences.includes('PhoneCall')) {
      dispatch(addContactPreference('PhoneCall'))
    }
    navigate('/signup/review')
  }
  const SkipValidation = () => {
    navigate('/signup/review')
  }
  const DifferentHomePhone = () => {
    navigate('/signup/review/add-landline')
  }

  return (
    <ValidateLandlineLayout
      NavigateToNextPage={NavigateToNextPage}
      NavigateToPreviousPage={DifferentHomePhone}
      SkipValidation={SkipValidation}
      DifferentHomePhone={DifferentHomePhone}
    />
  )
}

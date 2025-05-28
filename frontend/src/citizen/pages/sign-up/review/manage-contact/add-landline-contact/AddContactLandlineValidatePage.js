import { Helmet } from 'react-helmet'
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

  const navigateToNextPage = () => {
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
    <>
      <Helmet>
        <title>Confirm your telephone number - Get flood warnings - GOV.UK</title>
      </Helmet>
      <ValidateLandlineLayout
        navigateToNextPage={navigateToNextPage}
        NavigateToPreviousPage={DifferentHomePhone}
        SkipValidation={SkipValidation}
        DifferentHomePhone={DifferentHomePhone}
      />
    </>
  )
}

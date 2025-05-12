import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addContactPreference } from '../../../../../../common/redux/userSlice'
import ValidateLandlineLayout from '../../../../../layouts/landline/ValidateLandlineLayout'
import { Helmet } from 'react-helmet'

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
        <title>Confirm Your Telephone Number - Next Warning Service GOV.UK</title>
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

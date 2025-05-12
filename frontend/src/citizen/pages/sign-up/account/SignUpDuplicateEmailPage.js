import { Helmet } from 'react-helmet'
import SignUpDuplicateEmailPageLayout from '../../../../common/layouts/sign-up/SignUpDuplicateEmailPageLayout'

export default function SignUpDuplicateEmailPage () {
  return (
    <>
      <Helmet>
        <title>Email Address in Use - Next Warning Service GOV.UK</title>
      </Helmet>
      <SignUpDuplicateEmailPageLayout />
    </>
  )
}

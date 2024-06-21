
import { useNavigate } from "react-router";
import AddMobileLayout from "../../../common-layouts/mobile/AddMobileLayout";

export default function AddMobilePage () {
  const navigate = useNavigate()
  const NavigateToNextPage = () => {
    navigate('/managecontacts/validate-mobile')
  }

  return (
    <AddMobileLayout NavigateToNextPage={NavigateToNextPage} />
  )
}

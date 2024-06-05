import Modal from 'react-bootstrap/Modal'

export default function WarningOverlay() {
  console.log('IN WARNING')
  const show = true
  //const navigate = useNavigate()
  //change the redirect to close the dialog box
  //const [isDialogOpen, setIsDialogOpen] = useState(true)
  const handleClose = () => {
    //setIsDialogOpen(false)
    console.log('in handleClose')
    //navigate(-1)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Modal.Body>HEILLASj</Modal.Body>
      </Modal>
    </>
  )
}

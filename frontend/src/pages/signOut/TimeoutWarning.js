import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '../../gov-uk-components/Button'

export default function TimeOutWarning(isOpen) {
  const handleButton = () => {
    console.log('This is buttoned')
  }
  const handleclick = () => {
    console.log('one two three')
  }
  const handleClose = () => {
    isOpen = false
  }
  console.log('Show: ', isOpen)
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h1 class="govuk-heading-xl">youre about to be signed out</h1>
            <p class="govuk-body">
              for secuirty reasons we will sign you out in 2 minuets
            </p>
            <Button
              text="Stay signed in"
              className="govuk-button"
              onClick={handleclick}
            />
            <p class="govuk-body">
              <a href="signout/manually" class="govuk-link">
                Sign out
              </a>
              .
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

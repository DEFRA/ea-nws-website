import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import React from 'react'

export default function TimeOutWarning(isOpen) {
  const handleButton = () => {
    console.log('This is buttoned')
  }
  const handleClose = () => {
    isOpen = false
  }
  console.log('Show: ', isOpen)
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is a test
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

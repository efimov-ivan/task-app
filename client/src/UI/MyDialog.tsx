import React from "react"
import {Dialog} from '@mui/material'

type MyDialogProps = {
  open: boolean,
  handleClose: () => void,
  children: React.ReactNode
}

const MyDialog: React.FC<MyDialogProps> = ({open, handleClose, children}) => {
  return (
    <Dialog
      className="modal"
      open={open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      {children}
    </Dialog>
  );
}

export default MyDialog

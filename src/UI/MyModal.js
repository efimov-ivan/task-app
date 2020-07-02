import React from "react";
import Dialog from '@material-ui/core/Dialog';

function MyModal(props) {
  return (
    <Dialog
      className="modal"
      open={props.open}
      onClose={props.handleClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      {props.children}
    </Dialog>
  );
}

export default MyModal

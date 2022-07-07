import React from "react";
import Dialog from '@mui/material/Dialog';

export function ModalWindow(props) {
  const { onClose, open, children, size } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={size}
      sx={{zIndex: 99}}
    >
      {children}
    </Dialog>
  )
}
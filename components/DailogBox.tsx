"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { handleDialogClose, handleExecute } from "@/store/slices/dialogSlice";

export default function AlertDialog() {
  const dispatch = useDispatch();
  const { open, message } = useSelector((state: RootState) => state.dialog);

  return (
    <Dialog
      open={open}
      onClose={() => dispatch(handleDialogClose())}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogActions>
        <Button onClick={() => dispatch(handleDialogClose())}>No</Button>
        <Button
          onClick={async () => {
            dispatch(handleExecute()); // ✅ Works with or without index
            dispatch(handleDialogClose());
          }}
          autoFocus
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

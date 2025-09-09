"use client";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert, SlideProps, Slide } from "@mui/material";
import { hideAlert } from "../store/slices/alertSlice";
import { RootState } from "../store/store";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const AlertNotification = () => {
  const dispatch = useDispatch();
  const { message, severity, open } = useSelector(
    (state: RootState) => state.alert
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideAlert())}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      slots={{ transition: SlideTransition }}
      sx={{ fontSize: "26px" }}
    >
      <Alert
        onClose={() => dispatch(hideAlert())}
        severity={severity}
        sx={{
          width: "100%",
          fontSize: "1.2rem", // Increase font size
          display: "flex",
          alignItems: "center",
        }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;

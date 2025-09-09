"use client";
import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        //bgcolor: "#0A0F24",
        // backgroundImage: "radial-gradient(circle, #182848, #0A0F24)",
        color: "white",
        position: "absolute",
      }}
    >
      {/* Wrapping CircularProgress inside a motion.div for animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <CircularProgress size={60} sx={{ color: "#00DFFC", mb: 2 }} />
      </motion.div>

      <Typography
        component={motion.p}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
      >
        Loading...
      </Typography>
    </Box>
  );
}

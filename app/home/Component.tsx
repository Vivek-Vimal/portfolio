"use client";
import { Box } from "@mui/material";
import React from "react";
import RotateText from "../rotating/page";

const MainComponent: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 8rem)",
        width: "100%",
        background:
          "radial-gradient(circle at center, #001122 0%, #000000 100%)",
        overflow: "hidden",
      }}
    >
      <RotateText />
    </Box>
  );
};

export default MainComponent;

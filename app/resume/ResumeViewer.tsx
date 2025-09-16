import React from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants, cyberColors, floatingEffect, itemVariants } from "../dashboard/Dashboard";
import { Code, Terminal, DataArray, DeveloperMode } from "@mui/icons-material";

  const techIcons = [
    { icon: <Code />, tooltip: "React/Next.js" },
    { icon: <Terminal />, tooltip: "JavaScript" },
    { icon: <DataArray />, tooltip: "Redux/Context" },
    { icon: <DeveloperMode />, tooltip: "TypeScript" },
  ];

export default function PdfViewer() {

  return (
    <Box
      sx={{

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}

    >
        
    <motion.div
      variants={floatingEffect}
      animate="animate"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
       component="a"
            href="/ReactVivekVimalResume.pdf"
            download
            aria-label="download"
        variant="outlined"
        size="large"
        sx={{
          mt: 4,
          color: cyberColors.accent,
          borderColor: cyberColors.accent,
          "&:hover": {
            borderColor: cyberColors.secondary,
            color: cyberColors.secondary,
            boxShadow: `0 0 15px ${cyberColors.secondary}`,
          },
        }}
      >
        Download
      </Button>
    </motion.div>

    <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              mb: 2,
              gap: 4,
            }}
            component={motion.div}
            variants={containerVariants}
          >
            {techIcons.map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.2,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Tooltip title={tech.tooltip} arrow>
                  <IconButton
                    sx={{
                      color: cyberColors.secondary,
                      fontSize: "2.5rem",
                      "&:hover": {
                        color: cyberColors.accent,
                      },
                    }}
                  >
                    {tech.icon}
                  </IconButton>
                </Tooltip>
              </motion.div>
            ))}
          </Box> 
    </Box>
  );
}

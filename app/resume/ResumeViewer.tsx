import React from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { cyberColors } from "../dashboard/Dashboard";
import { Code, Terminal, DataArray, DeveloperMode, PlayArrow } from "@mui/icons-material";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

 const floatingEffect = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.8, 0.4, 1],
    },
  },
};

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
      {/* <Button
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
      </Button> */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<PlayArrow />}
                             component="a"
            href="/ReactVivekVimalResume.pdf"
            download
            aria-label="download"
                          sx={{
                            background: `linear-gradient(45deg, ${cyberColors.matrixGreen}, ${cyberColors.neonBlue})`,
                            fontFamily: "'Orbitron', sans-serif",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            borderRadius: "8px",
                            padding: { xs: "8px 20px", md: "10px 24px" },
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            boxShadow: `0 0 20px ${cyberColors.matrixGreen}`,
                            '&:hover': {
                              background: `linear-gradient(45deg, ${cyberColors.neonBlue}, ${cyberColors.matrixGreen})`,
                              boxShadow: `0 0 30px ${cyberColors.matrixGreen}`,
                            },
                            color:"#000"
                          }}
                        >
                          DOWNLOAD DATAPACK
                        </Button>
                      </motion.div>
                    </Box>
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

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CodeIcon from "@mui/icons-material/Code";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { cyberColors } from "./Dashboard";
import React from "react";

const projectVideos = [
  {
    title: "Literacy Track",
    videoUrl: "https://www.youtube.com/embed/jul2SRQkvz4",
    description:
      "An interactive learning platform with real-time progress tracking",
    technologies: ["React", "Material UI", "Axios", "Context Api"],
    year: "2023",
  },
  {
    title: "AI-Powered Web App",
    videoUrl: "https://www.youtube.com/embed/L0MJJcXaSbg",
    description: "Database application for predictive analytics",
    technologies: ["Next.js", "Axios", "Sql Editor", "TypeScript"],
    year: "2025",
  },
  {
    title: "Form Builder",
    videoUrl: "https://www.youtube.com/embed/705vAv7z-_4",
    description: "Drag-and-drop form builder with custom validation",
    technologies: ["TypeScript", "React", "Redux", "Material UI"],
    year: "2024",
  },
];

const ProjectVideos = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    title: string;
    videoUrl: string;
    description: string;
    technologies: string[];
    year: string;
  } | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleOpen = (video: (typeof projectVideos)[0], index: number) => {
    const card = cardRefs.current[index];
    if (card) {
      const rect = card.getBoundingClientRect();
      setOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setSelectedVideo(video);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    hover: {
      y: isMobile ? 0 : -10,
      scale: isMobile ? 1 : 1.03,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Container
      sx={{ py: isMobile ? 2 : 4 }}
      ref={containerRef}
      component={motion.div}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
        {projectVideos.map((project, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={index}
            sx={{
              // Adjust card size on very small screens
              maxWidth: isSmallMobile ? "100%" : undefined
            }}
          >
            <motion.div
              variants={itemVariants}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              whileHover="hover"
            >
              <Card
                sx={{
                  p: isMobile ? 1 : 2,
                  background: "rgba(0, 240, 255, 0.05)",
                  border: "1px solid rgba(0, 240, 255, 0.3)",
                  borderRadius: "8px",
                  height: "100%",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: `0 0 20px ${cyberColors.secondary}`,
                    "&::before": {
                      opacity: 0.3,
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${cyberColors.primary}, ${cyberColors.secondary})`,
                    opacity: 0.1,
                    transition: "opacity 0.3s ease",
                  },
                }}
                onClick={() => handleOpen(project, index)}
              >
                <CardContent sx={{ p: isMobile ? 1 : 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: isMobile ? 1 : 2,
                    }}
                  >
                    <PlayCircleOutlineIcon
                      sx={{
                        color: cyberColors.secondary,
                        mr: 1,
                        fontSize: isMobile ? "1.5rem" : "2rem",
                      }}
                    />
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      sx={{
                        color: cyberColors.secondary,
                        textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                        fontSize: isMobile ? "1rem" : "1.25rem",
                      }}
                    >
                      {project.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="rgba(255, 255, 255, 0.8)"
                    sx={{ 
                      mb: isMobile ? 1 : 2,
                      fontSize: isMobile ? "0.8rem" : "0.9rem"
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: 0.5,
                    mt: isMobile ? 1 : 2
                  }}>
                    {project.technologies.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        sx={{
                          background: "rgba(0, 240, 255, 0.1)",
                          color: cyberColors.secondary,
                          border: "1px solid rgba(0, 240, 255, 0.3)",
                          fontSize: isMobile ? "0.6rem" : "0.7rem",
                          height: isMobile ? 24 : 28,
                        }}
                      />
                    ))}
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <StarBorderIcon
                      sx={{
                        color: cyberColors.accent,
                        fontSize: isMobile ? "0.8rem" : "1rem",
                        mr: 0.5,
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="rgba(255, 255, 255, 0.6)"
                      sx={{ fontSize: isMobile ? "0.6rem" : "0.7rem" }}
                    >
                      {project.year}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <AnimatePresence>
        {open && (
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            PaperComponent={React.Fragment}
            BackdropProps={{
              style: {
                backgroundColor: "rgba(0,0,0,0.95)",
              },
            }}
          >
            <motion.div
              initial={{
                scale: isMobile ? 0.5 : 0.2,
                opacity: 0,
                x: origin.x - window.innerWidth / 2,
                y: origin.y - window.innerHeight / 2,
                borderRadius: 16,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0,
                borderRadius: 0,
                transition: {
                  duration: isMobile ? 0.4 : 0.6,
                  ease: [0.2, 0.8, 0.4, 1],
                },
              }}
              exit={{
                scale: isMobile ? 0.5 : 0.2,
                opacity: 0,
                x: origin.x - window.innerWidth / 2,
                y: origin.y - window.innerHeight / 2,
                borderRadius: 16,
                transition: {
                  duration: 0.4,
                  ease: "easeInOut",
                },
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <DialogContent
                sx={{
                  position: "relative",
                  p: isMobile ? 1 : 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  maxWidth: "1200px",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{
                    position: "absolute",
                    top: isMobile ? 8 : 20,
                    right: isMobile ? 8 : 20,
                    color: cyberColors.secondary,
                    zIndex: 10,
                    "&:hover": {
                      color: cyberColors.accent,
                      transform: "scale(1.2)",
                    },
                    transition: "all 0.3s ease",
                  }}
                  component={motion.div}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <CloseIcon sx={{ fontSize: isMobile ? 24 : 32 }} />
                </IconButton>
                {selectedVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 0.3 },
                    }}
                    exit={{ opacity: 0 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      padding: isMobile ? "40px 0 0 0" : 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        mb: isMobile ? 2 : 4,
                        textAlign: "center",
                        px: isMobile ? 1 : 0,
                      }}
                    >
                      <Typography
                        variant={isMobile ? "h5" : "h4"}
                        color={cyberColors.secondary}
                        gutterBottom
                        sx={{
                          mb: isMobile ? 1 : 2,
                          textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                          fontSize: isMobile ? "1.5rem" : "2rem",
                        }}
                      >
                        {selectedVideo.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="rgba(255, 255, 255, 0.8)"
                        sx={{ 
                          mb: isMobile ? 1.5 : 3,
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          px: isMobile ? 1 : 0,
                        }}
                      >
                        {selectedVideo.description}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          gap: isMobile ? 1 : 2,
                          mb: isMobile ? 1.5 : 3,
                        }}
                      >
                        {selectedVideo.technologies.map((tech, i) => (
                          <Chip
                            key={i}
                            label={tech}
                            icon={
                              <CodeIcon
                                sx={{
                                  color: cyberColors.secondary,
                                  fontSize: isMobile ? "0.8rem" : "1rem",
                                }}
                              />
                            }
                            sx={{
                              background: "rgba(0, 240, 255, 0.1)",
                              color: cyberColors.secondary,
                              border: "1px solid rgba(0, 240, 255, 0.3)",
                              fontSize: isMobile ? "0.7rem" : "0.8rem",
                              height: isMobile ? 28 : 32,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: { delay: 0.5 },
                      }}
                      style={{
                        width: "100%",
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        padding: isMobile ? "0 8px" : 0,
                      }}
                    >
                      <Box
                        component="iframe"
                        src={selectedVideo.videoUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sx={{
                          width: "100%",
                          height: "100%",
                          maxHeight: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 200px)",
                          borderRadius: 2,
                          boxShadow: `0 0 30px ${cyberColors.secondary}`,
                          border: `1px solid ${cyberColors.secondary}`,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ProjectVideos;
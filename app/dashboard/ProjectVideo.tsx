"use client";

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
  Button,
  LinearProgress,
  alpha,
} from "@mui/material";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Close as CloseIcon,
  PlayCircleOutline as PlayCircleOutlineIcon,
  Code as CodeIcon,
  StarBorder as StarBorderIcon,
  AutoAwesome,
  RocketLaunch,
  Terminal,
  Download,
  Share,
  NetworkCheck,
  Speed,
  Memory,
  DataThresholding,
} from "@mui/icons-material";
import { cyberColors } from "./Dashboard";
import React from "react";

const projectVideos = [
  {
    title: "LITERACY TRACK",
    videoUrl: "https://www.youtube.com/embed/jul2SRQkvz4",
    description:
      "Advanced interactive learning platform with AI-powered real-time progress tracking and adaptive curriculum",
    technologies: ["React 18", "Material UI", "Pagination", "Models", "Dashboard"],
    year: "2023",
    category: "EDUCATION TECH",
    stats: {
      performance: 95,
      accessibility: 98,
      engagement: 92,
    },
    features: ["AI Tutor", "Real-time Analytics", "Accountibility", "Multi-language"],
  },
  {
    title: "QUANTUM ANALYTICS",
    videoUrl: "https://www.youtube.com/embed/L0MJJcXaSbg",
    description: "Quantum-inspired database application for predictive analytics and machine learning",
    technologies: ["Next.js 14", "Re-Size", "REST", "Integration", "Framer-Motion"],
    year: "2025",
    category: "AI/ML",
    stats: {
      performance: 98,
      accessibility: 90,
      engagement: 94,
    },
    features: ["Quantum Algorithms", "3D Visualization", "Real-time Processing", "SQL Queries"],
  },
  {
    title: "FORM MATRIX",
    videoUrl: "https://www.youtube.com/embed/705vAv7z-_4",
    description: "Drag-and-drop form builder with advanced validation and real-time collaboration",
    technologies: ["TypeScript", "React-DND", "Rule Integration", "Business Logic", "Storybook"],
    year: "2024",
    category: "DEVELOPER TOOLS",
    stats: {
      performance: 96,
      accessibility: 95,
      engagement: 90,
    },
    features: ["Real-time Collab", "Rule Implementation", "Custom Validators", "Form Creation"],
  },
];

const ProjectVideos = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<(typeof projectVideos)[0] | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    controls.start("visible");
    
    // Create particle systems for each card
    const systems = projectVideos.map((_, index) => {
      const particles = createParticles(index);
      return particles;
    });

    return () => {
      systems.forEach(particles => {
        particles.forEach(particle => particle.remove());
      });
    };
  }, [controls]);

  const createParticles = (cardIndex: number): HTMLDivElement[] => {
    const particles: HTMLDivElement[] = [];
    const card = cardRefs.current[cardIndex];
    if (!card) return particles;

    const particleCount = 15;
    const hue = cardIndex * 120; // Different color for each card

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        border-radius: 50%;
        background: radial-gradient(circle, 
          hsl(${hue}, 100%, 70%), 
          hsl(${(hue + 60) % 360}, 100%, 50%),
          transparent
        );
        filter: blur(1px);
        opacity: 0;
        pointer-events: none;
        z-index: 1;
      `;

      // Set random start position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      card.appendChild(particle);
      particles.push(particle);
    }

    return particles;
  };

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
    hidden: { opacity: 0, y: 30, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1],
      },
    },
    hover: {
      y: isMobile ? 0 : -15,
      scale: isMobile ? 1.02 : 1.05,
      rotateY: 5,
      transition: { duration: 0.3 },
    },
  };

  return (
    <Container
      sx={{ 
        py: 4,
        position: "relative",
        overflow: "hidden",
      }}
      ref={containerRef}
      component={motion.div}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Background Grid */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(90deg, ${alpha(cyberColors.electricBlue, 0.02)} 1px, transparent 1px),
            linear-gradient(${alpha(cyberColors.electricBlue, 0.02)} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
          opacity: 0.3,
        }}
      />

      <Typography
        variant={isMobile ? "h4" : "h3"}
        sx={{
          textAlign: "center",
          mb: isMobile ? 4 : 6,
          color: cyberColors.electricBlue,
          fontFamily: "'Orbitron', monospace",
          fontWeight: 900,
          textShadow: `0 0 20px ${cyberColors.electricBlue}`,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -10,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100px",
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${cyberColors.electricBlue}, transparent)`,
          },
        }}
      >
        <AutoAwesome sx={{ verticalAlign: "middle", mr: 2, fontSize: "inherit" }} />
        PROJECT MATRIX
        <AutoAwesome sx={{ verticalAlign: "middle", ml: 2, fontSize: "inherit" }} />
      </Typography>

      <Grid 
        container 
        spacing={isMobile ? 3 : 4}
        justifyContent="center"
        alignItems="stretch"
      >
        {projectVideos.map((project, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            lg={4} 
            key={index}
            sx={{
              maxWidth: isSmallMobile ? "100%" : undefined,
              display: "flex",
            }}
          >
            <motion.div
              variants={itemVariants}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              whileHover="hover"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              <Card
                sx={{
                  position: "relative",
                  background: `
                    linear-gradient(135deg, 
                      ${alpha(cyberColors.cardBg, 0.9)} 0%,
                      ${alpha(cyberColors.deepSpace, 0.9)} 100%
                    )`,
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${alpha(cyberColors.electricBlue, 0.3)}`,
                  borderRadius: "20px",
                  padding: isMobile ? 2 : 3,
                  width: "100%",
                  cursor: "pointer",
                  overflow: "visible",
                  display: "flex",
                  flexDirection: "column",
                  transformStyle: "preserve-3d",
                  boxShadow: hoveredIndex === index 
                    ? `0 25px 50px ${alpha(cyberColors.electricBlue, 0.3)},
                       0 0 100px ${alpha(cyberColors.neonPink, 0.2)},
                       inset 0 1px 0 ${alpha(cyberColors.electricBlue, 0.1)}`
                    : `0 10px 30px ${alpha(cyberColors.darkBg, 0.5)},
                       inset 0 1px 0 ${alpha(cyberColors.electricBlue, 0.05)}`,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 2,
                    left: 2,
                    right: 2,
                    bottom: 2,
                    borderRadius: "18px",
                    border: `1px solid ${alpha(cyberColors.electricBlue, 0.1)}`,
                    pointerEvents: "none",
                  },
                }}
                onClick={() => handleOpen(project, index)}
              >
                {/* Holographic Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                      linear-gradient(0deg, 
                        transparent 0%, 
                        ${alpha(cyberColors.electricBlue, 0.05)} 2px, 
                        transparent 4px
                      ),
                      linear-gradient(90deg, 
                        transparent 0%, 
                        ${alpha(cyberColors.neonPink, 0.03)} 2px, 
                        transparent 4px
                      )`,
                    backgroundSize: "30px 30px",
                    opacity: 0.3,
                    pointerEvents: "none",
                  }}
                />

                {/* Category Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 2,
                  }}
                >
                  <Chip
                    label={project.category}
                    size="small"
                    icon={<Terminal fontSize="small" />}
                    sx={{
                      background: `linear-gradient(135deg, 
                        ${alpha(cyberColors.techPurple, 0.3)}, 
                        ${alpha(cyberColors.electricBlue, 0.3)}
                      )`,
                      color: cyberColors.electricBlue,
                      border: `1px solid ${alpha(cyberColors.electricBlue, 0.5)}`,
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: "bold",
                      fontSize: "0.7rem",
                      backdropFilter: "blur(10px)",
                      boxShadow: `0 0 15px ${alpha(cyberColors.electricBlue, 0.3)}`,
                    }}
                  />
                </Box>

                <CardContent 
                  sx={{ 
                    p: 0,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Title Section */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      mt: 6,
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        mr: 2,
                      }}
                    >
                      <PlayCircleOutlineIcon
                        sx={{
                          color: cyberColors.electricBlue,
                          fontSize: isMobile ? "2rem" : "2.5rem",
                          filter: `drop-shadow(0 0 10px ${cyberColors.electricBlue})`,
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: `radial-gradient(circle, ${alpha(cyberColors.electricBlue, 0.3)}, transparent 70%)`,
                          animation: "pulse 2s infinite",
                        }}
                      />
                    </Box>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      sx={{
                        color: cyberColors.electricBlue,
                        fontFamily: "'Orbitron', monospace",
                        fontWeight: "bold",
                        fontSize: isMobile ? "1.1rem" : "1.3rem",
                        background: `linear-gradient(45deg, 
                          ${cyberColors.electricBlue}, 
                          ${cyberColors.neonPink},
                          ${cyberColors.matrixGreen}
                        )`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: `0 0 20px ${alpha(cyberColors.electricBlue, 0.5)}`,
                      }}
                    >
                      {project.title}
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: alpha(cyberColors.text, 0.9),
                      mb: 3,
                      fontSize: isMobile ? "0.85rem" : "0.9rem",
                      lineHeight: 1.6,
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* Tech Stack */}
                  <Box sx={{ mt: "auto" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: cyberColors.matrixGreen,
                        fontFamily: "'Orbitron', monospace",
                        mb: 1,
                        display: "block",
                      }}
                    >
                      <CodeIcon sx={{ fontSize: "1rem", verticalAlign: "middle", mr: 0.5 }} />
                      TECH STACK
                    </Typography>
                    <Box sx={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      gap: 1,
                    }}>
                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Chip
                            label={tech}
                            size="small"
                            sx={{
                              background: `linear-gradient(135deg, 
                                ${alpha(cyberColors.techPurple, 0.1)}, 
                                ${alpha(cyberColors.electricBlue, 0.1)}
                              )`,
                              color: cyberColors.electricBlue,
                              border: `1px solid ${alpha(cyberColors.electricBlue, 0.3)}`,
                              fontFamily: "'Courier New', monospace",
                              fontSize: "0.7rem",
                              fontWeight: "bold",
                              backdropFilter: "blur(5px)",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background: `linear-gradient(135deg, 
                                  ${alpha(cyberColors.techPurple, 0.2)}, 
                                  ${alpha(cyberColors.electricBlue, 0.2)}
                                )`,
                                boxShadow: `0 0 15px ${alpha(cyberColors.electricBlue, 0.3)}`,
                              },
                            }}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  </Box>

                  {/* Stats & Footer */}
                  <Box
                    sx={{
                      mt: 3,
                      pt: 2,
                      borderTop: `1px solid ${alpha(cyberColors.electricBlue, 0.2)}`,
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <StarBorderIcon
                          sx={{
                            color: cyberColors.cyberYellow,
                            fontSize: "1rem",
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: cyberColors.cyberYellow,
                            fontFamily: "'Orbitron', monospace",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                          }}
                        >
                          {project.year}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Speed sx={{ fontSize: "1rem", color: cyberColors.matrixGreen }} />
                        <Typography
                          variant="caption"
                          sx={{
                            color: cyberColors.matrixGreen,
                            fontFamily: "'Orbitron', monospace",
                            fontSize: "0.8rem",
                          }}
                        >
                          {project.stats.performance}% OPTIMAL
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>

                {/* 3D Corner Accents */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "40px",
                    height: "40px",
                    borderTop: `2px solid ${cyberColors.electricBlue}`,
                    borderLeft: `2px solid ${cyberColors.electricBlue}`,
                    borderTopLeftRadius: "20px",
                    boxShadow: `0 0 15px ${cyberColors.electricBlue}`,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "40px",
                    height: "40px",
                    borderBottom: `2px solid ${cyberColors.neonPink}`,
                    borderRight: `2px solid ${cyberColors.neonPink}`,
                    borderBottomRightRadius: "20px",
                    boxShadow: `0 0 15px ${cyberColors.neonPink}`,
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Advanced Dialog */}
      <AnimatePresence>
        {open && selectedVideo && (
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            PaperComponent={React.Fragment}
            BackdropProps={{
              style: {
                backgroundColor: "rgba(0,0,0,0.98)",
              },
            }}
          >
            <motion.div
              initial={{
                scale: 0.3,
                opacity: 0,
                x: origin.x - window.innerWidth / 2,
                y: origin.y - window.innerHeight / 2,
                borderRadius: 20,
                rotateX: 90,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                x: 0,
                y: 0,
                borderRadius: 0,
                rotateX: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.2, 0.8, 0.4, 1],
                },
              }}
              exit={{
                scale: 0.3,
                opacity: 0,
                x: origin.x - window.innerWidth / 2,
                y: origin.y - window.innerHeight / 2,
                borderRadius: 20,
                rotateX: -90,
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  linear-gradient(135deg, 
                    ${alpha(cyberColors.deepSpace, 0.95)} 0%,
                    ${alpha(cyberColors.darkBg, 0.98)} 100%
                  )`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Neural Network Background */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(circle at 20% 30%, ${alpha(cyberColors.techPurple, 0.1)} 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, ${alpha(cyberColors.electricBlue, 0.1)} 0%, transparent 50%)
                  `,
                  pointerEvents: "none",
                }}
              />

              <DialogContent
                sx={{
                  position: "relative",
                  p: isMobile ? 2 : 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  maxWidth: "1400px",
                  width: "100%",
                }}
              >
                {/* Close Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <IconButton
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      top: isMobile ? 16 : 32,
                      right: isMobile ? 16 : 32,
                      color: cyberColors.electricBlue,
                      zIndex: 10,
                      background: alpha(cyberColors.darkBg, 0.5),
                      border: `2px solid ${alpha(cyberColors.electricBlue, 0.3)}`,
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        color: cyberColors.neonPink,
                        background: alpha(cyberColors.neonPink, 0.1),
                        transform: "scale(1.2)",
                        boxShadow: `0 0 30px ${cyberColors.neonPink}`,
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CloseIcon sx={{ fontSize: isMobile ? 24 : 32 }} />
                  </IconButton>
                </motion.div>

                {/* Project Header */}
                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginBottom: isMobile ? 3 : 4,
                  }}
                >
                  <Typography
                    variant={isMobile ? "h3" : "h2"}
                    sx={{
                      color: cyberColors.electricBlue,
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: 900,
                      mb: 2,
                      textShadow: `0 0 30px ${cyberColors.electricBlue}`,
                      background: `linear-gradient(45deg, 
                        ${cyberColors.electricBlue}, 
                        ${cyberColors.neonPink},
                        ${cyberColors.matrixGreen}
                      )`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    <RocketLaunch sx={{ verticalAlign: "middle", mr: 2, fontSize: "inherit" }} />
                    {selectedVideo.title}
                    <RocketLaunch sx={{ verticalAlign: "middle", ml: 2, fontSize: "inherit" }} />
                  </Typography>

                  <Typography
                    variant={isMobile ? "body1" : "h6"}
                    sx={{
                      color: alpha(cyberColors.text, 0.9),
                      maxWidth: "800px",
                      mx: "auto",
                      mb: 3,
                      fontFamily: "'Exo 2', sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedVideo.description}
                  </Typography>
                </motion.div>

                <Grid container spacing={isMobile ? 2 : 4} sx={{ width: "100%", flex: 1 }}>
                  {/* Left Panel - Video & Stats */}
                  <Grid item xs={12} lg={8}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      style={{ height: "100%", display: "flex", flexDirection: "column" }}
                    >
                      {/* Video Container */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          flex: 1,
                          minHeight: isMobile ? "300px" : "400px",
                          mb: isMobile ? 3 : 4,
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
                            borderRadius: "20px",
                            border: `2px solid ${alpha(cyberColors.electricBlue, 0.5)}`,
                            boxShadow: `
                              0 0 50px ${alpha(cyberColors.electricBlue, 0.3)},
                              inset 0 0 30px ${alpha(cyberColors.electricBlue, 0.1)}
                            `,
                            backdropFilter: "blur(10px)",
                          }}
                        />
                        
                        {/* Video Overlay Effects */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            pointerEvents: "none",
                            background: `
                              linear-gradient(45deg, 
                                transparent 45%, 
                                ${alpha(cyberColors.electricBlue, 0.1)} 50%, 
                                transparent 55%
                              )`,
                            backgroundSize: "200% 200%",
                            animation: "hologramShimmer 3s infinite linear",
                            borderRadius: "20px",
                          }}
                        />
                      </Box>

                      {/* Stats Panel */}
                      <Box
                        sx={{
                          p: 3,
                          background: alpha(cyberColors.cardBg, 0.7),
                          borderRadius: "16px",
                          border: `1px solid ${alpha(cyberColors.electricBlue, 0.2)}`,
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: cyberColors.matrixGreen,
                            fontFamily: "'Orbitron', monospace",
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <DataThresholding /> PERFORMANCE METRICS
                        </Typography>
                        
                        {Object.entries(selectedVideo.stats).map(([key, value]) => (
                          <Box key={key} sx={{ mb: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: cyberColors.electricBlue,
                                  fontFamily: "'Exo 2', sans-serif",
                                  textTransform: "uppercase",
                                  letterSpacing: "1px",
                                }}
                              >
                                {key}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: cyberColors.matrixGreen,
                                  fontFamily: "'Orbitron', monospace",
                                  fontWeight: "bold",
                                }}
                              >
                                {value}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={value}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                background: alpha(cyberColors.darkBg, 0.5),
                                "& .MuiLinearProgress-bar": {
                                  background: `linear-gradient(90deg, 
                                    ${cyberColors.electricBlue}, 
                                    ${cyberColors.matrixGreen}
                                  )`,
                                  borderRadius: 4,
                                },
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </motion.div>
                  </Grid>

                  {/* Right Panel - Details */}
                  <Grid item xs={12} lg={4}>
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      style={{ height: "100%", display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      {/* Tech Stack */}
                      <Box
                        sx={{
                          p: 3,
                          background: alpha(cyberColors.cardBg, 0.7),
                          borderRadius: "16px",
                          border: `1px solid ${alpha(cyberColors.techPurple, 0.2)}`,
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: cyberColors.techPurple,
                            fontFamily: "'Orbitron', monospace",
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Memory /> TECH ARCHITECTURE
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {selectedVideo.technologies.map((tech, i) => (
                            <Chip
                              key={i}
                              label={tech}
                              icon={<CodeIcon />}
                              sx={{
                                background: `linear-gradient(135deg, 
                                  ${alpha(cyberColors.techPurple, 0.2)}, 
                                  ${alpha(cyberColors.electricBlue, 0.2)}
                                )`,
                                color: cyberColors.electricBlue,
                                border: `1px solid ${alpha(cyberColors.techPurple, 0.3)}`,
                                fontFamily: "'Courier New', monospace",
                                fontWeight: "bold",
                                backdropFilter: "blur(5px)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  transform: "scale(1.05)",
                                  boxShadow: `0 0 20px ${alpha(cyberColors.techPurple, 0.3)}`,
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Features */}
                      <Box
                        sx={{
                          p: 3,
                          background: alpha(cyberColors.cardBg, 0.7),
                          borderRadius: "16px",
                          border: `1px solid ${alpha(cyberColors.neonPink, 0.2)}`,
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: cyberColors.neonPink,
                            fontFamily: "'Orbitron', monospace",
                            mb: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <AutoAwesome /> KEY FEATURES
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                          {selectedVideo.features.map((feature, i) => (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                p: 1.5,
                                background: alpha(cyberColors.deepSpace, 0.3),
                                borderRadius: "8px",
                                border: `1px solid ${alpha(cyberColors.neonPink, 0.1)}`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  background: alpha(cyberColors.neonPink, 0.1),
                                  transform: "translateX(5px)",
                                },
                              }}
                            >
                              <NetworkCheck sx={{ color: cyberColors.neonPink, fontSize: "1.2rem" }} />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: alpha(cyberColors.text, 0.9),
                                  fontFamily: "'Exo 2', sans-serif",
                                }}
                              >
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Action Buttons */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mt: "auto",
                        }}
                      >
                        <Button
                          variant="contained"
                          startIcon={<Download />}
                          fullWidth
                          sx={{
                            background: `linear-gradient(135deg, 
                              ${cyberColors.electricBlue}, 
                              ${cyberColors.techPurple}
                            )`,
                            color: "white",
                            fontFamily: "'Orbitron', monospace",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            py: 1.5,
                            boxShadow: `0 0 20px ${alpha(cyberColors.electricBlue, 0.5)}`,
                            "&:hover": {
                              background: `linear-gradient(135deg, 
                                ${cyberColors.techPurple}, 
                                ${cyberColors.electricBlue}
                              )`,
                              boxShadow: `0 0 30px ${alpha(cyberColors.electricBlue, 0.7)}`,
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          SOURCE CODE
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Share />}
                          fullWidth
                          sx={{
                            color: cyberColors.matrixGreen,
                            borderColor: cyberColors.matrixGreen,
                            fontFamily: "'Orbitron', monospace",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            py: 1.5,
                            "&:hover": {
                              background: alpha(cyberColors.matrixGreen, 0.1),
                              borderColor: cyberColors.matrixGreen,
                              boxShadow: `0 0 20px ${alpha(cyberColors.matrixGreen, 0.5)}`,
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          LIVE DEMO
                        </Button>
                      </Box>
                    </motion.div>
                  </Grid>
                </Grid>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ProjectVideos;
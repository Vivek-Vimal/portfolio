"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  keyframes,
  styled,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Code, Visibility, Terminal, Close } from "@mui/icons-material";

// Cyberpunk colors
const cyberColors = {
  primary: "#00f0ff",
  secondary: "#ff00ff",
  background: "#0a0a20",
  text: "#e0e0e0",
};

// Animations
const neonPulse = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 5px ${cyberColors.primary});
  }
  50% { 
    filter: drop-shadow(0 0 15px ${cyberColors.secondary});
  }
`;

const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
  }
  20%, 22%, 24%, 55% {
    opacity: 0.7;
  }
`;

const scanlines = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 10px; }
`;

const glitch = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

// Styled components
const CyberContainer = styled(Box)({
  minHeight: "100vh",
  background: "radial-gradient(circle at center, #0a0a20 0%, #000000 100%)",
  color: cyberColors.primary,
  position: "relative",
  overflow: "hidden",
  padding: "7rem 0 0 0",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(0deg, rgba(0,255,255,0.05) 1px, transparent 1px)",
    backgroundSize: "100% 5px",
    animation: `${scanlines} 1s linear infinite`,
    pointerEvents: "none",
    zIndex: 0,
  },
});

const Header = styled(Box)({
  padding: "3rem 2rem",
  borderBottom: "1px solid rgba(0,255,255,0.3)",
  boxShadow: "0 0 20px rgba(0,255,255,0.2)",
  position: "relative",
  zIndex: 1,
  backdropFilter: "blur(5px)",
  background: "rgba(0, 10, 20, 0.7)",
});

const ProjectCard = styled(Box)(
  ({ hue, active }: { hue: number; active?: boolean }) => ({
    position: "relative",
    background: `rgba(0, 20, 40, ${active ? 0.9 : 0.7})`,
    border: `1px solid hsl(${hue}, 100%, 50%)`,
    borderRadius: "8px",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.3s ease",
    transform: active ? "translateY(-5px)" : "none",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: `0 0 20px hsla(${hue}, 100%, 50%, 0.5)`,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "3px",
      background: `linear-gradient(90deg, transparent, hsl(${hue}, 100%, 50%), transparent)`,
      animation: active ? `${flicker} 3s infinite` : "none",
      opacity: active ? 1 : 0.7,
      transition: "opacity 0.3s ease",
    },
  })
);

const ProjectImage = styled(Box)({
  position: "relative",
  width: "100%",
  height: "200px",
  overflow: "hidden",
  "& img": {
    transition: "transform 0.5s ease",
  },
  "&:hover img": {
    transform: "scale(1.05)",
  },
});

const ProjectContent = styled(Box)({
  padding: "1.5rem",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const TechPill = styled(Chip)(({ hue }: { hue: number }) => ({
  backgroundColor: `hsla(${hue}, 100%, 50%, 0.1)`,
  border: `1px solid hsla(${hue}, 100%, 50%, 0.5)`,
  color: `hsl(${hue}, 100%, 80%)`,
  fontSize: "0.75rem",
  fontFamily: "'Courier New', monospace",
  margin: "0.25rem",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

const TerminalWindow = styled(Box)({
  background: "rgba(0, 10, 20, 0.9)",
  border: "1px solid #00ffff",
  borderRadius: "4px",
  padding: "1rem",
  fontFamily: "'Courier New', monospace",
  color: "#00ff00",
  // maxHeight: "300px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#00ffff",
    borderRadius: "2px",
  },
});

const ProjectDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    background: "rgba(0, 20, 40, 0.95)",
    border: "1px solid #00ffff",
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
    color: cyberColors.primary,
    maxWidth: "800px",
  },
});

const MyWorkPage = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "terminal">("grid");

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with payment integration and admin dashboard",
      longDescription:
        "Developed a complete e-commerce solution with React frontend and Node.js backend. Implemented Stripe payment processing, inventory management, and user authentication systems. Optimized for performance with lazy loading and code splitting.",
      image: "/projects/ecommerce.jpg",
      link: "https://example.com/ecommerce",
      repo: "https://github.com/yourusername/ecommerce",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
      hue: 180,
      features: [
        "Payment processing with Stripe API",
        "Admin dashboard with analytics",
        "Responsive design for all devices",
        "JWT authentication",
      ],
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management solution with real-time updates",
      longDescription:
        "Built a real-time task management application using Next.js and Firebase. Features include drag-and-drop interface, team collaboration, and notifications. Implemented offline-first capabilities with service workers.",
      image: "/projects/taskapp.jpg",
      link: "https://example.com/taskapp",
      repo: "https://github.com/yourusername/taskapp",
      technologies: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
      hue: 210,
      features: [
        "Real-time updates with Firebase",
        "Drag-and-drop interface",
        "Team collaboration",
        "Offline-first design",
      ],
    },
    {
      title: "Portfolio Website",
      description: "Interactive portfolio with 3D elements and animations",
      longDescription:
        "Created an immersive portfolio experience with Three.js for 3D elements and GSAP for animations. The site features a custom particle background, interactive 3D models, and smooth transitions between sections.",
      image: "/projects/portfolio.jpg",
      link: "https://example.com/portfolio",
      repo: "https://github.com/yourusername/portfolio",
      technologies: ["Three.js", "GSAP", "React", "WebGL"],
      hue: 240,
      features: [
        "Interactive 3D elements",
        "Custom particle animations",
        "Smooth page transitions",
        "Mobile-responsive design",
      ],
    },
    {
      title: "AI Chat Interface",
      description:
        "Conversational AI interface with natural language processing",
      longDescription:
        "Developed an AI-powered chat interface using OpenAI's API with a React frontend and Python backend. Implemented conversation history, sentiment analysis, and custom response formatting.",
      image: "/projects/aichat.jpg",
      link: "https://example.com/aichat",
      repo: "https://github.com/yourusername/aichat",
      technologies: ["Python", "React", "OpenAI API", "Flask"],
      hue: 270,
      features: [
        "Natural language processing",
        "Conversation history",
        "Sentiment analysis",
        "Custom response formatting",
      ],
    },
    {
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for analyzing large datasets",
      longDescription:
        "Built a data visualization platform with D3.js for complex charting and Express.js backend. The dashboard connects to PostgreSQL for data storage and features real-time updates, filtering, and export capabilities.",
      image: "/projects/dashboard.jpg",
      link: "https://example.com/dashboard",
      repo: "https://github.com/yourusername/dashboard",
      technologies: ["D3.js", "Express", "PostgreSQL", "TypeScript"],
      hue: 300,
      features: [
        "Interactive data visualizations",
        "Real-time data updates",
        "Advanced filtering options",
        "Data export functionality",
      ],
    },
    {
      title: "Mobile Fitness App",
      description: "Cross-platform fitness tracking application",
      longDescription:
        "Created a React Native fitness app with GraphQL API and MongoDB database. Features include workout tracking, progress visualization, social sharing, and personalized recommendations based on user activity.",
      image: "/projects/fitness.jpg",
      link: "https://example.com/fitness",
      repo: "https://github.com/yourusername/fitness",
      technologies: ["React Native", "GraphQL", "MongoDB", "Apollo"],
      hue: 330,
      features: [
        "Workout tracking",
        "Progress visualization",
        "Social sharing",
        "Personalized recommendations",
      ],
    },
  ];

  useEffect(() => {
    if (selectedProject !== null) {
      const project = projects[selectedProject];
      const commands = [
        `> INITIALIZING PROJECT_SCAN`,
        `> TARGET: ${project.title.toUpperCase()}`,
        `> TECHNOLOGIES: ${project.technologies.join(", ")}`,
        `> KEY FEATURES:`,
        ...project.features.map((feature) => `   - ${feature}`),
        `> STATUS: ONLINE`,
        `> ACCESS: ${project.link}`,
      ];

      let currentOutput: string[] = [];
      commands.forEach((command, i) => {
        setTimeout(() => {
          currentOutput = [...currentOutput, command];
          setTerminalOutput([...currentOutput]);
        }, i * 150);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject]);

  const handleProjectClick = (index: number) => {
    setSelectedProject(index);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  const renderTerminalPrompt = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#00ffff", mr: 1 }}>
          user@portfolio:~$
        </Typography>
        <Typography sx={{ color: "#00ff00" }}>
          {selectedProject !== null
            ? `scan_project --name=${projects[selectedProject].title}`
            : "select_project"}
        </Typography>
        <Box
          sx={{
            width: "10px",
            height: "16px",
            background: "#00ff00",
            ml: 1,
            animation: `${flicker} 1s infinite`,
          }}
        />
      </Box>
    );
  };

  return (
    <CyberContainer>
      <Header>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Courier New', monospace",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "3px",
                animation: `${neonPulse} 3s infinite alternate`,
                textShadow: "0 0 10px #00ffff",
              }}
            >
              PROJECT ARCHIVE
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: "'Courier New', monospace",
                color: cyberColors.secondary,
                mt: 1,
                textShadow: "0 0 5px #ff00ff",
              }}
            >
              SYSTEM_QUERY: PORTFOLIO_DATABASE
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Grid View">
              <IconButton
                onClick={() => setViewMode("grid")}
                sx={{
                  color: viewMode === "grid" ? "#ff00ff" : "#00ffff",
                  mr: 1,
                }}
              >
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Terminal View">
              <IconButton
                onClick={() => setViewMode("terminal")}
                sx={{ color: viewMode === "terminal" ? "#ff00ff" : "#00ffff" }}
              >
                <Terminal />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Header>

      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid container spacing={4}>
                {projects.map((project, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ProjectCard
                        hue={project.hue}
                        active={selectedProject === index}
                        onClick={() => handleProjectClick(index)}
                      >
                        <ProjectImage>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </ProjectImage>
                        <ProjectContent>
                          <Typography
                            variant="h5"
                            sx={{
                              fontFamily: "'Courier New', monospace",
                              color: `hsl(${project.hue}, 100%, 70%)`,
                              textShadow: `0 0 5px hsl(${project.hue}, 100%, 50%)`,
                              mb: 1,
                              textTransform: "uppercase",
                            }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "'Courier New', monospace",
                              color: "rgba(0, 240, 255, 0.8)",
                              mb: 2,
                              flex: 1,
                            }}
                          >
                            {project.description}
                          </Typography>
                          <Box sx={{ mb: 2 }}>
                            {project.technologies.map((tech, i) => (
                              <TechPill
                                key={i}
                                hue={project.hue + i * 10}
                                label={tech}
                              />
                            ))}
                          </Box>
                          <Box sx={{ display: "flex", gap: "1rem" }}>
                            <Button
                              variant="outlined"
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: cyberColors.primary,
                                borderColor: cyberColors.primary,
                                fontFamily: "'Courier New', monospace",
                                "&:hover": {
                                  borderColor: cyberColors.secondary,
                                  color: cyberColors.secondary,
                                  boxShadow: `0 0 10px ${cyberColors.secondary}`,
                                },
                                flex: 1,
                              }}
                              startIcon={<Visibility />}
                            >
                              DEMO
                            </Button>
                            <Button
                              variant="outlined"
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: cyberColors.secondary,
                                borderColor: cyberColors.secondary,
                                fontFamily: "'Courier New', monospace",
                                "&:hover": {
                                  borderColor: cyberColors.primary,
                                  color: cyberColors.primary,
                                  boxShadow: `0 0 10px ${cyberColors.primary}`,
                                },
                                flex: 1,
                              }}
                              startIcon={<Code />}
                            >
                              CODE
                            </Button>
                          </Box>
                        </ProjectContent>
                      </ProjectCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          ) : (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TerminalWindow>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#ff00ff",
                    mb: 2,
                    textShadow: "0 0 5px #ff00ff",
                  }}
                >
                  PROJECT TERMINAL INTERFACE
                </Typography>
                {renderTerminalPrompt()}
                <Box sx={{ mt: 2 }}>
                  {terminalOutput.map((line, i) => (
                    <Typography
                      key={i}
                      sx={{
                        fontFamily: "'Courier New', monospace",
                        color:
                          i === terminalOutput.length - 1
                            ? "#00ffff"
                            : "#00ff00",
                        lineHeight: "1.5",
                        animation:
                          i === terminalOutput.length - 1
                            ? `${glitch} 0.5s infinite`
                            : "none",
                      }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ color: "#00ffff", mb: 1 }}>
                    `&gt;` AVAILABLE PROJECTS:
                  </Typography>
                  <Grid container spacing={2}>
                    {projects.map((project, i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <Button
                          fullWidth
                          onClick={() => {
                            setSelectedProject(i);
                            setTerminalOutput([]);
                          }}
                          sx={{
                            justifyContent: "flex-start",
                            textAlign: "left",
                            color:
                              selectedProject === i ? "#ff00ff" : "#00ffff",
                            fontFamily: "'Courier New', monospace",
                            "&:hover": {
                              color: "#ff00ff",
                              background: "rgba(255, 0, 255, 0.1)",
                            },
                          }}
                          startIcon={<Code />}
                        >
                          {project.title}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </TerminalWindow>
            </motion.div>
          )}
        </AnimatePresence>

        <ProjectDialog
          open={selectedProject !== null}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedProject !== null && (
            <>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Courier New', monospace",
                      color: `hsl(${projects[selectedProject].hue}, 100%, 70%)`,
                      textShadow: `0 0 5px hsl(${projects[selectedProject].hue}, 100%, 50%)`,
                      textTransform: "uppercase",
                    }}
                  >
                    {projects[selectedProject].title}
                  </Typography>
                  <IconButton
                    onClick={handleCloseDialog}
                    sx={{ color: cyberColors.primary }}
                  >
                    <Close />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", gap: "2rem", mt: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <ProjectImage sx={{ height: "300px", borderRadius: "4px" }}>
                      <Image
                        src={projects[selectedProject].image}
                        alt={projects[selectedProject].title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </ProjectImage>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "'Courier New', monospace",
                        color: cyberColors.text,
                        mb: 3,
                        lineHeight: "1.6",
                      }}
                    >
                      {projects[selectedProject].longDescription}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Courier New', monospace",
                        color: cyberColors.primary,
                        mb: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      KEY FEATURES
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                      {projects[selectedProject].features.map((feature, i) => (
                        <Typography
                          key={i}
                          component="li"
                          sx={{
                            fontFamily: "'Courier New', monospace",
                            color: cyberColors.text,
                            mb: 1,
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>

                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Courier New', monospace",
                        color: cyberColors.primary,
                        mb: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      TECHNOLOGIES
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {projects[selectedProject].technologies.map((tech, i) => (
                        <TechPill
                          key={i}
                          hue={projects[selectedProject].hue + i * 10}
                          label={tech}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <DialogActions
                sx={{ p: 2, borderTop: "1px solid rgba(0, 255, 255, 0.2)" }}
              >
                <Button
                  href={projects[selectedProject].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: cyberColors.primary,
                    borderColor: cyberColors.primary,
                    fontFamily: "'Courier New', monospace",
                    "&:hover": {
                      borderColor: cyberColors.secondary,
                      color: cyberColors.secondary,
                      boxShadow: `0 0 10px ${cyberColors.secondary}`,
                    },
                  }}
                  startIcon={<Visibility />}
                >
                  VIEW LIVE DEMO
                </Button>
                <Button
                  href={projects[selectedProject].repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: cyberColors.secondary,
                    borderColor: cyberColors.secondary,
                    fontFamily: "'Courier New', monospace",
                    "&:hover": {
                      borderColor: cyberColors.primary,
                      color: cyberColors.primary,
                      boxShadow: `0 0 10px ${cyberColors.primary}`,
                    },
                  }}
                  startIcon={<Code />}
                >
                  VIEW SOURCE CODE
                </Button>
              </DialogActions>
            </>
          )}
        </ProjectDialog>
      </Box>
    </CyberContainer>
  );
};

export default MyWorkPage;

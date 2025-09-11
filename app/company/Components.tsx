"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  keyframes,
  styled,
  IconButton,
  Tooltip,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Terminal } from "@mui/icons-material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Cyberpunk animations
const neonPulse = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 5px #00ffff);
  }
  50% { 
    filter: drop-shadow(0 0 15px #ff00ff);
  }
`;

const scanlines = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 10px; }
`;

const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
    opacity: 1;
  }
  20%, 22%, 24%, 55% {
    opacity: 0.7;
  }
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
  color: "#00ffff",
  position: "relative",
  overflow: "hidden",
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
  //padding: "",
  borderBottom: "1px solid rgba(0,255,255,0.3)",
  boxShadow: "0 0 20px rgba(0,255,255,0.2)",
  position: "relative",
  zIndex: 1,
  backdropFilter: "blur(5px)",
  textAlign: "center",
  background: "rgba(0, 10, 20, 0.7)",
});

const OrganizationCard = styled(Box)(
  ({ hue, active }: { hue: number; active?: boolean }) => ({
    background: `rgba(0, 20, 40, ${active ? 0.9 : 0.7})`,
    border: `1px solid hsl(${hue}, 100%, 50%)`,
    borderRadius: "4px",
    padding: "1.5rem",
    marginBottom: "2rem",
    boxShadow: `0 0 10px hsla(${hue}, 100%, 50%, ${active ? 0.5 : 0.3}),
              inset 0 0 10px hsla(${hue}, 100%, 50%, ${active ? 0.3 : 0.2})`,
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
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
      height: "2px",
      background: `linear-gradient(90deg, transparent, hsl(${hue}, 100%, 50%), transparent)`,
      animation: active ? `${flicker} 3s infinite` : "none",
    },
  })
);

const TechPill = styled(Box)(({ hue }: { hue: number }) => ({
  display: "inline-block",
  padding: "0.25rem 0.75rem",
  margin: "0.25rem",
  borderRadius: "20px",
  background: `hsla(${hue}, 100%, 50%, 0.1)`,
  border: `1px solid hsla(${hue}, 100%, 50%, 0.5)`,
  color: `hsl(${hue}, 100%, 80%)`,
  fontSize: "0.75rem",
  fontFamily: "'Courier New', monospace",
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

const ExperienceTimeline = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeOrg, setActiveOrg] = useState<number | null>(null);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);

  const organizations = [
    {
      name: "Wipro",
      role: "Project Engineer",
      period: "2021 - 2024",
      description:
        "Delivered enterprise solutions for global clients, working with technologies like React, Api Integration. Implemented agile methodologies, participated in sprint planning, and managed client expectations.",
      technologies: ["React", "Redux", "Agile", "Redux", "TypeScript"],
      hue: 300,
      projects: [
        "Insurance platform for Mahindra dealers",
        "Internal dashboard for financial services",
        "Automated testing framework",
      ],
    },
    {
      name: "Manch Technology",
      role: "React Developer",
      period: "2024 - Present",
      description:
        "Developed cutting-edge web applications with React and MUI. Optimized performance and implemented responsive designs for SaaS products serving thousands of users.",
      technologies: ["Context Api", "React", "MUI", "React-DND"],
      hue: 210,
      projects: [
        "Form Builder analytics dashboard",
        "Real-time drag-drop tool",
        "Form portal with validations",
      ],
    },
    {
      name: "Freelancing",
      role: "Frontend Developer",
      period: "Flexible",
      description:
        "Built custom web applications for clients across various industries. Handled everything from UI design to backend API development and deployment.",
      technologies: ["MERN Stack", "Figma", "Material UI", "Rest Api"],
      hue: 270,
      projects: [
        "Literacy Track websites for kids",
        "Mobile-responsive business sites",
        "Custom solutions for Database",
      ],
    },
  ];

  useEffect(() => {
    if (activeOrg !== null) {
      const org = organizations[activeOrg];
      const commands = [
        `> INITIALIZING SYSTEM_SCAN`,
        `> TARGET: ${org.name.toUpperCase()}`,
        `> ROLE: ${org.role.toUpperCase()}`,
        `> PERIOD: ${org.period.toUpperCase()}`,
        `> TECHNOLOGIES: ${org.technologies.join(", ")}`,
        `> PROJECTS:`,
        ...org.projects.map((project) => `   - ${project}`),
        `> SCAN COMPLETE`,
      ];

      let currentOutput: string[] = [];
      commands.forEach((command, i) => {
        setTimeout(() => {
          currentOutput = [...currentOutput, command];
          setTerminalOutput([...currentOutput]);
        }, i * 200);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOrg]);

  const handleOrgClick = (index: number) => {
    setActiveOrg(activeOrg === index ? null : index);
    setShowTerminal(true);
  };

  const renderTerminalPrompt = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ color: "#00ffff", mr: 1 }}>
          user@portfolio:~$
        </Typography>
        <Typography sx={{ color: "#00ff00" }}>
          {activeOrg !== null
            ? `scan_organization --name=${organizations[activeOrg].name}`
            : "select_organization"}
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
      <Box sx={{ height: "8rem" }} />
      <Header sx={{ padding: { xs: "1rem", md: "2rem 5rem" } }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Courier New', monospace",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "3px",
            animation: `${neonPulse} 3s infinite alternate`,
            textShadow: "0 0 10px #00ffff",
            fontSize: { xs: "1.25rem", md: "3rem" },
          }}
        >
          Professional Network
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "'Courier New', monospace",
            color: "#ff00ff",
            mt: 1,
            textShadow: "0 0 5px #ff00ff",
          }}
        >
          SYSTEM QUERY: WORK HISTORY
        </Typography>
      </Header>

      <Box
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: { xs: "1rem 0 0 0", md: "2rem 5rem" },
          position: "relative",
          zIndex: 1,
          display: "flex",
          gap: "2rem",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <KeyboardBackspaceIcon sx={{ color: '#00f0ff', display: isMobile ? 'none' : 'block', mr: 1 }}/>
          </Link>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Courier New', monospace",
                color: "#00ffff",
                textShadow: "0 0 5px #00ffff",
               // borderLeft: "3px solid #00ffff",
                paddingLeft: "1rem",
                flex: 1,
              }}
            >
              ORGANIZATIONAL AFFILIATIONS
            </Typography>

            <Tooltip title="Terminal Mode">
              <IconButton
                onClick={() => setShowTerminal(!showTerminal)}
                sx={{ color: showTerminal ? "#ff00ff" : "#00ffff" }}
              >
                <Terminal />
              </IconButton>
            </Tooltip>
          </Box>

          {organizations.map((org, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <OrganizationCard
                hue={org.hue}
                active={activeOrg === index}
                onClick={() => handleOrgClick(index)}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "'Courier New', monospace",
                      color: `hsl(${org.hue}, 100%, 70%)`,
                      textShadow: `0 0 5px hsl(${org.hue}, 100%, 50%)`,
                      mb: 1,
                    }}
                  >
                    {org.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Courier New', monospace",
                      color: "#ff00ff",
                    }}
                  >
                    {org.period}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#00ffff",
                    mb: 2,
                  }}
                >
                  {org.role}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "rgba(0,255,255,0.8)",
                    lineHeight: "1.6",
                    mb: 2,
                  }}
                >
                  {org.description}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  {org.technologies.map((tech, i) => (
                    <TechPill key={i} hue={org.hue + i * 10}>
                      {tech}
                    </TechPill>
                  ))}
                </Box>
              </OrganizationCard>
            </motion.div>
          ))}

          <Box
            sx={{
              textAlign: "center",
              mt: 4,
              mb: 4,
              padding: "2rem",
              border: "1px solid rgba(0,255,255,0.2)",
              borderRadius: "4px",
              background: "rgba(0,20,40,0.5)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Courier New', monospace",
                color: "#00ffff",
                mb: 2,
                textShadow: "0 0 5px #00ffff",
              }}
            >
              SYSTEM STATUS
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: "2rem" }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#ff00ff",
                    display: "block",
                  }}
                >
                  TOTAL EXPERIENCE
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#00ffff",
                  }}
                >
                  4+ YEARS
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#ff00ff",
                    display: "block",
                  }}
                >
                  ORGANIZATIONS
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#00ffff",
                  }}
                >
                  {/* {organizations.length} */}
                  5+
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#ff00ff",
                    display: "block",
                  }}
                >
                  CURRENT STATUS
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: "'Courier New', monospace",
                    color: "#00ffff",
                  }}
                >
                  ACTIVE
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <AnimatePresence>
          {showTerminal && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ flex: 1, marginTop: "3.75rem" }}
            >
              <TerminalWindow>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Code sx={{ color: "#ff00ff", mr: 1 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Courier New', monospace",
                      color: "#ff00ff",
                      flex: 1,
                    }}
                  >
                    ORGANIZATION TERMINAL
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setShowTerminal(false)}
                    sx={{ color: "#ff00ff" }}
                  >
                    X
                  </IconButton>
                </Box>
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
                {/* {activeOrg !== null && (
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ color: "#00ffff", fontFamily: "'Courier New', monospace" }}>
                      > PRESS [ENTER] TO VIEW DETAILED PROJECTS
                    </Typography>
                  </Box>
                )} */}
              </TerminalWindow>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </CyberContainer>
  );
};

export default ExperienceTimeline;

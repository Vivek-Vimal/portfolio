import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Link,
} from "@mui/material";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Code, Terminal, DataArray, DeveloperMode } from "@mui/icons-material";
//import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Cyberpunk-inspired color scheme
const cyberColors = {
  primary: "#6a1b9a",
  secondary: "#00f0ff",
  accent: "#ff00f0",
  background: "rgba(15, 12, 41, 0.9)",
  text: "#ffffff",
};

// Floating Tech Icons Component
const FloatingTechIcon = ({
  icon,
  delay,
}: {
  icon: React.ReactNode;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          rotate: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.2, 0.8, 0.4, 1],
          },
        },
        hidden: {
          opacity: 0,
          y: 50,
          rotate: 15,
        },
      }}
      whileHover={{
        y: -10,
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      style={{
        margin: "0 8px",
        filter: "drop-shadow(0 0 5px rgba(0, 240, 255, 0.5))",
      }}
    >
      {icon}
    </motion.div>
  );
};

// Animated Grid Background Component
const AnimatedGridBackground = ({ isMobile }: { isMobile: boolean }) => {
  const gridSize = isMobile ? 10 : 15;
  const gridItems = Array.from({ length: gridSize * gridSize });

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        zIndex: 0,
        opacity: 0.1,
        pointerEvents: "none",
      }}
    >
      {gridItems.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            border: "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: "2px",
          }}
        />
      ))}
    </Box>
  );
};

// CyberButton Component - Made more responsive
const CyberButton = ({
  children,
  onClick,
  isMobile,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isMobile: boolean;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: isMobile ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: "transparent",
        border: "2px solid #00f0ff",
        color: "#ffffff",
        padding: isMobile ? "8px 12px" : "12px 24px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: isMobile ? "12px" : "16px",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <motion.span
        initial={{ x: "-100%" }}
        whileHover={{ x: isMobile ? "0%" : "100%" }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.2), transparent)",
          zIndex: 0,
        }}
      />
    </motion.button>
  );
};

const FuturisticAboutMeEnhanced = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  //const router = useRouter();
  const containerRef = useRef(null);
  const isContainerInView = useInView(containerRef, {
    once: true,
    margin: isMobile ? "-50px" : "-100px",
  });
  const [activeTab, setActiveTab] = useState("bio");

  const techIcons = [
    <Code sx={{ fontSize: isMobile ? 40 : 60 }} key={1} />,
    <Terminal sx={{ fontSize: isMobile ? 40 : 60 }} key={2} />,
    <DataArray sx={{ fontSize: isMobile ? 40 : 60 }} key={3} />,
    <DeveloperMode sx={{ fontSize: isMobile ? 40 : 60 }} key={4} />,
  ];

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: isMobile ? 2 : 4,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${cyberColors.background}, #000000)`,
        color: cyberColors.text,
      }}
    >
      {/* Animated Grid Background */}
      <AnimatedGridBackground isMobile={isMobile} />

      {/* Floating Tech Icons - Conditionally rendered and positioned for mobile */}
      {!isSmallMobile && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            zIndex: 1,
          }}
        >
          {techIcons.map((icon, index) => (
            <FloatingTechIcon
              key={index}
              icon={icon}
              delay={0.5 + index * 0.3}
            />
          ))}
        </Box>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          width: "100%",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          padding: isMobile ? "16px" : "32px",
          boxShadow: "0 0 30px rgba(0, 240, 255, 0.3)",
          border: "1px solid rgba(0, 240, 255, 0.2)",
          background: "rgba(15, 12, 41, 0.7)",
          margin: isMobile ? "60px 0" : 0,
        }}
      >
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isContainerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              mb: 2,
              position: "relative",
              textAlign: "center",
              background: "linear-gradient(90deg, #6a1b9a, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: isMobile ? "1.8rem" : "2.5rem",
              // "&::after": {
              //   content: '""',
              //   position: "absolute",
              //   bottom: -8,
              //   left: "50%",
              //   transform: "translateX(-50%)",
              //   width: "50%",
              //   height: "3px",
              //   background: "linear-gradient(90deg, #6a1b9a, #00f0ff)",
              //   borderRadius: "2px",
              // },
            }}
          >
            REACT/NEXT DEVELOPER
          </Typography>

          <Divider
            sx={{
              my: isMobile ? 2 : 3,
              borderColor: "rgba(0, 240, 255, 0.3)",
              borderBottomWidth: "2px",
            }}
          />
        </motion.div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // gap: isMobile ? 1 : 2,
            // mb: isMobile ? 2 : 4,
            // flexWrap: isSmallMobile ? "wrap" : "nowrap",
            alignItems: "center",
            mb: isMobile ? 2 : 4,
          }}
        >   

          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <KeyboardBackspaceIcon sx={{ color: '#00f0ff', display: isMobile ? 'none' : 'block', }}/>
          </Link>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: isMobile ? 1 : 2,
              flexWrap: isSmallMobile ? "wrap" : "nowrap",
            }}
          >       

            <CyberButton
              onClick={() => setActiveTab("bio")}
              isMobile={isMobile}
            >
              <span style={{ color: activeTab === 'bio' ? '#00f0ff' : 'rgba(255,255,255,0.4)' }}>Vivek Bio</span>
            </CyberButton>
            <CyberButton
              onClick={() => setActiveTab("skills")}
              isMobile={isMobile}
            >
              <span style={{ color: activeTab === 'skills' ? '#00f0ff' : 'rgba(255,255,255,0.4)' }}>Core Skills</span>
            </CyberButton>
            <CyberButton
              onClick={() => setActiveTab("stats")}
              isMobile={isMobile}
            >
              <span style={{ color: activeTab === 'stats' ? '#00f0ff' : 'rgba(255,255,255,0.4)' }}>{isSmallMobile ? "Stats" : "Performance Stats"}</span>
            </CyberButton>
          </Box>

          <Box/>

        </Box>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "bio" && (
            <motion.div
              key="bio"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#00f0ff",
                  mb: isMobile ? 2 : 3,
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              >
                BIO INITIALIZATION
              </Typography>

              <Box sx={{ mb: isMobile ? 2 : 3 }}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    lineHeight: 1.8,
                    mb: 2,
                    textAlign: "justify",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <span style={{ color: "#00f0ff" }}>$</span> Greetings, user. I
                  am a js-enhanced frontend developer specializing in
                  cutting-edge web technologies and immersive digital
                  experiences.
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    lineHeight: 1.8,
                    mb: 2,
                    textAlign: "justify",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <span style={{ color: "#00f0ff" }}>$</span> My codes are
                  optimized for creating high-performance, scalable applications
                  with futuristic interfaces and robust architectures.
                </Typography>

                <Typography
                  variant="body1"
                  component="p"
                  sx={{
                    lineHeight: 1.8,
                    textAlign: "justify",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  <span style={{ color: "#00f0ff" }}>$</span> With advanced
                  capabilities in frontend engineering, I construct digital
                  realities that push the boundaries of whats possible on the
                  web.
                </Typography>
              </Box>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#00f0ff",
                  mb: isMobile ? 2 : 3,
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              >
                CORE COMPETENCIES
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isSmallMobile
                    ? "1fr"
                    : isMobile
                    ? "1fr 1fr"
                    : "1fr 1fr 1fr 1fr",
                  gap: isMobile ? 1 : 2,
                }}
              >
                {[
                  "React - js",
                  "TypeScript",
                  "Next - js",
                  "Material - UI",
                  "Ant - Design",
                  "JavaScript",
                  "Git Platform",
                  "Git - Hub",
                  "Redux - Core",
                  "Context - Api",
                  "Axios",
                  "Rest - Api",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.05 },
                    }}
                    whileHover={{ scale: isMobile ? 1 : 1.05 }}
                    style={{
                      padding: isMobile ? "8px" : "12px",
                      borderRadius: "4px",
                      background: "rgba(0, 240, 255, 0.1)",
                      border: "1px solid rgba(0, 240, 255, 0.3)",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                    >
                      {skill}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}

          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: "#00f0ff",
                  mb: isMobile ? 2 : 3,
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              >
                PERFORMANCE METRICS
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? 2 : 3,
                }}
              >
                {[
                  { label: "Code Efficiency", value: 94, unit: "%" },
                  { label: "System Uptime", value: 99.9, unit: "%" },
                  { label: "Projects Deployed", value: 21, unit: "+" },
                  { label: "Experience", value: 4, unit: "yrs" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    }}
                    style={{
                      padding: isMobile ? "12px" : "20px",
                      borderRadius: "8px",
                      background: "rgba(106, 27, 154, 0.2)",
                      border: "1px solid rgba(0, 240, 255, 0.3)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#00f0ff",
                        display: "block",
                        mb: 1,
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Typography
                      variant={isMobile ? "h5" : "h4"}
                      sx={{ fontWeight: "bold" }}
                    >
                      {stat.value}
                      {stat.unit}
                    </Typography>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #6a1b9a, #00f0ff)",
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Terminal-like Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isContainerInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          style={{ marginTop: isMobile ? "20px" : "40px" }}
        >
          <Divider
            sx={{
              my: isMobile ? 1 : 2,
              borderColor: "rgba(0, 240, 255, 0.3)",
              borderBottomWidth: "2px",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#00f0ff",
            }}
          >
            <Typography
              variant="body2"
              fontFamily="monospace"
              sx={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}
            >
              $ STATUS: [ONLINE]
            </Typography>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              style={{
                width: "8px",
                height: isMobile ? "12px" : "16px",
                background: "#00f0ff",
                marginLeft: "8px",
              }}
            />
          </Box>
        </motion.div>
      </motion.div>

      {/* Floating Connection Lines - Only for larger screens */}
      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 200 + 100}px`,
                height: "2px",
                background:
                  "linear-gradient(90deg, rgba(0, 240, 255, 0), rgba(0, 240, 255, 0.8), rgba(0, 240, 255, 0))",
                transform: `rotate(${Math.random() * 360}deg)`,
                transformOrigin: "left center",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FuturisticAboutMeEnhanced;
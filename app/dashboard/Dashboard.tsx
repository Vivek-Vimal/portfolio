import {
  Box,
  Button,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import ProjectVideos from "./ProjectVideo";
import { useRouter } from "next/navigation";
import Company from "./Company";
import Resume from '../resume/page'

const DynamicCanvas = dynamic(() => import("./Canvas"), { ssr: false });

// Cyberpunk color scheme
export const cyberColors = {
  primary: "#6a1b9a",
  secondary: "#00f0ff",
  accent: "#ff00f0",
  background: "rgba(15, 12, 41, 0.9)",
  text: "#ffffff",
};

// Enhanced animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants = {
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

export const floatingEffect = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const companies = [
  {
    name: "WIPRO",
    role: "Project Engineer",
    period: "2021 - 2024",
    logo: "/wipro.png",
    description:
      "Developing insurance solutions using React and API Integrations",
    hue: 300, // Pink
  },
  {
    id: 2,
    name: "Manch Tech",
    role: "Frontend Developer",
    period: "2024 - Present",
    description: "Developing dynamic web applications with React-DND",
    logo: "/manch.png", // Replace with your actual logo path
    hue: 210, // Light Blue
  },
  {
    id: 3,
    name: "Freelancing",
    role: "Full Stack Developer",
    period: "2019 - Present",
    description:
      "Building custom web applications for clients across various industries",
    logo: "/freelancer.png", // Replace with your actual logo path
    hue: 270, // Purple
  },
];

const Home: NextPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at center, #0f0c29 0%, #1a1a2e 70%, #16213e 100%)",
        color: cyberColors.text,
        minHeight: "100vh",
        pt: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={containerRef}
    >
      <DynamicCanvas />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          backdropFilter: "blur(8px)",
          borderRadius: "16px",
          border: "1px solid rgba(0, 240, 255, 0.2)",
          boxShadow: "0 0 30px rgba(0, 240, 255, 0.1)",
          my: 4,
          px: { xs: 2, md: 4 },
          py: { xs: 3 },
          background: "rgba(15, 12, 41, 0.7)",
        }}
      >
        {/* Hero Section */}
        <Box
          textAlign="center"
          //pt={10}
          py={2}
          component={motion.div}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(90deg, #6a1b9a, #00f0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 10px rgba(106, 27, 154, 0.5)",
                fontSize: { xs: "2.5rem", md: "3.5rem" },
              }}
            >
              Welcome to the Future
            </Typography>
             {/* <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                mt: 0,
                mb: 2,
                color: cyberColors.secondary,
                borderColor: cyberColors.secondary,
                "&:hover": {
                  borderColor: cyberColors.accent,
                  color: cyberColors.accent,
                  boxShadow: `0 0 15px ${cyberColors.accent}`,
                },
              }}
              onClick={() => router.push("/about")}
            >
              <span>Explore More</span>
            </Button>
            </motion.div> */}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: cyberColors.secondary,
                mb: 2,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
              }}
            >
              I craft immersive web experiences using cutting-edge technology.
            </Typography>
          </motion.div>
        </Box>

        {/* Content Navigation */}
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mb: 4,
    gap: 2,
    flexWrap: "wrap", // allow wrapping
  }}
  component={motion.div}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
>
  {["projects", "companies", "about me", "contact", "resume"].map((tab) => (
    <Button
      key={tab}
      variant="text"
      sx={{
        flexBasis: {
          xs: "30%", // ~2 items per row on mobile
          sm: "auto", // normal size on larger screens
        },
        flexGrow: { xs: 1, sm: 0 },
        color: activeTab === tab ? cyberColors.secondary : "#ffffff",
        textTransform: "uppercase",
        letterSpacing: "1px",
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -4,
          left: 0,
          width: activeTab === tab ? "100%" : "0%",
          height: "2px",
          background: cyberColors.secondary,
          transition: "width 0.3s ease",
        },
        "&:hover::after": {
          width: "100%",
        },
      }}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </Button>
  ))}
</Box>



        <Divider
          sx={{
            mt: '-1.85rem',
            mb: 2,
            borderColor: "rgba(0, 240, 255, 0.3)",
            borderBottomWidth: "2px",
          }}
        />

        {/* Dynamic Content Sections */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box py={2}>
                <Typography
                  variant="h4"
                  textAlign="center"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: cyberColors.secondary,
                    mb: 3,
                    textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                  }}
                >
                  Featured Projects
                </Typography>
                <ProjectVideos />
              </Box>
            </motion.div>
          )}
          {activeTab === "companies" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box py={2}>
                <Typography
                  variant="h4"
                  textAlign="center"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: cyberColors.secondary,
                    mb: 2,
                    textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                  }}
                >
                  Core Competencies
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2rem",
                    justifyContent: "center",
                    padding: "1rem",
                  }}
                >
                  {companies.map((company, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "calc(50% - 1rem)",
                          md: "calc(33% - 1.33rem)",
                        },
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Company company={company} />
                      </motion.div>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>
          )}
          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box textAlign="center" py={5}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    color: cyberColors.secondary,
                    mb: 2,
                    textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                  }}
                >
                  Lets Build the Future Together
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: cyberColors.text,
                    mb: 4,
                  }}
                >
                  Reach out and lets collaborate on something extraordinary.
                </Typography>
                <motion.div
                  variants={floatingEffect}
                  animate="animate"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      mt: 2,
                      color: cyberColors.accent,
                      borderColor: cyberColors.accent,
                      "&:hover": {
                        borderColor: cyberColors.secondary,
                        color: cyberColors.secondary,
                        boxShadow: `0 0 15px ${cyberColors.secondary}`,
                      },
                    }}
                    onClick={() => router.push("/contact")}
                  >
                    Contact Me
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          )}
          {activeTab === "about me" && (
            <motion.div
  key="about"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  <Box textAlign="center" py={5}>
    <Typography
      variant="h4"
      fontWeight="bold"
      gutterBottom
      sx={{
        color: cyberColors.secondary,
        mb: 2,
        textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
      }}
    >
      Hi, I’m Vivek Vimal
    </Typography>
    <Typography
      variant="h6"
      sx={{
        color: cyberColors.text,
        mb: 4,
      }}
    >
      A passionate <strong>React & Next.js Developer</strong> with 4+ years of
      experience building modern, responsive, and dynamic web applications.  
      I love crafting seamless user experiences, experimenting with animations,
      and bringing ideas to life through code.
    </Typography>


    <motion.div
      variants={floatingEffect}
      animate="animate"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
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
         onClick={() => router.push("/about")}
      >
        Lets Deep Dive
      </Button>
    </motion.div>
  </Box>
</motion.div>

          )}
          {activeTab === "resume" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box py={2}>
                <Resume />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Box
          textAlign="center"
          pb={2}
          pt={1}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontFamily: "monospace",
            }}
          >
            SYSTEM STATUS: [ONLINE]
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

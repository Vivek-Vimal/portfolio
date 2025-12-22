"use client";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Divider,
  useTheme,
  Snackbar,
  Alert,
  Tooltip,
  Avatar,
  Badge,
  Link,
  useMediaQuery,
} from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  ConnectWithoutContact,
  DataObject,
  Language,
} from "@mui/icons-material";
import { cyberColors } from "../dashboard/Dashboard";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import React from "react";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// ========== 3D CONTACT ORB COMPONENT ========== //
const ContactOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#ff00f0" : "#00f0ff"}
        emissive={hovered ? "#ff00f0" : "#00f0ff"}
        emissiveIntensity={hovered ? 0.8 : 0.5}
        roughness={0.2}
        metalness={0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// ========== MAIN COMPONENT ========== //
const CyberContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeField, setActiveField] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const controls = useAnimation();
  const containerRef = useRef(null);

  // Animation sequences
  const startAnimation = async () => {
    await controls.start("visible");
    await controls.start({
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
    });
  };

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setOpenSnackbar(true);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  const socialLinks = [
    {
      icon: <LinkedIn />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/vivek-vimal-59569637a/",
      color: "#0A66C2",
    },
    {
      icon: <GitHub />,
      label: "GitHub",
      url: "https://github.com/dot69-wq",
      color: "#f5f5f5",
    },
    {
      icon: <DataObject />,
      label: "LeetCode",
      url: "https://leetcode.com/u/vivekvimal/",
      color: "rgb(255, 161, 22)",
    },
    { icon: <Language />, label: "Vivek Co.", url: "/", color: "#00f0ff" },
  ];

  const contactMethods = [
    {
      icon: <Email />,
      label: "Email",
      value: "vivekvimal50@gmail.com",
      color: cyberColors.secondary,
    },
    {
      icon: <Phone />,
      label: "Phone",
      value: "+91-9123011145",
      color: "#4CAF50",
    },
    {
      icon: <LocationOn />,
      label: "HQ",
      value: "Ranchi, JH",
      color: "#FF5722",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1],
      },
    },
    hover: {
      y: -5,
      transition: { duration: 0.3 },
    },
  };

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
        pb: "4rem",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      }}
      ref={containerRef}
    >
      {/* 3D Background Orb */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "10%",
          width: "300px",
          height: "300px",
          zIndex: 1,
          opacity: 0.2,
          [theme.breakpoints.down("md")]: { display: "none" },
        }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <ContactOrb />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Box>

      {/* Binary Rain Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "radial-gradient(circle, transparent 1px, #000 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.05,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(0, 240, 255, 0.3)",
          boxShadow: "0 0 40px rgba(0, 240, 255, 0.2)",
          p: { xs: 2, md: 4 },
          background: "rgba(15, 12, 41, 0.85)",
          mt: "3rem",
          mx: 1,
          width: isMobile ? "100%" : "80vw",
          maxWidth: "1300px"
        }}
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box textAlign="center" >

            <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      // gap: isMobile ? 1 : 2,
                      // mb: isMobile ? 2 : 4,
                      // flexWrap: isSmallMobile ? "wrap" : "nowrap",
                      alignItems: "center",
                      //mb: isMobile ? 2 : 4,
                    }}
                  >   

          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <KeyboardBackspaceIcon sx={{ color: '#00f0ff', display: isMobile ? 'none' : 'block', }}/>
          </Link>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                background: "linear-gradient(90deg, #6a1b9a, #00f0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 15px rgba(106, 27, 154, 0.7)",
                mb: 2,
                fontSize: { xs: "2.5rem", md: "3rem" },
                fontWeight: 500,
              }}
            >
              INITIATE CONNECTION
            </Typography>
          </motion.div>
          <Box />

          </Box>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              sx={{
                color: cyberColors.secondary,
                textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                maxWidth: "800px",
                mx: "auto",
                mb: 4,
              }}
            >
              Ready to collaborate on something extraordinary? Drop a message
              directly into my neural network.
            </Typography>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Divider
              sx={{
                borderColor: "rgba(0, 240, 255, 0.3)",
                borderBottomWidth: "2px",
                width: "80%",
                mx: "auto",
                my: 4,
              }}
            />
          </motion.div>
        </Box>

        <Grid container spacing={6}>
          {/* Contact Form Column */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                component="form"
                ref={formRef}
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                {/* Animated Name Field */}
                <motion.div
                  variants={itemVariants}
                  animate={activeField === "name" ? "active" : "inactive"}
                >
                  <TextField
                    fullWidth
                    label="YOUR NAME"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField("")}
                    required
                    InputProps={{
                      sx: {
                        color: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "inherit",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "rgba(0, 240, 255, 0.7)",
                        "&.Mui-focused": {
                          color: cyberColors.secondary,
                        },
                      },
                    }}
                  />
                </motion.div>

                {/* Animated Email Field */}
                <motion.div
                  variants={itemVariants}
                  animate={activeField === "email" ? "active" : "inactive"}
                >
                  <TextField
                    fullWidth
                    label="EMAIL"
                    variant="outlined"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField("")}
                    required
                    InputProps={{
                      sx: {
                        color: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "inherit",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "rgba(0, 240, 255, 0.7)",
                        "&.Mui-focused": {
                          color: cyberColors.secondary,
                        },
                      },
                    }}
                  />
                </motion.div>

                {/* Animated Message Field */}
                <motion.div
                  variants={itemVariants}
                  animate={activeField === "message" ? "active" : "inactive"}
                >
                  <TextField
                    fullWidth
                    label="MESSAGE TRANSMISSION"
                    variant="outlined"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField("")}
                    required
                    multiline
                    rows={6}
                    InputProps={{
                      sx: {
                        color: "#fff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "inherit",
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        color: "rgba(0, 240, 255, 0.7)",
                        "&.Mui-focused": {
                          color: cyberColors.secondary,
                        },
                      },
                    }}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    disabled={isSubmitting}
                    sx={{
                      mt: 2,
                      py: 2,
                      background: `linear-gradient(135deg, ${cyberColors.primary}, ${cyberColors.secondary})`,
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      letterSpacing: "1px",
                      "&:hover": {
                        boxShadow: `0 0 25px ${cyberColors.secondary}`,
                        background: `linear-gradient(135deg, ${cyberColors.secondary}, ${cyberColors.primary})`,
                      },
                      "&.Mui-disabled": {
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.5)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isSubmitting ? (
                      <Box
                        component="span"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{ display: "inline-block" }}
                        >
                          <ConnectWithoutContact />
                        </motion.span>
                        <Box component="span" ml={1}>
                          ESTABLISHING LINK...
                        </Box>
                      </Box>
                    ) : (
                      "INITIATE TRANSMISSION"
                    )}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info Column */}
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  height: "100%",
                }}
              >
                {/* Contact Methods */}
                <Typography
                  variant="h4"
                  sx={{
                    color: cyberColors.secondary,
                    mb: 2,
                    textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                  }}
                >
                  DIRECT ACCESS CHANNELS
                </Typography>

                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        p: 3,
                        background: "rgba(0, 240, 255, 0.05)",
                        border: "1px solid rgba(0, 240, 255, 0.2)",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(0, 240, 255, 0.1)",
                          boxShadow: `0 0 15px ${method.color}`,
                        },
                      }}
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              background: method.color,
                              color: "#000",
                            }}
                          >
                            {method.icon}
                          </Avatar>
                        }
                      >
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            background: "rgba(0, 240, 255, 0.1)",
                            border: `1px solid ${method.color}`,
                          }}
                        >
                          {method.icon}
                        </Avatar>
                      </Badge>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "rgba(255, 255, 255, 0.7)",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            fontSize: "0.8rem",
                          }}
                        >
                          {method.label}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: method.color,
                            fontWeight: "bold",
                          }}
                        >
                          {method.value}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}

                <Divider
                  sx={{
                    my: 2,
                    borderColor: "rgba(0, 240, 255, 0.3)",
                  }}
                />

                {/* Social Links */}
                <Typography
                  variant="h4"
                  sx={{
                    color: cyberColors.secondary,
                    mb: 2,
                    textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                  }}
                >
                  NEURAL NETWORK HUBS
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: 2,
                  }}
                >
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Tooltip title={social.label} arrow>
                        <IconButton
                          href={social.url}
                          target="_blank"
                          rel="noopener"
                          sx={{
                            width: "100%",
                            height: "100px",
                            background: "rgba(0, 240, 255, 0.05)",
                            border: "1px solid rgba(0, 240, 255, 0.2)",
                            borderRadius: "12px",
                            "&:hover": {
                              background: `rgba(${hexToRgb(
                                social.color
                              )}, 0.2)`,
                              borderColor: social.color,
                              boxShadow: `0 0 15px ${social.color}`,
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {React.cloneElement(social.icon, {
                              sx: {
                                fontSize: "2rem",
                                color: social.color,
                              },
                            })}
                            <Typography
                              variant="caption"
                              sx={{
                                color: social.color,
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                              }}
                            >
                              {social.label}
                            </Typography>
                          </Box>
                        </IconButton>
                      </Tooltip>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          icon={false}
          sx={{
            background: "rgba(0, 240, 255, 0.15)",
            backdropFilter: "blur(10px)",
            color: cyberColors.secondary,
            border: "1px solid rgba(0, 240, 255, 0.5)",
            borderRadius: "12px",
            boxShadow: `0 0 20px ${cyberColors.secondary}`,
            alignItems: "center",
            width: "100%",
          }}
          component={motion.div}
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: 20 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 0.6 }}
            >
              <Send sx={{ fontSize: "2rem", color: cyberColors.secondary }} />
            </motion.div>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                TRANSMISSION SUCCESSFUL
              </Typography>
              <Typography variant="body2">
                Message received! Neural response incoming...
              </Typography>
            </Box>
          </Box>
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Helper function to convert hex to rgb
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : "0, 240, 255";
}

export default CyberContactPage;

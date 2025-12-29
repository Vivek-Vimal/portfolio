"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  keyframes,
  styled,
  alpha,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  CheckCircle,
  Close,
  AutoAwesome,
  FlashOn,
  Sync,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
//import { cyberColors } from "../app/dashboard/Dashboard"; // Update with your path

 const cyberColors = {
  // Enhanced Core Colors
  primary: "#6a1b9a",       // Deep Purple - Main brand color
  secondary: "#00f0ff",     // Electric Cyan - Secondary UI elements
  accent: "#ff00f0",        // Hot Magenta - Highlights and call-to-actions
  
  // Neon Spectrum
  neonPink: "#ff00ff",      // Pure Magenta - Eye-catching highlights
  neonBlue: "#00ffff",      // Pure Cyan - Bright UI elements
  neonGreen: "#00ff00",     // Pure Green - Success/positive elements
  cyberOrange: "#ff6b00",   // Burning Orange - Warning/attention
  matrixGreen: "#00ff41",   // Matrix Green - Terminal/code elements
  
  // NEW DEFINED COLORS
  electricBlue: "#0A0AFF",  // Deep Electric Blue - Primary interface color
  cyberYellow: "#FFCC00",   // Cyber Yellow - High-visibility elements
  techPurple: "#9D00FF",    // Tech Purple - Modern/futuristic accents
  
  // Extended UI Colors (for different interface contexts)
  uiBlue: "#0A0AFF",        // Interface Blue (same as electricBlue)
  uiCyan: "#00F9FF",        // Interface Cyan - Lighter than neonBlue
  uiPurple: "#9D00FF",      // Interface Purple (same as techPurple)
  uiPink: "#FF00CC",        // Interface Pink - Less intense than neonPink
  uiGreen: "#00FF9D",       // Interface Green - Softer than matrixGreen
  uiOrange: "#FF6B35",      // Interface Orange - Softer than cyberOrange
  
  // Backgrounds
  background: "rgba(15, 12, 41, 0.98)",    // Main background with slight transparency
  darkBg: "#000515",                       // Deep space background - solid dark
  deepSpace: "#000022",                    // Darkest space - almost black with blue tint
  cardBg: "rgba(10, 10, 31, 0.92)",        // Card background - semi-transparent
  panelBg: "rgba(15, 12, 41, 0.95)",       // Panel background - slightly different opacity
  
  // Glass Effects
  glassWhite: "rgba(255, 255, 255, 0.1)",   // White glass effect
  glassBlue: "rgba(0, 249, 255, 0.1)",      // Blue glass effect
  glassPurple: "rgba(157, 0, 255, 0.1)",    // Purple glass effect
  glassPink: "rgba(255, 0, 204, 0.1)",      // Pink glass effect
  glassGreen: "rgba(0, 255, 157, 0.1)",     // Green glass effect
  
  // Text Colors
  text: "#FFFFFF",                           // Primary text - pure white
  textSecondary: "rgba(255, 255, 255, 0.8)", // Secondary text - 80% opacity white
  textMuted: "rgba(255, 255, 255, 0.6)",     // Muted text - 60% opacity white
  textGlow: "#FFFFFF",                       // Text glow color
  
  // Status Colors
  success: "#00ff41",        // Success green - for positive feedback
  warning: "#ffcc00",        // Warning yellow - for cautions (same as cyberYellow)
  error: "#ff0066",          // Error red - for errors/alerts
  info: "#00f0ff",           // Info cyan - for information (same as secondary)
  
  // NEW: Specific Color Explanations
  
  // electricBlue: Deep, rich blue that looks like electricity arcing
  // - Use for: Primary buttons, main navigation, important highlights
  // - Contrasts well with: darkBg, white text
  // - Example: <Button color={cyberColors.electricBlue}>
  
  // cyberYellow: Bright, attention-grabbing yellow with cyberpunk feel
  // - Use for: Warnings, important notices, high-visibility elements
  // - Contrasts well with: darkBg, deepSpace
  // - Example: <Alert severity="warning" color={cyberColors.cyberYellow}>
  
  // techPurple: Modern purple that feels futuristic and technical
  // - Use for: Tech elements, futuristic UI, special features
  // - Contrasts well with: electricBlue, neonGreen
  // - Example: <TechBadge color={cyberColors.techPurple}>
  
  // Gradient Combinations
  gradients: {
    // Updated with new colors
    primary: ["#6a1b9a", "#9D00FF"],                    // Purple to techPurple
    secondary: ["#00f0ff", "#00FF9D"],                  // Cyan to uiGreen
    accent: ["#ff00f0", "#FF6B35"],                     // Magenta to uiOrange
    quantum: ["#9D00FF", "#00f0ff", "#ff00f0"],         // techPurple to Cyan to Magenta
    hologram: ["#00f0ff", "#9D00FF", "#00FF9D"],        // Cyan to techPurple to Green
    matrix: ["#00ff41", "#00f0ff", "#9D00FF"],          // matrixGreen to Cyan to techPurple
    sunset: ["#ff6b00", "#ff00f0", "#9D00FF"],          // cyberOrange to Magenta to techPurple
    ocean: ["#0A0AFF", "#00F9FF", "#00FF9D"],           // electricBlue to uiCyan to uiGreen
    nebula: ["#9D00FF", "#FF00CC", "#FF6B00"],          // techPurple to uiPink to cyberOrange
    cyberpunk: ["#00F9FF", "#FF00CC", "#FFCC00"],       // uiCyan to uiPink to cyberYellow
    electric: ["#0A0AFF", "#00F9FF", "#9D00FF"],        // electricBlue to uiCyan to techPurple
    digital: ["#FFCC00", "#00FF41", "#0A0AFF"],         // cyberYellow to matrixGreen to electricBlue
  },
  
  // Glow Intensities
  glows: {
    soft: "0 0 10px",        // Soft glow - subtle effects
    medium: "0 0 20px",      // Medium glow - standard UI glow
    strong: "0 0 40px",      // Strong glow - important elements
    intense: "0 0 60px",     // Intense glow - attention grabbers
    extreme: "0 0 100px",    // Extreme glow - special effects
  },
  
  // Border Colors
  borders: {
    primary: "rgba(0, 240, 255, 0.3)",      // Primary border - cyan
    secondary: "rgba(255, 0, 240, 0.3)",    // Secondary border - magenta
    accent: "rgba(157, 0, 255, 0.3)",       // Accent border - techPurple
    electric: "rgba(10, 10, 255, 0.3)",     // NEW: electricBlue border
    yellow: "rgba(255, 204, 0, 0.3)",       // NEW: cyberYellow border
    glow: "rgba(0, 240, 255, 0.5)",         // Glowing border
    hologram: "rgba(0, 240, 255, 0.1)",     // Hologram border
  },
  
  // Shadow Colors
  shadows: {
    primary: "rgba(0, 240, 255, 0.3)",      // Primary shadow
    secondary: "rgba(255, 0, 240, 0.3)",    // Secondary shadow
    electric: "rgba(10, 10, 255, 0.3)",     // NEW: electricBlue shadow
    purple: "rgba(157, 0, 255, 0.3)",       // NEW: techPurple shadow
    yellow: "rgba(255, 204, 0, 0.3)",       // NEW: cyberYellow shadow
    deep: "rgba(0, 0, 0, 0.8)",             // Deep shadow
    glow: "rgba(0, 240, 255, 0.5)",         // Glow shadow
    neon: "rgba(255, 0, 255, 0.5)",         // Neon shadow
  },
  
  // Particle Colors
  particles: {
    blue: "rgba(0, 240, 255, 0.8)",         // Blue particles - cyan
    pink: "rgba(255, 0, 240, 0.8)",         // Pink particles - magenta
    green: "rgba(0, 255, 65, 0.8)",         // Green particles - matrixGreen
    purple: "rgba(157, 0, 255, 0.8)",       // Purple particles - techPurple
    orange: "rgba(255, 107, 0, 0.8)",       // Orange particles - cyberOrange
    electric: "rgba(10, 10, 255, 0.8)",     // NEW: electricBlue particles
    yellow: "rgba(255, 204, 0, 0.8)",       // NEW: cyberYellow particles
  },
  
  // Terminal Colors
  terminal: {
    background: "rgba(0, 5, 21, 0.9)",      // Terminal background
    text: "#00ff41",                        // Terminal text - matrixGreen
    cursor: "#00f0ff",                      // Terminal cursor - cyan
    prompt: "#ffcc00",                      // Terminal prompt - cyberYellow
    error: "#ff0066",                       // Terminal error - red
    directory: "#0A0AFF",                   // NEW: Directory color - electricBlue
    command: "#9D00FF",                     // NEW: Command color - techPurple
  },
  
  // Data Visualization
  data: {
    series1: "#00f0ff",     // Data series 1 - cyan
    series2: "#ff00f0",     // Data series 2 - magenta
    series3: "#00ff41",     // Data series 3 - matrixGreen
    series4: "#ffcc00",     // Data series 4 - cyberYellow
    series5: "#9d00ff",     // Data series 5 - techPurple
    series6: "#0A0AFF",     // NEW: Data series 6 - electricBlue
  },
  
  // Interactive States
  states: {
    hover: "rgba(0, 240, 255, 0.1)",        // Hover state - cyan
    active: "rgba(0, 240, 255, 0.2)",       // Active state - cyan
    focus: "rgba(0, 240, 255, 0.15)",       // Focus state - cyan
    electricHover: "rgba(10, 10, 255, 0.1)", // NEW: electricBlue hover
    purpleHover: "rgba(157, 0, 255, 0.1)",  // NEW: techPurple hover
    yellowHover: "rgba(255, 204, 0, 0.1)",  // NEW: cyberYellow hover
    disabled: "rgba(255, 255, 255, 0.1)",   // Disabled state
  },
  
  // Transparency Helpers
  alpha: {
    high: "E6",     // 90% opacity
    medium: "99",   // 60% opacity
    low: "66",      // 40% opacity
    veryLow: "33",  // 20% opacity
  }
}

// Animations
const hologramShimmer = keyframes`
  0% { background-position: 0% 0%; opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { background-position: 200% 200%; opacity: 0.3; }
`;

const dataStream = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const neonPulse = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px #0A0AFF, 0 0 10px #9D00FF 40;
  }
  50% { 
    box-shadow: 0 0 20px #0A0AFF, 0 0 40px #9D00FF 60;
  }
`;

const scanLine = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

// Styled Components
const NotificationContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 9999,
  maxWidth: "400px",
  width: "calc(100% - 32px)",
  pointerEvents: "none",
}));

const NotificationCard = styled(Box)(({ theme }) => ({
  position: "relative",
  background: `
    linear-gradient(135deg, 
      ${alpha(cyberColors.cardBg, 0.95)} 0%,
      ${alpha(cyberColors.darkBg, 0.95)} 100%
    )`,
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(cyberColors.electricBlue, 0.3)}`,
  borderRadius: "16px",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  boxShadow: `
    0 10px 40px ${alpha(cyberColors.shadows.primary, 0.3)},
    0 0 60px ${alpha(cyberColors.techPurple, 0.2)},
    inset 0 1px 0 ${alpha(cyberColors.electricBlue, 0.1)}
  `,
  overflow: "hidden",
  pointerEvents: "auto",
  transformStyle: "preserve-3d",
}));

const QuantumCore = styled(Box)({
  position: "absolute",
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: `
    radial-gradient(
      circle at 30% 30%,
      ${alpha(cyberColors.electricBlue, 0.4)},
      ${alpha(cyberColors.techPurple, 0.2)} 70%,
      transparent 100%
    )`,
  filter: "blur(30px)",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  opacity: 0.5,
  pointerEvents: "none",
});

const HologramGrid = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    linear-gradient(0deg, 
      transparent 0%, 
      ${alpha(cyberColors.electricBlue, 0.03)} 2px, 
      transparent 4px
    ),
    linear-gradient(90deg, 
      transparent 0%, 
      ${alpha(cyberColors.techPurple, 0.02)} 2px, 
      transparent 4px
    )`,
  backgroundSize: "30px 30px",
  opacity: 0.3,
  pointerEvents: "none",
});

const DataStream = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "1px",
  background: `linear-gradient(90deg, 
    transparent, 
    ${cyberColors.matrixGreen}, 
    transparent
  )`,
  filter: `drop-shadow(0 0 5px ${cyberColors.matrixGreen})`,
  animation: `${scanLine} 2s linear`,
});

// Hook for clipboard functionality
export const useClipboardNotification = () => {
  const [notification, setNotification] = useState({
    visible: false,
    text: "",
    type: "copy" as "copy" | "error",
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification({
        visible: true,
        text: text.length > 50 ? `${text.substring(0, 50)}...` : text,
        type: "copy",
      });
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 3000);
      
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setNotification({
        visible: true,
        text: "Failed to copy to clipboard",
        type: "error",
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, visible: false }));
      }, 3000);
      
      return false;
    }
  };

  return { copyToClipboard, notification, setNotification };
};

// Copy Button Component
export const CyberCopyButton: React.FC<{
  text: string;
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "contained" | "outlined" | "hologram";
}> = ({ text, children, size = "medium", variant = "hologram" }) => {
  const { copyToClipboard } = useClipboardNotification();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    setIsAnimating(true);
    await copyToClipboard(text);
    
    // Create particles
    createParticles();
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const createParticles = () => {
    const particleCount = 8;
    const button = document.querySelector(`[data-text="${text}"]`);
    
    if (!button) return;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: ${size === "small" ? "2px" : size === "large" ? "4px" : "3px"};
        height: ${size === "small" ? "2px" : size === "large" ? "4px" : "3px"};
        border-radius: 50%;
        background: radial-gradient(circle, 
          ${cyberColors.electricBlue}, 
          ${cyberColors.techPurple},
          transparent
        );
        filter: blur(1px);
        opacity: 0;
        pointer-events: none;
        z-index: 1;
      `;

      // Set random start position around button center
      const angle = (i * (360 / particleCount)) * (Math.PI / 180);
      const distance = size === "small" ? 15 : size === "large" ? 25 : 20;
      particle.style.left = "50%";
      particle.style.top = "50%";
      particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);

      // Animate
      particle.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 0 },
          { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 1 },
          { 
            transform: `translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0)`, 
            opacity: 0 
          }
        ],
        {
          duration: 800,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        }
      );

      button.appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  };

  const buttonStyles = {
    contained: {
      background: `linear-gradient(135deg, 
        ${cyberColors.electricBlue}, 
        ${cyberColors.techPurple}
      )`,
      border: "none",
      boxShadow: `0 0 20px ${alpha(cyberColors.electricBlue, 0.5)}`,
    },
    outlined: {
      background: "transparent",
      border: `1px solid ${cyberColors.electricBlue}`,
      boxShadow: `0 0 15px ${alpha(cyberColors.electricBlue, 0.3)}`,
    },
    hologram: {
      background: `linear-gradient(135deg, 
        ${alpha(cyberColors.electricBlue, 0.1)}, 
        ${alpha(cyberColors.techPurple, 0.1)}
      )`,
      border: `1px solid ${alpha(cyberColors.electricBlue, 0.3)}`,
      backdropFilter: "blur(10px)",
      boxShadow: `
        0 0 20px ${alpha(cyberColors.electricBlue, 0.3)},
        inset 0 1px 0 ${alpha(cyberColors.electricBlue, 0.1)}
      `,
    },
  };

  return (
    <IconButton
      data-text={text}
      onClick={handleClick}
      sx={{
        position: "relative",
        ...buttonStyles[variant],
        color: cyberColors.electricBlue,
        borderRadius: "12px",
        overflow: "hidden",
        animation: isAnimating ? `${neonPulse} 0.5s ease-in-out` : "none",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: `0 0 30px ${alpha(cyberColors.electricBlue, 0.7)}`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, 
            transparent 45%, 
            ${alpha(cyberColors.electricBlue, 0.2)} 50%, 
            transparent 55%
          )`,
          backgroundSize: "200% 200%",
          animation: `${hologramShimmer} 3s linear infinite`,
          pointerEvents: "none",
        },
        ...(size === "small" && { padding: 0.5, fontSize: "0.875rem" }),
        ...(size === "medium" && { padding: 1, fontSize: "1rem" }),
        ...(size === "large" && { padding: 1.5, fontSize: "1.25rem" }),
      }}
    >
      {isAnimating ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <CheckCircle sx={{ color: cyberColors.matrixGreen }} />
        </motion.div>
      ) : (
        <>
          <CopyIcon />
          {children}
        </>
      )}
    </IconButton>
  );
};

// Main Notification Component
export const ClipboardNotification: React.FC<{
  notification: ReturnType<typeof useClipboardNotification>["notification"];
  onClose?: () => void;
}> = ({ notification, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (notification.visible) {
      const interval = setInterval(() => {
        setProgress(prev => Math.max(0, prev - 100 / 30)); // 3 seconds total
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [notification.visible]);

  const getNotificationColor = () => {
    switch (notification.type) {
      case "copy":
        return {
          icon: <CheckCircle sx={{ color: cyberColors.matrixGreen }} />,
          accent: cyberColors.matrixGreen,
          gradient: `linear-gradient(135deg, 
            ${alpha(cyberColors.matrixGreen, 0.1)}, 
            ${alpha(cyberColors.electricBlue, 0.1)}
          )`,
        };
      case "error":
        return {
          icon: <Close sx={{ color: cyberColors.error }} />,
          accent: cyberColors.error,
          gradient: `linear-gradient(135deg, 
            ${alpha(cyberColors.error, 0.1)}, 
            ${alpha(cyberColors.cyberOrange, 0.1)}
          )`,
        };
      default:
        return {
          icon: <AutoAwesome sx={{ color: cyberColors.electricBlue }} />,
          accent: cyberColors.electricBlue,
          gradient: `linear-gradient(135deg, 
            ${alpha(cyberColors.electricBlue, 0.1)}, 
            ${alpha(cyberColors.techPurple, 0.1)}
          )`,
        };
    }
  };

  const { icon, accent, gradient } = getNotificationColor();

  return (
    <NotificationContainer>
      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <NotificationCard>
              {/* Background Effects */}
              <QuantumCore />
              <HologramGrid />
              <DataStream />
              
              {/* Progress Bar */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: alpha(accent, 0.3),
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${accent}, ${cyberColors.electricBlue})`,
                    transition: "width 0.1s linear",
                    boxShadow: `0 0 10px ${accent}`,
                  },
                }}
              />

              {/* Content */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, position: "relative", zIndex: 2 }}>
                {/* Icon Container */}
                <Box
                  sx={{
                    position: "relative",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${alpha(accent, 0.3)}`,
                    boxShadow: `0 0 20px ${alpha(accent, 0.2)}`,
                  }}
                >
                  {icon}
                  
                  {/* Pulsing Effect */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "50%",
                      border: `1px solid ${alpha(accent, 0.5)}`,
                      animation: `${neonPulse} 2s infinite`,
                      pointerEvents: "none",
                    }}
                  />
                </Box>

                {/* Text Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: cyberColors.text,
                      fontFamily: "'Orbitron', monospace",
                      fontWeight: "bold",
                      mb: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {notification.type === "copy" ? (
                      <>
                        <FlashOn sx={{ fontSize: "1rem", color: cyberColors.matrixGreen }} />
                        DATA COPIED
                      </>
                    ) : (
                      <>
                        <Sync sx={{ fontSize: "1rem", color: cyberColors.error }} />
                        TRANSMISSION FAILED
                      </>
                    )}
                  </Typography>
                  
                  <Typography
                    variant="body2"
                    sx={{
                      color: cyberColors.textSecondary,
                      fontFamily: "'Exo 2', sans-serif",
                      fontSize: "0.875rem",
                    }}
                  >
                    {notification.type === "copy" ? (
                      <>
                        <Box component="span" sx={{ color: cyberColors.matrixGreen, fontFamily: "'Courier New', monospace" }}>
                          {notification.text}
                        </Box>{" "}
                        has been copied to your clipboard
                      </>
                    ) : (
                      notification.text
                    )}
                  </Typography>
                </Box>

                {/* Action Button */}
                <IconButton
                  size="small"
                  onClick={onClose}
                  sx={{
                    color: cyberColors.textMuted,
                    "&:hover": {
                      color: accent,
                      transform: "scale(1.1)",
                      background: alpha(accent, 0.1),
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>

              {/* Data Stream Particles */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: "none",
                  overflow: "hidden",
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: "absolute",
                      top: `${20 + i * 15}%`,
                      left: "-100%",
                      width: "100%",
                      height: "1px",
                      background: `linear-gradient(90deg, 
                        transparent, 
                        ${alpha(accent, 0.3)}, 
                        ${alpha(accent, 0.6)}, 
                        ${alpha(accent, 0.3)}, 
                        transparent
                      )`,
                      animation: `${dataStream} ${2 + i * 0.5}s linear ${i * 0.3}s infinite`,
                      filter: "blur(0.5px)",
                    }}
                  />
                ))}
              </Box>
            </NotificationCard>
          </motion.div>
        )}
      </AnimatePresence>
    </NotificationContainer>
  );
};

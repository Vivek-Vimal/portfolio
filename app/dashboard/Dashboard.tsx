import {
  Box,
  Button,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import ProjectVideos from "./ProjectVideo";
import { useRouter } from "next/navigation";
import Company from "./Company";
import Resume from '../resume/page'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Pagination } from 'swiper/modules';
import { RocketLaunch, Terminal, DataObject, Cached, FiberManualRecord, GridView } from "@mui/icons-material";
import { Swiper as SwiperType } from 'swiper';
import { ClipboardNotification, useClipboardNotification } from "@/components/notification";

// Enhanced cyberpunk color scheme with better contrast
export const cyberColors = {
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
} as const;

// Usage examples with new colors:
export const componentStyles = {
  // Electric Blue Button
  electricButton: {
    background: cyberColors.electricBlue,
    border: `1px solid ${cyberColors.borders.electric}`,
    boxShadow: `${cyberColors.glows.medium} ${cyberColors.shadows.electric}`,
    '&:hover': {
      background: `linear-gradient(135deg, ${cyberColors.electricBlue}, ${cyberColors.techPurple})`,
    }
  },
  
  // Cyber Yellow Alert
  cyberAlert: {
    background: `rgba(255, 204, 0, 0.1)`,
    border: `1px solid ${cyberColors.cyberYellow}`,
    color: cyberColors.cyberYellow,
    textShadow: `${cyberColors.glows.soft} ${cyberColors.cyberYellow}`,
  },
  
  // Tech Purple Card
  techCard: {
    background: cyberColors.cardBg,
    border: `2px solid ${cyberColors.techPurple}`,
    boxShadow: `
      0 0 30px ${cyberColors.techPurple}40,
      inset 0 0 20px ${cyberColors.techPurple}20
    `,
  },
  
  // Combined Electric/Tech Gradient
  quantumPanel: {
    background: `linear-gradient(135deg, 
      ${cyberColors.electricBlue}20, 
      ${cyberColors.techPurple}20, 
      ${cyberColors.electricBlue}20
    )`,
    border: `1px solid ${cyberColors.techPurple}`,
    backdropFilter: 'blur(20px)',
  },
  
  // Yellow/Purple Gradient
  digitalGradient: {
    background: `linear-gradient(90deg, 
      ${cyberColors.cyberYellow}30, 
      ${cyberColors.techPurple}30
    )`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
};

// Helper function to create rgba colors with alpha
export const alpha = (color: string, opacity: number): string => {
  // Convert hex to rgb
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Helper function to create gradients
export const createGradient = (gradient: keyof typeof cyberColors.gradients, angle: number = 135): string => {
  const colors = cyberColors.gradients[gradient];
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
};

// Helper function to create glow
export const createGlow = (color: string, intensity: keyof typeof cyberColors.glows = 'medium'): string => {
  return `${cyberColors.glows[intensity]} ${color}`;
};

// Export type for TypeScript
export type CyberColors = typeof cyberColors;
export type GradientType = keyof CyberColors['gradients'];
export type GlowIntensity = keyof CyberColors['glows'];

// Particle system interface
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
}

// Neural network node interface
interface NeuralNode {
  x: number;
  y: number;
  connections: number[];
  pulse: number;
}

const Home: NextPage = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHologramActive, setIsHologramActive] = useState(false);
  const [systemStatus, setSystemStatus] = useState<"ONLINE" | "BOOTING" | "CRITICAL">("BOOTING");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([]);

  const swiperRef = useRef<SwiperType | null>(null);

  // Initialize effects
  useEffect(() => {
    controls.start("visible");
    
    // System boot sequence
    const bootTimer = setTimeout(() => {
      setSystemStatus("ONLINE");
    }, 2000);

    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? cyberColors.neonBlue : cyberColors.neonPink,
      alpha: Math.random() * 0.3 + 0.1,
    }));
    setParticles(initialParticles);

    // Initialize neural network
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const nodes: NeuralNode[] = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: Array.from({ length: 2 }, () => Math.floor(Math.random() * 15)),
      pulse: 0,
    }));
    setNeuralNodes(nodes);

    // Particle animation
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX) % 100,
        y: (p.y + p.speedY) % 100,
        alpha: 0.1 + Math.sin(Date.now() / 1000 + p.x) * 0.2,
      })));
    }, 50);

    // Neural pulse animation
    const neuralInterval = setInterval(() => {
      setNeuralNodes(prev => prev.map(node => ({
        ...node,
        pulse: Math.sin(Date.now() / 1000 + node.x) * 0.3 + 0.3,
      })));
    }, 100);

    return () => {
      clearTimeout(bootTimer);
      clearInterval(particleInterval);
      clearInterval(neuralInterval);
    };
  }, [controls]);

  // Draw effects on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      // Clear with slight fade effect for trails
      ctx.fillStyle = 'rgba(10, 10, 31, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw neural connections with lower opacity
      neuralNodes.forEach(node => {
        node.connections.forEach(connIndex => {
          const target = neuralNodes[connIndex];
          if (target) {
            ctx.beginPath();
            ctx.moveTo(
              (node.x / 100) * canvas.width,
              (node.y / 100) * canvas.height
            );
            ctx.lineTo(
              (target.x / 100) * canvas.width,
              (target.y / 100) * canvas.height
            );
            ctx.strokeStyle = `${cyberColors.matrixGreen}${Math.floor(node.pulse * 30).toString(16)}`;
            ctx.lineWidth = node.pulse * 1;
            ctx.stroke();
          }
        });

        // Draw nodes
        ctx.beginPath();
        ctx.arc(
          (node.x / 100) * canvas.width,
          (node.y / 100) * canvas.height,
          2 + node.pulse * 1,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `${cyberColors.neonBlue}${Math.floor(node.pulse * 100).toString(16)}`;
        ctx.fill();
      });

      // Draw particles with lower opacity
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(
          (particle.x / 100) * canvas.width,
          (particle.y / 100) * canvas.height,
          particle.size,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 100).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [neuralNodes, particles]);

  const slideVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: -45,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: 45,
      filter: "blur(10px)",
      transition: { duration: 0.5 }
    }
  };

  const companies = [
    {
      name: "WIPRO",
      role: "Project Engineer",
      period: "2021 - 2024",
      logo: "/wipro.png",
      description: "Developing insurance solutions using React and API Integrations",
      hue: 300,
      tech: ["React", "TypeScript", "AWS", "Microservices"]
    },
    {
      id: 2,
      name: "Manch Tech",
      role: "Frontend Developer",
      period: "2024 - Present",
      description: "Developing dynamic web applications with React-DND",
      logo: "/manch.png",
      hue: 210,
      tech: ["Next.js", "React-DND", "GraphQL", "Docker"]
    },
    {
      id: 3,
      name: "Freelancing",
      role: "Full Stack Developer",
      period: "2019 - Present",
      description: "Building custom web applications for clients across various industries",
      logo: "/freelancer.png",
      hue: 270,
      tech: ["MERN Stack", "Web3", "Three.js", "Redis"]
    },
  ];

  const { copyToClipboard, notification } = useClipboardNotification();

  const copyToClipboardF = async (text: string) => {
  try {
    await copyToClipboard(text);
    console.log("Copied to clipboard");
  } catch (err) {
    console.error("Failed to copy", err);
  }
};

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        background: `
          linear-gradient(135deg, 
            ${cyberColors.darkBg} 0%, 
            #0f0c29 50%, 
            ${cyberColors.darkBg} 100%
          )
        `,
        color: cyberColors.text,
        pt: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      ref={containerRef}
    >
      <ClipboardNotification notification={notification} />
      {/* Background Canvas for Effects */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.4,
        }}
      />

      {/* Subtle Grid Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main Container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1400px",
          mx: 2,
          mb: 4,
        }}
      >
        {/* System Status Bar */}
        <Box
          component={motion.div}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
            p: 2,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: `1px solid ${cyberColors.neonBlue}40`,
            boxShadow: `
              0 0 30px ${cyberColors.neonBlue}30,
              inset 0 0 20px rgba(0, 240, 255, 0.1)
            `,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FiberManualRecord 
              sx={{ 
                color: systemStatus === "ONLINE" ? cyberColors.matrixGreen : 
                       systemStatus === "BOOTING" ? cyberColors.cyberOrange : "#ff0000",
                animation: systemStatus === "BOOTING" ? "pulse 1s infinite" : "none",
                fontSize: "0.8rem",
              }} 
            />
            <Typography variant="body2" fontFamily="monospace" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
              SYSTEM: <Typography component="span" color={cyberColors.neonBlue} sx={{ fontWeight: 'bold' }}>
                {systemStatus}
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            {["VIVEK.CO"].map((module) => (
              <Box
                key={module}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  background: "rgba(0, 240, 255, 0.15)",
                  borderRadius: "4px",
                  border: `1px solid ${cyberColors.neonBlue}50`,
                  backdropFilter: "blur(5px)",
                }}
              >
                <Typography variant="caption" fontFamily="monospace" sx={{ fontWeight: 'bold' }}>
                  {module}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Navigation Dots */}
          <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1.5,
        mb: 4,
        position: "relative",
        zIndex: 4,
      }}
    >
      {["PROJECTS", "SKILLS", "CONTACT", "ABOUT", "RESUME"].map((label, index) => (
        <motion.div
          key={label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            onClick={() => {
              setActiveSlide(index);
              if (swiperRef.current) {
                swiperRef.current.slideTo(index);
              }
            }}
            sx={{
              width: 45,
              height: 45,
              background: activeSlide === index 
                ? `linear-gradient(135deg, ${cyberColors.neonBlue}30, ${cyberColors.neonPink}30)`
                : "rgba(255, 255, 255, 0.1)",
              border: `1px solid ${activeSlide === index ? cyberColors.neonBlue : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: "50%",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(5px)",
              '&:hover .tooltip': {
                opacity: 1,
              },
            }}
          >
            {activeSlide === index && (
              <motion.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  background: `radial-gradient(circle, ${cyberColors.neonBlue}40, transparent 70%)`,
                  borderRadius: "50%",
                }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Tooltip */}
            <Box
              className="tooltip"
              sx={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                mt: 1,
                px: 1.5,
                py: 0.5,
                background: "rgba(15, 12, 41, 0.95)",
                border: `1px solid ${cyberColors.neonBlue}`,
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                color: cyberColors.neonBlue,
                opacity: 0,
                transition: "opacity 0.3s",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
                boxShadow: `0 0 15px ${cyberColors.neonBlue}50`,
                backdropFilter: "blur(5px)",
              }}
            >
              {label}
            </Box>
            
            <Typography
              variant="caption"
              sx={{
                color: activeSlide === index ? cyberColors.neonBlue : 'rgba(255, 255, 255, 0.8)',
                fontFamily: "monospace",
                fontWeight: "bold",
                position: "relative",
                zIndex: 1,
                fontSize: '0.9rem',
              }}
            >
              {index + 1}
            </Typography>
          </IconButton>
        </motion.div>
      ))}
    </Box>


        {/* Main Swiper */}
          <Swiper
            effect="cards"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={false}
            modules={[EffectCards, Pagination]}
            className="cyberSwiper"
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            style={{
              '--swiper-pagination-color': cyberColors.neonBlue,
              '--swiper-pagination-bullet-inactive-color': cyberColors.text,
              '--swiper-pagination-bullet-inactive-opacity': '0.3',
              'height': '100%',
            } as any}
          >
          {/* PROJECTS SLIDE */}
          <SwiperSlide style={{}}>
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                height: "100%",
                background: `
                  linear-gradient(135deg, 
                    rgba(15, 12, 41, 0.95) 0%, 
                    rgba(106, 27, 154, 0.75) 50%, 
                    rgba(15, 12, 41, 0.95) 100%
                `,
                backdropFilter: "blur(10px)",
                border: `1px solid ${cyberColors.neonBlue}40`,
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: `
                  0 0 60px ${cyberColors.primary}40,
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                `,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Corner accents */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50px",
                  height: "50px",
                  borderTop: `2px solid ${cyberColors.neonBlue}`,
                  borderLeft: `2px solid ${cyberColors.neonBlue}`,
                  borderTopLeftRadius: "20px",
                  boxShadow: `0 0 10px ${cyberColors.neonBlue}`,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "50px",
                  height: "50px",
                  borderBottom: `2px solid ${cyberColors.neonPink}`,
                  borderRight: `2px solid ${cyberColors.neonPink}`,
                  borderBottomRightRadius: "20px",
                  boxShadow: `0 0 10px ${cyberColors.neonPink}`,
                }}
              />
              
              <Box sx={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.4)', 
                borderRadius: '12px',
                p: 2,
                mb: 3,
              }}>
                <ProjectVideos />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 2, flexWrap: 'wrap' }}>
                {["ALL PROJECTS", "GITHUB", "DEMOS"].map((btn) => (
                  <Button
                    key={btn}
                    variant="outlined"
                    size="small"
                    sx={{
                      fontFamily: "monospace",
                      color: cyberColors.neonBlue,
                      borderColor: cyberColors.neonBlue,
                      backgroundColor: 'rgba(0, 240, 255, 0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 240, 255, 0.2)',
                        borderColor: cyberColors.secondary,
                        color: cyberColors.secondary,
                        boxShadow: `0 0 15px ${cyberColors.neonBlue}`,
                      },
                    }}
                  >
                    {btn}
                  </Button>
                ))}
              </Box>

            </motion.div>
          </SwiperSlide>

          {/* SKILLS SLIDE */}
          <SwiperSlide>
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                height: "100%",
                background: `
                  linear-gradient(135deg, 
                    rgba(15, 12, 41, 0.95) 0%, 
                    rgba(0, 240, 255, 0.75) 50%, 
                    rgba(15, 12, 41, 0.95) 100%
                `,
                backdropFilter: "blur(10px)",
                border: `1px solid ${cyberColors.neonBlue}40`,
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: `
                  0 0 60px ${cyberColors.neonBlue}30,
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              <Typography
                variant="h3"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{
                  //color: cyberColors.matrixGreen,
                  color:"#000",
                  my: 3,
                  textShadow: `0 0 15px ${cyberColors.matrixGreen}`,
                  fontFamily: "'Orbitron', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                <GridView /> CORE COMPETENCIES
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 3,
                  mb: 3,
                }}
              >
                {companies.map((company, index) => (
                  <motion.div
                    key={company.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Box sx={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '12px',
                      p: 2,
                      height: '100%',
                    }}>
                      <Company company={company} />
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Tech Stack Visualization */}
              <Box sx={{ 
                mt: 7, 
                p: 3, 
                background: "rgba(0, 0, 0, 0.6)",
                borderRadius: "12px",
                border: `1px solid ${cyberColors.neonBlue}30`,
              }}>
                <Typography variant="h6" color={cyberColors.neonBlue} gutterBottom sx={{ fontFamily: "'Orbitron', sans-serif" }}>
                  TECH STACK FLOW
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {["React", "Next.js", "TypeScript", "React - Native", "React Redux", "REST", "Integration"].map((tech, i) => (
                    <motion.div
                      key={tech}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      <Box
                        sx={{
                          padding: "8px 16px",
                          background: "rgba(0, 240, 255, 0.1)",
                          borderRadius: "20px",
                          fontFamily: "monospace",
                          fontSize: "0.9rem",
                          border: `1px solid ${cyberColors.neonBlue}50`,
                          color: cyberColors.neonBlue,
                          fontWeight: 'bold',
                          backdropFilter: 'blur(5px)',
                        }}
                      >
                        {tech}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </SwiperSlide>

          {/* CONTACT SLIDE */}
          <SwiperSlide>
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: `
                  linear-gradient(135deg, 
                    rgba(15, 12, 41, 0.95) 0%, 
                    rgba(255, 0, 240, 0.75) 50%, 
                    rgba(15, 12, 41, 0.95) 100%
                `,
                backdropFilter: "blur(10px)",
                border: `1px solid ${cyberColors.neonPink}40`,
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "3rem",
                boxShadow: `
                  0 0 60px ${cyberColors.neonPink}30,
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#fff",
                  mb: 3,
                  textShadow: `0 0 20px ${cyberColors.neonPink}`,
                  fontFamily: "'Orbitron', sans-serif",
                  textAlign: "center",
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                INITIATE CONNECTION
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: cyberColors.text,
                  mb: 4,
                  textAlign: "center",
                  maxWidth: "600px",
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  padding: 3,
                  borderRadius: '12px',
                  border: `1px solid ${cyberColors.neonBlue}30`,
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              >
                <Typography component="span" color={cyberColors.neonBlue} fontWeight="bold">
                  Ready to architect the future? 
                </Typography>{" "}
                Lets collaborate on groundbreaking digital experiences.
              </Typography>

              {/* Holographic Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHologramActive(true)}
                onHoverEnd={() => setIsHologramActive(false)}
                style={{ position: "relative" }}
              >
                <AnimatePresence>
                  {isHologramActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      style={{
                        position: "absolute",
                        top: "-20px",
                        left: "-20px",
                        right: "-20px",
                        bottom: "-20px",
                        background: `radial-gradient(circle, ${cyberColors.neonPink}30, transparent 70%)`,
                        borderRadius: "50px",
                        filter: "blur(15px)",
                      }}
                    />
                  )}
                </AnimatePresence>
                
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<RocketLaunch />}
                  onClick={() => router.push("/contact")}
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    background: `linear-gradient(45deg, ${cyberColors.neonPink}, ${cyberColors.neonBlue})`,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                    padding: { xs: "10px 24px", md: "12px 32px" },
                    borderRadius: "50px",
                    border: "none",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    boxShadow: `
                      0 0 30px ${cyberColors.neonPink},
                      inset 0 1px 0 rgba(255, 255, 255, 0.3)
                    `,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${cyberColors.neonBlue}, ${cyberColors.neonPink})`,
                      boxShadow: `
                        0 0 50px ${cyberColors.neonBlue},
                        inset 0 1px 0 rgba(255, 255, 255, 0.3)
                      `,
                    },
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    TRANSMISSION REQUEST
                  </motion.span>
                </Button>
              </motion.div>

              {/* Contact Channels */}
              <Box sx={{ 
                display: "flex", 
                gap: 2, 
                mt: 4, 
                flexWrap: "wrap", 
                justifyContent: "center",
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: 2,
                borderRadius: '12px',
                border: `1px solid ${cyberColors.neonGreen}30`,
              }}>
                {[{label:"EMAIL",value:"vivekvimal50@gmail.com"},
                 {label:"LINKEDIN", value:"https://www.linkedin.com/in/vivek-vimal/"},
                  {label:"GITHUB", value:"https://github.com/dot69-wq"},
                 {label:"LEETCODE", value:"https://leetcode.com/u/vivekvimal/"}].map((channel, index:number) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        fontFamily: "monospace",
                        color: cyberColors.neonGreen,
                        borderColor: cyberColors.neonGreen,
                        backgroundColor: 'rgba(0, 255, 65, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 255, 65, 0.2)',
                          borderColor: cyberColors.neonGreen,
                          boxShadow: `0 0 15px ${cyberColors.neonGreen}30`,
                        },
                      }}
                      onClick={() => copyToClipboardF(channel.value)}
                    >
                      {channel.label}
                    </Button>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </SwiperSlide>

          {/* ABOUT SLIDE */}
          <SwiperSlide>
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                background: `
                  linear-gradient(135deg, 
                    rgba(15, 12, 41, 0.95) 0%, 
                    rgba(255, 107, 0, 0.75) 50%, 
                    rgba(15, 12, 41, 0.95) 100%
                `,
                backdropFilter: "blur(10px)",
                border: `1px solid ${cyberColors.cyberOrange}40`,
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "3rem",
                boxShadow: `
                  0 0 60px ${cyberColors.cyberOrange}30,
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                `,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#fff",
                  mb: 4,
                  textShadow: `0 0 20px ${cyberColors.cyberOrange}`,
                  fontFamily: "'Orbitron', sans-serif",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  fontSize: { xs: '1.5rem', md: '2.5rem' },
                }}
              >
                <Terminal /> SYSTEM_OPERATOR
              </Typography>

              <Box sx={{ 
                maxWidth: "800px", 
                mx: "auto",
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                padding: 3,
                borderRadius: '12px',
                border: `1px solid ${cyberColors.neonBlue}30`,
                mb: 4,
              }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: cyberColors.text,
                    mb: 3,
                    lineHeight: 1.8,
                    textAlign: "center",
                    fontFamily: "'Share Tech Mono', monospace",
                  }}
                >
                  <Typography component="span" color={cyberColors.neonBlue} fontWeight="bold">
                    [REACT_NEXT_SPECIALIST]
                  </Typography>{" "}
                  with 4+ years experience in architecting cutting-edge web solutions.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    mb: 4,
                    lineHeight: 1.7,
                    textAlign: "center",
                    fontFamily: "'Share Tech Mono', monospace",
                  }}
                >
                  Specializing in <strong>high-performance applications</strong>,{" "}
                  <strong>real-time systems</strong>, and{" "}
                  <strong>immersive UI/UX experiences</strong>. Passionate about{" "}
                  <Typography component="span" color={cyberColors.matrixGreen} fontWeight="bold">
                    pushing technological boundaries
                  </Typography>{" "}
                  and creating digital solutions that shape tomorrow.
                </Typography>
              </Box>

              {/* Stats Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                  gap: 2,
                  mt: 2,
                  mb: 4,
                }}
              >
                {[
                  { label: "PROJECTS", value: "25+", color: cyberColors.neonBlue },
                  { label: "CLIENTS", value: "15+", color: cyberColors.neonPink },
                  { label: "CODE HOURS", value: "5K+", color: cyberColors.neonGreen },
                  { label: "TECH STACK", value: "8+", color: cyberColors.cyberOrange },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 2,
                        background: "rgba(0, 0, 0, 0.6)",
                        borderRadius: "12px",
                        border: `1px solid ${stat.color}50`,
                        boxShadow: `0 0 15px ${stat.color}30`,
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          color: stat.color,
                          fontFamily: "'Orbitron', sans-serif",
                          textShadow: `0 0 10px ${stat.color}`,
                          fontSize: { xs: '1.75rem', md: '2.5rem' },
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: cyberColors.text,
                          fontFamily: "monospace",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          fontWeight: 'bold',
                          fontSize: '0.8rem',
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<Cached />}
                  onClick={() => router.push("/about")}
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    fontFamily: "'Orbitron', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    padding: { xs: "10px 24px", md: "12px 32px" },
                    borderRadius: "50px",
                    backgroundColor: 'rgba(255, 107, 0, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 107, 0, 0.2)',
                      borderColor: cyberColors.cyberOrange,
                      boxShadow: `0 0 30px ${cyberColors.cyberOrange}`,
                    },
                  }}
                >
                  FULL SYSTEM SCAN
                </Button>
              </motion.div>
            </motion.div>
          </SwiperSlide>

          {/* RESUME SLIDE */}
          <SwiperSlide>
            <motion.div
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                height: "100%",
                background: `
                  linear-gradient(135deg, 
                    rgba(15, 12, 41, 0.95) 0%, 
                    rgba(0, 255, 65, 0.75) 50%, 
                    rgba(15, 12, 41, 0.95) 100%
                `,
                backdropFilter: "blur(10px)",
                border: `1px solid ${cyberColors.matrixGreen}40`,
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: `
                  0 0 60px ${cyberColors.matrixGreen}30,
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                `,
              }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: "#fff",
                  mb: 3,
                  mt: 5,
                  textShadow: `0 0 15px ${cyberColors.matrixGreen}`,
                  fontFamily: "'Orbitron', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                <DataObject /> SYSTEM SPECIFICATIONS
              </Typography>
              
              <Box sx={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '12px',
                padding: 2,
                mb: 3,
              }}>
                <Resume />
              </Box>
            </motion.div>
          </SwiperSlide>
        </Swiper>

        {/* Terminal Footer */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          sx={{
            mt: 4,
            p: 2,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: `1px solid ${cyberColors.neonBlue}50`,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: { xs: '0.7rem', md: '0.9rem' },
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 0 20px ${cyberColors.neonBlue}30`,
          }}
        >
          {/* Scrolling terminal text */}
          <motion.div
            style={{
              whiteSpace: "nowrap",
              willChange: "transform",
            }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Typography
              component="span"
              sx={{
                color: cyberColors.matrixGreen,
                mr: 4,
                fontWeight: 'bold',
              }}
            >
              &gt; SYSTEM_ACTIVE | USER: VISITOR | TIME: {new Date().toLocaleTimeString()} | 
              NETWORK: STABLE | SECURITY: ENABLED | 
              AI_ASSIST: ONLINE | RENDER_ENGINE: OPTIMAL | 
            </Typography>
          </motion.div>
          
          {/* Static terminal info */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ color: cyberColors.neonBlue, fontFamily: "'Share Tech Mono', monospace" }}>
              &gt; Last access: {new Date().toDateString()}
            </Typography>
            <Typography sx={{ color: cyberColors.matrixGreen, fontFamily: "'Share Tech Mono', monospace" }}>
              &gt; Connection: ENCRYPTED ✓
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .cyberSwiper {
          width: 100%;
          height: 650px;
        }
        
        .cyberSwiper .swiper-slide {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent !important;
        }
        
        @media (max-width: 768px) {
          .cyberSwiper {
            height: 550px;
          }
        }
        
        @media (max-width: 480px) {
          .cyberSwiper {
            height: 500px;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, ${cyberColors.neonBlue}, ${cyberColors.neonPink});
          border-radius: 5px;
          border: 2px solid rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, ${cyberColors.neonPink}, ${cyberColors.neonBlue});
        }
        
        /* Selection color */
        ::selection {
          background: ${cyberColors.neonBlue}40;
          color: white;
        }
        
        /* Focus styles for accessibility */
        *:focus {
          outline: 2px solid ${cyberColors.neonBlue};
          outline-offset: 2px;
        }
      `}</style>
    </Box>
  );
};

export default Home;
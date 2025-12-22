"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Typography,
  keyframes,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";

// Smoother 3D animation with eased transitions
const rotate3D = keyframes`
  0% {
    transform: rotateY(0deg) rotateX(10deg);
    filter: hue-rotate(0deg);
  }
  33% {
    transform: rotateY(120deg) rotateX(15deg);
    filter: hue-rotate(120deg);
  }
  66% {
    transform: rotateY(240deg) rotateX(10deg);
    filter: hue-rotate(240deg);
  }
  100% {
    transform: rotateY(360deg) rotateX(10deg);
    filter: hue-rotate(360deg);
  }
`;

// Softer neon pulse with smoother transitions
const neonPulse = keyframes`
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.8; 
    filter: drop-shadow(0 0 8px currentColor) brightness(1);
  }
  50% { 
    transform: scale(1.08); 
    opacity: 1; 
    filter: drop-shadow(0 0 15px currentColor) brightness(1.2);
  }
`;

// Subtle glitch effect
const glitch = keyframes`
  0%, 100% {
    text-shadow: 
      0.5px 0 0 rgba(0, 255, 255, 0.7),
      -0.5px -0.25px 0 rgba(255, 0, 255, 0.7);
    transform: translate(0);
  }
  25% {
    text-shadow: 
      -0.5px -0.25px 0 rgba(0, 255, 255, 0.7),
      0.25px 0.25px 0 rgba(255, 0, 255, 0.7);
    transform: translate(0.25px, -0.25px);
  }
  50% {
    text-shadow: 
      0.25px 0.5px 0 rgba(0, 255, 255, 0.7),
      0.5px 0 0 rgba(255, 0, 255, 0.7);
    transform: translate(-0.25px, 0.25px);
  }
  75% {
    text-shadow: 
      -0.25px 0 0 rgba(0, 255, 255, 0.7),
      -0.25px -0.25px 0 rgba(255, 0, 255, 0.7);
    transform: translate(0.25px, 0);
  }
`;

// Smoother scanlines
const scanlines = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 12px; }
`;

// Gradient shimmer for connections
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

// Color palette
const COLORS = {
  cyan: "hsl(180, 100%, 50%)",
  magenta: "hsl(300, 100%, 50%)",
  blue: "hsl(210, 100%, 50%)",
  pink: "hsl(330, 100%, 60%)",
  neonBlue: "hsl(200, 100%, 50%)",
  neonPink: "hsl(320, 100%, 50%)",
};

// Color transitions for smooth hue shifting
const getSmoothHue = (baseHue: number, index: number, total: number, time: number) => {
  const hueOffset = (index / total) * 120; // Spread across 120 degrees
  const pulse = Math.sin(time * 0.5 + index * 0.1) * 20; // Subtle oscillation
  return (baseHue + hueOffset + pulse) % 360;
};

// Styled components
const CyberpunkContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  maxWidth: "700px",
  maxHeight: "700px",
  margin: "0 auto",
  perspective: "1500px",
  cursor:
    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2300ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>\') 12 12, auto',
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(0deg, rgba(0,255,255,0.08) 1px, transparent 1px)",
    backgroundSize: "100% 6px",
    animation: `${scanlines} 2s linear infinite`,
    pointerEvents: "none",
    zIndex: 100,
    opacity: 0.2,
    mixBlendMode: "screen",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "350px",
    maxHeight: "350px",
    perspective: "1000px",
  },
}));

const MatrixSphereWrapper = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  animation: `${rotate3D} 60s infinite linear`,
  transition: "animation-play-state 0.3s ease",
  "&:hover": {
    animationPlayState: "paused",
  },
});

const HologramLayer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "depth" && prop !== "hue" && prop !== "active",
})<{ depth: number; hue: number; active: boolean }>(
  ({ depth, hue, active, theme }) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    border: `1px solid hsla(${hue}, 100%, 50%, ${0.15 + depth * 0.02})`,
    transform: `translateZ(${depth * 30 - 150}px)`,
    boxShadow: `
      inset 0 0 ${depth * 20}px hsla(${hue}, 100%, 50%, ${0.1 + depth * 0.01}),
      0 0 ${depth * 15}px hsla(${hue}, 100%, 50%, ${0.2 + depth * 0.02})
    `,
    filter: active
      ? `blur(0.5px) brightness(1.2)`
      : "blur(0.25px)",
    transition: `
      opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      filter 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)
    `,
    opacity: active ? 0.9 : 0.4 - depth * 0.02,
    background: `
      radial-gradient(
        circle at center,
        hsla(${hue}, 100%, 50%, ${0.03 + depth * 0.005}) 0%,
        transparent ${60 + depth * 2}%
      )
    `,
    [theme.breakpoints.down("sm")]: {
      transform: `translateZ(${depth * 20 - 80}px)`,
      boxShadow: `
        inset 0 0 ${depth * 10}px hsla(${hue}, 100%, 50%, 0.1),
        0 0 ${depth * 8}px hsla(${hue}, 100%, 50%, 0.15)
      `,
    },
  })
);

const DataNode = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "x" &&
    prop !== "y" &&
    prop !== "z" &&
    prop !== "size" &&
    prop !== "hue",
})<{ x: number; y: number; z: number; size: number; hue: number }>(
  ({ x, y, z, size, hue, theme }) => {
    const baseColor = `hsla(${hue}, 100%, 70%, 0.95)`;
    
    return {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: baseColor,
      transform: `translate3d(${x}px, ${y}px, ${z}px)`,
      boxShadow: `
        0 0 ${size * 3}px hsla(${hue}, 100%, 50%, 0.8),
        0 0 ${size * 6}px hsla(${hue}, 100%, 50%, 0.4)
      `,
      transition: `
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)
      `,
      cursor: "pointer",
      animation: `${neonPulse} ${3 + Math.random() * 2}s infinite ease-in-out`,
      willChange: "transform, box-shadow, filter",
      "&:hover": {
        transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${
          theme.breakpoints.down("sm") ? 2 : 2.8
        })`,
        boxShadow: `
          0 0 ${size * 8}px hsla(${hue}, 100%, 60%, 1),
          0 0 ${size * 16}px hsla(${hue}, 100%, 50%, 0.6)
        `,
        zIndex: 100,
        filter: "brightness(1.5)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: "-3px",
        left: "-3px",
        right: "-3px",
        bottom: "-3px",
        borderRadius: "50%",
        border: `1px solid hsla(${hue}, 100%, 85%, 0.6)`,
        animation: `${neonPulse} ${4 + Math.random() * 3}s infinite ease-in-out reverse`,
        pointerEvents: "none",
      },
      [theme.breakpoints.down("sm")]: {
        width: `${Math.max(size * 0.6, 2)}px`,
        height: `${Math.max(size * 0.6, 2)}px`,
      },
    };
  }
);

const DataConnection = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "x1" &&
    prop !== "y1" &&
    prop !== "x2" &&
    prop !== "y2" &&
    prop !== "hue" &&
    prop !== "active",
})<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  hue: number;
  active: boolean;
}>(({ x1, y1, x2, y2, hue, active, theme }) => {
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `${length}px`,
    height: "1.5px",
    background: `
      linear-gradient(
        90deg,
        transparent,
        hsla(${hue}, 100%, 60%, ${active ? 0.9 : 0.4}),
        transparent
      )
    `,
    transformOrigin: "0 0",
    transform: `translate(${x1}px, ${y1}px) rotate(${angle}deg)`,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: active ? 1 : 0.6,
    "&::after": {
      content: '""',
      position: "absolute",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: `hsla(${hue}, 100%, 70%, 0.9)`,
      top: "50%",
      left: "0",
      transform: "translate(-50%, -50%)",
      boxShadow: `0 0 8px hsla(${hue}, 100%, 50%, 0.8)`,
      animation: `${neonPulse} 3s infinite ease-in-out`,
      transition: "all 0.3s ease",
    },
    [theme.breakpoints.down("sm")]: {
      height: "1px",
      "&::after": {
        width: "5px",
        height: "5px",
      },
    },
  };
});

const CyberCore = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  background: `
    linear-gradient(
      135deg,
      rgba(0, 20, 40, 0.7) 0%,
      rgba(20, 0, 40, 0.7) 100%
    )
  `,
  backdropFilter: "blur(10px)",
  border: `1px solid ${COLORS.cyan}`,
  boxShadow: `
    inset 0 0 20px rgba(0, 255, 255, 0.2),
    0 0 30px rgba(0, 255, 255, 0.3),
    0 0 0 1px rgba(255, 0, 255, 0.2)
  `,
  animation: `${neonPulse} 8s infinite ease-in-out`,
  width: "100%",
  maxWidth: "500px",
  padding: "2.5rem",
  borderRadius: "12px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "0",
    left: "-100%",
    width: "200%",
    height: "100%",
    background: `
      linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      )
    `,
    animation: `${shimmer} 3s infinite linear`,
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "320px",
    padding: "1.5rem",
  },
}));

const CyberpunkSphere = () => {
  const sphereRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Optimized sphere parameters
  const layers = isMobile ? 8 : 12;
  const nodes = isMobile ? 50 : 80;
  const connections = isMobile ? 30 : 50;

  // Smoother time animation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      const deltaTime = (currentTime - lastTime) / 1000;
      setTime(prev => prev + deltaTime * 0.5); // Slower, smoother animation
      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Generate smooth layer colors with gradient from cyan to magenta
  const layerColors = Array.from({ length: layers }).map((_, i) => {
    const baseHue = i < layers / 2 ? 180 : 300; // Cyan for first half, magenta for second
    return getSmoothHue(baseHue, i, layers, time);
  });

  // Generate optimized node positions with smoother movement
  const nodePositions = Array.from({ length: nodes }).map((_, i) => {
    // Smooth spherical distribution
    const phi = Math.acos(-1 + (2 * i) / nodes);
    const theta = Math.sqrt(nodes * Math.PI) * phi;
    
    const radius = isMobile
      ? 120 + Math.sin(time * 0.4 + phi * 2) * 20
      : 220 + Math.sin(time * 0.4 + phi * 2) * 40;

    // Smooth position calculation
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    // Determine node color based on position
    const isPinkNode = z > 0; // Pink for top hemisphere, cyan for bottom
    const baseHue = isPinkNode ? 300 : 180;
    const hue = getSmoothHue(baseHue, i, nodes, time);

    return {
      x,
      y,
      z,
      size: isMobile
        ? 4 + Math.sin(time * 0.3 + i * 0.2) * 2
        : 6 + Math.sin(time * 0.3 + i * 0.2) * 3,
      hue,
    };
  });

  // Generate optimized connections (only between nearby nodes)
  const connectionPaths = Array.from({ length: connections }).map((_, i) => {
    const node1 = i % nodes;
    // Connect to nearby nodes for cleaner look
    const node2 = (node1 + Math.floor(Math.sqrt(nodes))) % nodes;
    
    const active = activeNode === node1 || activeNode === node2;
    const distance = Math.sqrt(
      Math.pow(nodePositions[node2].x - nodePositions[node1].x, 2) +
      Math.pow(nodePositions[node2].y - nodePositions[node1].y, 2)
    );

    // Only show connections if nodes are close enough
    if (distance > (isMobile ? 200 : 350)) return null;

    return {
      x1: nodePositions[node1].x,
      y1: nodePositions[node1].y,
      x2: nodePositions[node2].x,
      y2: nodePositions[node2].y,
      hue: (nodePositions[node1].hue + nodePositions[node2].hue) / 2,
      active,
    };
  }).filter(Boolean);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: `
          radial-gradient(
            circle at center,
            rgba(10, 10, 40, 1) 0%,
            rgba(0, 0, 10, 1) 70%,
            rgba(0, 0, 0, 1) 100%
          )
        `,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(0, 255, 255, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 70%,
              rgba(255, 0, 255, 0.1) 0%,
              transparent 50%
            )
          `,
          pointerEvents: "none",
        },
      }}
      onClick={() => router.push("/dashboard")}
    >
      <CyberpunkContainer ref={sphereRef}>
        <MatrixSphereWrapper>
          {/* Holographic layers */}
          {Array.from({ length: layers }).map((_, i) => (
            <HologramLayer
              key={i}
              depth={i}
              hue={layerColors[i]}
              active={activeLayer === i}
              onMouseEnter={() => setActiveLayer(i)}
              onMouseLeave={() => setActiveLayer(null)}
            />
          ))}

          {/* Data connections */}
          {connectionPaths.map((conn, i) => conn && (
            <DataConnection
              key={i}
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              hue={conn.hue}
              active={conn.active}
            />
          ))}

          {/* Data nodes */}
          {nodePositions.map((node, i) => (
            <DataNode
              key={i}
              x={node.x}
              y={node.y}
              z={node.z}
              size={node.size}
              hue={node.hue}
              onClick={(e) => {
                e.stopPropagation();
                setActiveNode(activeNode === i ? null : i);
              }}
              onMouseEnter={() => setActiveNode(i)}
              onMouseLeave={() => setActiveNode(null)}
            />
          ))}
        </MatrixSphereWrapper>
      </CyberpunkContainer>

      {/* Central core */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          maxWidth: "700px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          p: isMobile ? 2 : 4,
          display: "grid",
          placeItems: "center",
        }}
      >
        <CyberCore sx={{ pointerEvents: "auto" }}>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            sx={{
              background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.magenta})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "900",
              mb: isMobile ? 1 : 2,
              animation: `${glitch} 4s infinite`,
              fontFamily: "'Orbitron', 'Courier New', monospace",
              letterSpacing: "3px",
              fontSize: isMobile ? "1.1rem" : "inherit",
              textShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
            }}
          >
            CYBERPUNK SPHERE
          </Typography>
          
          <Typography
            variant={isMobile ? "body2" : "h6"}
            sx={{
              color: COLORS.cyan,
              mb: isMobile ? 0.75 : 1.5,
              fontFamily: "'Courier New', monospace",
              fontWeight: "600",
              fontSize: isMobile ? "0.85rem" : "inherit",
              opacity: 0.9,
            }}
          >
            SYSTEM EXPERIENCE: 4 YEARS
          </Typography>

          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{
              color: COLORS.neonBlue,
              maxWidth: "90%",
              mb: isMobile ? 1.25 : 2,
              fontFamily: "'Courier New', monospace",
              fontSize: isMobile ? "0.85rem" : "inherit",
              lineHeight: 1.6,
            }}
          >
            SPECIALIZATION: REACT - NEXT.JS 
          </Typography>
          
          <Box sx={{ mb: isMobile ? 1.5 : 2 }}>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.magenta,
                fontFamily: "'Courier New', monospace",
                fontWeight: "600",
                display: "block",
                mb: 0.5,
                fontSize: isMobile ? "0.75rem" : "0.9rem",
              }}
            >
              STATUS: ONLINE
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.cyan,
                fontFamily: "'Courier New', monospace",
                fontWeight: "600",
                display: "block",
                fontSize: isMobile ? "0.75rem" : "0.9rem",
              }}
            >
              ACCESS: DEVELOPER
            </Typography>
          </Box>

          <Typography
            variant={isMobile ? "body1" : "h5"}
            sx={{
              color: COLORS.cyan,
              fontWeight: "700",
              mt: isMobile ? 1 : 2.5,
              fontFamily: "'Orbitron', 'Courier New', monospace",
              letterSpacing: "2px",
              fontSize: isMobile ? "0.95rem" : "inherit",
              opacity: 0.95,
            }}
          >
            INITIALIZING...
          </Typography>
          
          <Box
            sx={{
              width: "85%",
              height: "6px",
              background: `
                linear-gradient(
                  90deg,
                  ${COLORS.cyan},
                  ${COLORS.magenta},
                  ${COLORS.cyan}
                )
              `,
              mt: isMobile ? 1.5 : 3,
              borderRadius: "3px",
              boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                right: 0,
                bottom: 0,
                background: `
                  linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.6),
                    transparent
                  )
                `,
                animation: `${shimmer} 1.5s infinite linear`,
              },
            }}
          />
        </CyberCore>
      </Box>
    </Box>
  );
};

export default CyberpunkSphere;
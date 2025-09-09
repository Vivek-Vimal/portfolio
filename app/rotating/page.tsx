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

// Cyberpunk-style 3D animation
const rotate3D = keyframes`
  0% {
    transform: rotateY(0deg) rotateX(15deg) rotateZ(5deg);
  }
  33% {
    transform: rotateY(120deg) rotateX(25deg) rotateZ(-5deg);
  }
  66% {
    transform: rotateY(240deg) rotateX(5deg) rotateZ(10deg);
  }
  100% {
    transform: rotateY(360deg) rotateX(15deg) rotateZ(5deg);
  }
`;

// Dual-color neon pulse effect
const neonPulse = keyframes`
  0%, 100% { 
    transform: scale(1); 
    opacity: 0.8; 
    filter: drop-shadow(0 0 5px #00ffff);
  }
  50% { 
    transform: scale(1.05); 
    opacity: 1; 
    filter: drop-shadow(0 0 20px #ff00ff);
  }
`;

// Balanced glitch effect
const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 #00fffc, -0.05em -0.025em 0 #ff00ff;
  }
  14% {
    text-shadow: 0.05em 0 0 #00fffc, -0.05em -0.025em 0 #ff00ff;
  }
  15% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #ff00ff;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #ff00ff;
  }
  50% {
    text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #ff00ff, 0 -0.05em 0 #ff00ff;
  }
  99% {
    text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #ff00ff, 0 -0.05em 0 #ff00ff;
  }
  100% {
    text-shadow: -0.025em 0 0 #00fffc, -0.025em -0.025em 0 #ff00ff;
  }
`;

// Scanlines effect
const scanlines = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 10px; }
`;

// Styled components with balanced color scheme
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
      "linear-gradient(0deg, rgba(0,255,255,0.1) 1px, transparent 1px)",
    backgroundSize: "100% 5px",
    animation: `${scanlines} 1s linear infinite`,
    pointerEvents: "none",
    zIndex: 100,
    opacity: 0.3,
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "350px",
    maxHeight: "350px",
    perspective: "800px",
  },
}));

const MatrixSphereWrapper = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  animation: `${rotate3D} 45s infinite alternate ease-in-out`,
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
    border: `1px solid hsla(${hue}, 100%, 50%, ${0.2 + depth * 0.05})`,
    transform: `translateZ(${depth * 40 - 200}px)`,
    boxShadow: `inset 0 0 ${depth * 15}px hsla(${hue}, 100%, 50%, 0.3),
             0 0 ${depth * 10}px hsla(${hue}, 100%, 50%, 0.4)`,
    filter: active
      ? `blur(1px) drop-shadow(0 0 5px hsl(${hue}, 100%, 50%))`
      : "blur(0.5px)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: active ? 1 : 0.7 - depth * 0.03,
    background: `radial-gradient(circle at center, 
    hsla(${hue}, 100%, 50%, ${0.02 + depth * 0.01}) 0%, 
    transparent ${50 + depth * 3}%)`,
    [theme.breakpoints.down("sm")]: {
      transform: `translateZ(${depth * 20 - 100}px)`,
      boxShadow: `inset 0 0 ${depth * 8}px hsla(${hue}, 100%, 50%, 0.3),
               0 0 ${depth * 5}px hsla(${hue}, 100%, 50%, 0.4)`,
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
  ({ x, y, z, size, hue, theme }) => ({
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundColor: `hsla(${hue}, 100%, 70%, 0.9)`,
    transform: `translate3d(${x}px, ${y}px, ${z}px)`,
    boxShadow: `0 0 ${size * 2}px hsla(${hue}, 100%, 50%, 0.9),
             0 0 ${size * 4}px hsla(${hue}, 100%, 50%, 0.5)`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    animation: `${neonPulse} ${2 + Math.random() * 3}s infinite`,
    "&:hover": {
      transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${
        theme.breakpoints.down("sm") ? 1.8 : 2.5
      })`,
      boxShadow: `0 0 ${size * 6}px hsla(${hue}, 100%, 50%, 1)`,
      zIndex: 100,
      filter: `drop-shadow(0 0 5px hsl(${hue}, 100%, 50%))`,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-2px",
      left: "-2px",
      right: "-2px",
      bottom: "-2px",
      borderRadius: "50%",
      border: `1px solid hsl(${hue}, 100%, 80%)`,
      animation: `${neonPulse} ${3 + Math.random() * 4}s infinite reverse`,
    },
    [theme.breakpoints.down("sm")]: {
      width: `${size * 0.7}px`,
      height: `${size * 0.7}px`,
    },
  })
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
    height: "1px",
    backgroundColor: `hsla(${hue}, 100%, 50%, ${active ? 0.8 : 0.3})`,
    transformOrigin: "0 0",
    transform: `translate(${x1}px, ${y1}px) rotate(${angle}deg)`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `linear-gradient(90deg, 
      hsla(${hue}, 100%, 50%, 0), 
      hsla(${hue}, 100%, 80%, ${active ? 0.9 : 0.6}), 
      hsla(${hue}, 100%, 50%, 0))`,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: `hsl(${hue}, 100%, 80%)`,
      top: "-2.5px",
      left: "0",
      boxShadow: `0 0 5px hsl(${hue}, 100%, 50%)`,
      animation: `${neonPulse} 2s infinite`,
    },
    [theme.breakpoints.down("sm")]: {
      "&::after": {
        width: "4px",
        height: "4px",
        top: "-1.5px",
      },
    },
  };
});

const CyberCore = styled(Box)(({ theme }) => ({
  // position: "absolute",
  // top: "50%",
  // left: "50%",
  // transform: "translate(-50%, -50%) translateZ(200px)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: "rgba(0,0,0,0.4)",
  animation: `${neonPulse} 4s infinite ease-in-out`,
  width: "100%",
  maxWidth: "500px",
  padding: "2rem",
  borderRadius:"8px",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    border: "1px solid rgba(255,0,255,0.3)",
    borderRadius: "50%",
    animation: `${neonPulse} 6s infinite ease-in-out reverse`,
  },
  [theme.breakpoints.down("sm")]: {
    transform: "translate(-50%, -50%) translateZ(100px)",
    maxWidth: "350px",
    "&::before": {
      top: "-5px",
      left: "-5px",
      right: "-5px",
      bottom: "-5px",
    },
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

  // Generate sphere parameters - reduce complexity on mobile
  const layers = isMobile ? 10 : 15;
  const nodes = isMobile ? 60 : 120;
  const connections = isMobile ? 40 : 80;

  // Animate time for organic movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Generate layer colors with both blue and pink hues
  const layerColors = Array.from({ length: layers }).map((_, i) => {
    // Every 3rd layer gets a pink hue (300°)
    return i % 3 === 0 ? (300 + time * 5) % 360 : (180 + time * 10) % 360;
  });

  // Generate nodes with balanced color distribution
  const nodePositions = Array.from({ length: nodes }).map((_, i) => {
    const angle1 =
      (i * (360 / nodes) * Math.PI) / 180 +
      Math.sin(time * 0.5 + i * 0.1) * 0.3;
    const angle2 = Math.acos(Math.random() * 2 - 1);
    const radius = isMobile
      ? 125 + Math.sin(time * 0.3 + i * 0.05) * 25
      : 250 + Math.sin(time * 0.3 + i * 0.05) * 50;

    // About 20% of nodes will be pink/magenta
    const isPinkNode = i % 5 === 0;
    const baseHue = isPinkNode ? 300 : 180; // Pink or blue base
    const hueVariation = (i * 30) / nodes;

    return {
      x: Math.sin(angle2) * Math.cos(angle1) * radius,
      y: Math.sin(angle2) * Math.sin(angle1) * radius,
      z: Math.cos(angle2) * radius,
      size: isMobile
        ? 3 + Math.sin(time * 0.2 + i) * 2
        : 4 + Math.sin(time * 0.2 + i) * 3,
      hue: (baseHue + hueVariation + time * 20) % 360,
    };
  });

  // Generate connections between nodes
  const connectionPaths = Array.from({ length: connections }).map((_, i) => {
    const node1 = i % nodes;
    const node2 = (i * 7) % nodes;
    const active = activeNode === node1 || activeNode === node2;

    return {
      x1: nodePositions[node1].x,
      y1: nodePositions[node1].y,
      x2: nodePositions[node2].x,
      y2: nodePositions[node2].y,
      hue: (nodePositions[node1].hue + nodePositions[node2].hue) / 2,
      active,
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        //position: "relative",
        background:
          "radial-gradient(circle at center, #0a0a20 0%, #000000 100%)",
      }}
      onClick={() => router.push("/dashboard")}
    >
      <CyberpunkContainer ref={sphereRef}>
        <MatrixSphereWrapper>
          {/* Generate holographic layers */}
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

          {/* Generate data connections */}
          {connectionPaths.map((conn, i) => (
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

          {/* Generate data nodes */}
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
            />
          ))}
        </MatrixSphereWrapper>
      </CyberpunkContainer>

      {/* Cyberpunk central core */}
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
          p: isMobile ? 2 : 6,
          display: "grid",
          placeItems: "center",
        }}
      >
        <CyberCore>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            sx={{
              color: "#00ffff",
              fontWeight: "bold",
              textShadow: "0 0 10px #00ffff, 0 0 5px #ff00ff",
              mb: isMobile ? 1 : 2,
              animation: `${glitch} 3s infinite`,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "2px",
              fontSize: isMobile ? "1rem" : "inherit",
            }}
          >
            FRONTEND DEVELOPER
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "h6"}
            sx={{
              color: "#00ffff",
              mb: isMobile ? 0.5 : 1,
              textShadow: "0 0 5px #00ffff",
              fontFamily: "'Courier New', monospace",
              fontSize: isMobile ? "0.8rem" : "inherit",
            }}
          >
            SYSTEM EXP: 4 YEARS
          </Typography>

          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{
              color: "#00ffff",
              maxWidth: "80%",
              mb: isMobile ? 1 : 2,
              textShadow: "0 0 5px #00ffff",
              fontFamily: "'Courier New', monospace",
              fontSize: isMobile ? "0.8rem" : "inherit",
            }}
          >
            SPECIALIZATION: REACT/NEXT JS
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#ff00ff",
              fontFamily: "'Courier New', monospace",
              textShadow: "0 0 3px #ff00ff",
              display: "block",
              mb: isMobile ? 0.5 : 1,
              fontSize: isMobile ? "0.7rem" : "inherit",
            }}
          >
            CURRENT STATUS: ONLINE
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#00ffff",
              fontFamily: "'Courier New', monospace",
              textShadow: "0 0 3px #00ffff",
              display: "block",
              fontSize: isMobile ? "0.7rem" : "inherit",
            }}
          >
            ACCESS LEVEL: USER
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h5"}
            sx={{
              color: "#00ffff",
              fontWeight: "bold",
              textShadow: "0 0 10px #00ffff, 0 0 5px #ff00ff",
              mt: isMobile ? 1 : 3,
              fontFamily: "'Courier New', monospace",
              letterSpacing: "1px",
              fontSize: isMobile ? "0.9rem" : "inherit",
            }}
          >
            INITIALIZING SYSTEM...
          </Typography>
          <Box
            sx={{
              width: "80%",
              height: "4px",
              background: "linear-gradient(90deg, #00ffff, #ff00ff)",
              mt: isMobile ? 1 : 2,
              borderRadius: "2px",
              boxShadow: "0 0 10px #00ffff, 0 0 5px #ff00ff",
              position: "relative",
              overflow: "hidden",
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                animation: `${neonPulse} 2s infinite linear`,
              },
            }}
          />
        </CyberCore>
      </Box>
    </Box>
  );
};

export default CyberpunkSphere;

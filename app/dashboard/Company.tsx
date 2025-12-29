"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { Box, Typography, keyframes, styled, Tooltip, IconButton } from "@mui/material";
import Image from "next/image";
import { 
  Launch, 
  Analytics, 
  Timeline, 
  Terminal,
  AutoAwesome,
  Schema,
  Lan
} from "@mui/icons-material";

// Advanced Cyberpunk colors
const cyberColors = {
  primary: "#00F9FF",
  secondary: "#FF00FF",
  tertiary: "#00FF9D",
  quaternary: "#FFCC00",
  quintenary: "#9D00FF",
  background: "#000515",
  deepSpace: "#000022",
  glass: "rgba(255, 255, 255, 0.05)"
};

// Advanced Animations
const quantumPulse = keyframes`
  0%, 100% { 
    box-shadow: 
      0 0 5px ${cyberColors.primary},
      inset 0 0 10px ${cyberColors.quintenary}20,
      0 0 20px ${cyberColors.secondary}30; 
  }
  50% { 
    box-shadow: 
      0 0 15px ${cyberColors.secondary},
      inset 0 0 20px ${cyberColors.quintenary}40,
      0 0 40px ${cyberColors.primary}50; 
  }
`;

const hologramScan = keyframes`
  0% { 
    background-position: 0% 0%;
    opacity: 0.2;
  }
  50% { 
    opacity: 0.4;
  }
  100% { 
    background-position: 100% 100%;
    opacity: 0.2;
  }
`;

const matrixRain = keyframes`
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(1000%); opacity: 0; }
`;

const circuitFlow = keyframes`
  0% { stroke-dashoffset: 1000; opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { stroke-dashoffset: 0; opacity: 0.3; }
`;

const float3D = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg) rotateY(0deg); 
  }
  25% { 
    transform: translateY(-10px) rotateX(5deg) rotateY(5deg); 
  }
  50% { 
    transform: translateY(-20px) rotateX(0deg) rotateY(10deg); 
  }
  75% { 
    transform: translateY(-10px) rotateX(-5deg) rotateY(5deg); 
  }
`;

const dataStream = keyframes`
  0% { 
    background-position: 0% 0%;
    background-size: 200% 200%;
  }
  100% { 
    background-position: 200% 200%;
    background-size: 200% 200%;
  }
`;

const neuralPulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    opacity: 0.3;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.8;
  }
`;

interface Company {
  name: string;
  logo?: string;
  role: string;
  period: string;
  description: string;
  hue: number;
  tech?: string[];
  achievements?: string[];
}

// Styled components
const QuantumCard = styled(Box)(({ hue, isexpanded }: { hue: number, isexpanded: boolean }) => ({
  position: "relative",
  background: `
    linear-gradient(135deg, 
      rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.05) 0%,
      rgba(255, ${Math.cos(hue * Math.PI/180) * 255}, ${Math.sin(hue * Math.PI/180) * 255}, 0.08) 100%
    )`,
  backdropFilter: "blur(20px)",
  border: `1px solid rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.3)`,
  borderRadius: "20px",
  padding: isexpanded ? "2rem" : "1.5rem",
  height: isexpanded ? "auto" : "100%",
  minHeight: isexpanded ? "500px" : "300px",
  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  perspective: "1000px",
  transformStyle: "preserve-3d",
  
  "&:hover": {
    transform: isexpanded ? "translateY(-5px)" : "translateY(-10px) rotateX(5deg) rotateY(-5deg)",
    boxShadow: `
      0 20px 40px rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.3),
      0 0 60px rgba(255, ${Math.cos(hue * Math.PI/180) * 255}, ${Math.sin(hue * Math.PI/180) * 255}, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    "& .hologram-overlay": { 
      opacity: 0.6,
      animation: `${hologramScan} 3s linear infinite`,
    },
    "& .quantum-core": {
      animation: `${neuralPulse} 2s infinite`,
    },
  },
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(45deg, 
        transparent 45%, 
        rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.1) 50%, 
        transparent 55%
      )`,
    backgroundSize: "200% 200%",
    animation: `${dataStream} 6s linear infinite`,
    pointerEvents: "none",
  },
  
  "&::after": {
    content: '""',
    position: "absolute",
    top: "2px",
    left: "2px",
    right: "2px",
    bottom: "2px",
    borderRadius: "18px",
    border: `1px solid rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.1)`,
    pointerEvents: "none",
  },
}));

const HologramOverlay = styled(Box)(({ hue }: { hue: number }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    linear-gradient(0deg, 
      transparent 0%, 
      rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.05) 2px, 
      transparent 4px
    ),
    linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, ${Math.cos(hue * Math.PI/180) * 255}, ${Math.sin(hue * Math.PI/180) * 255}, 0.03) 2px, 
      transparent 4px
    )`,
  backgroundSize: "30px 30px",
  opacity: 0.3,
  pointerEvents: "none",
  transition: "opacity 0.3s ease",
}));

const QuantumCore = styled(Box)(({ hue }: { hue: number }) => ({
  position: "absolute",
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: `
    radial-gradient(
      circle at 30% 30%,
      rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.3),
      rgba(255, ${Math.cos(hue * Math.PI/180) * 255}, ${Math.sin(hue * Math.PI/180) * 255}, 0.1) 70%,
      transparent 100%
    )`,
  filter: "blur(20px)",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
}));

const LogoOrb = styled(Box)(({ hue, isexpanded }: { hue: number; isexpanded: boolean }) => ({
  width: isexpanded ? "120px" : "80px",
  height: isexpanded ? "120px" : "80px",
  borderRadius: "50%",
  border: `2px solid rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.5)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem 0",
  position: "relative",
  overflow: "hidden",
  background: `
    radial-gradient(
      circle at 30% 30%,
      rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.1),
      rgba(0, 0, 0, 0.6) 70%
    )`,
  boxShadow: `
    0 0 30px rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.3),
    inset 0 0 20px rgba(0, 0, 0, 0.5)
  `,
  animation: `${float3D} 8s ease-in-out infinite`,
  
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-4px",
    borderRadius: "50%",
    padding: "2px",
    background: `
      linear-gradient(
        45deg, 
        rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 1),
        rgba(255, ${Math.cos(hue * Math.PI/180) * 255}, ${Math.sin(hue * Math.PI/180) * 255}, 1),
        rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 1)
      )`,
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    animation: `${quantumPulse} 4s infinite alternate`,
  },
  
  "&::after": {
    content: '""',
    position: "absolute",
    width: "150%",
    height: "150%",
    background: `
      conic-gradient(
        from 0deg,
        transparent,
        rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.3),
        transparent 330deg
      )`,
    animation: "spin 10s linear infinite",
    pointerEvents: "none",
  },
}));

const NeuralCircuit = ({ hue, isexpanded }: { hue: number; isexpanded: boolean }) => (
  <svg
    width={isexpanded ? "120%" : "100%"}
    height={isexpanded ? "120%" : "100%"}
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.4,
      overflow: "visible",
      pointerEvents: "none",
    }}
  >
    {/* Main Neural Network */}
    <defs>
      <linearGradient id={`neuralGradient-${hue}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={`hsl(${hue}, 100%, 60%)`} stopOpacity="0.3" />
        <stop offset="100%" stopColor={`hsl(${(hue + 60) % 360}, 100%, 60%)`} stopOpacity="0.3" />
      </linearGradient>
      <filter id={`glow-${hue}`}>
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Neural Paths */}
    {Array.from({ length: 8 }).map((_, i) => {
      const points = Array.from({ length: 10 }, (_, j) => ({
        x: (j / 9) * 100,
        y: 30 + Math.sin(j * 0.8 + i * 0.5) * 20 + i * 5
      }));
      
      const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
      
      return (
        <path
          key={`neural-${i}`}
          d={pathData}
          stroke={`url(#neuralGradient-${hue})`}
          strokeWidth="0.3"
          fill="none"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          filter={`url(#glow-${hue})`}
          style={{
            animation: `${circuitFlow} ${8 + i * 2}s linear infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      );
    })}

    {/* Neural Nodes */}
    {Array.from({ length: 20 }).map((_, i) => {
      const x = 10 + Math.random() * 80;
      const y = 20 + Math.random() * 60;
      return (
        <circle
          key={`node-${i}`}
          cx={x}
          cy={y}
          r="0.8"
          fill={`hsl(${hue}, 100%, 70%)`}
          opacity="0.6"
          style={{
            animation: `${neuralPulse} ${2 + Math.random() * 3}s infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      );
    })}
  </svg>
);

const MatrixRain = ({ hue, count = 20 }: { hue: number; count?: number }) => {
  const streams = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      x: (i * 100) / count,
      delay: Math.random() * 5,
      speed: 1 + Math.random() * 2,
      length: 5 + Math.floor(Math.random() * 10),
      chars: Array.from({ length: 5 + Math.floor(Math.random() * 10) }, () => 
        String.fromCharCode(0x30A0 + Math.random() * 96)
      )
    }))
  , [count]);

  return (
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
      {streams.map((stream, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: `${stream.x}%`,
            width: "2px",
            color: `hsl(${hue}, 100%, 70%)`,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "12px",
            animation: `${matrixRain} ${stream.speed}s linear infinite`,
            animationDelay: `${stream.delay}s`,
          }}
        >
          {stream.chars.map((char, j) => (
            <Box
              key={j}
              sx={{
                opacity: (stream.chars.length - j) / stream.chars.length,
                textShadow: `0 0 5px hsl(${hue}, 100%, 50%)`,
                display: "block",
              }}
            >
              {char}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const TechStack = ({ tech, hue }: { tech?: string[]; hue: number }) => {
  if (!tech || tech.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "center",
        mt: 2,
        position: "relative",
        zIndex: 2,
      }}
    >
      {tech.map((item, index) => (
        <Tooltip key={index} title={item} arrow>
          <Box
            sx={{
              padding: "4px 12px",
              background: `linear-gradient(135deg, 
                rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.1),
                rgba(255, ${Math.cos(hue * Math.PI/180) * 255}, ${Math.sin(hue * Math.PI/180) * 255}, 0.05)
              )`,
              borderRadius: "20px",
              border: `1px solid rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.3)`,
              fontFamily: "'Courier New', monospace",
              fontSize: "0.7rem",
              color: `hsl(${hue}, 100%, 70%)`,
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: `0 0 10px rgba(${Math.sin(hue * Math.PI/180) * 255}, ${Math.cos(hue * Math.PI/180) * 255}, 255, 0.5)`,
              },
            }}
          >
            {item}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

const AchievementTimeline = ({ achievements, hue }: { achievements?: string[]; hue: number }) => {
  if (!achievements || achievements.length === 0) return null;

  return (
    <Box
      sx={{
        mt: 2,
        position: "relative",
        zIndex: 2,
        width: "100%",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: `hsl(${(hue + 60) % 360}, 100%, 70%)`,
          fontFamily: "'Courier New', monospace",
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <Timeline fontSize="small" /> KEY ACHIEVEMENTS
      </Typography>
      <Box
        sx={{
          position: "relative",
          pl: 2,
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "2px",
            background: `linear-gradient(to bottom, 
              transparent, 
              hsl(${hue}, 100%, 50%), 
              transparent)`,
          },
        }}
      >
        {achievements.map((achievement, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              mb: 1,
              pl: 2,
              "&::before": {
                content: '""',
                position: "absolute",
                left: "-6px",
                top: "6px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: `hsl(${hue}, 100%, 50%)`,
                boxShadow: `0 0 10px hsl(${hue}, 100%, 50%)`,
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                fontFamily: "'Courier New', monospace",
                fontSize: "0.75rem",
                lineHeight: 1.4,
              }}
            >
              {achievement}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

type Props = { 
  company: Company;
  expanded?: boolean;
  onToggle?: () => void;
};

const CompanyCardComponent: React.FC<Props> = ({ 
  company, 
  //expanded = false,
  //onToggle 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  //const [isExpanded, setIsExpanded] = useState(expanded);
  //const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    // Create quantum particles
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("quantum-particle");
      
      const size = 2 + Math.random() * 3;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, 
          hsl(${company.hue}, 100%, 70%), 
          hsl(${(company.hue + 60) % 360}, 100%, 50%),
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

      cardElement.appendChild(particle);
    }

    return () => {
      const particles = cardElement.querySelectorAll(".quantum-particle");
      particles.forEach(p => p.remove());
    };
  }, [company.hue]);

  // const handleCardClick = () => {
  //   if (onToggle) {
  //     onToggle();
  //   } else {
  //     setIsExpanded(!isExpanded);
  //     setShowDetails(!showDetails);
  //   }
  // };

  return (
    <QuantumCard
      hue={company.hue}
      isexpanded={false}
      //onClick={handleCardClick}
      ref={cardRef}
      sx={{
        animation: false ?`${float3D} 12s ease-in-out infinite` : 'none',
      }}
    >
      {/* Background Effects */}
      <HologramOverlay hue={company.hue} className="hologram-overlay" />
      <QuantumCore hue={company.hue} className="quantum-core" />
      <NeuralCircuit hue={company.hue} isexpanded={false} />
      <MatrixRain hue={company.hue} count={false ? 40 : 20} />

      {/* Logo Orb */}
      <LogoOrb hue={company.hue} isexpanded={false}>
        {company.logo ? (
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={false ? 80 : 60}
            height={false ? 80 : 60}
            style={{
              objectFit: "contain",
              filter: `
                drop-shadow(0 0 8px rgba(${Math.sin(company.hue * Math.PI/180) * 255}, ${Math.cos(company.hue * Math.PI/180) * 255}, 255, 0.7))
                brightness(1.2)
              `,
              zIndex: 2,
            }}
          />
        ) : (
          <Typography
            variant="h4"
            sx={{
              color: `hsl(${company.hue}, 100%, 70%)`,
              fontFamily: "'Orbitron', monospace",
              fontWeight: "bold",
              textShadow: `0 0 10px hsl(${company.hue}, 100%, 50%)`,
              zIndex: 2,
            }}
          >
            {company.name.charAt(0)}
          </Typography>
        )}
      </LogoOrb>

      {/* Company Name */}
      <Typography
        variant={false ? "h4" : "h5"}
        sx={{
          color: `hsl(${company.hue}, 100%, 70%)`,
          mb: 1,
          textTransform: "uppercase",
          letterSpacing: "2px",
          fontFamily: "'Orbitron', monospace",
          fontWeight: "bold",
          textShadow: `0 0 10px hsl(${company.hue}, 100%, 50%)`,
          position: "relative",
          zIndex: 2,
          background: `linear-gradient(45deg, 
            hsl(${company.hue}, 100%, 60%), 
            hsl(${(company.hue + 60) % 360}, 100%, 60%)
          )`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: `${dataStream} 8s linear infinite`,
        }}
      >
        {company.name}
      </Typography>

      {/* Role */}
      <Typography
        variant={false ? "h6" : "subtitle1"}
        sx={{
          color: `hsl(${(company.hue + 120) % 360}, 100%, 70%)`,
          mb: 0.5,
          fontFamily: "'Exo 2', sans-serif",
          fontWeight: 600,
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Terminal fontSize="small" />
        {company.role}
      </Typography>

      {/* Period */}
      <Typography
        variant="caption"
        sx={{
          //color: `rgba(${Math.sin(company.hue * Math.PI/180) * 255}, ${Math.cos(company.hue * Math.PI/180) * 255}, 255, 0.9)`,
          color: "orange",
          display: "block",
          mb: 2,
          fontFamily: "'Courier New', monospace",
          fontWeight: "bold",
          position: "relative",
          zIndex: 2,
          padding: "4px 12px",
          background: "rgba(0, 0, 0, 0.3)",
          borderRadius: "12px",
          border: `1px solid rgba(${Math.sin(company.hue * Math.PI/180) * 255}, ${Math.cos(company.hue * Math.PI/180) * 255}, 255, 0.3)`,
        }}
      >
        <Schema fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
        {company.period}
      </Typography>

      {/* Description */}
      <Typography
        variant={false ? "body1" : "body2"}
        sx={{
          color: "rgba(255, 255, 255, 0.95)",
          fontFamily: "'Exo 2', sans-serif",
          fontSize: false ? "0.95rem" : "0.85rem",
          position: "relative",
          zIndex: 2,
          mb: false ? 3 : 0,
          lineHeight: 1.6,
          background: "rgba(0, 0, 0, 0.2)",
          padding: false ? "1rem" : "0.5rem",
          borderRadius: "8px",
          border: `1px solid rgba(255, 255, 255, 0.1)`,
        }}
      >
        {company.description}
      </Typography>

      {/* Expanded Content */}
      {false && (
        <Box
          sx={{
            width: "100%",
            position: "relative",
            zIndex: 2,
            mt: 2,
            animation: "fadeIn 0.5s ease-out",
          }}
        >
          {/* Tech Stack */}
          <TechStack tech={company.tech} hue={company.hue} />
          
          {/* Achievements */}
          <AchievementTimeline achievements={company.achievements} hue={company.hue} />

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              mt: 3,
              pt: 2,
              borderTop: `1px solid rgba(${Math.sin(company.hue * Math.PI/180) * 255}, ${Math.cos(company.hue * Math.PI/180) * 255}, 255, 0.2)`,
            }}
          >
            <Tooltip title="View Detailed Analytics" arrow>
              <IconButton
                size="small"
                sx={{
                  color: `hsl(${company.hue}, 100%, 70%)`,
                  background: "rgba(0, 0, 0, 0.3)",
                  border: `1px solid rgba(${Math.sin(company.hue * Math.PI/180) * 255}, ${Math.cos(company.hue * Math.PI/180) * 255}, 255, 0.3)`,
                  "&:hover": {
                    background: `rgba(${Math.sin(company.hue * Math.PI/180) * 255}, ${Math.cos(company.hue * Math.PI/180) * 255}, 255, 0.1)`,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Analytics />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Explore Projects" arrow>
              <IconButton
                size="small"
                sx={{
                  color: `hsl(${(company.hue + 60) % 360}, 100%, 70%)`,
                  background: "rgba(0, 0, 0, 0.3)",
                  border: `1px solid rgba(255, ${Math.cos(company.hue * Math.PI/180) * 255}, ${Math.sin(company.hue * Math.PI/180) * 255}, 0.3)`,
                  "&:hover": {
                    background: `rgba(255, ${Math.cos(company.hue * Math.PI/180) * 255}, ${Math.sin(company.hue * Math.PI/180) * 255}, 0.1)`,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Launch />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Network Analysis" arrow>
              <IconButton
                size="small"
                sx={{
                  color: `hsl(${(company.hue + 120) % 360}, 100%, 70%)`,
                  background: "rgba(0, 0, 0, 0.3)",
                  border: `1px solid rgba(${Math.cos(company.hue * Math.PI/180) * 255}, 255, ${Math.sin(company.hue * Math.PI/180) * 255}, 0.3)`,
                  "&:hover": {
                    background: `rgba(${Math.cos(company.hue * Math.PI/180) * 255}, 255, ${Math.sin(company.hue * Math.PI/180) * 255}, 0.1)`,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Lan />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}

      {/* Expand/Collapse Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 3,
        }}
      >
        <Box
          sx={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, 
              hsl(${company.hue}, 100%, 60%), 
              hsl(${(company.hue + 60) % 360}, 100%, 60%)
            )`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: `0 0 10px hsl(${company.hue}, 100%, 50%)`,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.2)",
              boxShadow: `0 0 20px hsl(${company.hue}, 100%, 50%)`,
            },
          }}
        >
          <AutoAwesome
            sx={{
              fontSize: "12px",
              color: "white",
              transform: false ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </Box>
      </Box>

      {/* Status Indicator */}
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: `hsl(${company.hue}, 100%, 50%)`,
            boxShadow: `0 0 10px hsl(${company.hue}, 100%, 50%)`,
            animation: `${neuralPulse} 2s infinite`,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: `hsl(${company.hue}, 100%, 70%)`,
            fontFamily: "'Courier New', monospace",
            fontSize: "0.6rem",
          }}
        >
          {false ? "EXPANDED" : "ACTIVE"}
        </Typography>
      </Box>
    </QuantumCard>
  );
};

export default CompanyCardComponent;
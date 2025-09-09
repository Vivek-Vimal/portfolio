"use client";

import React, { useEffect, useRef } from "react";
import { Box, Typography, keyframes, styled } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Cyberpunk colors
const cyberColors = {
  primary: "#00f0ff",
  secondary: "#ff00ff",
  background: "#0a0a20",
};

// Animations
const neonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 5px ${cyberColors.primary}; }
  50% { box-shadow: 0 0 15px ${cyberColors.secondary}; }
`;

const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 22%, 24%, 55% { opacity: 0.7; }
`;

const hologramGrid = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 0 20px; }
`;

const circuitAnimation = keyframes`
  0% { stroke-dashoffset: 1000; }
  100% { stroke-dashoffset: 0; }
`;

// const particleFloat = keyframes`
//   0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
//   20% { opacity: 1; }
//   100% { transform: translate(var(--tx), var(--ty)) rotate(360deg); opacity: 0; }
// `;

interface Company {
  name: string;
  logo?: string;
  role: string;
  period: string;
  description: string;
  hue: number;
}

// Styled components
const CompanyCard = styled(Box)(({ hue }: { hue: number }) => ({
  position: "relative",
  background: "rgba(0, 240, 255, 0.05)",
  //border: "1px solid rgba(0, 240, 255, 0.3)",
  border: `1px solid hsl(${hue}, 100%, 50%)`,
  borderRadius: "8px",
  padding: "1.5rem",
  height: "100%",
  transition: "all 0.3s ease",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: `0 0 20px hsla(${hue}, 100%, 50%, 0.5)`,
    "&::before": { opacity: 1 },
    "& .circuit-path": { animation: `${circuitAnimation} 3s linear infinite` },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(0deg, rgba(0,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
    animation: `${hologramGrid} 5s linear infinite`,
    opacity: 0.5,
    transition: "opacity 0.3s ease",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: `linear-gradient(90deg, transparent, hsl(${hue}, 100%, 50%), transparent)`,
    animation: `${flicker} 3s infinite`,
  },
}));

const LogoContainer = styled(Box)(({ hue }: { hue: number }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  border: `2px solid hsl(${hue}, 100%, 50%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem 0",
  position: "relative",
  overflow: "hidden",
  background: "rgba(0, 0, 0, 0.3)",
  boxShadow: `0 0 15px hsla(${hue}, 100%, 50%, 0.3)`,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-5px",
    borderRadius: "50%",
    padding: "2px",
    background: `linear-gradient(45deg, hsl(${hue}, 100%, 50%), ${cyberColors.secondary})`,
    WebkitMask:
      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    animation: `${neonPulse} 3s infinite alternate`,
  },
}));

const CircuitOverlay = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.3,
      overflow: "visible",
    }}
  >
    <path
      className="circuit-path"
      d="M0,0 L20,0 Q25,0 25,5 L25,15 Q25,20 30,20 L40,20 Q45,20 45,25 L45,75 Q45,80 50,80 L60,80 Q65,80 65,85 L65,95 Q65,100 70,100 L100,100"
      stroke={`hsl(210, 100%, 70%)`}
      strokeWidth="0.5"
      fill="none"
      strokeDasharray="1000"
      strokeDashoffset="1000"
      style={{ animation: `${circuitAnimation} 3s linear infinite paused` }}
    />
    <path
      className="circuit-path"
      d="M100,0 L80,0 Q75,0 75,5 L75,15 Q75,20 70,20 L60,20 Q55,20 55,25 L55,75 Q55,80 50,80 L40,80 Q35,80 35,85 L35,95 Q35,100 30,100 L0,100"
      stroke={`hsl(300, 100%, 70%)`}
      strokeWidth="0.5"
      fill="none"
      strokeDasharray="1000"
      strokeDashoffset="1000"
      style={{
        animation: `${circuitAnimation} 3s linear 0.5s infinite paused`,
      }}
    />
  </svg>
);

// const Particle = styled(Box)(({ hue }: { hue: number }) => ({
//   position: "absolute",
//   width: "3px",
//   height: "3px",
//   borderRadius: "50%",
//   background: `radial-gradient(circle, hsl(${hue}, 100%, 70%), transparent)`,
//   opacity: 0,
//   filter: "blur(1px)",
//   animation: `${particleFloat} ${3 + Math.random() * 4}s infinite`,
// }));
type Props = { company: Company };
const CompanyCardComponent: React.FC<Props> = ({ company }) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.setAttribute("data-hue", company.hue.toString());

      const hue = company.hue;
      particle.style.background = `radial-gradient(circle, hsl(${hue}, 100%, 70%), transparent)`;
      particle.style.animation = `float ${3 + Math.random() * 4}s infinite`;

      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.setProperty("--tx", `${(Math.random() - 0.5) * 100}px`);
      particle.style.setProperty("--ty", `${(Math.random() - 0.5) * 100}px`);
      particle.style.animationDelay = `${Math.random() * 2}s`;

      cardElement.appendChild(particle);
    }

    return () => {
      const particles = cardElement.querySelectorAll(".particle");
      particles.forEach((p) => p.remove());
    };
  }, [company.hue]);

  return (
    <CompanyCard
      hue={company.hue}
      onClick={() => router.push("/company")}
      ref={cardRef}
    >
      <CircuitOverlay />

      <LogoContainer hue={company.hue}>
        {company.logo && (
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={60}
            height={60}
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 0 5px rgba(0, 240, 255, 0.5))",
            }}
          />
        )}
      </LogoContainer>

      <Typography
        variant="h5"
        sx={{
          color: `hsl(${company.hue}, 100%, 70%)`,
          mb: 1,
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontFamily: "'Courier New', monospace",
          textShadow: `0 0 5px hsl(${company.hue}, 100%, 50%)`,
          position: "relative",
          zIndex: 1,
        }}
      >
        {company.name}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          color: cyberColors.secondary,
          mb: 0.5,
          fontFamily: "'Courier New', monospace",
          position: "relative",
          zIndex: 1,
        }}
      >
        {company.role}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: "rgba(0, 240, 255, 0.7)",
          display: "block",
          mb: 2,
          fontFamily: "'Courier New', monospace",
          position: "relative",
          zIndex: 1,
        }}
      >
        {company.period}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(0, 240, 255, 0.8)",
          fontFamily: "'Courier New', monospace",
          fontSize: "0.8rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {company.description}
      </Typography>
    </CompanyCard>
  );
};

export default CompanyCardComponent;

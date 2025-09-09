import {
  Typography,
  Box,
  Button,
  Link,
  IconButton,
  Drawer,
  // List,
  // ListItem,
  // ListItemText,
} from "@mui/material";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Nabla } from "next/font/google";
import { useRouter } from "next/navigation";
import { cyberColors } from "@/app/dashboard/Dashboard";

const nabla = Nabla({
  subsets: ["latin"],
  weight: "400",
});

function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  // const navItems = ["Services", "Product", "About Us"];

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 2.5vw",
        background: "white",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "transparent",
        height: "8rem",
      }}
    >
      <Link href="/dashboard" style={{ textDecoration: "none" }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            initial={{ x: -75, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <Box
              sx={{
                color: "white",
                fontWeight: "900",
                lineHeight: "1.1",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "0 0 10px rgba(0, 150, 255, 0.7)",
                    mb: 2,
                    cursor: "pointer",
                  }}
                >
                  vivek co.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      </Link>

      {isMobile && (
        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: "900",
              fontFamily: nabla.style.fontFamily,
              mb: 3,
            }}
          >
            =
          </Typography>
        </IconButton>
      )}

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer(false)}>
        <Box
          component={motion.div}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          sx={{
            width: 280,
            height: "100vh",
            background: "radial-gradient(circle, #182848, #0A0F24)",
            backdropFilter: "blur(15px)",
            color: "white",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* <List>
            {navItems.map((item, index) => (
              <ListItem
                key={index}
                onClick={toggleDrawer(false)}
                component={motion.div}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3 }}
                sx={{
                  padding: "12px 16px",
                  textAlign: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List> */}

          {/* Auth Buttons */}
          <Box sx={{ textAlign: "center" }}>
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
              onClick={() => {
                router.push("/contact");
                setMobileOpen(false);
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Box>
      </Drawer>
    </header>
  );
}

export default memo(Navbar);

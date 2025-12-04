// App.jsx
import React, { useMemo, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Link,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { motion } from "framer-motion";
import TripPreferencesPage from "./TripPreferencesPage";

// ---------- Root App with Theme ----------
export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#9FA8FF" : "#6A5ACD",
          },
          background: {
            default: mode === "dark" ? "#050716" : "#F4F5FB",
            paper: mode === "dark" ? "rgba(15,16,35,0.9)" : "rgba(255,255,255,0.85)",
          },
        },
        shape: {
          borderRadius: 16,
        },
        typography: {
          fontFamily: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
        },
      }),
    [mode]
  );

  const toggleColorMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background:
            mode === "dark"
              ? "radial-gradient(circle at top, #2E3A8C 0, #050716 45%, #000 100%)"
              : "radial-gradient(circle at top, #B3C6FF 0, #EDF0FF 45%, #F5F5FF 100%)",
        }}
      >
        <Navbar mode={mode} toggleColorMode={toggleColorMode} />

        {/* Main Content Area with Framer Motion transition */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: { xs: 4, md: 6 },
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <TripPreferencesPage />
            </motion.div>
          </Container>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

// ---------- Navbar ----------
function Navbar({ mode, toggleColorMode }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(18px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Toolbar sx={{ maxWidth: "lg", mx: "auto", width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TravelExploreIcon sx={{ fontSize: 28 }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          >
            SnapTrip
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            alignItems: "center",
            mr: 2,
          }}
        >
          <NavLink label="Home" />
          <NavLink label="Preferences" active />
          <NavLink label="Itinerary" />
          <NavLink label="Export" />
        </Box>

        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          aria-label="toggle light/dark mode"
        >
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

function NavLink({ label, active }) {
  return (
    <Typography
      component="span"
      sx={{
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        opacity: active ? 1 : 0.8,
        borderBottom: active ? "2px solid currentColor" : "2px solid transparent",
        pb: 0.5,
        cursor: "pointer",
        "&:hover": { opacity: 1 },
      }}
    >
      {label}
    </Typography>
  );
}

// ---------- Footer ----------
function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid rgba(255,255,255,0.15)",
        py: 2,
        mt: "auto",
        backdropFilter: "blur(16px)",
        backgroundColor: "rgba(0,0,0,0.12)",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} SnapTrip. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FooterLink>Privacy</FooterLink>
          <FooterLink>Terms</FooterLink>
          <FooterLink>Support</FooterLink>
        </Box>
      </Container>
    </Box>
  );
}

function FooterLink({ children }) {
  return (
    <Link
      href="#"
      underline="none"
      sx={{
        fontSize: 13,
        opacity: 0.8,
        "&:hover": { opacity: 1, textDecoration: "underline" },
      }}
    >
      {children}
    </Link>
  );
}

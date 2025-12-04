// App.js
import React, { useMemo, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link,
  IconButton,
  CssBaseline,
} from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import PageWrapper from "./PageWrapper";

// GLOBAL CONTEXT PROVIDER
import { PreferencesProvider } from "./PreferencesContext";

// PAGES
import HomePage from "./HomePage";
import TripPreferencesPage from "./TripPreferencesPage";
import ItineraryPage from "./ItineraryPage";
import ExportPage from "./ExportPage";

/* ------------------ NAVBAR ------------------ */
function Navbar({ mode, toggleTheme }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor:
          mode === "dark"
            ? "rgba(15, 23, 42, 0.9)"
            : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(12px)",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <Toolbar sx={{ maxWidth: 1100, mx: "auto", width: "100%" }}>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          sx={{
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #6A5ACD, #8A7CFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SnapTrip
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {/* Nav Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
          <NavLink label="Home" to="/" />
          <NavLink label="Preferences" to="/preferences" />
          <NavLink label="Itinerary" to="/itinerary" />
          <NavLink label="Export" to="/export" />
        </Box>

        {/* Dark/Light Mode Toggle */}
        <IconButton onClick={toggleTheme} sx={{ ml: 2 }}>
          {mode === "dark" ? (
            <LightModeIcon sx={{ color: "white" }} />
          ) : (
            <DarkModeIcon sx={{ color: "black" }} />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

/* Active navbar link highlight */
function NavLink({ label, to }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      component={RouterLink}
      to={to}
      underline="none"
      sx={{
        fontSize: 18,
        fontWeight: active ? 700 : 500,
        opacity: active ? 1 : 0.7,
        borderBottom: active ? "2px solid currentColor" : "2px solid transparent",
        pb: active ? "2px" : 0,
        transition: "all 0.3s ease",
        "&:hover": {
          opacity: 1,
          textShadow: active
            ? "0 0 20px rgba(106, 90, 205, 0.8), 0 0 30px rgba(106, 90, 205, 0.6)"
            : "0 0 20px rgba(106, 90, 205, 0.8), 0 0 30px rgba(106, 90, 205, 0.6)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {label}
    </Link>
  );
}

/* ------------------ FOOTER ------------------ */
function Footer({ mode }) {
  return (
    <Box
      sx={{
        borderTop: "1px solid rgba(148,163,184,0.3)",
        py: 2,
        mt: "auto",
        backgroundColor:
          mode === "dark" ? "rgba(15,23,42,0.95)" : "#f3f4f6",
        color: mode === "dark" ? "white" : "black",
      }}
    >
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 1,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} SnapTrip
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FooterLink>Privacy</FooterLink>
          <FooterLink>Terms</FooterLink>
          <FooterLink>Support</FooterLink>
        </Box>
      </Box>
    </Box>
  );
}

function FooterLink({ children }) {
  return (
    <Link href="#" underline="hover" sx={{ color: "inherit", fontSize: 13 }}>
      {children}
    </Link>
  );
}

/* ------------------ MAIN APP ------------------ */
function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode]
  );

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <PreferencesProvider>
        <Router>
          <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar mode={mode} toggleTheme={toggleTheme} />

            <Box component="main" sx={{ flexGrow: 1 }}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PageWrapper>
                        <HomePage />
                      </PageWrapper>
                    }
                  />

                  <Route
                    path="/preferences"
                    element={
                      <PageWrapper>
                        <TripPreferencesPage />
                      </PageWrapper>
                    }
                  />

                  <Route
                    path="/itinerary"
                    element={
                      <PageWrapper>
                        <ItineraryPage />
                      </PageWrapper>
                    }
                  />

                  <Route
                    path="/export"
                    element={
                      <PageWrapper>
                        <ExportPage />
                      </PageWrapper>
                    }
                  />
                </Routes>
              </AnimatePresence>
            </Box>

            <Footer mode={mode} />
          </Box>
        </Router>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

export default App;

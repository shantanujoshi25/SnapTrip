// src/PageWrapper.jsx
import React from "react";
import {
  Box,
  Container,
  Paper,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

export default function PageWrapper({ children }) {
  const theme = useTheme();
  const location = useLocation();

  // 3-step flow to show visually
  const steps = ["Trip details", "Preferences", "Itinerary"];

  const pathname = location.pathname;
  let activeStepIndex = null;

  // We start showing the progress only from /preferences onward
  if (pathname.startsWith("/preferences")) {
    activeStepIndex = 1; // Preferences
  } else if (pathname.startsWith("/itinerary")) {
    activeStepIndex = 2; // Itinerary
  }

  const showProgress = activeStepIndex !== null;
  const progressPercent =
    activeStepIndex !== null
      ? ((activeStepIndex + 1) / steps.length) * 100
      : 0;

  const snapPrimary =
    theme.palette.mode === "dark" ? "#a8b4ff" : "#6A5ACD";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: { xs: 3, md: 6 },
        px: { xs: 1.5, md: 3 },
        background:
          theme.palette.mode === "dark"
            ? "radial-gradient(circle at top, #020617, #020617, #0b1120)"
            : "radial-gradient(circle at top, #eff6ff, #e0f2fe, #e5e7eb)",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            backdropFilter: "blur(18px)",
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.96))"
                : "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(219,234,254,0.96))",
          }}
        >
          {/* Top progress / stepper */}
          {showProgress && (
            <Box sx={{ px: { xs: 2.5, md: 4 }, pt: 3, pb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  mb: 1.5,
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ opacity: 0.85, letterSpacing: 1 }}
                >
                  Trip setup progress
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.8 }}
                >
                  Step {activeStepIndex + 1} of {steps.length}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(148,163,184,0.25)"
                        : "rgba(191,219,254,0.7)",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 999,
                      background: `linear-gradient(135deg, ${snapPrimary}, #7C8CFF)`,
                    },
                  }}
                />
              </Box>

              <Stepper
                activeStep={activeStepIndex}
                alternativeLabel
                sx={{
                  "& .MuiStepConnector-line": {
                    borderColor:
                      theme.palette.mode === "dark"
                        ? "rgba(148,163,184,0.4)"
                        : "rgba(148,163,184,0.7)",
                  },
                  "& .MuiStepIcon-root.Mui-active": {
                    color: snapPrimary,
                  },
                  "& .MuiStepIcon-root.Mui-completed": {
                    color: snapPrimary,
                  },
                  "& .MuiStepLabel-label": {
                    typography: "caption",
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(226,232,240,0.85)"
                        : "rgba(30,64,175,0.9)",
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}

          {showProgress && (
            <Box
              sx={{
                mt: 2,
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(148,163,184,0.35)"
                    : "1px solid rgba(148,163,184,0.45)",
              }}
            />
          )}

          {/* Main page content */}
          <Box sx={{ p: { xs: 2.5, md: 4 } }}>{children}</Box>
        </Paper>
      </Container>
    </Box>
  );
}

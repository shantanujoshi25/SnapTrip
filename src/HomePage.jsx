import { Box, Typography, Button, Card, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import TuneIcon from "@mui/icons-material/Tune";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const glassBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(10,12,40,0.90), rgba(35,38,90,0.92))"
      : "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(238,242,255,0.96))";

  const featureCardBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(20,22,50,0.85), rgba(45,48,100,0.87))"
      : "linear-gradient(135deg, rgba(255,255,255,0.88), rgba(245,247,255,0.92))";

  const features = [
    {
      icon: <TuneIcon sx={{ fontSize: 48 }} />,
      title: "Set Preferences",
      description:
        "Choose your travel style, interests, and budget to personalize your experience",
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 48 }} />,
      title: "AI Magic",
      description:
        "Get personalized itinerary recommendations powered by artificial intelligence",
    },
    {
      icon: <FileDownloadIcon sx={{ fontSize: 48 }} />,
      title: "Export & Go",
      description:
        "Download your trip plan in multiple formats and start exploring",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          padding: { xs: 3, md: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* MOVING BACKGROUND CIRCLE 1 */}
        <motion.div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "60vh",
            height: "60vh",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #a8c0ff, #6b5de9)",
            filter: "blur(80px)",
            opacity: 0.35,
            zIndex: 0,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -25, 25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* MOVING BACKGROUND CIRCLE 2 */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "-25%",
            right: "-10%",
            width: "60vh",
            height: "60vh",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff8ae2, #ff5b99)",
            filter: "blur(95px)",
            opacity: 0.25,
            zIndex: 0,
          }}
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 20, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* HERO SECTION - MAIN GLASS CARD */}
        <Card
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 1200,
            borderRadius: 4,
            px: { xs: 3, md: 5 },
            py: { xs: 5, md: 7 },
            position: "relative",
            zIndex: 1,
            backdropFilter: "blur(22px)",
            background: glassBg,
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(120,130,255,0.20)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 24px 60px rgba(0,0,0,0.65)"
                : "0 20px 50px rgba(74,98,220,0.25)",
            textAlign: "center",
            mb: 6,
          }}
        >
          {/* LOGO */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -15, 0],
            }}
            transition={{
              scale: { duration: 0.5, delay: 0.2 },
              opacity: { duration: 0.5, delay: 0.2 },
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }
            }}
          >
            <Box
              component="img"
              src="/snaptripLogo2.png"
              alt="SnapTrip Logo"
              sx={{
                width: { xs: 360, md: 520 },
                height: "auto",
                mb: 3,
                filter: theme.palette.mode === "dark" ? "brightness(1.1)" : "none",
              }}
            />
          </motion.div>

          {/* HEADING */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              sx={{
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #a8c0ff, #c6a8ff)"
                    : "linear-gradient(135deg, #6A5ACD, #8A7CFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Plan Your Perfect Trip with AI
            </Typography>
          </motion.div>

          {/* SUBHEADING */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: 400,
              }}
            >
              Plan your trip in Snap
            </Typography>
          </motion.div>

          {/* CTA BUTTON */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/preferences")}
              sx={{
                px: 5,
                py: 1.8,
                fontSize: "1.1rem",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #6A5ACD, #7C8CFF)",
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 8px 24px rgba(106,90,205,0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #5A4BC0, #6A7CFF)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 32px rgba(106,90,205,0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Card>

        {/* FEATURE CARDS - ANIMATED CAROUSEL */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1400,
            position: "relative",
            zIndex: 1,
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                px: 2,
              }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                  style={{ flex: "1 1 0", minWidth: "300px" }}
                >
                  <Card
                    elevation={6}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      px: 3,
                      py: 4,
                      backdropFilter: "blur(18px)",
                      background: featureCardBg,
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "1px solid rgba(120,130,255,0.15)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 12px 36px rgba(0,0,0,0.4)"
                          : "0 10px 30px rgba(74,98,220,0.15)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 16px 48px rgba(0,0,0,0.6)"
                            : "0 14px 40px rgba(74,98,220,0.25)",
                      },
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mb: 2,
                          color:
                            theme.palette.mode === "dark"
                              ? "#a8c0ff"
                              : "#6A5ACD",
                        }}
                      >
                        {feature.icon}
                      </Box>
                    </motion.div>

                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{ mb: 1.5, textAlign: "center" }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center", lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
}

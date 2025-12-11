import { useRef } from "react";
import { Box, Typography, Button, Card, useTheme, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

import TuneIcon from "@mui/icons-material/Tune";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SavedTripsSection from "./SavedTripsSection";

// Section wrapper with scroll animations
function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <TuneIcon sx={{ fontSize: { xs: 56, md: 64 } }} />,
      title: "Set Preferences",
      description:
        "Choose your travel style, interests, and budget to personalize your experience",
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: { xs: 56, md: 64 } }} />,
      title: "AI Magic",
      description:
        "Get personalized itinerary recommendations powered by artificial intelligence",
    },
    {
      icon: <FileDownloadIcon sx={{ fontSize: { xs: 56, md: 64 } }} />,
      title: "Export & Go",
      description:
        "Download your trip plan in multiple formats and start exploring",
    },
  ];

  const destinations = [
    {
      name: "Paris",
      description: "The City of Light",
      image: "/images/destinations/paris.jpg",
    },
    {
      name: "Tokyo",
      description: "Modern meets Traditional",
      image: "/images/destinations/tokyo.jpg",
    },
    {
      name: "New York",
      description: "The City That Never Sleeps",
      image: "/images/destinations/nyc.jpg",
    },
    {
      name: "San Francisco",
      description: "The Golden City",
      image: "/images/destinations/sf.jpg",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Tell us your preferences",
      description: "Share your destination, dates, interests, and budget",
    },
    {
      number: "02",
      title: "AI creates your itinerary",
      description: "Our AI generates a personalized day-by-day plan",
    },
    {
      number: "03",
      title: "Review and customize",
      description: "Fine-tune your itinerary to match your style",
    },
    {
      number: "04",
      title: "Download and travel",
      description: "Export your plan and embark on your adventure",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      quote:
        "SnapTrip planned my entire 2-week Europe trip in minutes! The AI recommendations were spot-on and saved me hours of research.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      location: "New York, NY",
      quote:
        "I was skeptical at first, but the itinerary was incredibly detailed and personalized. Best travel planning tool I've ever used!",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      location: "Austin, TX",
      quote:
        "As someone who travels frequently, SnapTrip has become my go-to. The AI understands exactly what I'm looking for every time.",
      avatar: "ER",
    },
  ];

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* HERO SECTION - DARK GRADIENT OVERLAY FOR TEXT READABILITY */}
      <Box
        sx={{
          minHeight: { xs: "80vh", sm: "70vh", md: "65vh" },
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "url(/images/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%)",
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            px: { xs: 3, sm: 4 },
            maxWidth: { xs: "100%", sm: "720px", md: "960px", lg: "1400px" }
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              component="img"
              src="/snaptripLogo2.png"
              alt="SnapTrip Logo"
              sx={{
                width: { xs: "70%", sm: 380, md: 480 },
                maxWidth: "100%",
                height: "auto",
                mb: 4,
                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
              }}
            />
          </motion.div>

          {/* Headline with enhanced text shadow */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                mb: 2,
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7), 0px 0px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              Plan Your Perfect Trip with AI
            </Typography>
          </motion.div>

          {/* Tagline with enhanced text shadow */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.75rem" },
                color: "white",
                fontWeight: 400,
                mb: 5,
                textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7), 0px 0px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              Plan your trip in Snap
            </Typography>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/preferences")}
              sx={{
                px: { xs: 4, sm: 6, md: 8 },
                py: { xs: 1.8, sm: 2.2 },
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                borderRadius: "999px",
                background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                color: "#1a1a2e",
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "0 12px 40px rgba(255, 107, 107, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #FF8787 0%, #FFF089 100%)",
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 16px 50px rgba(255, 107, 107, 0.5)",
                },
              }}
            >
              Get Started Free
            </Button>
          </motion.div>
        </Container>

        

      </Box>

      {/* FEATURED DESTINATIONS SECTION - 2x2 GRID */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 3, sm: 4 },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)"
              : "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: { xs: "100%", sm: "720px", md: "960px", lg: "1400px" } }}
        >
          <AnimatedSection>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                textAlign: "center",
                mb: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #a8c0ff, #c6a8ff)"
                    : "linear-gradient(135deg, #6A5ACD, #8A7CFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Get Inspired
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 6,
                color: theme.palette.text.secondary,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Discover amazing destinations around the world
            </Typography>
          </AnimatedSection>

          {/* Auto-scrolling Carousel */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                top: 0,
                bottom: 0,
                width: "80px",
                zIndex: 2,
                pointerEvents: "none",
              },
              "&::before": {
                left: 0,
                background: `linear-gradient(to right, ${
                  theme.palette.mode === "dark"
                    ? "rgba(10, 10, 26, 1)"
                    : "rgba(248, 249, 250, 1)"
                } 0%, transparent 100%)`,
              },
              "&::after": {
                right: 0,
                background: `linear-gradient(to left, ${
                  theme.palette.mode === "dark"
                    ? "rgba(10, 10, 26, 1)"
                    : "rgba(248, 249, 250, 1)"
                } 0%, transparent 100%)`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 3,
                animation: "scroll 30s linear infinite",
                "&:hover": {
                  animationPlayState: "paused",
                },
                "@keyframes scroll": {
                  "0%": {
                    transform: "translateX(0)",
                  },
                  "100%": {
                    transform: "translateX(-50%)",
                  },
                },
              }}
            >
              {/* Duplicate destinations array for seamless loop */}
              {[...destinations, ...destinations].map((dest, index) => (
                <Card
                  key={`${dest.name}-${index}`}
                  sx={{
                    position: "relative",
                    minWidth: { xs: "280px", sm: "350px", md: "450px" },
                    height: { xs: 240, sm: 280, md: 340 },
                    borderRadius: 4,
                    overflow: "hidden",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-12px) scale(1.02)",
                      boxShadow: "0 20px 60px rgba(106, 90, 205, 0.3)",
                      "& .overlay": {
                        opacity: 1,
                      },
                      "& img": {
                        transform: "scale(1.1)",
                      },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={dest.image}
                    alt={dest.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: 3,
                      opacity: 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        fontWeight: 700,
                        mb: 0.5,
                      }}
                    >
                      {dest.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.9)",
                      }}
                    >
                      {dest.description}
                    </Typography>
                  </Box>
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(106, 90, 205, 0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      Explore {dest.name}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ENHANCED FEATURE CARDS SECTION - 3 HORIZONTAL CARDS */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          px: { xs: 2, sm: 3, md: 4 },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #1a1a2e 0%, #0a0a1a 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1600px",
            mx: "auto",
            width: "100%"
          }}
        >
          <AnimatedSection>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                textAlign: "center",
                mb: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #a8c0ff, #c6a8ff)"
                    : "linear-gradient(135deg, #6A5ACD, #8A7CFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              How SnapTrip Works
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 8,
                color: theme.palette.text.secondary,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Your personalized itinerary in three simple steps
            </Typography>
          </AnimatedSection>

          <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <AnimatedSection delay={index * 0.15}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      p: { xs: 4, sm: 5 },
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, rgba(106, 90, 205, 0.1) 0%, rgba(138, 124, 255, 0.05) 100%)"
                          : "linear-gradient(135deg, rgba(106, 90, 205, 0.05) 0%, rgba(138, 124, 255, 0.03) 100%)",
                      border: `2px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(168, 192, 255, 0.1)"
                          : "rgba(106, 90, 205, 0.1)"
                      }`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, #6A5ACD, #8A7CFF, #a8c0ff)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-12px) scale(1.02)",
                        boxShadow: "0 24px 60px rgba(106, 90, 205, 0.25)",
                        borderColor:
                          theme.palette.mode === "dark"
                            ? "rgba(168, 192, 255, 0.3)"
                            : "rgba(106, 90, 205, 0.3)",
                        "&::before": {
                          opacity: 1,
                        },
                        "& .feature-icon": {
                          transform: "scale(1.1) rotate(5deg)",
                        },
                      },
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 3,
                        color:
                          theme.palette.mode === "dark" ? "#a8c0ff" : "#6A5ACD",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        textAlign: "center",
                        fontSize: { xs: "1.3rem", sm: "1.5rem" },
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        textAlign: "center",
                        lineHeight: 1.8,
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Card>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* HOW IT WORKS VISUAL TIMELINE SECTION - HORIZONTAL 4 STEPS */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          px: { xs: 3, sm: 4 },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)"
              : "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <Box
          sx={{
            maxWidth: "1600px",
            mx: "auto",
            width: "100%",
            px: { xs: 2, sm: 3, md: 3 }
          }}
        >
          <AnimatedSection>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                textAlign: "center",
                mb: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #a8c0ff, #c6a8ff)"
                    : "linear-gradient(135deg, #6A5ACD, #8A7CFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Journey to the Perfect Trip
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 10,
                color: theme.palette.text.secondary,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              Four simple steps to your dream itinerary
            </Typography>
          </AnimatedSection>

          <Box sx={{ position: "relative" }}>
            {/* Desktop & Tablet - Horizontal Timeline */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Box
                sx={{
                  position: "absolute",
                  top: "80px",
                  left: { sm: "12.5%", md: "8%", lg: "8%" },
                  right: { sm: "12.5%", md: "8%", lg: "8%" },
                  height: "4px",
                  background: `linear-gradient(90deg, ${
                    theme.palette.mode === "dark"
                      ? "rgba(168, 192, 255, 0.3)"
                      : "rgba(106, 90, 205, 0.2)"
                  } 0%, ${
                    theme.palette.mode === "dark"
                      ? "rgba(198, 168, 255, 0.3)"
                      : "rgba(138, 124, 255, 0.2)"
                  } 100%)`,
                  zIndex: 0,
                }}
              />
              <Grid container spacing={2}>
                {steps.map((step, index) => (
                  <Grid item xs={12} sm={6} md={3} key={step.number}>
                    <AnimatedSection delay={index * 0.15}>
                      <Box
                        sx={{
                          textAlign: "center",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: { sm: 140, lg: 160 },
                            height: { sm: 140, lg: 160 },
                            borderRadius: "50%",
                            background:
                              theme.palette.mode === "dark"
                                ? "linear-gradient(135deg, #6A5ACD 0%, #8A7CFF 100%)"
                                : "linear-gradient(135deg, #6A5ACD 0%, #a8c0ff 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                            mb: 3,
                            boxShadow: "0 12px 40px rgba(106, 90, 205, 0.3)",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            "&:hover": {
                              transform: "scale(1.1)",
                              boxShadow: "0 16px 50px rgba(106, 90, 205, 0.4)",
                            },
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{
                              color: "white",
                              fontWeight: 800,
                              fontSize: { sm: "2.5rem", lg: "3rem" },
                            }}
                          >
                            {step.number}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 1.5,
                            fontSize: { sm: "1.1rem", lg: "1.2rem" },
                          }}
                        >
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            lineHeight: 1.7,
                            px: 2,
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </AnimatedSection>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Mobile Timeline - Vertical */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              {steps.map((step, index) => (
                <AnimatedSection delay={index * 0.1} key={step.number}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      mb: index < steps.length - 1 ? 4 : 0,
                      position: "relative",
                    }}
                  >
                    {index < steps.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: "40px",
                          top: "100px",
                          bottom: "-40px",
                          width: "3px",
                          background:
                            theme.palette.mode === "dark"
                              ? "rgba(168, 192, 255, 0.3)"
                              : "rgba(106, 90, 205, 0.2)",
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #6A5ACD 0%, #8A7CFF 100%)"
                            : "linear-gradient(135deg, #6A5ACD 0%, #a8c0ff 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 8px 24px rgba(106, 90, 205, 0.3)",
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: "white",
                          fontWeight: 800,
                        }}
                      >
                        {step.number}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, pt: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          fontSize: "1.1rem",
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          lineHeight: 1.7,
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </AnimatedSection>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* TESTIMONIALS SECTION - WIDER CARDS */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          px: { xs: 3, sm: 4 },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #1a1a2e 0%, #0a0a1a 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: { xs: "100%", sm: "720px", md: "960px", lg: "1400px" } }}
        >
          <AnimatedSection>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                fontWeight: 700,
                textAlign: "center",
                mb: 2,
                background:
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #a8c0ff, #c6a8ff)"
                    : "linear-gradient(135deg, #6A5ACD, #8A7CFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Loved by Travelers
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                mb: 8,
                color: theme.palette.text.secondary,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              See what our users have to say
            </Typography>
          </AnimatedSection>

          <Grid container spacing={{ xs: 3, sm: 4, md: 5 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.name}>
                <AnimatedSection delay={index * 0.15}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      p: { xs: 3, sm: 4 },
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, rgba(106, 90, 205, 0.08) 0%, rgba(138, 124, 255, 0.04) 100%)"
                          : "linear-gradient(135deg, rgba(106, 90, 205, 0.04) 0%, rgba(138, 124, 255, 0.02) 100%)",
                      border: `1px solid ${
                        theme.palette.mode === "dark"
                          ? "rgba(168, 192, 255, 0.1)"
                          : "rgba(106, 90, 205, 0.1)"
                      }`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 16px 40px rgba(106, 90, 205, 0.2)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #6A5ACD 0%, #8A7CFF 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mr: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ color: "white", fontWeight: 700 }}
                        >
                          {testimonial.avatar}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700 }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontStyle: "italic",
                        color: theme.palette.text.secondary,
                        lineHeight: 1.8,
                        fontSize: "1rem",
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                  </Card>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* FINAL CALL-TO-ACTION SECTION */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          px: { xs: 3, sm: 4 },
          position: "relative",
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
              : "linear-gradient(135deg, #6A5ACD 0%, #8A7CFF 50%, #a8c0ff 100%)",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138, 124, 255, 0.2) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: { xs: "100%", sm: "720px", md: "960px" }
          }}
        >
          <AnimatedSection>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                  fontWeight: 800,
                  color: "white",
                  mb: 3,
                  textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                Ready to plan your perfect trip?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(255,255,255,0.95)",
                  mb: 5,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  textShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                Join thousands of travelers who trust SnapTrip for their adventures
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/preferences")}
                sx={{
                  px: { xs: 5, sm: 7, md: 9 },
                  py: { xs: 2, sm: 2.5 },
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
                  color: "#1a1a2e",
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "0 16px 50px rgba(255, 107, 107, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #FF8787 0%, #FFF089 100%)",
                    transform: "translateY(-6px) scale(1.03)",
                    boxShadow: "0 20px 60px rgba(255, 107, 107, 0.5)",
                  },
                }}
              >
                Start Planning Now
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>

      {/* SAVED TRIPS SECTION */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          px: { xs: 3, sm: 4 },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #0a0a1a 0%, #1a1a2e 100%)"
              : "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: { xs: "100%", sm: "720px", md: "960px", lg: "1400px" } }}
        >
          <SavedTripsSection />
        </Container>
      </Box>
    </Box>
  );
}

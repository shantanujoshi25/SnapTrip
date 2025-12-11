// src/ItineraryPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  Divider,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import {
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  BookmarkAdd as BookmarkAddIcon,
  CalendarToday as CalendarTodayIcon,
  FlightTakeoff as FlightTakeoffIcon,
  AccessTime as AccessTimeIcon,
  Map as MapIcon,
} from "@mui/icons-material";

import { usePreferences } from "./PreferencesContext";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function ItineraryPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const tripDetails = preferences?.tripDetails || {};
  const destination = tripDetails.destination || "Your trip";
  const start = tripDetails.startDate;
  const end = tripDetails.endDate;
  const pace = tripDetails.pace || preferences?.pace || "Balanced";

  useEffect(() => {
    if (!preferences) {
      navigate("/preferences");
      return;
    }
    fetchItinerary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchItinerary() {
    if (!preferences) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:4000/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch itinerary");
      }

      const data = await res.json();
      setItinerary(data.days || []);
    } catch (err) {
      console.error("fetchItinerary error:", err);
      setItinerary([]);
      setError("Could not generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSaveTrip() {
    if (!preferences || !itinerary.length) return;
    setSaving(true);

    const existing =
      JSON.parse(localStorage.getItem("snaptrip_trips") || "[]") || [];

    const destination =
      preferences.tripDetails?.destination || "Untitled trip";
    const start = preferences.tripDetails?.startDate;
    const end = preferences.tripDetails?.endDate;

    const trip = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      title: destination,
      dateRange: start && end ? `${start} to ${end}` : null,
      preferences,
      itinerary,
    };

    localStorage.setItem(
      "snaptrip_trips",
      JSON.stringify([...existing, trip])
    );

    setSaving(false);
    alert("Trip saved to this browser.");
  }

  function handleExportPdf() {
    if (!itinerary.length) {
      alert("No itinerary to export yet.");
      return;
    }

    const doc = new jsPDF();
    let y = 10;

    const dest =
      preferences?.tripDetails?.destination?.trim() || "Your SnapTrip";
    const start = preferences?.tripDetails?.startDate;
    const end = preferences?.tripDetails?.endDate;

    // Title
    doc.setFontSize(16);
    doc.text(`SnapTrip itinerary: ${dest}`, 10, y);
    y += 8;

    // Dates
    if (start && end) {
      doc.setFontSize(11);
      doc.text(`Dates: ${start} to ${end}`, 10, y);
      y += 8;
    }

    y += 4;
    doc.setFontSize(11);

    const lineHeight = 6;

    const addLine = (text) => {
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(text, 10, y);
      y += lineHeight;
    };

    itinerary.forEach((day) => {
      addLine(`Day ${day.day}: ${day.title}`);
      if (day.date) {
        addLine(`  Date: ${day.date}`);
      }
      addLine(`  Summary: ${day.summary}`);

      day.items?.forEach((item) => {
        let line = `    - ${item.time}: ${item.title}`;
        if (item.note) {
          line += ` (${item.note})`;
        }
        addLine(line);
      });

      y += 2;
    });

    const safeDest = dest
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    doc.save(`snaptrip-${safeDest || "itinerary"}.pdf`);
  }

  const glassBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.95))"
      : "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(219,234,254,0.96))";

  const heroGlow =
    theme.palette.mode === "dark"
      ? "radial-gradient(circle at top, rgba(59,130,246,0.35), transparent 55%)"
      : "radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 60%)";

  const totalDays = itinerary.length;

  const timeChipColor = (time) => {
    const t = (time || "").toLowerCase();
    if (t.includes("morning")) return "success";
    if (t.includes("afternoon")) return "info";
    if (t.includes("evening") || t.includes("night")) return "secondary";
    return "default";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          px: { xs: 2, md: 5 },
          py: { xs: 3, md: 5 },
          display: "flex",
          justifyContent: "center",
          background:
            theme.palette.mode === "dark"
              ? `radial-gradient(circle at top, #1e293b, #020617)`
              : `radial-gradient(circle at top, #e0f2fe, #eff6ff)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle glow behind the card */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: heroGlow,
            opacity: 0.9,
            pointerEvents: "none",
          }}
        />

        <Card
          elevation={12}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 1200,
            borderRadius: 4,
            px: { xs: 3, md: 4 },
            py: { xs: 3, md: 4 },
            backdropFilter: "blur(18px)",
            background: glassBg,
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 24px 80px rgba(15,23,42,0.9)"
                : "0 24px 80px rgba(15,23,42,0.25)",
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            />
          )}

          {/* Top header + actions */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  mb: 0.5,
                  cursor: "pointer",
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(191,219,254,0.9)"
                      : "rgba(79,70,229,0.9)",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                onClick={() => navigate("/preferences")}
              >
                ← Back to preferences
              </Typography>

              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Step 3 · Curated Itinerary
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 0.5, flexWrap: "wrap", rowGap: 0.5 }}
              >
                <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}>
                  Your SnapTrip to {destination}
                </Typography>

                <Chip
                  icon={<FlightTakeoffIcon sx={{ fontSize: 18 }} />}
                  label={totalDays ? `${totalDays} day trip` : "Trip planned"}
                  size="small"
                  sx={{
                    fontSize: { xs: 10, sm: 11 },
                    ml: { xs: 0, sm: 0.5 },
                    mt: { xs: 0.5, sm: 0 },
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, flexWrap: "wrap", rowGap: 0.8 }}
              >
                {start && end && (
                  <Chip
                    icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                    label={`${start} → ${end}`}
                    size="small"
                    variant="outlined"
                  />
                )}
                <Chip
                  icon={<AccessTimeIcon sx={{ fontSize: 16 }} />}
                  label={`Pace: ${pace}`}
                  size="small"
                  variant="outlined"
                />
                {tripDetails.vibe && (
                  <Chip
                    icon={<MapIcon sx={{ fontSize: 16 }} />}
                    label={tripDetails.vibe}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ alignSelf: { xs: "stretch", md: "auto" }, flexWrap: "wrap" }}
            >
              <Tooltip title="Regenerate itinerary">
                <span>
                  <IconButton
                    onClick={fetchItinerary}
                    disabled={loading}
                    color="primary"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(148,163,184,0.7)",
                      width: { xs: 44, sm: 48 },
                      height: { xs: 44, sm: 48 },
                    }}
                  >
                    <RefreshIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Save this trip in this browser">
                <span>
                  <IconButton
                    onClick={handleSaveTrip}
                    disabled={saving || !itinerary.length}
                    color="primary"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      border: "1px solid rgba(148,163,184,0.7)",
                      width: { xs: 44, sm: 48 },
                      height: { xs: 44, sm: 48 },
                    }}
                  >
                    <BookmarkAddIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>
                </span>
              </Tooltip>

              <Button
                variant="contained"
                onClick={handleExportPdf}
                disabled={!itinerary.length}
                startIcon={<DownloadIcon />}
                sx={{
                  borderRadius: 999,
                  px: { xs: 2, sm: 2.5 },
                  py: { xs: 0.8, sm: 1 },
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.85rem", sm: "0.95rem" },
                }}
              >
                Export PDF
              </Button>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 3, opacity: 0.7 }} />

          {/* Error message */}
          {error && (
            <Card
              variant="outlined"
              sx={{
                mb: 3,
                borderRadius: 3,
                borderColor: theme.palette.error.light,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(248,113,113,0.08)"
                    : "rgba(248,113,113,0.05)",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  color="error"
                  sx={{ fontWeight: 600, mb: 0.5 }}
                >
                  Oops, something went wrong
                </Typography>
                <Typography variant="body2">{error}</Typography>
              </CardContent>
            </Card>
          )}

          {/* Loading state */}
          {loading ? (
            <Box
              sx={{
                py: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <motion.div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  border: "4px solid rgba(148,163,184,0.4)",
                  borderTopColor: theme.palette.primary.main,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              />
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Crafting your perfect days in {destination}...
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.8, textAlign: "center", maxWidth: 360 }}
              >
                We’re using your dates, pace, and interests to stitch together a
                personalized adventure.
              </Typography>
            </Box>
          ) : (
            <>
              {/* No data state */}
              {!itinerary.length && !error && (
                <Box
                  sx={{
                    py: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    No itinerary yet
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ maxWidth: 380, textAlign: "center", opacity: 0.8 }}
                  >
                    It looks like we don’t have a plan generated for this trip.
                    Try regenerating your itinerary using the button above.
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={fetchItinerary}
                    sx={{ mt: 1 }}
                  >
                    Generate itinerary
                  </Button>
                </Box>
              )}

              {/* Itinerary days */}
              {!!itinerary.length && (
                <Stack spacing={2.5}>
                  {itinerary.map((day, idx) => (
                    <MotionCard
                      key={day.day ?? idx}
                      variant="outlined"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      whileHover={{
                        y: -3,
                        boxShadow:
                          theme.palette.mode === "dark"
                            ? "0 20px 45px rgba(15,23,42,0.8)"
                            : "0 20px 45px rgba(15,23,42,0.18)",
                      }}
                      sx={{
                        borderRadius: 3,
                        borderColor: "rgba(148,163,184,0.5)",
                        overflow: "hidden",
                        position: "relative",
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,64,175,0.85))"
                            : "linear-gradient(135deg, rgba(248,250,252,0.98), rgba(219,234,254,0.95))",
                      }}
                    >
                      {/* Accent gradient strip at top */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background:
                            "linear-gradient(90deg, #38bdf8, #6366f1, #f97316)",
                        }}
                      />

                      <CardContent sx={{ pt: 2.5 }}>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          spacing={1.5}
                          sx={{ mb: 2 }}
                        >
                          <Box>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              sx={{ mb: 0.5, flexWrap: "wrap", rowGap: 0.5 }}
                            >
                              <Chip
                                size="small"
                                label={`Day ${day.day}`}
                                sx={{
                                  fontWeight: 600,
                                  letterSpacing: 0.4,
                                }}
                              />
                              {day.date && (
                                <Chip
                                  size="small"
                                  icon={
                                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                                  }
                                  label={day.date}
                                  variant="outlined"
                                />
                              )}
                            </Stack>

                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, mb: 0.5 }}
                            >
                              {day.title}
                            </Typography>
                            {day.summary && (
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 620,
                                  opacity: 0.85,
                                }}
                              >
                                {day.summary}
                              </Typography>
                            )}
                          </Box>

                          <Chip
                            label="Curated day plan"
                            size="small"
                            sx={{
                              textTransform: "uppercase",
                              fontSize: 10,
                              letterSpacing: 0.6,
                              borderRadius: 999,
                              border: "1px dashed rgba(148,163,184,0.8)",
                            }}
                          />
                        </Stack>

                        {/* Timeline of activities */}
                        <Box
                          sx={{
                            mt: 1.5,
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "1fr" },
                            gap: 1,
                          }}
                        >
                          <Box sx={{ position: "relative", pl: { xs: 0.5, sm: 1 } }}>
                            {day.items?.map((item, index) => (
                              <MotionBox
                                key={index}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                                sx={{
                                  display: "flex",
                                  position: "relative",
                                  gap: 1.5,
                                  pb:
                                    index !== (day.items?.length ?? 0) - 1
                                      ? 2
                                      : 0,
                                }}
                              >
                                {/* Vertical line */}
                                <Box
                                  sx={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 12,
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        border:
                                          "2px solid rgba(148,163,184,0.8)",
                                        backgroundColor:
                                          theme.palette.mode === "dark"
                                            ? "#020617"
                                            : "#e0f2fe",
                                      }}
                                    />
                                  </Box>

                                  {index !== (day.items?.length ?? 0) - 1 && (
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: 10,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: 2,
                                        height: "100%",
                                        bgcolor: "rgba(148,163,184,0.6)",
                                      }}
                                    />
                                  )}
                                </Box>

                                {/* Content */}
                                <Box sx={{ flex: 1 }}>
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mb: 0.5, flexWrap: "wrap", rowGap: 0.5 }}
                                  >
                                    {item.time && (
                                      <Chip
                                        size="small"
                                        color={timeChipColor(item.time)}
                                        icon={
                                          <AccessTimeIcon
                                            sx={{ fontSize: 15 }}
                                          />
                                        }
                                        label={item.time}
                                        sx={{
                                          fontSize: 11,
                                          height: 26,
                                        }}
                                      />
                                    )}
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ fontWeight: 600 }}
                                    >
                                      {item.title}
                                    </Typography>
                                  </Stack>
                                  {item.note && (
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        opacity: 0.9,
                                        ml: 0.3,
                                      }}
                                    >
                                      {item.note}
                                    </Typography>
                                  )}
                                </Box>
                              </MotionBox>
                            ))}

                            {!day.items?.length && (
                              <Typography
                                variant="body2"
                                sx={{ opacity: 0.75, fontStyle: "italic", ml: 2 }}
                              >
                                No specific activities listed for this day.
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </CardContent>
                    </MotionCard>
                  ))}
                </Stack>
              )}
            </>
          )}
        </Card>
      </Box>
    </motion.div>
  );
}

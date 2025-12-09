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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import { usePreferences } from "./PreferencesContext";

export default function ItineraryPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { preferences } = usePreferences();
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

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
      .replace(/[^a-z0-9\-]/g, "");

    doc.save(`snaptrip-${safeDest || "itinerary"}.pdf`);
  }

  const destination = preferences?.tripDetails?.destination || "Your trip";

  const glassBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.95))"
      : "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(219,234,254,0.96))";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
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
              ? "radial-gradient(circle at top, #1e293b, #020617)"
              : "radial-gradient(circle at top, #e0f2fe, #eff6ff)",
        }}
      >
        <Card
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 1100,
            borderRadius: 4,
            px: { xs: 3, md: 4 },
            py: { xs: 3, md: 4 },
            backdropFilter: "blur(16px)",
            background: glassBg,
          }}
        >
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
      Step 3 · Itinerary
    </Typography>
    <Typography variant="h4" fontWeight={700}>
      Your SnapTrip itinerary
    </Typography>
    <Typography variant="body2" sx={{ mt: 0.5 }}>
      Destination: {destination}
    </Typography>
  </Box>

  <Stack direction="row" spacing={1}>
    <Button variant="outlined" onClick={fetchItinerary}>
      Regenerate
    </Button>
    <Button
      variant="contained"
      onClick={handleSaveTrip}
      disabled={saving || !itinerary.length}
    >
      {saving ? "Saving..." : "Save trip"}
    </Button>
    <Button
      variant="outlined"
      onClick={handleExportPdf}
      disabled={!itinerary.length}
    >
      Export PDF
    </Button>
  </Stack>
</Stack>


          <Divider sx={{ mb: 3 }} />

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ mb: 2, fontWeight: 500 }}
            >
              {error}
            </Typography>
          )}

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
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "4px solid rgba(148,163,184,0.4)",
                  borderTopColor: theme.palette.primary.main,
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <Typography variant="body1">
                Generating your itinerary...
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2.5}>
              {itinerary.map((day) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderColor: "rgba(148,163,184,0.5)",
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        spacing={1}
                      >
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Day {day.day}
                          </Typography>
                          <Typography variant="h6">{day.title}</Typography>
                          {day.date && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {day.date}
                            </Typography>
                          )}
                        </Box>
                        <Chip label={day.summary} size="small" />
                      </Stack>

                      <Box sx={{ mt: 2 }}>
                        {day.items?.map((item, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ minWidth: 90, fontWeight: 600 }}
                            >
                              {item.time}
                            </Typography>
                            <Typography variant="body2">
                              {item.title}
                              {item.note && (
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {" "}
                                  - {item.note}
                                </Typography>
                              )}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Stack>
          )}

          {!loading && !itinerary.length && !error && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              No itinerary generated yet. Try clicking Regenerate.
            </Typography>
          )}
        </Card>
      </Box>
    </motion.div>
  );
}

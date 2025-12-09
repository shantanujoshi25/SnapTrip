// src/ExportPage.jsx
import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack
} from "@mui/material";

export default function ExportPage() {
  const lastTrip = useMemo(() => {
    const stored = JSON.parse(localStorage.getItem("snaptrip_trips") || "[]");
    if (!stored.length) return null;
    return stored[stored.length - 1];
  }, []);

  function asPlainText(trip) {
    if (!trip) return "";
    const lines = [];

    lines.push(`Trip: ${trip.title}`);
    if (trip.dateRange) lines.push(`Dates: ${trip.dateRange}`);
    lines.push("");

    trip.itinerary.forEach((day) => {
      lines.push(`Day ${day.day}: ${day.title}`);
      if (day.date) lines.push(`  Date: ${day.date}`);
      lines.push(`  Summary: ${day.summary}`);
      day.items.forEach((item) => {
        lines.push(`    - ${item.time}: ${item.title}`);
      });
      lines.push("");
    });

    return lines.join("\n");
  }

  async function handleCopy(trip) {
    if (!trip || !navigator.clipboard) return;
    await navigator.clipboard.writeText(asPlainText(trip));
    alert("Itinerary copied to clipboard.");
  }

  function handleDownloadJson(trip) {
    if (!trip) return;
    const blob = new Blob([JSON.stringify(trip, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "snaptrip-itinerary.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: { xs: 2, md: 5 },
        py: { xs: 3, md: 5 }
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 720,
          borderRadius: 4
        }}
        elevation={6}
      >
        <CardContent>
          <Typography variant="h4" sx={{ mb: 1 }} fontWeight={700}>
            Export your trip
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            You can copy the latest saved itinerary as plain text or download it
            as a JSON file. PDF export can be added later if needed.
          </Typography>

          {!lastTrip ? (
            <Typography variant="body2">
              There is no saved trip yet. Generate an itinerary and save it
              first.
            </Typography>
          ) : (
            <>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Latest saved trip: {lastTrip.title}
              </Typography>
              {lastTrip.dateRange && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Dates: {lastTrip.dateRange}
                </Typography>
              )}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => handleCopy(lastTrip)}
                >
                  Copy as text
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDownloadJson(lastTrip)}
                >
                  Download JSON
                </Button>
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

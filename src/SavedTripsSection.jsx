// src/SavedTripsSection.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePreferences } from "./PreferencesContext";

export default function SavedTripsSection() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const { setPreferences } = usePreferences();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("snaptrip_trips") || "[]");
    setTrips(stored);
  }, []);

  if (!trips.length) {
    return (
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6">Saved trips</Typography>
        <Typography variant="body2" color="text.secondary">
          You do not have any saved trips in this browser yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Saved trips in this browser
      </Typography>

      <Stack spacing={2}>
        {trips.map((trip) => (
          <Card key={trip.id} variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                gap: 1
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {trip.title}
                </Typography>
                {trip.dateRange && (
                  <Typography variant="body2" color="text.secondary">
                    {trip.dateRange}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary">
                  Saved on{" "}
                  {new Date(trip.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })}
                </Typography>
              </Box>

              <Button
                variant="text"
                onClick={() => {
                  setPreferences(trip.preferences);
                  navigate("/itinerary");
                }}
              >
                View itinerary
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

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
      <Box sx={{ mt: { xs: 4, sm: 5, md: 6 }, px: { xs: 1, sm: 0 } }}>
        <Typography variant="h6" sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>Saved trips</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.875rem", sm: "0.95rem" } }}>
          You do not have any saved trips in this browser yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { xs: 4, sm: 5, md: 6 }, px: { xs: 1, sm: 0 } }}>
      <Typography variant="h6" sx={{ mb: { xs: 1.5, sm: 2 }, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
        Saved trips in this browser
      </Typography>

      <Stack spacing={{ xs: 1.5, sm: 2 }}>
        {trips.map((trip) => (
          <Card key={trip.id} variant="outlined" sx={{ borderRadius: { xs: 2, sm: 3 } }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: 1.5, sm: 1 },
                py: { xs: 2, sm: 2.5 },
                px: { xs: 2, sm: 3 }
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                  {trip.title}
                </Typography>
                {trip.dateRange && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.8rem", sm: "0.875rem" } }}>
                    {trip.dateRange}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
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
                sx={{
                  alignSelf: { xs: "stretch", sm: "auto" },
                  fontSize: { xs: "0.85rem", sm: "0.95rem" }
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

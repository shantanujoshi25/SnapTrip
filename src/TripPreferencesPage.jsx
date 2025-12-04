// TripPreferencesPage.jsx (FINAL VERSION WITH DESTINATION + DATES + AI CUSTOMIZATION)
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
  Divider,
  useTheme,
  TextField
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePreferences } from "./PreferencesContext";

import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import MuseumIcon from "@mui/icons-material/Museum";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const interestsList = [
  { label: "Nature", icon: <LocalFloristIcon /> },
  { label: "Museums", icon: <MuseumIcon /> },
  { label: "Food", icon: <RestaurantIcon /> },
  { label: "Adventure", icon: <DirectionsBikeIcon /> },
  { label: "Nightlife", icon: <NightlifeIcon /> },
  { label: "History", icon: <HistoryEduIcon /> },
  { label: "Shopping", icon: <ShoppingBagIcon /> },
];

export default function TripPreferencesPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  // NEW FIELDS
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customNotes, setCustomNotes] = useState("");

  // EXISTING FIELDS
  const [tripPace, setTripPace] = useState("balanced");
  const [interests, setInterests] = useState([]);
  const [budget, setBudget] = useState(2);
  const [accessibility, setAccessibility] = useState({
    walkable: false,
    wheelchair: false,
    noStairs: false,
  });
  const [groupType, setGroupType] = useState("solo");

  const { setPreferences } = usePreferences();

  const toggleInterest = (label) => {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  // JSON PAYLOAD BUILDER
  const buildPayload = () => {
    return {
      tripDetails: {
        destination,
        startDate,
        endDate,
      },
      userPreferences: {
        tripPace,
        interests,
        budgetLevel: budget,
        accessibility: {
          walkableRoutes: accessibility.walkable,
          wheelchairFriendly: accessibility.wheelchair,
          avoidStairs: accessibility.noStairs,
        },
        groupType,
      },
      customAIInstructions: customNotes,
    };
  };

  // WHEN USER CLICKS CONTINUE
  const handleContinue = () => {
    const payload = buildPayload();

    // Save to global context
    setPreferences(payload);

    console.log("JSON Payload:", JSON.stringify(payload, null, 2));

    navigate("/itinerary");
  };

  const glassBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(10,12,40,0.90), rgba(35,38,90,0.92))"
      : "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(238,242,255,0.96))";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          padding: { xs: 3, md: 6 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BACKGROUND ANIMATIONS */}
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
          animate={{ x: [0, 40, -30, 0], y: [0, -25, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

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
          animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* MAIN CARD */}
        <Card
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 4,
            px: { xs: 3, md: 5 },
            py: { xs: 3, md: 4 },
            zIndex: 1,
            backdropFilter: "blur(22px)",
            background: glassBg,
          }}
        >
          <Typography variant="overline" sx={{ opacity: 0.75 }}>
            STEP 2
          </Typography>

          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            Trip Preferences
          </Typography>

          {/* DESTINATION */}
          <TextField
            label="Destination"
            placeholder="Where do you want to go?"
            fullWidth
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* DATES */}
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            label="End Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ mb: 4 }}
          />

          {/* CUSTOM AI NOTES */}
          <Section title="Customize your trip using AI" subtitle="Optional: Additional preferences, constraints, or instructions.">
            <TextField
              placeholder="Example: Avoid early mornings, add beaches, prefer vegetarian restaurants..."
              multiline
              minRows={3}
              fullWidth
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              sx={{
                mb: 3,
                background: "rgba(255,255,255,0.35)",
                borderRadius: "12px",
                "& .MuiInputBase-root": { backdropFilter: "blur(6px)" },
              }}
            />
          </Section>

          <Divider sx={{ my: 3 }} />

          {/* TRIP PACE */}
          <Section title="Trip pace">
            <ToggleButtonGroup
              exclusive
              value={tripPace}
              onChange={(e, v) => v && setTripPace(v)}
              sx={{
                flexWrap: "wrap",
                "& .MuiToggleButton-root": { px: 3, py: 1.2, m: 0.5, borderRadius: "999px" },
              }}
            >
              <ToggleButton value="relaxed">Relaxed</ToggleButton>
              <ToggleButton value="balanced">Balanced</ToggleButton>
              <ToggleButton value="fast">Fast-paced</ToggleButton>
            </ToggleButtonGroup>
          </Section>

          <Divider sx={{ my: 3 }} />

          {/* INTERESTS */}
          <Section title="Interests" subtitle="Pick a few things you enjoy.">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.4 }}>
              {interestsList.map((item) => (
                <Chip
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  clickable
                  onClick={() => toggleInterest(item.label)}
                  sx={{
                    px: 1.6,
                    py: 0.4,
                    borderRadius: "999px",
                    backgroundColor: interests.includes(item.label)
                      ? theme.palette.primary.main
                      : "rgba(255,255,255,0.1)",
                    color: interests.includes(item.label) ? "#fff" : theme.palette.text.primary,
                    transition: "0.25s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
              ))}
            </Box>
          </Section>

          <Divider sx={{ my: 3 }} />

          {/* BUDGET */}
          <Section title="Budget level">
            <Slider
              value={budget}
              onChange={(e, v) => setBudget(v)}
              min={1}
              max={3}
              marks={[
                { value: 1, label: "$" },
                { value: 2, label: "$$" },
                { value: 3, label: "$$$" },
              ]}
              valueLabelDisplay="auto"
              sx={{ maxWidth: 300 }}
            />
          </Section>

          <Divider sx={{ my: 3 }} />

          {/* ACCESSIBILITY */}
          <Section title="Accessibility options">
            <FormGroup>
              {[
                { label: "Prefer walkable routes", key: "walkable" },
                { label: "Wheelchair-friendly", key: "wheelchair" },
                { label: "Avoid long staircases", key: "noStairs" },
              ].map((item) => (
                <FormControlLabel
                  key={item.key}
                  control={
                    <Checkbox
                      checked={accessibility[item.key]}
                      onChange={(e) =>
                        setAccessibility({ ...accessibility, [item.key]: e.target.checked })
                      }
                    />
                  }
                  label={item.label}
                />
              ))}
            </FormGroup>
          </Section>

          <Divider sx={{ my: 3 }} />

          {/* GROUP TYPE */}
          <Section title="Who are you traveling with?">
            <ToggleButtonGroup
              exclusive
              value={groupType}
              onChange={(e, v) => v && setGroupType(v)}
              sx={{
                flexWrap: "wrap",
                "& .MuiToggleButton-root": { px: 3, py: 1.2, m: 0.5, borderRadius: "999px" },
              }}
            >
              <ToggleButton value="solo">Solo</ToggleButton>
              <ToggleButton value="couple">Couple</ToggleButton>
              <ToggleButton value="family">Family</ToggleButton>
              <ToggleButton value="friends">Friends</ToggleButton>
            </ToggleButtonGroup>
          </Section>

          {/* CONTINUE BUTTON */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleContinue}
              sx={{
                px: 4,
                py: 1.4,
                borderRadius: "999px",
                background: "linear-gradient(135deg, #6A5ACD, #7C8CFF)",
                "&:hover": { background: "linear-gradient(135deg, #5A4BC0, #6A7CFF)" },
              }}
            >
              Continue to itinerary
            </Button>
          </Box>
        </Card>
      </Box>
    </motion.div>
  );
}

/* REUSABLE SECTION COMPONENT */
function Section({ title, subtitle, children }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{title}</Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  );
}

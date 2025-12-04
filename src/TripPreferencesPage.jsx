// TripPreferencesPage.jsx (CLEAN VERSION WITHOUT DESTINATION OR DATES)
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
  useTheme
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

  const handleContinue = () => {
  setPreferences({
    tripPace,
    interests,
    budget,
    accessibility,
    groupType,
  });

  console.log("Saved preferences:", {
    tripPace,
    interests,
    budget,
    accessibility,
    groupType,
  });
  const payload = buildPayload();  // NEW

  setPreferences(payload.userPreferences);

  console.log("JSON Payload Sent to Backend:", JSON.stringify(payload, null, 2));


  navigate("/itinerary"); // <-- MOVE TO ITINERARY PAGE
};


  const glassBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(10,12,40,0.90), rgba(35,38,90,0.92))"
      : "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(238,242,255,0.96))";

    const buildPayload = () => {
  return {
    userPreferences: {
      tripPace: tripPace,
      interests: interests,
      budgetLevel: budget,
      accessibility: {
        walkableRoutes: accessibility.walkable,
        wheelchairFriendly: accessibility.wheelchair,
        avoidStairs: accessibility.noStairs,
      },
      groupType: groupType,
    }
  };
};

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
          justifyContent: "center",
          alignItems: "flex-start",
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

        {/* MAIN GLASS CARD */}
        <Card
          elevation={10}
          sx={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 4,
            px: { xs: 3, md: 5 },
            py: { xs: 3, md: 4 },
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
          }}
        >
          <Typography variant="overline" sx={{ opacity: 0.75 }}>
            STEP 2
          </Typography>

          <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
            Trip Preferences
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Tell us how you like to travel. We’ll generate a personalized itinerary based on your style.
          </Typography>

          {/* TRIP PACE */}
          <Section title="Trip pace">
            <ToggleButtonGroup
              exclusive
              value={tripPace}
              onChange={(e, v) => v && setTripPace(v)}
              sx={{
                flexWrap: "wrap",
                "& .MuiToggleButton-root": {
                  px: 3,
                  py: 1.2,
                  m: 0.5,
                  borderRadius: "999px",
                  textTransform: "none",
                },
              }}
            >
              <ToggleButton value="relaxed">Relaxed</ToggleButton>
              <ToggleButton value="balanced">Balanced</ToggleButton>
              <ToggleButton value="fast">Fast-paced</ToggleButton>
            </ToggleButtonGroup>
          </Section>

          <Divider sx={{ my: 3, opacity: 0.5 }} />

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
                    color: interests.includes(item.label)
                      ? "#fff"
                      : theme.palette.text.primary,
                    border: interests.includes(item.label)
                      ? "1px solid rgba(255,255,255,0.4)"
                      : "1px solid rgba(255,255,255,0.2)",
                    transition: "0.25s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
              ))}
            </Box>
          </Section>

          <Divider sx={{ my: 3, opacity: 0.5 }} />

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

          <Divider sx={{ my: 3, opacity: 0.5 }} />

          {/* ACCESSIBILITY */}
          <Section title="Accessibility options">
            <FormGroup>
              {[
                { label: "Prefer walkable routes", key: "walkable" },
                { label: "Wheelchair-friendly where possible", key: "wheelchair" },
                { label: "Avoid long staircases", key: "noStairs" },
              ].map((item) => (
                <FormControlLabel
                  key={item.key}
                  control={
                    <Checkbox
                      checked={accessibility[item.key]}
                      onChange={(e) =>
                        setAccessibility({
                          ...accessibility,
                          [item.key]: e.target.checked,
                        })
                      }
                    />
                  }
                  label={item.label}
                />
              ))}
            </FormGroup>
          </Section>

          <Divider sx={{ my: 3, opacity: 0.5 }} />

          {/* GROUP TYPE */}
          <Section title="Who are you traveling with?">
            <ToggleButtonGroup
              exclusive
              value={groupType}
              onChange={(e, v) => v && setGroupType(v)}
              sx={{
                flexWrap: "wrap",
                "& .MuiToggleButton-root": {
                  px: 3,
                  py: 1.2,
                  m: 0.5,
                  borderRadius: "999px",
                },
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
                "&:hover": {
                  background: "linear-gradient(135deg, #5A4BC0, #6A7CFF)",
                },
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

function Section({ title, subtitle, children }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Box>
  );
}

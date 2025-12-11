// TripPreferencesPage.jsx (react-hook-form + zod)
import React from "react";
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
  TextField,
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

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const interestsList = [
  { label: "Nature", icon: <LocalFloristIcon /> },
  { label: "Museums", icon: <MuseumIcon /> },
  { label: "Food", icon: <RestaurantIcon /> },
  { label: "Adventure", icon: <DirectionsBikeIcon /> },
  { label: "Nightlife", icon: <NightlifeIcon /> },
  { label: "History", icon: <HistoryEduIcon /> },
  { label: "Shopping", icon: <ShoppingBagIcon /> },
];

// Zod schema for form validation
const PreferencesSchema = z.object({
  destination: z
    .string()
    .min(2, "Destination is required and should be at least 2 characters."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  customNotes: z.string().max(1000).optional().or(z.literal("")),
  tripPace: z.enum(["relaxed", "balanced", "fast"], {
    required_error: "Please choose a trip pace.",
  }),
  interests: z
    .array(z.string())
    .min(1, "Select at least one interest.")
    .optional()
    .transform((val) => val ?? []),
  budget: z
    .number()
    .min(1)
    .max(3),
  accessibility: z.object({
    walkable: z.boolean(),
    wheelchair: z.boolean(),
    noStairs: z.boolean(),
  }),
  groupType: z.enum(["solo", "couple", "family", "friends"], {
    required_error: "Please select who you are traveling with.",
  }),
});

export default function TripPreferencesPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setPreferences } = usePreferences();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(PreferencesSchema),
    defaultValues: {
      destination: "",
      startDate: "",
      endDate: "",
      customNotes: "",
      tripPace: "balanced",
      interests: [],
      budget: 2,
      accessibility: {
        walkable: false,
        wheelchair: false,
        noStairs: false,
      },
      groupType: "solo",
    },
  });

  const selectedInterests = watch("interests");

  const toggleInterest = (label) => {
    const current = selectedInterests || [];
    const exists = current.includes(label);
    const next = exists
      ? current.filter((i) => i !== label)
      : [...current, label];

    setValue("interests", next, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = (values) => {
    const payload = {
      tripDetails: {
        destination: values.destination,
        startDate: values.startDate,
        endDate: values.endDate,
      },
      userPreferences: {
        tripPace: values.tripPace,
        interests: values.interests,
        budgetLevel: values.budget,
        accessibility: {
          walkableRoutes: values.accessibility.walkable,
          wheelchairFriendly: values.accessibility.wheelchair,
          avoidStairs: values.accessibility.noStairs,
        },
        groupType: values.groupType,
      },
      customAIInstructions: values.customNotes,
    };

    setPreferences(payload);
    console.log("JSON Payload:", JSON.stringify(payload, null, 2));
    navigate("/itinerary");
  };

  const glassBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, rgba(10,12,40,0.90), rgba(35,38,90,0.92))"
      : "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(238,242,255,0.96))";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
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

          {/* FORM WRAPPER */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* DESTINATION */}
            <TextField
              label="Destination"
              placeholder="Where do you want to go?"
              fullWidth
              sx={{ mb: 1 }}
              {...register("destination")}
              error={!!errors.destination}
              helperText={errors.destination?.message}
            />

            {/* DATES */}
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 1 }}
              {...register("startDate")}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />

            <TextField
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
              {...register("endDate")}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />

            {/* CUSTOM AI NOTES */}
            <Section
              title="Customize your trip using AI"
              subtitle="Optional: Additional preferences, constraints, or instructions."
            >
              <TextField
                placeholder="Example: Avoid early mornings, add beaches, prefer vegetarian restaurants..."
                multiline
                minRows={3}
                fullWidth
                {...register("customNotes")}
                error={!!errors.customNotes}
                helperText={errors.customNotes?.message}
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
              <Controller
                name="tripPace"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleButtonGroup
                      exclusive
                      value={field.value}
                      onChange={(_, value) => value && field.onChange(value)}
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
                      <ToggleButton value="relaxed">Relaxed</ToggleButton>
                      <ToggleButton value="balanced">Balanced</ToggleButton>
                      <ToggleButton value="fast">Fast-paced</ToggleButton>
                    </ToggleButtonGroup>
                    {errors.tripPace && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ display: "block", mt: 0.5 }}
                      >
                        {errors.tripPace.message}
                      </Typography>
                    )}
                  </>
                )}
              />
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
                      backgroundColor: selectedInterests?.includes(item.label)
                        ? theme.palette.primary.main
                        : "rgba(255,255,255,0.1)",
                      color: selectedInterests?.includes(item.label)
                        ? "#fff"
                        : theme.palette.text.primary,
                      transition: "0.25s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                ))}
              </Box>
              {errors.interests && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  {errors.interests.message}
                </Typography>
              )}
            </Section>

            <Divider sx={{ my: 3 }} />

            {/* BUDGET */}
            <Section title="Budget level">
              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <Slider
                    {...field}
                    value={field.value}
                    onChange={(_, value) => field.onChange(value)}
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
                )}
              />
            </Section>

            <Divider sx={{ my: 3 }} />

            {/* ACCESSIBILITY */}
            <Section title="Accessibility options">
              <FormGroup>
                <Controller
                  name="accessibility.walkable"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Prefer walkable routes"
                    />
                  )}
                />
                <Controller
                  name="accessibility.wheelchair"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Wheelchair-friendly"
                    />
                  )}
                />
                <Controller
                  name="accessibility.noStairs"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label="Avoid long staircases"
                    />
                  )}
                />
              </FormGroup>
            </Section>

            <Divider sx={{ my: 3 }} />

            {/* GROUP TYPE */}
            <Section title="Who are you traveling with?">
              <Controller
                name="groupType"
                control={control}
                render={({ field }) => (
                  <>
                    <ToggleButtonGroup
                      exclusive
                      value={field.value}
                      onChange={(_, value) => value && field.onChange(value)}
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
                    {errors.groupType && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ display: "block", mt: 0.5 }}
                      >
                        {errors.groupType.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </Section>

            {/* CONTINUE BUTTON */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
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
                {isSubmitting ? "Planning..." : "Continue to itinerary"}
              </Button>
            </Box>
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

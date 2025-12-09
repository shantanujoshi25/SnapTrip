// server/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok", message: "SnapTrip backend running" });
});

// AI itinerary route
app.post("/api/itinerary", async (req, res) => {
  const preferences = req.body;

  console.log("Received /api/itinerary request with preferences:");
  console.log(JSON.stringify(preferences, null, 2));

  if (!preferences?.tripDetails?.destination) {
    return res.status(400).json({ error: "Destination is required" });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Missing OPENAI_API_KEY");
      return res
        .status(500)
        .json({ error: "Server misconfiguration: missing API key" });
    }

    const destination = preferences.tripDetails.destination;

    const prompt = `
You are an expert travel planner. Generate a structured multi-day itinerary as JSON.

User preferences (JSON):
${JSON.stringify(preferences, null, 2)}

Rules:
- The trip is to: ${destination}
- Use the start and end dates to determine the number of days.
- Respect trip pace: more activities for "fast", fewer for "relaxed".
- Use interests (like food, museums, nightlife, nature) to customize activities.
- Suggest specific attractions and neighborhoods relevant to the actual destination, not generic ones.
- For small or unknown cities, still propose plausible activities using the country/region if needed.
- Always respond with ONLY valid JSON, no explanation, no markdown.

Required JSON shape:
{
  "days": [
    {
      "day": 1,
      "title": "Short title for the day",
      "date": "YYYY-MM-DD or null",
      "summary": "1 sentence overview of the day",
      "items": [
        {
          "time": "Morning | Afternoon | Evening | Night",
          "title": "Activity title",
          "note": "Optional additional detail"
        }
      ]
    }
  ]
}
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // change if you use a different model
        messages: [
          { role: "system", content: "You are a helpful travel planner API." },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error response:", errText);
      return res.status(500).json({ error: "AI request failed" });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    let itinerary;
    try {
      itinerary = JSON.parse(content);
    } catch (parseErr) {
      console.error("Failed to parse AI JSON:", parseErr);
      console.error("Raw AI content:", content);
      return res.status(500).json({
        error: "AI returned invalid JSON",
      });
    }

    if (!itinerary.days || !Array.isArray(itinerary.days)) {
      console.error("AI response missing 'days' array:", itinerary);
      return res.status(500).json({
        error: "AI response missing 'days' array",
      });
    }

    console.log("Sending itinerary back to frontend:");
    console.log(JSON.stringify(itinerary, null, 2));

    res.json(itinerary);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

app.listen(PORT, () => {
  console.log(`SnapTrip backend listening on http://localhost:${PORT}`);
});

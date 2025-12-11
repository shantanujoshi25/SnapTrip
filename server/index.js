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
You are an expert travel planner with deep knowledge of global destinations, local attractions, neighborhoods, food culture, transportation patterns, and typical tourist behaviors.

Your job is to create a realistic, personalized, multi-day itinerary based on the user's preferences below.

USER PREFERENCES (JSON):
${JSON.stringify(preferences, null, 2)}

---------------------------------------------
IMPORTANT RULES YOU MUST FOLLOW
---------------------------------------------

1. DESTINATION-SPECIFIC DETAILS
- Suggest **real attractions**, **landmarks**, **local food spots**, **neighborhoods**, and **experiences** unique to the destination.
- If the city is small or lesser-known, propose the closest well-known attractions, regional specialties, and realistic activities.

2. DATE-BASED DAY COUNT
- Calculate number of days using startDate and endDate.
- Each day must correspond to a unique date (if dates are provided).

3. PACE ADJUSTMENT
- "relaxed": 3–4 activities/day with more free time.
- "balanced": 4–5 activities/day.
- "fast": 6–7 activities/day with energetic scheduling.

4. INTERESTS-BASED CUSTOMIZATION
Match activities to interests such as:
- Food → street food, markets, local dishes, famous restaurants
- History → museums, monuments, guided tours
- Nature → parks, viewpoints, hiking trails
- Nightlife → bars, districts, events
- Adventure → cycling, water sports, adrenaline activities
- Shopping → markets, boutiques, malls

5. ACCESSIBILITY NEEDS
If preferences include:
- wheelchair: avoid stairs, steep areas, inaccessible historic buildings
- walkable: focus on compact, walk-friendly neighborhoods
- noStairs: ensure activities support minimal elevation/climbing

6. GROUP TYPE PERSONALIZATION
- solo: flexible, exploratory suggestions
- couple: romantic spots, scenic viewpoints, cozy restaurants
- family: kid-friendly attractions
- friends: lively districts, group activities

7. OUTPUT FORMAT (REQUIRED)
Return ONLY valid JSON matching EXACTLY the structure:

{
  "days": [
    {
      "day": 1,
      "title": "Short descriptive title",
      "date": "YYYY-MM-DD or null",
      "summary": "One-sentence overview of what this day focuses on.",
      "items": [
        {
          "time": "Morning | Afternoon | Evening | Night",
          "title": "Activity title unique to the destination",
          "note": "Optional helpful detail or tip"
        }
      ]
    }
  ]
}

8. QUALITY REQUIREMENTS
- Absolutely NO generic activities like "walk around downtown" or "visit a museum" without naming the actual place.
- Every activity must be destination-specific and meaningful.
- Keep the language friendly, concise, and travel-guide accurate.

---------------------------------------------

Now create the full itinerary as JSON only.
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

function getDayCount(startDate, endDate) {
  if (!startDate || !endDate) return 3; // fallback
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end - start;
  if (Number.isNaN(diffMs) || diffMs < 0) return 3;
  return Math.min(10, Math.max(1, Math.round(diffMs / 86400000) + 1));
}

export function generateMockItinerary(preferences) {
  const destination =
    preferences?.tripDetails?.destination?.trim() || "your destination";
  const startDate = preferences?.tripDetails?.startDate || "";
  const endDate = preferences?.tripDetails?.endDate || "";

  const pace = preferences?.userPreferences?.tripPace || "balanced";
  const interests = preferences?.userPreferences?.interests || [];

  const days = getDayCount(startDate, endDate);

  const baseActivities = [
    "Morning walk around the city center",
    "Visit a popular viewpoint",
    "Lunch at a well rated local restaurant",
    "Explore a museum or cultural site",
    "Relax at a park or waterfront area",
    "Evening food or nightlife spot"
  ];

  return Array.from({ length: days }, (_, index) => {
    const dayNumber = index + 1;

    const items = baseActivities.map((item, i) => {
      const interestTag = interests[i % Math.max(interests.length || 1, 1)];
      return {
        time:
          i === 0
            ? "Morning"
            : i === 1
            ? "Late morning"
            : i === 2
            ? "Lunch"
            : i === 3
            ? "Afternoon"
            : i === 4
            ? "Late afternoon"
            : "Evening",
        title: item,
        note: interestTag
          ? `Focus on ${interestTag.toLowerCase()} here.`
          : undefined
      };
    });

    return {
      day: dayNumber,
      title: `Day ${dayNumber} in ${destination}`,
      date: startDate
        ? new Date(
            new Date(startDate).getTime() + index * 86400000
          ).toDateString()
        : null,
      summary:
        pace === "relaxed"
          ? "Mostly low key activities with generous breaks."
          : pace === "fast"
          ? "High energy day with several back to back stops."
          : "Balanced set of activities with time to explore.",
      items
    };
  });
}

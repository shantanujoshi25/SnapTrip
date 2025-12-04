// PreferencesContext.jsx
import React, { createContext, useContext, useState } from "react";

const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState({
  destination: "",
  startDate: "",
  endDate: "",
  tripPace: "",
  interests: [],
  budget: 2,
  accessibility: {},
  groupType: "",
  customAIInstructions: "",
});


  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}

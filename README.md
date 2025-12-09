SnapTrip — Plan Your Travel in a Snap

SnapTrip is an AI-powered travel planning app that generates personalized itineraries based on user preferences such as destination, dates, interests, budget, and accessibility needs. Users can save trips, regenerate plans, and export itineraries as PDF files.

✨ Features

AI-generated travel itineraries (OpenAI backend)

Multi-step Preferences → Itinerary flow with progress bar

Modern UI with MUI and Framer Motion

Save trips locally with localStorage

Regenerate itinerary with one click

PDF export using jsPDF

Light/Dark theme support

Fully responsive interface

🏗 Tech Stack
Frontend

React (Create React App)

Material UI

Framer Motion

React Router

jsPDF

Backend

Node.js + Express

OpenAI API

CORS + dotenv

📂 Project Structure
snaptrip/
│
├── src/
│   ├── App.js
│   ├── HomePage.jsx
│   ├── TripPreferencesPage.jsx
│   ├── ItineraryPage.jsx
│   ├── PageWrapper.jsx
│   ├── PreferencesContext.jsx
│   └── api/
│       └── mockItinerary.js
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
└── server/
    ├── index.js
    ├── package.json
    └── .env

🚀 Getting Started
1. Clone the Repository
git clone <your-repo-url>
cd snaptrip

🎨 Frontend Setup
npm install
npm start


Runs at:

http://localhost:3000

🔧 Backend Setup
cd server
npm install


Create .env in /server:

PORT=4000
OPENAI_API_KEY=your-openai-key


Start backend:

npm start


Runs at:

http://localhost:4000

🔗 API Details

Frontend calls:

POST /api/itinerary


Backend returns:

{
  "days": [
    {
      "day": 1,
      "title": "...",
      "summary": "...",
      "items": [...]
    }
  ]
}

📄 Exporting Itinerary

Click Export PDF on the Itinerary page to download the current plan.

💾 Saved Trips

Trips are saved in the browser using localStorage and appear on the Home page under “Saved Trips”.

🧪 Tests
npm test

📦 Build for Production
npm run build

✍️ Authors

Shantanu

Adityaraj

Rishabh

Mehul

📜 License

For academic use under CMPE 280, San Jose State University.
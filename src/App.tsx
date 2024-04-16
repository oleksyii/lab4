import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Weather from "./pages/Weather/Weather";
import Evacuation from "./pages/Evacuation/Evacuation";
import { WeatherProvider } from "./WeatherContext";

function App() {
  return (
    <div className="App">
      <WeatherProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Weather />} />
            <Route path="/evacuation" element={<Evacuation />} />
          </Routes>
        </Router>
      </WeatherProvider>
    </div>
  );
}

export default App;

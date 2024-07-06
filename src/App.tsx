// import "./App.css";
import { Routes, Route } from "react-router-dom";
import StatisticsPage from "./Components/StatisticsPage/StatisticsPage";
import RangeSelectionPage from "./RangeSelection/RangeSelectionPage";
import { useEffect, useState } from "react";
import { RidingData, ridingData } from "./config";
import { appDataContext } from "./config";

function App() {
  const [statsData, setStatsData] = useState<RidingData[]>([]);
  const [currentRangeStart, setCurrentRangeStart] = useState<{
    type: string;
    startDate: Date;
    endDate: Date;
  }>({
    type: "week",
    startDate: new Date(2024, 5, 5),
    endDate: new Date(2024, 5, 11),
  });

  useEffect(() => {
    setStatsData(ridingData);
  }, []);
  return (
    <appDataContext.Provider
      value={{ statsData, currentRangeStart, setCurrentRangeStart }}
    >
      <Routes>
        <Route path="/" element={<StatisticsPage />} />
        <Route path="/range-selection" element={<RangeSelectionPage />} />
      </Routes>
    </appDataContext.Provider>
  );
}

export default App;

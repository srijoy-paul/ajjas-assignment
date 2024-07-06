// import "./App.css";
import { Routes, Route } from "react-router-dom";
import StatisticsPage from "./Components/StatisticsPage/StatisticsPage";
import RangeSelectionPage from "./RangeSelection/RangeSelectionPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StatisticsPage />} />
      <Route path="/range-selection" element={<RangeSelectionPage />} />
    </Routes>
  );
}

export default App;

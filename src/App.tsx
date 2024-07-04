// import "./App.css";
import { Routes, Route } from "react-router-dom";
import StatisticsPage from "./Components/StatisticsPage/StatisticsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<StatisticsPage />} />
    </Routes>
  );
}

export default App;

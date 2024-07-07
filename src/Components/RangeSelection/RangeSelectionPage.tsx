import { appDataContext } from "../../config";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DaywiseSelector from "./DaywiseSelector";
import WeekwiseSelector from "./WeekwiseSelector";
import MonthwiseSelector from "./MonthwiseSelector";
import CustomSelector from "./CustomSelector";
export default function RangeSelectionPage() {
  const navigate = useNavigate();
  const { statsData, currentRangeStart, setCurrentRangeStart } =
    useContext(appDataContext);
  const [rangeCategory, setRangeCategory] = useState("day");

  console.log("range selection page:", statsData);
  return (
    <div id="range-selection-page" className="space-y-3">
      <header className="bg-[#242424] px-4 pt-3 w-full flex flex-col items-center gap-8 ">
        <div className="flex items-center w-full h-[40%] border-2 border-red-100">
          <div className="flex w-[80%] gap-3 ">
            <IoClose size={23} onClick={() => navigate("/")} />
            <h1 className="font-semibold px-2">Date range</h1>
          </div>
          <button
            className="flex w-[20%] text-[#FFBE00]  justify-end"
            onClick={() => navigate("/")}
          >
            Save
          </button>
        </div>
        <div
          id="range-category"
          className="flex  justify-between w-full text-sm px-2 h-[35px]"
        >
          <span
            onClick={() => setRangeCategory("day")}
            className={`h-full ${rangeCategory == "day" ? "border-b-2 border-[#FFBE00]" : ""}`}
          >
            Day
          </span>
          <span
            onClick={() => setRangeCategory("week")}
            className={`h-full ${rangeCategory == "week" ? "border-b-2 border-[#FFBE00]" : ""}`}
          >
            Week
          </span>
          <span
            onClick={() => setRangeCategory("month")}
            className={`h-full ${rangeCategory == "month" ? "border-b-2 border-[#FFBE00]" : ""}`}
          >
            Month
          </span>
          <span
            onClick={() => setRangeCategory("other")}
            className={`h-full ${rangeCategory == "other" ? "border-b-2 border-[#FFBE00]" : ""}`}
          >
            Other
          </span>
        </div>
      </header>
      <main>
        {rangeCategory == "day" ? (
          <DaywiseSelector
            statsData={statsData}
            currentRangeStart={currentRangeStart}
            setCurrentRangeStart={setCurrentRangeStart}
          />
        ) : rangeCategory == "week" ? (
          <WeekwiseSelector
            statsData={statsData}
            currentRangeStart={currentRangeStart}
            setCurrentRangeStart={setCurrentRangeStart}
          />
        ) : rangeCategory == "month" ? (
          <MonthwiseSelector
            statsData={statsData}
            currentRangeStart={currentRangeStart}
            setCurrentRangeStart={setCurrentRangeStart}
          />
        ) : (
          <CustomSelector
            statsData={statsData}
            currentRangeStart={currentRangeStart}
            setCurrentRangeStart={setCurrentRangeStart}
          />
        )}
      </main>
    </div>
  );
}

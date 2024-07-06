import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiCalendar } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { IoSpeedometerOutline } from "react-icons/io5";
import {
  RidingData,
  appDataContext,
  convertMetersToKilometers,
  convertSecondsToHoursAndMinutes,
  formatMonthDay,
  ridingBehaviourRange,
  ridingData,
} from "../../config.ts";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsDisplayCard from "./StatsDisplayCard.tsx";

export default function StatisticsPage() {
  const navigate = useNavigate();
  const initialTotals = {
    score: 0,
    distance: 0,
    duration: 0,
    averageSpeed: 0,
    topSpeed: 0,
  };

  const { statsData, currentRangeStart, setCurrentRangeStart } =
    useContext(appDataContext);

  // const [statsData, setStatsData] = useState<RidingData[]>([]);
  const [rangedData, setRangedData] = useState<RidingData[]>([]);
  const [accumulatedData, setAccumulatedData] = useState(initialTotals);
  // const [currentRangeStart, setCurrentRangeStart] = useState<{
  //   type: string;
  //   startDate: Date;
  //   endDate: Date;
  // }>({
  //   type: "week",
  //   startDate: new Date(2024, 5, 5),
  //   endDate: new Date(2024, 5, 11),
  // });
  const [config, setConfig] = useState<any>([]);
  const [disablePrev, setDisablePrev] = useState<boolean>(true);
  const [disableNext, setDisableNext] = useState<boolean>(false);

  // useEffect(() => {
  //   setStatsData(ridingData);
  // }, []);

  useEffect(() => {
    // statsData.map((data) => console.log(new Date(data.startDate)));
    let startDate = currentRangeStart.startDate;
    let endDate = currentRangeStart.endDate;
    if (currentRangeStart.type === "week") {
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
    } else if (currentRangeStart.type === "month") {
      startDate = currentRangeStart.startDate;
      endDate = currentRangeStart.endDate;
    }

    const range = statsData.filter((data) => {
      const date = new Date(data.startDate);
      return date >= startDate && date <= endDate;
    });
    setRangedData(range);
    console.log("range", range);

    const totals = range.reduce((acc, rangeData) => {
      return {
        score: acc.score + (rangeData.score ?? 0),
        distance: acc.distance + (rangeData.distance ?? 0),
        duration: acc.duration + (rangeData.duration ?? 0),
        averageSpeed: acc.averageSpeed + (rangeData.averageSpeed ?? 0),
        topSpeed: acc.topSpeed + (rangeData.topSpeed ?? 0),
      };
    }, initialTotals);
    console.log("total", totals);
    setAccumulatedData(totals);

    setConfig([
      {
        cardName: "Journey",
        cardLeftIcon: (
          <span className="bg-[#6eddc94f] rounded-full p-[2px]">
            <GiPathDistance size={15} className="text-[#6EDDC9]" />
          </span>
        ),
        cardRightIcon: (
          <span className="bg-[#00a9e26f] rounded-full p-[3px]">
            <GoClock size={15} className="text-[#00A8E2]" />
          </span>
        ),
        cardLeftTitle: "Distance Travelled",
        cardRightTitle: "Time Duration",
        cardLeftValue:
          convertMetersToKilometers(totals.distance / 6).toFixed(2) + "-km",
        cardRightValue: convertSecondsToHoursAndMinutes(totals.duration / 6),
      },
      {
        cardName: "Speed",
        cardLeftIcon: (
          <span className="bg-[#ac620d44] rounded-full p-[2px]">
            <IoSpeedometerOutline size={15} className="text-[#AC630D]" />
          </span>
        ),
        cardRightIcon: (
          <span className="bg-[#e2b61948] rounded-full p-[3px]">
            <IoSpeedometerOutline size={15} className="text-[#E2B519]" />
          </span>
        ),
        cardLeftTitle: "Average Speed",
        cardRightTitle: "Top Speed",
        cardLeftValue: Math.floor(totals.averageSpeed / 6) + "-km/hr",
        cardRightValue: Math.floor(totals.topSpeed / 6) + "-km/hr",
      },
      {
        cardName: "Fuel",
        cardLeftIcon: (
          <span className="bg-[#ac620d44] rounded-full p-[2px]">
            <IoSpeedometerOutline size={15} className="text-[#AC630D]" />
          </span>
        ),
        cardRightIcon: (
          <span className="bg-[#e2b61948] rounded-full p-[3px]">
            <IoSpeedometerOutline size={15} className="text-[#E2B519]" />
          </span>
        ),
        cardLeftTitle: "Fuel Consumed",
        cardRightTitle: "Fuel Cost",
        cardLeftValue: 3.01 + "-L",
        cardRightValue: "₹-" + 248,
      },
    ]);

    const minDate = new Date(
      Math.min(...statsData.map((data) => new Date(data.startDate).getTime())),
    );
    const maxDate = new Date(
      Math.max(...statsData.map((data) => new Date(data.startDate).getTime())),
    );

    setDisablePrev(startDate <= minDate);
    setDisableNext(endDate >= maxDate);
  }, [statsData, currentRangeStart]);

  const handlePrev = () => {
    setCurrentRangeStart((prev) => {
      const newDate = new Date(prev.startDate);
      newDate.setDate(prev.startDate.getDate() - 7);
      return { ...prev, startDate: newDate };
    });
  };

  const handleNext = () => {
    setCurrentRangeStart((prev) => {
      const newDate = new Date(prev.startDate);
      newDate.setDate(prev.startDate.getDate() + 7);
      return { ...prev, startDate: newDate };
    });
  };
  return (
    <div className="space-y-3">
      <header className="bg-[#242424] px-4 py-3 w-full flex flex-col gap-4 ">
        <h1 className="font-semibold px-2">Statistics</h1>
        <div id="range-section" className="flex py-2 ">
          <div
            id="range-picker"
            className="flex items-center px-2 w-[85%] gap-3 border border-red-100"
            onClick={() => navigate("range-selection")}
          >
            <BiCalendar />
            <span
              className="font-nunito cursor-pointer"
              onClick={() => navigate("range-selection")}
            >
              {formatMonthDay(
                new Date(rangedData[rangedData.length - 1]?.startDate),
              )}{" "}
              - {formatMonthDay(new Date(rangedData[0]?.startDate))} (Last Week)
            </span>
          </div>
          <div
            id="back-forward-btns"
            className="flex w-[15%] items-center justify-between"
          >
            <button
              onClick={handlePrev}
              disabled={disablePrev}
              className="cursor-pointer"
            >
              <GrFormPrevious size={25} />
            </button>
            <button
              onClick={handleNext}
              disabled={disableNext}
              className="cursor-pointer"
            >
              <GrFormNext size={25} />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-3 flex flex-col space-y-3">
        {/* Riding Behaviour Component */}
        <div className="bg-[#242424] rounded-md p-4 flex flex-col gap-4">
          <div className="top flex justify-between items-center">
            <h2 className="font-semibold px-2 text-sm">Riding Behaviour</h2>
            <FaArrowRightLong size={12} />
          </div>
          <div
            id="riding-behaviour"
            className="bottom flex w-full bg-[#303030] rounded-md"
          >
            <div
              id="riding-score"
              className={`w-[40%] rounded-md px-2 py-3 text-xs flex`}
            >
              <div
                className="rounded-md flex w-full"
                style={{
                  border:
                    "1px solid" +
                    ridingBehaviourRange(
                      Math.min(Math.floor(accumulatedData.score / 6), 100),
                    )?.color,
                }}
              >
                <span
                  className="w-[35%] py-1 px-3 flex justify-center rounded-s-md"
                  style={{
                    background: ridingBehaviourRange(
                      Math.min(Math.floor(accumulatedData.score / 6), 100),
                    )?.color,
                  }}
                >
                  {Math.min(Math.floor(accumulatedData.score / 6), 100)}%
                </span>
                <span className="w-[65%] py-1 px-3 flex justify-center">
                  {
                    ridingBehaviourRange(
                      Math.min(Math.floor(accumulatedData.score / 6), 100),
                    )?.message
                  }
                </span>
              </div>
            </div>
            <div
              id="preceding-period"
              className="w-[60%] text-xs flex justify-center items-center gap-1"
            >
              <span className="flex text-xs items-center gap-1 text-[#D24343]">
                <FaArrowTrendDown size={12} />
                24%
              </span>
              <span>vs preceding period</span>
            </div>
          </div>
        </div>
        {config.map((cardData) => {
          return <StatsDisplayCard data={cardData} />;
        })}
      </main>
    </div>
  );
}

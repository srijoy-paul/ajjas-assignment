import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiCalendar } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { GoClock } from "react-icons/go";
import { IoSpeedometerOutline } from "react-icons/io5";
import {
  RidingData,
  convertMetersToKilometers,
  convertSecondsToHoursAndMinutes,
  formatMonthDay,
  ridingBehaviourRange,
  ridingData,
} from "../../config.ts";
import { useEffect, useState } from "react";
import StatsDisplayCard from "./StatsDisplayCard.tsx";
export default function StatisticsPage() {
  const initialTotals = {
    score: 0,
    distance: 0,
    duration: 0,
    averageSpeed: 0,
    topSpeed: 0,
  };

  const [statsData, setStatsData] = useState<RidingData[]>([]);
  const [rangedData, setRangedData] = useState<RidingData[]>([]);
  const [accumulatedData, setAccumulatedData] = useState(initialTotals);
  const [currentRangeStart, setCurrentRangeStart] = useState<Date>(
    new Date(2024, 5, 5),
  );
  const [config, setConfig] = useState<any>([]);

  useEffect(() => {
    setStatsData(ridingData);
  }, []);

  useEffect(() => {
    statsData.map((data) => console.log(new Date(data.startDate)));
    const startDate = currentRangeStart;
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

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
    // const minDate = new Date(
    //   Math.min(...statsData.map((data) => new Date(data.startDate).getTime())),
    // );
    // const maxDate = new Date(
    //   Math.max(...statsData.map((data) => new Date(data.startDate).getTime())),
    // );
  }, [statsData, currentRangeStart]);
  return (
    <div className="space-y-3">
      <header className="bg-[#242424] px-4 py-3 w-full flex flex-col gap-4 ">
        <h1 className="font-semibold px-2">Statistics</h1>
        <div id="range-section" className="flex py-2">
          <div
            id="range-picker"
            className="flex items-center px-2 w-[85%] gap-3"
          >
            <BiCalendar />
            <span
              className="font-nunito cursor-pointer"
              onClick={() => logsole.log("Clicked on range")}
            >
              {formatMonthDay(new Date(rangedData[5]?.startDate))} -{" "}
              {formatMonthDay(new Date(rangedData[0]?.startDate))} (Last Week)
            </span>
          </div>
          <div
            id="back-forward-btns"
            className="flex w-[15%] items-center justify-between"
          >
            <span
              onClick={() => console.log("prev")}
              className="cursor-pointer"
            >
              <GrFormPrevious size={25} />
            </span>
            <span
              onClick={() => console.log("next")}
              className="cursor-pointer"
            >
              <GrFormNext size={25} />
            </span>
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
                    ridingBehaviourRange(Math.floor(accumulatedData.score / 6))
                      ?.color,
                }}
              >
                <span
                  className="w-[35%] py-1 px-3 flex justify-center rounded-s-md"
                  style={{
                    background: ridingBehaviourRange(
                      Math.floor(accumulatedData.score / 6),
                    )?.color,
                  }}
                >
                  {Math.floor(accumulatedData.score / 6)}%
                </span>
                <span className="w-[65%] py-1 px-3 flex justify-center">
                  {
                    ridingBehaviourRange(Math.floor(accumulatedData.score / 6))
                      ?.message
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

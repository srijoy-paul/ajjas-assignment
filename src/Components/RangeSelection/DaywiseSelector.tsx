import { useState } from "react";
import { formatDayMonth } from "../../config";
import RangeDisplayComponent from "./RangeDisplayComponent";

export default function DaywiseSelector({
  statsData,
  currentRangeStart,
  setCurrentRangeStart,
}) {
  const [tick, setTick] = useState("");
  console.log("from daywise :", statsData);
  const dayWiseConfig = [
    {
      title: "Today",
      dateFunction: () => {
        setTick("Today");
        setCurrentRangeStart({
          type: "day",
          startDate: new Date(statsData[0].startDate),
          endDate: new Date(statsData[0].startDate),
        });
      },
      formatedDate: formatDayMonth(new Date(statsData[0].startDate)),
    },
    {
      title: "Yesterday",
      dateFunction: () => {
        setTick("Yesterday");
        setCurrentRangeStart({
          type: "day",
          startDate: new Date(statsData[1].startDate),
          endDate: new Date(statsData[1].startDate),
        });
      },
      formatedDate: formatDayMonth(new Date(statsData[1].startDate)),
    },
    {
      title: "Day before yesterday",
      dateFunction: () => {
        setTick("Day before yesterday");
        setCurrentRangeStart({
          type: "day",
          startDate: new Date(statsData[2].startDate),
          endDate: new Date(statsData[2].startDate),
        });
      },
      formatedDate: formatDayMonth(new Date(statsData[2].startDate)),
    },
  ];
  return (
    <>
      {dayWiseConfig.map((day) => {
        return (
          <RangeDisplayComponent
            key={day.title}
            date={day}
            tick={tick === day.title}
          />
        );
      })}
    </>
  );
}

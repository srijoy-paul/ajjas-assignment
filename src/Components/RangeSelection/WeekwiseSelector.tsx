import { useState } from "react";
import RangeDisplayComponent from "./RangeDisplayComponent";
import { formatMonthDay, formatMonthDay2 } from "../../config";

export default function WeekwiseSelector({
  statsData,
  currentRangeStart,
  setCurrentRangeStart,
}) {
  const [tick, setTick] = useState("");
  console.log("from weekwise :", statsData);
  console.log("from weekwise currentRangeStart:", currentRangeStart);
  const weekWiseConfig = [
    {
      title: "This week",
      dateFunction: () => {
        setTick("This week");
        setCurrentRangeStart({
          type: "week",
          startDate: new Date(statsData[6].startDate),
          endDate: new Date(statsData[0].startDate),
        });
      },
      formatedDate:
        formatMonthDay2(new Date(statsData[5].startDate)) +
        " - " +
        formatMonthDay2(new Date(statsData[0].startDate)),
    },
    {
      title: "Last week",
      dateFunction: () => {
        setTick("Last week");
        setCurrentRangeStart({
          type: "week",
          startDate: new Date(statsData[7].startDate),
          endDate: new Date(statsData[13].startDate),
        });
      },
      formatedDate:
        formatMonthDay2(new Date(statsData[7].startDate)) +
        " - " +
        formatMonthDay2(new Date(statsData[13].startDate)),
    },
    {
      title: "Last 7 days",
      dateFunction: () => {
        setTick("Last 7 days");
        setCurrentRangeStart({
          type: "week",
          startDate: new Date(statsData[2].startDate),
          endDate: new Date(statsData[2].startDate),
        });
      },
      formatedDate: formatMonthDay(statsData[2].startDate),
    },
  ];
  return (
    <>
      {weekWiseConfig.map((week) => {
        return (
          <RangeDisplayComponent
            key={week.title}
            date={week}
            tick={tick === week.title}
          />
        );
      })}
    </>
  );
}

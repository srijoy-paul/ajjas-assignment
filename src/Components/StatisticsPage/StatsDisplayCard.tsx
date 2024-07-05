import { FaArrowRightLong, FaArrowTrendDown } from "react-icons/fa6";

export default function StatsDisplayCard({ data }) {
  console.log("data from statsdisplaycard", data);
  return (
    <>
      <div
        id="statsCard"
        className="bg-[#242424] rounded-md p-4 flex flex-col gap-4"
      >
        <div className="top flex justify-between items-center">
          <h2 className="card-title font-semibold px-2 text-sm">
            {data.cardName}
          </h2>
          <FaArrowRightLong size={12} />
        </div>
        <div className="bottom flex w-full rounded-md">
          <div className="left w-[50%] border-r-2 border-black flex flex-col space-y-2">
            <span
              id="cardLeftTitle"
              className="flex text-[10px] gap-1 items-center"
            >
              {data.cardLeftIcon}
              {data.cardLeftTitle}
            </span>
            <span id="cardLeftValue">
              <span className="text-xl font-bold mr-1">
                {data.cardLeftValue.split("-")[0]}
              </span>
              <span className="text-xs font-thin">
                {data.cardLeftValue.split("-")[1]}
              </span>
            </span>
            <div
              id="preceding-period"
              className="text-[9px] flex justify-start items-center gap-1"
            >
              <span className="flex  font-thin items-center gap-1 text-[#D24343]">
                <FaArrowTrendDown size={12} />
                24%
              </span>
              <span className="flex text-nowrap">vs preceding period</span>
            </div>
          </div>
          <div className="right w-[50%] flex flex-col space-y-2 items-start  ml-7">
            <span
              id="cardRightTitle"
              className="flex text-[10px] gap-1 items-center"
            >
              {data.cardRightIcon}
              {data.cardRightTitle}
            </span>
            <span id="cardRightValue" className="">
              {data.cardRightTitle == "Time Duration" ? (
                <>
                  <span className="text-xl font-bold mr-1">
                    {data.cardRightValue.split("hr")[0]}
                  </span>
                  <span className="text-xs mr-1">hr</span>
                  <span className="text-xl font-bold mr-1">
                    {data.cardRightValue.split("hr")[1].split("min")[0]}
                  </span>
                  <span className="text-xs mr-1">min</span>
                </>
              ) : data.cardRightTitle == "Fuel Cost" ? (
                <>
                  <span className="text-xs font-thin mr-1">
                    {data.cardRightValue.split("-")[0]}
                  </span>
                  <span className="text-xl font-bold">
                    {data.cardRightValue.split("-")[1]}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-xl font-bold mr-1">
                    {data.cardRightValue.split("-")[0]}
                  </span>
                  <span className="text-xs font-thin">
                    {data.cardRightValue.split("-")[1]}
                  </span>
                </>
              )}
            </span>
            <div
              id="preceding-period"
              className="text-[9px] flex justify-start items-center gap-1"
            >
              <span className="flex  font-thin items-center gap-1 text-[#D24343]">
                <FaArrowTrendDown size={12} />
                24%
              </span>
              <span className="flex text-nowrap">vs preceding period</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

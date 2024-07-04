import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { BiCalendar } from "react-icons/bi";
export default function StatisticsPage() {
  return (
    <div>
      <header className="bg-[#242424] px-4 py-3 w-full flex flex-col">
        <h1>Statistics</h1>
        <div id="range-section" className="flex py-2">
          <div
            id="range-picker"
            className="flex items-center w-[85%] border-2 border-red-100 gap-3 font-nunito"
          >
            <BiCalendar />
            <span>Mar 1 - Mar 7 (Last Week)</span>
          </div>
          <div
            id="back-forward-btns"
            className="flex w-[15%] border-2 border-red-100 items-center justify-between"
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
    </div>
  );
}

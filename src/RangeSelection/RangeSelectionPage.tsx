export default function RangeSelectionPage() {
  return (
    <div className="space-y-3">
      <header className="bg-[#242424] px-4 py-3 w-full flex flex-col gap-4 ">
        <h1 className="font-semibold px-2">Date Range</h1>
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
    </div>
  );
}

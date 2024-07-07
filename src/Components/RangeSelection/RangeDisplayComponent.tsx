import { FaCheck } from "react-icons/fa";

export default function RangeDisplayComponent({ date, tick }) {
  return (
    <div className="flex border-b border-[#333] mx-4 py-4 justify-between items-center">
      <div
        className="flex flex-col    cursor-pointer"
        onClick={date.dateFunction}
      >
        <h3
          className={`  text-sm ${tick ? "text-[#FFBE00]" : "text-[#F3F3F3]"}`}
        >
          {date.title}
        </h3>
        <span className="text-[#aaa] text-xs">{date.formatedDate}</span>
      </div>
      {tick && <FaCheck size={15} className="text-[#FFBE00]" />}
    </div>
  );
}

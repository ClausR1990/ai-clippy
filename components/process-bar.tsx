import WindowIcon from "@/public/icons/windows-flag.png";
import Image from "next/image";

const ProcessBar = () => {
  return (
    <div className="window flex items-center justify-between bg-[silver] fixed bottom-0 w-full">
      <div>
        <button className="flex items-center gap-1">
          <Image src={WindowIcon} alt="" className="w-4 inline-block" />
          Start
        </button>
      </div>
      <div className="status-bar">
        <div className="status-bar-field">dfd</div>
      </div>
    </div>
  );
};

export { ProcessBar };

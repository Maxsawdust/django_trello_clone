import { FaListCheck } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";

interface Props {
  title: string;
}

export default function ProjectCard({ title }: Props) {
  return (
    <div className="relative w-full h-10 px-5 rounded-lg hover:bg-background transition-all duration-150">
      <button
        className="h-full w-full flex items-center gap-5 cursor-pointer"
        onClick={() => console.log("button1")}>
        <FaListCheck size={20} />
        {/* Project name */}
        <p className="">{title}</p>
      </button>

      {/* Project options */}
      <button
        className="absolute right-5 top-[50%] translate-y-[-50%] h-5 w-5 flex items-center justify-center cursor-pointer rounded-sm hover:bg-accent-1 duration-150"
        onClick={() => console.log("button2")}>
        <SlOptions />
      </button>
    </div>
  );
}

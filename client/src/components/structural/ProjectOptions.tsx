import { motion } from "framer-motion";
import { useRef } from "react";
import { OptionButton } from "../";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface Props {
  mousePosition: { x: number; y: number };
  setOptionsAreDisplayed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProjectOptions({
  mousePosition,
  setOptionsAreDisplayed,
}: Props) {
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const optionsRect = optionsRef.current?.getBoundingClientRect();

    const isOutsideOfRect =
      optionsRect &&
      (e.clientX < optionsRect.left ||
        e.clientY < optionsRect.top ||
        e.clientX > optionsRect.right ||
        e.clientY > optionsRect.bottom);

    if (isOutsideOfRect) setOptionsAreDisplayed(false);
  };

  const editProject = () => {
    // set is editing true
    // need to make input appear if is editing
    // or replace this with project input??
  };

  const deleteProject = () => {
    // delete that shit
  };

  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen z-10"
      onMouseDown={handleMouseDown}>
      <motion.div
        ref={optionsRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="absolute h-30 w-30 p-2 flex flex-col items-start gap-2 bg-secondary rounded-md z-11"
        style={{ top: mousePosition.y, left: mousePosition.x }}>
        <OptionButton onClick={editProject} icon={<FaEdit size={19} />}>
          Edit
        </OptionButton>

        <OptionButton
          onClick={deleteProject}
          icon={<MdDeleteForever size={20} />}>
          Delete
        </OptionButton>
      </motion.div>
    </div>
  );
}

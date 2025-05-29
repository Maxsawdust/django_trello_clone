import { useContext, useEffect, useRef, useState } from "react";
import { EditingContext } from "../structural/ProjectCard";
import type { Project } from "../../store/types";
import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { editProject } from "../../store/reducers/projectsReducers";

interface Props {
  project: Project;
}

export default function ProjectEditInput({ project }: Props) {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { setIsEditing } = useContext(EditingContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || inputValue === "") return;

    console.log(e);

    // udpate DB
    try {
      const response = await fetch("http://127.0.0.1:8000/projects/edit/", {
        method: "PATCH",
        body: JSON.stringify({ ...project, title: inputValue }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
    } catch (err: any) {
      console.error(err);
    }

    // update global store
    dispatch(editProject({ ...project, title: inputValue }));
    setIsEditing(false);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className="px-2 w-[75%] rounded-md bg-background"
      onBlur={handleBlur}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
      onKeyDown={handleKeyDown}
    />
  );
}

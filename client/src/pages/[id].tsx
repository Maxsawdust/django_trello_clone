import { useParams } from "react-router";
import { useAppSelector } from "../store/hooks/reduxHooks";
import { Sidebar } from "../components";

export default function ProjectPage() {
  const { id } = useParams();

  const projects = useAppSelector((state) => state.projects.projects);

  const project =
    projects[
      projects.indexOf(projects.find((project) => project.id === Number(id))!)
    ];

  if (project) {
    const formattedDate = new Date(project.created_at).toLocaleString();
  }

  return (
    <div className="h-full w-full bg-background">
      <Sidebar />
    </div>
  );
}

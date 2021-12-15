import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import "./Dashboard.css";

export default function Dashboard() {
  const { documents, error } = useCollection("projects");
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && (
        <div className="w3-panel w3-red w3-margin w3-padding w3-center">
          {error}
        </div>
      )}
      {documents && <ProjectList projects={documents} />}
    </div>
  );
}

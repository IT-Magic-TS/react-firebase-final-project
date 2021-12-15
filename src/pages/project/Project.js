import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import "./Project.css";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);

  if (error) {
    return (
      <div className="w3-panel w3-red w3-margin w3-padding w3-center">
        {error}
      </div>
    );
  }

  if (!document) {
    return (
      <div className="w3-center">
        <i className="fa fa-spinner w3-spin w3-text-green w3-xxlarge"></i>
      </div>
    );
  }

  console.log(document);
  return (
    <div className="project-details">
      <ProjectSummary item={document} />
      <ProjectComments project={document} />
    </div>
  );
}

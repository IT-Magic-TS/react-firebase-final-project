import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "./ProjectList.css";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list w3-margin">
      {projects.length === 0 && (
        <div className="w3-panel w3-red w3-margin w3-padding w3-center">
          No projects yet!
        </div>
      )}
      {projects.map(item => (
        <Link key={item.id} to={`/projects/${item.id}`}>
          <h4>{item.name}</h4>
          <p>Due by {item.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {item.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}

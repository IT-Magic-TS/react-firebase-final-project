import Avatar from "../../components/Avatar";
import { useNavigate } from "react-router-dom";
import { useAuthcontext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function ProjectSummary({ item }) {
  const navigate = useNavigate();
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthcontext();

  const handleClick = () => {
    deleteDocument(item.id);
    navigate("/");
  };
  return (
    <div>
      <div className="project-summary w3-margin">
        <h2 className="page-title">{item.name}</h2>
        <p>By {item.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {item.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{item.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {item.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === item.createdBy.id && (
        <div className="btn" onClick={handleClick}>
          Mark as Complete
        </div>
      )}
    </div>
  );
}

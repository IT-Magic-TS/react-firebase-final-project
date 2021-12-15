import Avatar from "../../components/Avatar";

export default function ProjectSummary({ item }) {
  return (
    <div className="project-summary w3-margin">
      <h2 className="page-title">{item.name}</h2>
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
      <div className="btn">Mark as Complete</div>
    </div>
  );
}

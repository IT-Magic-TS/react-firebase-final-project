import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";
import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { documents, error } = useCollection("users");
  return (
    <div className="user-list">
      <h2>All Users</h2>
      {error && (
        <div className="w3-panel w3-red w3-margin w3-padding w3-center">
          {error}
        </div>
      )}
      {documents &&
        documents.map(user => (
          <div key={user.id} className="user-list-item">
            {user.online && <i className="fa fa-circle" aria-hidden="true"></i>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}

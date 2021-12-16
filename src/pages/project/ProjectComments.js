import { useState } from "react";
import Avatar from "../../components/Avatar";
import { timestamp } from "../../firebase/config";
import { useAuthcontext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ProjectComments({ project }) {
  const { updateDocument, response } = useFirestore("projects");
  const [comment, setComment] = useState("");
  const { user } = useAuthcontext();

  const handleForm = async e => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: comment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd]
    });
    if (!response.error) {
      setComment("");
    }
  };
  return (
    <div className="project-comments w3-margin">
      <h4 className="w3-center">Project Comments</h4>
      <ul>
        {project.comments.length > 0 &&
          project.comments.map(item => (
            <li key={item.id}>
              <div className="comment-author">
                <Avatar src={item.photoURL} />
                <p>{item.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(item.createdAt.toDate(), {
                    addSuffix: true
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{item.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form onSubmit={handleForm} className="add-comment">
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={e => setComment(e.target.value)}
            value={comment}
          ></textarea>
        </label>
        <div className="w3-center">
          {response.isPending && (
            <div className="w3-center">
              <i className="fa fa-spinner w3-spin w3-text-green w3-xxlarge"></i>
            </div>
          )}
          {!response.isPending && (
            <button type="submit" className="w3-btn w3-green">
              Add Comment
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

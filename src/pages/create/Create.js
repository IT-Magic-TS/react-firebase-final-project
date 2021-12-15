import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { timestamp } from "../../firebase/config";
import { useAuthcontext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Desig" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" }
];

export default function Create() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("projects");

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);

  const { user } = useAuthcontext();

  const [formError, setformError] = useState(null);

  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleForm = async e => {
    e.preventDefault();
    setformError(null);

    if (!category) {
      setformError("Please select a project category");
      return;
    }

    if (assignedUsers.length < 1) {
      setformError("Please assign the project to at least 1 user");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    };

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    };

    await addDocument(project);
    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <div className="create-form">
      <form className="w3-card-4 w3-margin w3-padding" onSubmit={handleForm}>
        <h3 className="w3-center w3-margin">Create a new project</h3>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Project details:</span>
          <textarea
            required
            value={details}
            onChange={e => setDetails(e.target.value)}
          ></textarea>
        </label>
        <label>
          <span>Project due date:</span>
          <input
            type="date"
            required
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={option => setCategory(option)}
          />
        </label>
        <label>
          <span>Project users:</span>
          <Select
            options={users}
            onChange={option => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <p className="w3-center">
          <button type="submit" className="w3-btn w3-green">
            Create Project
          </button>
        </p>
        {formError && (
          <div className="w3-panel w3-red w3-margin w3-padding w3-center">
            {formError}
          </div>
        )}
      </form>
    </div>
  );
}

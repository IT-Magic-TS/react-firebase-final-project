import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export default function Signup() {
  const { isPending, error, signup } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);

  const handleForm = e => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = e => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <form className="auth-form" onSubmit={handleForm}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          required
          onChange={e => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && (
        <div className="w3-center">
          <button type="submit" className="btn">
            Signup
          </button>
        </div>
      )}
      {isPending && (
        <div className="w3-center">
          <i className="fa fa-spinner w3-spin w3-text-green w3-xxlarge"></i>
        </div>
      )}
      {error && (
        <div className="w3-panel w3-red w3-margin w3-padding w3-center">
          {error}
        </div>
      )}
    </form>
  );
}

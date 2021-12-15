import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./Login.css";

export default function Login() {
  const { login, isPending, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="login-form" onSubmit={handleForm}>
      <h2>Login</h2>
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
      {!isPending && (
        <div className="w3-center">
          <button type="submit" className="btn">
            Login
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

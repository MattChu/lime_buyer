import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config.js";
import { useNavigate } from "react-router-dom";
import { postUser } from "../utils/postUser.js";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await postUser(user.uid, username);

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleEmailSignup}>
        <input
          className="signup-input"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="signup-input"
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="signup-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="signup-input"
          placeholder="Confirm Password"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="signup-button" type="submit">
          Sign Up with Email
        </button>
      </form>
    </div>
  );
}

export default Signup;

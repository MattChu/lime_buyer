import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
auth.useDeviceLanguage();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <form className="signup-container" onSubmit={handleLogin}>
        <h2 className="signup-title">Log In</h2>
        <input className="signup-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="signup-input" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button className="signup-button" type="submit">Log In</button>
      </form>
      <button className="signup-button" onClick={handleGoogleSignup}>Sign Up with Google</button>
    </>
  );
}

export default Login;

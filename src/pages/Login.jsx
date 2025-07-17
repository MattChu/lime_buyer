import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config.js";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
auth.useDeviceLanguage();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      console.log(err.message);

      if (err.code === "auth/invalid-credential") {
        setIsError("Incorrect email and/or password");
      } else if (err.code === "auth/missing-password") {
        setIsError("Please enter password to continue");
      } else if (err.code === "auth/invalid-email") {
        setIsError("Please enter email to continue");
      }
    }
  };

  const handleGoogleSignup = async () => {
    setIsError("");
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
        <input
          className="signup-input"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup-button" type="submit">
          Log In
        </button>
        {isError && <p className="Login-error">{isError}</p>}
      </form>
      <button className="signup-button" onClick={handleGoogleSignup}>
        Sign Up with Google
      </button>
    </>
  );
}

export default Login;

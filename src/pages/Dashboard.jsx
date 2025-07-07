import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>
        You are logged in as {auth.currentUser.email} with uid {auth.currentUser.uid}
      </p>
      <hr />
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default Dashboard;

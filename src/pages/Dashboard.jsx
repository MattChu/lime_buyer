import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  fetch(
    `https://limebuyer2025-be.onrender.com/api/users/${auth.currentUser.uid}/reviews`
  ).then((res) => {});

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>
        You are logged in as {auth.currentUser.email} with uid{" "}
        {auth.currentUser.uid}
      </p>
      <hr />
      <button onClick={logout}>Log Out</button>
      <div className="dashUserInfo">
        <p>Email: {auth.currentUser.email}</p>
        <p>Username: {auth.currentUser.username}</p>
      </div>
      <div className="dashUserReviews">
        <p>{}</p>
      </div>
    </div>
  );
}

export default Dashboard;

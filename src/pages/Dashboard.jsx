import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReviewsByUser } from "../utils/fetchReviewsByUID.js";
import { getUser } from "../utils/fetchUsersByUID.js";

function Dashboard() {
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };
  useEffect(() => {
    if (!auth.currentUser) return;
    setUserInfoLoading(true);
    getUser(auth.currentUser.uid)
      .then((data) => {
        setUserInfo(data.user);
      })
      .catch((err) => {
        console.error("failed to fetch user info", err);
      })
      .finally(() => {
        setUserInfoLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;
    setReviewsLoading(true);
    fetchReviewsByUser(auth.currentUser.uid)
      .then((data) => {
        setUserReviews(data.reviews);
      })
      .catch((err) => {
        console.error("failed to load user reviews", err);
      })
      .finally(() => {
        setReviewsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>
        You are logged in as {auth.currentUser.email} with uid{" "}
        {auth.currentUser.uid}
      </p>
      <hr />

      <div className="dashUserInfo">
        <img
          className="dash-avatar"
          src={
            userInfo?.avatar_url ??
            "https://api.dicebear.com/9.x/thumbs/svg?seed=Eden"
          }
          alt="avatar"
        ></img>
        <p>Email: {auth.currentUser.email}</p>

        <p>
          Username: {userInfo?.username ? userInfo.username : "No username set"}
        </p>
        <button onClick={logout}>Log Out</button>
        <button onClick={logout}>Edit Profile</button>
      </div>
      <div className="dashUserReviews">
        <h3>Your Reviews</h3>
        {reviewsLoading ? (
          <p>Loading reviews...</p>
        ) : userReviews.length === 0 ? (
          <p>You haven't posted any reviews yet.</p>
        ) : (
          <ul>
            {userReviews.map((review) => (
              <li key={review.review_id}>
                <p>
                  <strong>{review.fruit}</strong> — {review.body}
                </p>
                <p style={{ color: "green" }}>Rating: {review.rating} 🍋</p>
                <small>{new Date(review.published).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

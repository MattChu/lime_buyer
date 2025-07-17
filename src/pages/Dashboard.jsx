import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase.config.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReviewsByUser } from "../utils/fetchReviewsByUID.js";
import { getUser } from "../utils/fetchUsersByUID.js";
import { removeReviewByID } from "../utils/removeReviewByID.js";

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

  const handleDelete = async (review_id) => {
    console.log("delete attempt on review:", review_id);
    if (!window.confirm("are you sure you want to delete this review?")) return;

    try {
      const uid = auth.currentUser.uid;
      await removeReviewByID(review_id, uid);
      setUserReviews((previousReviews) => previousReviews.filter((review) => review.review_id !== review_id));
    } catch (err) {
      console.error("failed to delete review:", err);
      alert("Could not delete review. Please try again.");
    }
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>

      <hr />

      <div className="dashUserInfo">
        <img
          className="dash-avatar"
          src={userInfo?.avatar_url ?? "https://api.dicebear.com/9.x/thumbs/svg?seed=Eden"}
          alt="avatar"
        ></img>
        <p>Email: {auth.currentUser.email}</p>
        <p>Username: {userInfo?.username ? userInfo.username : "No username set"}</p>
        <button onClick={logout}>Log Out</button>
        <br></br>
        <button onClick={() => navigate("/editprofile")}>Edit Profile</button>
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
                <br />
                {auth.currentUser.uid === review.uid && (
                  <button className="delete-button" onClick={() => handleDelete(review.review_id)}>
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/fetchUsersByUID";
import { patchUser } from "../utils/patchUser";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

function EditProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);
  const uid = user.uid;
  console.log(user.uid);

  useEffect(() => {
    getUser(uid)
      .then((data) => {
        setUsername(data.user.username || "");
        setAvatarUrl(data.user.avatar_url || "");
      })
      .catch((err) => {
        console.error("Failed to fetch user info:", err);
        alert("Failed to load profile.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await patchUser(uid, username, avatarUrl);
      alert("Profile updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Could not update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="signup-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Username:
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Avatar URL:
          <input
            className="signup-input-avatarurl"
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </label>
        <button className="signup-button" type="submit">
          Save Changes
        </button>
        <button
          className="signup-button"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;

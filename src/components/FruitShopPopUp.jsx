import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect } from "react";

import { Popup } from "react-leaflet";

import AddReview from "./AddReview";
import ReviewList from "./ReviewList";

function FruitShopPopUp({ shop }) {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!shop.id) return;

  setLoading(true);

  fetch(`https://limebuyer2025-be-fug6.onrender.com/api/reviews/${shop.id}`)
    .then((res) => {
      if (!res.ok) {
        return res.json()
          .then((errorData) => {
            const error = new Error(errorData.msg || res.statusText);
            error.status = res.status;
            throw error;
          })
          .catch(() => {
            const error = new Error(res.statusText);
            error.status = res.status;
            throw error;
          });
      }
      return res.json();
    })
    .then((data) => {
      setReviews(data.reviews);
    })
    .catch((err) => {
      if (err.status !== 404) {
        console.error("Unexpected error fetching reviews:", err);
      }
      setReviews([]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [shop.id]);

  return (
    <Popup>
      <div className="popup-title">
        <img
          src="/images/lime-logo.png"
          alt="Logo"
          style={{ width: "50px", height: "50px" }}
        />
        <strong>{shop.name}</strong>
        <img
          src="/images/lime-logo.png"
          alt="Logo"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <br />
      Type: {shop.type}
      <ReviewList reviews={reviews} loading={loading} />
      {user ? (
        <AddReview shop={shop} onNewReview={setReviews} />
      ) : (
        <p style={{ marginTop: "0.5rem" }}>
          Log in <a href="/login">here</a> to leave a review
        </p>
      )}
    </Popup>
  );
}

export default FruitShopPopUp;

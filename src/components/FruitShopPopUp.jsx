import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { Popup } from "react-leaflet";

import AddReview from "./AddReview";
import ReviewList from "./ReviewList";

function FruitShopPopUp({ shop }) {
  const { user } = useContext(UserContext);
  return (
    <Popup>
      <div className="popup-title">
        <img src="/images/lime-logo.png" alt="Logo" style={{ width: "50px", height: "50px" }} />
        <strong>{shop.name}</strong>
        <img src="/images/lime-logo.png" alt="Logo" style={{ width: "50px", height: "50px" }} />
      </div>
      <br />
      Type: {shop.type}
      <ReviewList shop={shop} />
      {user ? (
        <AddReview shop={shop} />
      ) : (
        <p style={{ marginTop: "0.5rem" }}>
          Log in <a href="/login">here</a> to leave a review
        </p>
      )}
    </Popup>
  );
}

export default FruitShopPopUp;

import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import AddReview from "./AddReview";
import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import { UserContext } from "../contexts/UserContext";
import { DistanceContext } from "../contexts/DistanceContext";
import { fetchOverpassShops } from "../utils/fetchOverpassShops";

function FruitMarker() {
  const [shops, setShops] = useState([]);
  const [review, setReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(null);

  const { user } = useContext(UserContext);
  const { location } = useContext(LocationContext);
  const { distance } = useContext(DistanceContext);

  const [isFetchingShops, setIsFetchingShops] = useState(false);
  const [isErrorFetchShops, setIsErrorFetchShops] = useState(false);

  // handle submit function for reviews - # NOTE API ENDPOINT /REVIEWS IS FICTITIOUS AND WILL NEED TO BE MARRIED TO BE ENDPOINT #
  function handleSubmit(e) {
    e.preventDefault();

    const reviewInfo = {
      markerId: currentMarker.id,
      reviewText: review,
      rating: ratingValue,
      userName: user.userName,
    };

    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewInfo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("reviewing failed");
        }
        return res.json();
      })
      .then(() => {
        alert("review saved");
      })
      .catch((error) => {
        console.error(error);
        alert("error saving review");
      });
  }

  useEffect(() => {
    if (!location) return;

    const asyncUseEffect = async () => {
      setIsFetchingShops(true);
      setIsErrorFetchShops(false);
      try {
        const results = await fetchOverpassShops(distance, location);
        setShops(results);
      } catch (err) {
        setIsErrorFetchShops(true);
      } finally {
        setIsFetchingShops(false);
      }
    };
    asyncUseEffect();
  }, [location, distance]);

  return (
    <>
      {shops.map((shop) => {
        const glowingIcon = L.divIcon({
          className: "custom-glow-icon",
          html: `<div class='marker-dot ${shop.type}'></div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });

        return (
          <Marker
            key={shop.id}
            position={[shop.lat, shop.lon]}
            icon={glowingIcon}
            eventHandlers={{
              click: () => setCurrentMarker(shop),
            }}
          >
            <Popup>
              <strong>{shop.name}</strong>
              <br />
              Type: {shop.type}
              {user ? (
                <AddReview
                  onSubmit={handleSubmit}
                  review={review}
                  setReview={setReview}
                  ratingValue={ratingValue}
                  setRatingValue={setRatingValue}
                />
              ) : (
                <p>
                  Log in <a href="/login">here</a> to leave a review
                </p>
              )}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default FruitMarker;

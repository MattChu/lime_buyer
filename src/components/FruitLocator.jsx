import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import AddReview from "./AddReview";
import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import { UserContext } from "../contexts/UserContext";

function FruitMarker() {
  const [shops, setShops] = useState([]);
  const [review, setReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(null);
  const { user } = useContext(UserContext);

  const { location, setLocation } = useContext(LocationContext);

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

  const distance = 1500.0;

  useEffect(() => {
    if (!location) return;

    const overpassQuery = `
  [out:json][timeout:25];
(
  nwr(around:${distance},${location[0]},${location[1]})["shop"="supermarket"];
  nwr(around:${distance},${location[0]},${location[1]})["shop"="greengrocer"];
  nwr(around:${distance},${location[0]},${location[1]})["shop"="grocery"];
  nwr(around:${distance},${location[0]},${location[1]})["shop"="convenience"];

);
out center;
`;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const results = data.elements.map((element) => {
          const name = element.tags.name?.toLowerCase() || "";
          let type = element.tags.shop || "other";

          if (name.includes("tesco")) type = "tesco";
          else if (name.includes("m&s")) type = "mands";
          else if (name.includes("selfridges")) type = "selfridges";

          return {
            id: element.id,
            lat: element.lat ?? element.center.lat,
            lon: element.lon ?? element.center.lon,
            name: element.tags.name || "unknown",
            type,
          };
        });

        setShops(results);
      })
      .catch(console.error);
  }, [location]);

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

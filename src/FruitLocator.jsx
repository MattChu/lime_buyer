import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { CircleMarker } from "react-leaflet";

function FruitMarker({ userLocation }) {
  const [shops, setShops] = useState([]);
  const [review, setReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [currentMarker, setCurrentMarker] = useState(null);

  // handle submit function for reviews - # NOTE API ENDPOINT /REVIEWS IS FICTITIOUS AND WILL NEED TO BE MARRIED TO BE ENDPOINT #
  function handleSubmit(e) {
    e.preventDefault();

    const reviewInfo = {
      markerId: currentMarker.id,
      reviewText: review,
      rating: ratingValue,
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

  // Bounding box function that sets the search area for our api query. Offset is the degree in which determines how big the box will be. 0.1 = 10-15km diameter.

  function getBoundingBox([latitude, longitude], offset = 0.1) {
    return {
      south: latitude - offset,
      west: longitude - offset,
      north: latitude + offset,
      east: longitude + offset,
    };
  }

  useEffect(() => {
    if (!userLocation) return;

    // Bounding box where the long and lat are set based on the user coordinates that are fed as a prop from mapviewer.
    const boundingBox = getBoundingBox(userLocation);

    // Overpass query body that determines the corners of the bounding box (MUST ALWAYS BE S->W->N->E)
    const overpassQuery = `
  [out:json][timeout:25];
  (
    node["shop"="greengrocer"](${boundingBox.south}, ${boundingBox.west}, ${boundingBox.north}, ${boundingBox.east});
    node["shop"="supermarket"](${boundingBox.south}, ${boundingBox.west}, ${boundingBox.north}, ${boundingBox.east});
  );
  out body;
`;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: overpassQuery,
    })
      .then((response) => response.json())
      .then((data) => {
        const results = data.elements.map((element) => ({
          id: element.id,
          lat: element.lat,
          lon: element.lon,
          name: element.tags.name || "unknown",
          type: element.tags.shop,
        }));
        setShops(results);
      })
      .catch(console.error);
  }, []);

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
              <form onSubmit={handleSubmit}>
                <label>
                  Review:
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review here"
                  />
                </label>

                <label>
                  Rating:
                  <select
                    value={ratingValue}
                    onChange={(e) => setRatingValue(Number(e.target.value))}
                  >
                    <option value={0}>Select rating</option>
                    <option value={1}>1 - Tesco-Tier</option>
                    <option value={2}>2 - Edible</option>
                    <option value={3}>3 - Mild-Zest</option>
                    <option value={4}>4 - Juicyyy</option>
                    <option value={5}>5 - LimeBuyer Certified</option>
                  </select>
                </label>

                <button type="submit">Submit</button>
              </form>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

export default FruitMarker;

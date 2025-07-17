import { Marker } from "react-leaflet";

import FruitShopPopUp from "./FruitShopPopUp";
import { fetchReviewsByStore } from "../utils/fetchReviewsByStoreID";
import { useEffect, useState } from "react";

import fruitIcons from "../assets/fruitIcons";

function FruitShopMarker({ shop }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!shop.id) return;

    const asyncUseEffect = async () => {
      setLoading(true);
      try {
        const results = await fetchReviewsByStore(shop.id);
        setReviews(results.reviews);
      } catch (err) {
        if (err.status !== 404) {
          console.error("Unexpected error fetching reviews:", err);
        }
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    asyncUseEffect();
  }, []);

  return (
    <Marker
      position={[shop.lat, shop.lon]}
      icon={reviews.length !== 0 ? fruitIcons[reviews[0].fruit] : fruitIcons.notReviewed}
    >
      <FruitShopPopUp shop={shop} reviews={reviews} setReviews={setReviews} loading={loading} />
    </Marker>
  );
}

export default FruitShopMarker;

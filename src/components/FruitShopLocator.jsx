import { useEffect, useState } from "react";

import FruitShopMarker from "./FruitShopMarker";

import { useContext } from "react";

import { DistanceContext } from "../contexts/DistanceContext";
import { LocationContext } from "../contexts/LocationContext";
import { LoadingAndErrorContext } from "../contexts/LoadingErrorContext";

import { fetchOverpassShops } from "../utils/fetchOverpassShops";

function FruitShopLocator() {
  const [shops, setShops] = useState([]);

  const { location } = useContext(LocationContext);
  const { distance } = useContext(DistanceContext);
  const { setIsLoading, setIsError } = useContext(LoadingAndErrorContext);

  useEffect(() => {
    if (!location) return;

    const asyncUseEffect = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const results = await fetchOverpassShops(distance, location);
        setShops(results);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    asyncUseEffect();
  }, [location, distance]);

  return (
    <>
      {shops.map((shop) => {
        return <FruitShopMarker shop={shop} key={shop.id} />;
      })}
    </>
  );
}

export default FruitShopLocator;

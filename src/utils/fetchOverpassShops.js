export async function fetchOverpassShops(distance, [lat, lon]) {
  const overpassQuery = `
    [out:json][timeout:25];
  (
    nwr(around:${distance},${lat},${lon})["shop"="supermarket"];
    nwr(around:${distance},${lat},${lon})["shop"="greengrocer"];
    nwr(around:${distance},${lat},${lon})["shop"="grocery"];
    nwr(around:${distance},${lat},${lon})["shop"="convenience"];
  
  );
  out center;
  `;

  const res = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: overpassQuery,
  });
  if (!res.ok) {
    const err = new Error("Failed to fetch shops");
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
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
  return results;
}

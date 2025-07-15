export async function fetchReviewsByStore(store_id) {
  const res = await fetch(
    `https://limebuyer2025-be.onrender.com/api/reviews/${store_id}`
  );
  if (!res.ok) {
    const err = new Error("Failed to fetch store reviews");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

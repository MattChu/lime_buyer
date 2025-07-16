export async function fetchReviews() {
  const res = await fetch(`https://limebuyer2025-be-fug6.onrender.com/api/reviews`);
  if (!res.ok) {
    const err = new Error("Failed to fetch reviews");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

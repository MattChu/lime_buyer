export async function fetchReviewsByUser(uid) {
  const res = await fetch(
    `https://limebuyer2025-be-fug6.onrender.com/api/users/${uid}/reviews`
  );
  if (!res.ok) {
    const err = new Error("Failed to fetch user reviews");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

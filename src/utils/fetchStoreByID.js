export async function fetchStore(store_id) {
  const res = await fetch(
    `https://limebuyer2025-be.onrender.com/api/stores/${store_id}`
  );
  if (!res.ok) {
    const err = new Error("Failed to fetch store");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

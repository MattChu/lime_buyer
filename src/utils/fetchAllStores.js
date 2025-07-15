export async function fetchStores() {
  const res = await fetch(`https://limebuyer2025-be-fug6.onrender.com/api/stores/`);
  if (!res.ok) {
    const err = new Error("Failed to fetch stores");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function getUser(uid) {
  const res = await fetch(
    `https://limebuyer2025-be-fug6.onrender.com/api/users/${uid}`
  );
  if (!res.ok) {
    const err = new Error("Failed to fetch user");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`https://limebuyer2025-be.onrender.com/api/users`);
  if (!res.ok) {
    const err = new Error("Failed to fetch users");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

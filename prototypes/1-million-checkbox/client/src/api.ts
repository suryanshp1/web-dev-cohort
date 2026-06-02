export async function fetchGridState(): Promise<Uint8Array> {
  const res = await fetch('http://localhost:3000/api/grid');
  if (!res.ok) {
    throw new Error('Failed to fetch grid state');
  }
  const buffer = await res.arrayBuffer();
  return new Uint8Array(buffer);
}

export async function fetchUser() {
  const res = await fetch('http://localhost:3000/api/me', {
    credentials: 'initiate', // Use 'include' in production if cross-origin
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

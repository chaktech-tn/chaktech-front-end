export async function loadCategory() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001';
  const res = await fetch(`${apiUrl}/category/show`)
  const data = await res.json();
  return data
}
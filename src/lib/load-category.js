export async function loadCategory() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
  }
  const res = await fetch(`${apiUrl}/category/show`)
  const data = await res.json();
  return data
}
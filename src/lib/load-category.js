export async function loadCategory() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.chaktech.tn";
  const res = await fetch(`${apiUrl}/category/show`)
  const data = await res.json();
  return data
}
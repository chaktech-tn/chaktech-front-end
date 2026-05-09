export async function loadCategory() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
  }
  const res = await fetch(`${apiUrl}/category/show`);
  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  if (Array.isArray(data?.categories)) return data.categories;
  if (Array.isArray(data?.result)) return data.result;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

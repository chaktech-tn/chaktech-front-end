import SearchAreaMain from "@components/search-area";

export const metadata = {
  title: "Recherche",
  description: "Recherchez des produits sur ChakTech. Trouvez rapidement ce que vous cherchez parmi notre large sélection.",
};

export default async function SearchPage({searchParams}) {
  const { query } = await searchParams;
  return (
    <SearchAreaMain searchText={query} />
  );
}

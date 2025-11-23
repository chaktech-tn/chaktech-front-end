import ShopMainArea from "@components/shop/shop-main-area";

export const metadata = {
  title: "Boutique",
  description: "Parcourez notre catalogue complet de produits électroniques. Smartphones, ordinateurs, accessoires et plus encore. Filtrez par catégorie, marque ou prix.",
  openGraph: {
    title: "Boutique | ChakTech",
    description: "Découvrez notre large sélection de produits électroniques en Tunisie.",
    type: "website",
  },
};

export default async function ShopPage({searchParams}) {
  const { Category, category, brand, priceMin, max, priceMax, color } = await searchParams;
  return (
    <ShopMainArea
      Category={Category}
      category={category}
      brand={brand}
      priceMin={priceMin}
      max={max}
      priceMax={priceMax}
      color={color}
    />
  );
}

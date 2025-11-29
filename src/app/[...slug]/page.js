import { notFound } from "next/navigation";
import React from "react";

import BlockRenderer from "@components/content-blocks/BlockRenderer";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

import { generateMetadata as generatePageMetadata } from "./metadata";

function getApiBaseUrl() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL environment variable is not set");
  }
  return apiUrl;
}

async function getPage(slug, locale) {
  try {
    const API_BASE_URL = getApiBaseUrl();
    const response = await fetch(
      `${API_BASE_URL}/api/pages/${slug}/${locale}`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join('/') : resolvedParams.slug;
  const locale = resolvedParams.locale || "fr";
  
  const page = await getPage(slug, locale);
  
  if (!page || page.status !== "published") {
    return {
      title: "Page Not Found",
    };
  }

  return generatePageMetadata(page);
}

export default async function DynamicPage({ params }) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join('/') : resolvedParams.slug;
  const locale = resolvedParams.locale || "fr";

  const page = await getPage(slug, locale);

  if (!page || page.status !== "published") {
    notFound();
  }

  // Fetch blocks for this page
  let blocks = [];
  try {
    const API_BASE_URL = getApiBaseUrl();
    const blocksResponse = await fetch(
      `${API_BASE_URL}/api/content-blocks/${page.slug}/${locale}`,
      { next: { revalidate: 60 } }
    );
    if (blocksResponse.ok) {
      const blocksData = await blocksResponse.json();
      blocks = blocksData.success ? blocksData.data : [];
    }
  } catch (error) {
    console.error("Error fetching blocks:", error);
  }

  return (
    <Wrapper>
      <Header />
      <BlockRenderer blocks={blocks} />
      <Footer />
    </Wrapper>
  );
}


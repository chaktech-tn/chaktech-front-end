import { generateOrganizationStructuredData, generateWebsiteStructuredData, generateLocalBusinessStructuredData } from '@lib/seo-utils';

export default function StructuredData() {
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebsiteStructuredData();
  const localBusinessData = generateLocalBusinessStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  );
}


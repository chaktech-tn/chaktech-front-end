import { generateOrganizationStructuredData, generateWebsiteStructuredData, generateLocalBusinessStructuredData } from '@lib/seo-utils';
import { serializeJsonLd } from '@lib/serialize-json-ld';

export default function StructuredData() {
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebsiteStructuredData();
  const localBusinessData = generateLocalBusinessStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessData) }}
      />
    </>
  );
}

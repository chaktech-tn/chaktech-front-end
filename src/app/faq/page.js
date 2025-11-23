import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import FaqBreadcrumb from "@components/faq/faq-breadcrumb";
import FaqArea from "@components/faq/faq-area";
import { generateFAQPageStructuredData } from "@lib/seo-utils";
import { siteConfig } from "@lib/seo-config";

// FAQ data extracted from faq-area component
const faqData = [
  {
    id: "general",
    accordion_items: [
      {
        title: "Orders & Shipping",
        accordions: [
          {
            id: "One",
            title: "Comment passer une commande sur ChakTech?",
            desc: "Vous pouvez passer une commande directement sur notre site web chaktech.tn. Ajoutez les produits à votre panier, puis procédez au paiement. Vous recevrez une confirmation par email.",
          },
          {
            id: "Two",
            title: "Quels sont les délais de livraison?",
            desc: "La livraison est rapide à domicile sur tout le territoire tunisien. Les délais varient selon votre localisation, généralement entre 24h et 72h pour les grandes villes.",
          },
          {
            id: "Three",
            title: "Quels sont les frais de livraison?",
            desc: "La livraison est gratuite pour les commandes supérieures à 100 TND. Pour les commandes inférieures, des frais de livraison peuvent s'appliquer selon votre région.",
          },
          {
            id: "four",
            title: "Comment suivre ma commande?",
            desc: "Une fois votre commande expédiée, vous recevrez un numéro de suivi par email et SMS. Vous pourrez suivre votre colis en temps réel sur notre site.",
          },
        ],
      },
      {
        title: "Returns & Exchanges",
        accordions: [
          {
            id: "five",
            title: "Puis-je retourner un produit?",
            desc: "Oui, vous avez 14 jours pour retourner un produit non utilisé et dans son emballage d'origine. Contactez notre service client pour initier le retour.",
          },
          {
            id: "six",
            title: "Comment procéder à un échange?",
            desc: "Pour échanger un produit, contactez notre service client. Nous vous guiderons dans le processus d'échange. Les frais de retour peuvent s'appliquer.",
          },
          {
            id: "seven",
            title: "Quand serai-je remboursé?",
            desc: "Le remboursement est traité dans les 5 à 10 jours ouvrables après réception et vérification du produit retourné.",
          },
        ],
      },
      {
        title: "Discounts",
        accordions: [
          {
            id: "eight",
            title: "Comment utiliser un code promo?",
            desc: "Entrez votre code promo lors du processus de paiement dans le champ dédié. Le montant de la réduction sera automatiquement appliqué à votre commande.",
          },
          {
            id: "nine",
            title: "Y a-t-il des promotions régulières?",
            desc: "Oui, nous organisons régulièrement des promotions et des soldes. Suivez-nous sur les réseaux sociaux pour être informé des meilleures offres.",
          },
        ],
      },
    ],
  },
  {
    id: "community",
    accordion_items: [
      {
        title: "Community",
        accordions: [
          {
            id: "eleven",
            title: "Comment créer un compte?",
            desc: "Cliquez sur 'S'inscrire' en haut à droite, remplissez le formulaire avec vos informations et validez votre email. C'est gratuit et rapide!",
          },
          {
            id: "twelve",
            title: "Quels sont les avantages d'avoir un compte?",
            desc: "Avec un compte, vous pouvez suivre vos commandes, gérer vos adresses, sauvegarder vos produits favoris et bénéficier d'offres exclusives.",
          },
        ],
      },
    ],
  },
  {
    id: "support",
    accordion_items: [
      {
        title: "Support",
        accordions: [
          {
            id: "fifteen",
            title: "Comment contacter le service client?",
            desc: "Vous pouvez nous contacter par téléphone au +216 31 330 440, par email à contact@chaktech.tn, ou via notre page de contact sur le site.",
          },
          {
            id: "sixteen",
            title: "Quels sont les horaires du service client?",
            desc: "Notre service client est disponible du lundi au vendredi de 9h à 18h et le samedi de 9h à 13h.",
          },
          {
            id: "seventeen",
            title: "Proposez-vous une garantie sur les produits?",
            desc: "Oui, tous nos produits bénéficient de la garantie constructeur. Les détails de garantie varient selon le produit et sont indiqués sur chaque fiche produit.",
          },
        ],
      },
    ],
  },
];

export const metadata = {
  title: "FAQ",
  description: "Questions fréquemment posées sur ChakTech. Trouvez des réponses sur nos produits, livraisons, retours et plus encore.",
};

export default function Faq() {
  const faqStructuredData = generateFAQPageStructuredData(faqData);

  return (
    <>
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <Wrapper>
        <Header style_2={true} />
        <FaqBreadcrumb />
        <FaqArea />
        <Footer />
      </Wrapper>
    </>
  );
}

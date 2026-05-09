import AboutArea from "@components/about";
import ShopCta from "@components/cta";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

export const metadata = {
  title: "À propos",
  description: "Découvrez ChakTech, votre partenaire de confiance pour l'électronique en Tunisie. Notre histoire, nos valeurs et notre engagement envers l'excellence.",
};
const About = () => {
  return (
    <Wrapper>
      <Header style_2={true} />
      <AboutArea />
      <ShopCta />
      <Footer />
    </Wrapper>
  );
};

export default About;

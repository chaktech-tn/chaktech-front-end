import PolicyArea from "@components/terms-policy/policy-area";
import SectionTop from "@components/terms-policy/section-top-bar";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

export const metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de ChakTech. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.",
};

export default function Policy() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <SectionTop
        title="Privacy Policy"
        subtitle={
          <>
            Your privacy is important to us. It is ChakTech's policy to respect
            your privacy regarding <br /> any information we may collect from
            you across our website, https://chaktech.tn, <br /> and other sites
            we own and operate.
          </>
        }
      />
      <PolicyArea />
      <Footer />
    </Wrapper>
  );
}

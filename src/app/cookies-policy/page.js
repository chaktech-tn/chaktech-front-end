import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import SectionTop from "@components/terms-policy/section-top-bar";
import CookiesArea from "@components/terms-policy/cookies-area";

export const metadata = {
  title: "Cookies Policy - ChakTech",
  description: "Learn about how ChakTech uses cookies and similar tracking technologies on our website.",
};

export default function CookiesPolicy() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <SectionTop
        title="Cookies Policy"
        subtitle={
          <>
            This Cookies Policy explains how ChakTech uses cookies and similar tracking technologies
            on our website. <br /> By using our website, you consent to the use of cookies as
            described in this policy.
          </>
        }
      />
      <CookiesArea />
      <Footer />
    </Wrapper>
  );
}


import ForgotArea from "@components/forgot/forgot-area";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

export const metadata = {
  title: "Forgot - ChakTech",
};

export default function Forgot() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <ForgotArea />
      <Footer />
    </Wrapper>
  );
}

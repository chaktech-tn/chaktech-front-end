import RefundReturnArea from "@components/terms-policy/refund-return-area";
import SectionTop from "@components/terms-policy/section-top-bar";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

export const metadata = {
  title: "Politique de remboursement et de retour | ChakTech",
  description: "Politique de remboursement et de retour de ChakTech. Découvrez nos conditions de retour, délais de remboursement et processus de retour.",
};

export default function RefundReturn() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <SectionTop
        title="Refund & Return Policy"
        subtitle={
          <>
            Your satisfaction is our priority. Learn about our return and refund policy, <br />
            including return windows, shipping costs, and processing times.
          </>
        }
      />
      <RefundReturnArea />
      <Footer />
    </Wrapper>
  );
}


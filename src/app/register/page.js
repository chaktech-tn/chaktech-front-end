import RegisterArea from "@components/login-register/register-area";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";

export const metadata = {
  title: "Register - ChakTech",
};

export default function Register() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <RegisterArea />
      <Footer />
    </Wrapper>
  );
}

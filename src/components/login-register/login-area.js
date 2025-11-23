'use client';
import Link from "next/link";
import { useTranslations } from 'next-intl';
// internal
import Shapes from "./shapes";
import LoginForm from "@components/forms/login-form";

const LoginArea = () => {
  const t = useTranslations('auth');
  
  return (
    <section className="login__area pt-110 pb-110">
      <div className="container">
        <div className="login__inner p-relative z-index-1">
          <Shapes/>
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="login__wrapper">
                <div className="login__top mb-30 text-center">
                  <h3 className="login__title">{t('helloAgain')}</h3>
                  <p>{t('enterCredentials')}</p>
                </div>
                <div className="login__form">
                  {/* form start */}
                  <LoginForm/>
                  {/* form end */}
                  <div className="login__register-now">
                    <p>
                      {t('dontHaveAccount')}{" "}
                      <Link href="/register">{t('registerNow')}</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginArea;

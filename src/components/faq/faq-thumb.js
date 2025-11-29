import thumb from "@assets/img/faq/faq-img-2.jpg";
import Image from "next/image";
import React from "react";
// internal

const FaqThumb = () => {
  return (
    <div className="faq__thumb-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="faq__thumb w-img">
              <Image
                src={thumb}
                alt="thumb img"
                style={{ width: "100%", height: "100%" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqThumb;

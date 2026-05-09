import { useRouter, useSearchParams } from "next/navigation";

const PriceItem = ({ id, min, max }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");

  // handlePrice
  const handlePrice = (min, max) => {
    if (min) {
      router.push(`/shop?priceMin=${min}&max=${max}`);
    } else {
      router.push(`/shop?priceMax=${max}`);
    }
  };
  return (
    <label className="ck-custom-checkbox" style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer",
      marginBottom: "12px"
    }}>
      <input
        onChange={() => handlePrice(min, max)}
        type="checkbox"
        checked={priceMin === `${min}` || priceMax === `${max}`}
        style={{ display: "none" }}
      />
      <div style={{
        width: "18px",
        height: "18px",
        borderRadius: "4px",
        border: priceMin === `${min}` || priceMax === `${max}` ? "1px solid #ff8a00" : "1px solid #d1d5db",
        background: priceMin === `${min}` || priceMax === `${max}` ? "#ff8a00" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s"
      }}>
        {(priceMin === `${min}` || priceMax === `${max}`) && (
          <div style={{
            width: "4px",
            height: "8px",
            border: "solid white",
            borderWidth: "0 2px 2px 0",
            transform: "rotate(45deg)",
            marginTop: "-2px"
          }}></div>
        )}
      </div>
      <span style={{
        fontSize: "14px",
        color: priceMin === `${min}` || priceMax === `${max}` ? "#111827" : "#4b5563",
        fontWeight: priceMin === `${min}` || priceMax === `${max}` ? "500" : "400",
        transition: "color 0.2s"
      }}>
        {max < 200 ? `${min}.00 TND - ${max}.00 TND` : `${max}.00 TND+`}
      </span>
    </label>
  );
};

export default PriceItem;

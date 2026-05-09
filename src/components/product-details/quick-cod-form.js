"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const QuickCodForm = ({ product, quantity = 1 }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call for direct order or you can integrate with your real order endpoint here.
      // E.g. POST /api/order/addOrder
      // For now, let's just show a success message since we are building the UI.
      
      const orderData = {
        name: formData.name,
        contact: formData.phone,
        address: formData.address,
        paymentMethod: "COD",
        cart: [
          {
            ...product,
            orderQuantity: quantity,
          }
        ],
        shippingCost: 7, // Standard shipping cost
        discount: 0,
        totalAmount: (product.price * quantity) + 7
      };

      console.log("Submitting Quick COD Order:", orderData);

      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Commande passée avec succès ! Notre équipe vous contactera sous peu.");
      setFormData({ name: "", phone: "", address: "" });
      
    } catch (err) {
      toast.error("Erreur, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quick-cod-wrapper mt-30 mb-30 p-4" style={{
      backgroundColor: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
    }}>
      <h4 className="mb-3" style={{ color: "#222529", fontSize: "1.2rem", fontWeight: "600" }}>
        Commande Rapide <span style={{ color: "#ee6d0a" }}>(Paiement à la Livraison)</span>
      </h4>
      <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
        Pas besoin de carte! Commandez maintenant et payez à la réception.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" style={{ display: "block", fontSize: "14px", marginBottom: "5px", color: "#222529", fontWeight: "500" }}>Nom & Prénom *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom complet"
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#ee6d0a"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" style={{ display: "block", fontSize: "14px", marginBottom: "5px", color: "#222529", fontWeight: "500" }}>Numéro de Téléphone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Ex: 98 123 456"
            required
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#ee6d0a"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" style={{ display: "block", fontSize: "14px", marginBottom: "5px", color: "#222529", fontWeight: "500" }}>Adresse de Livraison *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Rue, Ville, Code Postal"
            required
            rows="2"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              outline: "none",
              transition: "border-color 0.2s",
              resize: "vertical"
            }}
            onFocus={(e) => e.target.style.borderColor = "#ee6d0a"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#ee6d0a",
            color: "white",
            border: "none",
            padding: "14px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s, transform 0.1s",
            opacity: loading ? 0.8 : 1
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = "#d35e07")}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = "#ee6d0a")}
          onMouseDown={(e) => !loading && (e.target.style.transform = "scale(0.98)")}
          onMouseUp={(e) => !loading && (e.target.style.transform = "scale(1)")}
        >
          {loading ? "Traitement..." : "Commander avec Paiement à la Livraison"}
        </button>
      </form>
    </div>
  );
};

export default QuickCodForm;

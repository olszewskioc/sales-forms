import React from "react";
import { Link } from 'react-router-dom'

const cardStyle = {
  width: "320px",
  padding: "24px",
  margin: "16px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  backgroundColor: "#efefef",
  textAlign: "center",
  transition: "transform 0.2s ease",
  cursor: "pointer",
  color: "#000"
};

const iconStyle = {
  fontSize: "40px",
  marginBottom: "16px",
};


const Documentos = () => {
  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: "40px",
        gap: "10%"
      }}
    >
      <Link to="/docs/intermediacao" style={cardStyle} onClick={() => alert("Preencher Captação de Imóvel")}>
        <div style={iconStyle}>🏠</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
            <h2>Intermediação Imobiliária</h2>
            <p>Formulário para cadastrar informações de um imóvel para venda ou locação.</p>
            <img src="intermediacao.png" alt="Casa em miniatura na frente de um corretor imobiliário, com uma prancheta de negócios" />
        </div>
      </Link>

      <Link to="/docs/venda" style={cardStyle} onClick={() => alert("Preencher Contrato de Venda")}>
        <div style={iconStyle}>📄</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
            <h2>Contrato de Venda</h2>
            <p>Gerar contrato formal de venda com dados do comprador e vendedor.</p>
            <img src="sale.jpg" alt="Casa em miniatura na frente de um corretor imobiliário, com uma prancheta de negócios" />
        </div>
      </Link>
    </section>
  );
};

export default Documentos;

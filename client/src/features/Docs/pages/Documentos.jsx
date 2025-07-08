import React from "react";

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
        gap: "10%",
        minHeight: "70vh",
      }}
    >
      <div style={cardStyle} onClick={() => alert("Preencher Captação de Imóvel")}>
        <div style={iconStyle}>🏠</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
            <h2>Captação de Imóvel</h2>
            <p>Formulário para cadastrar informações de um imóvel para venda ou locação.</p>
        </div>
      </div>

      <div style={cardStyle} onClick={() => alert("Preencher Contrato de Venda")}>
        <div style={iconStyle}>📄</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
            <h2>Contrato de Venda</h2>
            <p>Gerar contrato formal de venda com dados do comprador e vendedor.</p>
        </div>
      </div>
    </section>
  );
};

export default Documentos;

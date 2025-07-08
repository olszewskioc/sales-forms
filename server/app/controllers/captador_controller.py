from datetime import datetime
import json
from flask import Blueprint, request, jsonify
from docxtpl import DocxTemplate
from docx2pdf import convert
from services.utils import marcar_opcoes
from services.drive_upload import upload_to_drive
import os

FOLDER_ID = "14-JIkloa-kwpbU0641c9nUypja-qgBXK"

base_dir = os.path.dirname(os.path.abspath(__file__))
template_path = os.path.join(base_dir, "..", "templates", "modelo_captacao.docx")
upload_path = os.path.join(base_dir, "..", "uploads")
print(upload_path)


captador_bp = Blueprint("data", __name__, url_prefix="/captador")

@captador_bp.route("/gerar-pdf", methods=["POST"])
def gerar_pdf():
    dados = request.json
    
    captador = dados["captador"].strip().replace(" ", "_")
    nome = dados["nome_proprietario"].strip().replace(" ", "_")
    tipo = dados["tipo_imovel"]
    data = dados["data"]
    base_nome = f"captador_{captador}_prop_{nome}_{data}_{tipo}".replace("/", "-")
    
    dados["habite_se"] = marcar_opcoes(["SIM", "NÃO"], dados["habite_se"])
    dados["averbada"] = marcar_opcoes(["SIM", "NÃO"], dados["averbada"])
    dados["financiamento"] = marcar_opcoes(["SIM", "NÃO"], dados["financiamento"])
    dados["placa"] = marcar_opcoes(["SIM", "NÃO"], dados["placa"])
    dados["exclusivo"] = marcar_opcoes(["SIM", "NÃO"], dados["exclusivo"])
    dados["situacao"] = marcar_opcoes(["OCUPADO", "DESOCUPADO"], dados["situacao"])
    dados["inquilino_alugado"] = marcar_opcoes(["PELO INQUILINO", "ALUGADO"], dados["inquilino_alugado"])
    dados["pagamento"] = marcar_opcoes(["À VISTA", "ACEITA PERMUTA"], dados["pagamento"])
    dados["tipo_imovel"] = marcar_opcoes(["APTO", "CASA", "CHÁCARA", "FAZENDA", "KITNET", "MANSÃO", "SALA", "SOBRADO", "TERRENO"], dados["tipo_imovel"])

    doc_path = os.path.join(upload_path, f"{base_nome}.docx")
    pdf_path = os.path.join(upload_path, f"{base_nome}.pdf")
    
    doc = DocxTemplate(template_path)
    doc.render(dados)
    
    doc.save(doc_path)

    convert(doc_path, pdf_path)

    link = upload_to_drive(file_path=pdf_path, folder_id=FOLDER_ID)
    
    os.remove(doc_path)
    os.remove(pdf_path)

    return jsonify({"sucesso": True, "link": link})

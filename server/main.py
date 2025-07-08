from flask import Flask, request, jsonify
from docxtpl import DocxTemplate
from docx2pdf import convert
import os
from drive_upload import upload_to_drive

app = Flask(__name__)

def marcar_opcoes(opcoes, selecionado):
    return "   ".join(f"({'X' if o == selecionado else ' '}) {o}" for o in opcoes)

@app.route('/gerar-pdf', methods=['POST'])
def gerar_pdf():
    dados = request.json
    
    dados["tipo_imovel"] = marcar_opcoes(["APTO", "CASA", "CHÁCARA", "FAZENDA", "KITNET", "MANSÃO", "SALA", "SOBRADO", "TERRENO"], dados["tipo_imovel"])

    doc = DocxTemplate("templates/modelo.docx")
    doc.render(dados)
    doc_path = "uploads/preenchido.docx"
    pdf_path = "uploads/preenchido.pdf"
    doc.save(doc_path)

    convert(doc_path, pdf_path)

    link = upload_to_drive(pdf_path)

    return jsonify({"sucesso": True, "link": link})

if __name__ == '__main__':
    app.run(debug=True)

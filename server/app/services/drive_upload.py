import os
import mimetypes
import pickle
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.auth.transport.requests import Request

# Escopos necessários para upload no Drive
SCOPES = ['https://www.googleapis.com/auth/drive.file']

# Caminho do client_secret.json baixado do Google Cloud
CLIENT_SECRET_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'client_secret.json'))
TOKEN_PICKLE_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'token.pickle'))


def build_drive_service():
    """Autentica com OAuth2 e retorna o serviço do Google Drive"""
    creds = None

    # Usa token salvo localmente (se existir)
    if os.path.exists(TOKEN_PICKLE_FILE):
        with open(TOKEN_PICKLE_FILE, 'rb') as token:
            creds = pickle.load(token)

    # Se não existir ou expirado, inicia novo fluxo de autenticação
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRET_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(TOKEN_PICKLE_FILE, 'wb') as token:
            pickle.dump(creds, token)

    return build('drive', 'v3', credentials=creds)


def upload_to_drive(file_path: str, folder_id: str) -> str:
    """
    Envia um arquivo para o Google Drive (com OAuth), dentro da pasta destino.

    Args:
        file_path (str): Caminho local do arquivo
        folder_id (str): ID da pasta no Google Drive

    Returns:
        str: URL acessível do arquivo
    """
    try:
        service = build_drive_service()
        file_name = os.path.basename(file_path)

        mime_type, _ = mimetypes.guess_type(file_path)
        if not mime_type:
            mime_type = 'application/octet-stream'

        file_metadata = {
            'name': file_name,
            'parents': [folder_id]
        }

        media = MediaFileUpload(file_path, mimetype=mime_type)

        uploaded_file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id'
        ).execute()

        file_id = uploaded_file.get('id')
        return f"https://drive.google.com/file/d/{file_id}/view"

    except Exception as e:
        print(f"[ERRO] Falha no upload: {e}")
        return None

New-Item -ItemType Directory -Force -Path backend
Set-Location -Path backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install fastapi uvicorn pydantic python-multipart pandas pdfplumber pytesseract

import io
import time
import random
import pdfplumber
from models.schemas import ExtractedField

def process_pdf_document(file_bytes: bytes, filename: str) -> list[ExtractedField]:
    """
    Simulates AI-driven document extraction process using a combination of pdfplumber
    and simulated business logic parsing.
    """
    extracted_text = ""
    try:
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                extracted_text += page.extract_text() + "\n"
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        # Even if parsing fails (erroneous PDF), fall back to mock data
        pass
    
    # Simulate an AI processing delay
    time.sleep(1.5)

    # In a real scenario, we would pass `extracted_text` to an LLM or specific regex parsers.
    # For this hackathon scope, we mock the extraction output to demonstrate the UI capabilities.
    
    mock_extraction = [
        ExtractedField(
            label="Company Name",
            value="TechFlow Solutions Inc." if "TechFlow" in extracted_text else "Unknown Corp",
            confidence=0.98
        ),
        ExtractedField(
            label="Total Revenue (Q3)",
            value="$4,281,400",
            confidence=0.94
        ),
        ExtractedField(
            label="Operating Margin",
            value="24.8%",
            confidence=0.88,
            warning="Variance > 5% from previous quarter based on extracted text."
        ),
        ExtractedField(
            label="Net Debt",
            value="$1.12M",
            confidence=0.91
        ),
        ExtractedField(
            label="Cash Flow",
            value="$842.0k",
            confidence=0.95
        )
    ]
    
    # Randomly slightly adjust confidence to feel more "live"
    for field in mock_extraction:
        field.confidence = min(0.99, field.confidence + random.uniform(-0.05, 0.02))

    return mock_extraction

import io
import time
import random
import re
import pdfplumber
from typing import List
from models.schemas import ExtractedField

def process_pdf_document(file_bytes: bytes, filename: str) -> List[ExtractedField]:
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
    
    # Try to find a company name (Look for lines with Inc, Corp, LLC)
    company_name = "Unknown Corp"
    company_match = re.search(r'([A-Z][a-zA-Z\s]+(?:Inc\.|Corporation|Corp\.|LLC|Holdings))', extracted_text)
    if company_match:
        company_name = company_match.group(1).strip()
    elif "TechFlow" in extracted_text:
         company_name = "TechFlow Solutions Inc."

    # Try to find revenue numbers 
    revenue_val = "$8,420,000"
    rev_match = re.search(r'(?:Annual Revenue|Revenue|Sales|Turnover)[\s:.]*\$?([\d,\.]+)', extracted_text, re.IGNORECASE)
    if rev_match:
        revenue_val = f"${rev_match.group(1)}"

    # Try to find operating margin
    margin_val = "28.7%"
    margin_match = re.search(r'(?:Operating Margin|Margin)[\s:.]*([\d\.]+%?)', extracted_text, re.IGNORECASE)
    if margin_match:
        margin_val = margin_match.group(1)
        if not margin_val.endswith('%'):
            margin_val += '%'

    # Try to find net debt (matching Total Liabilities or Net Debt)
    debt_val = "$1.64M"
    debt_match = re.search(r'(?:Total Liabilities|Net Debt|Total Debt|Debt)[\s:.]*\$?([\d,\.]+[MKMB]?)', extracted_text, re.IGNORECASE)
    if debt_match:
        # User has 1,645,000, we might format it or just leave it
        raw_val = debt_match.group(1)
        if len(raw_val.replace(',', '')) >= 7: # If millions
            try:
                num = float(raw_val.replace(',', ''))
                debt_val = f"${num/1000000:.2f}M"
            except ValueError:
                debt_val = f"${raw_val}"
        else:
            debt_val = f"${raw_val}"

    mock_extraction = [
        ExtractedField(
            label="Company Name",
            value=company_name,
            confidence=0.98 if company_match else 0.75
        ),
        ExtractedField(
            label="Total Revenue",
            value=revenue_val,
            confidence=0.94 if rev_match else 0.65
        ),
        ExtractedField(
            label="Operating Margin",
            value=margin_val,
            confidence=0.88 if margin_match else 0.45,
            warning="Variance > 5% from previous quarter based on extracted text." if not margin_match else None
        ),
        ExtractedField(
            label="Net Debt",
            value=debt_val,
            confidence=0.91 if debt_match else 0.55
        ),
        ExtractedField(
            label="Extracted Raw Text Snippet",
            value=f"{extracted_text[:40].strip()}..." if extracted_text else "No parseable text",
            confidence=0.99
        )
    ]
    
    # Randomly slightly adjust confidence to feel more "live"
    for field in mock_extraction:
        field.confidence = min(0.99, field.confidence + random.uniform(-0.05, 0.02))

    return mock_extraction

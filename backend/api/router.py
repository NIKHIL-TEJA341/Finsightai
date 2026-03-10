from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import List
import uuid

from models.schemas import (
    OnboardingResponse, 
    EntityOnboardingRequest, 
    DocumentUploadResponse, 
    DataValidationResponse,
    AnalyticsResponse,
    NewsResponse,
    NewsSignal
)
from services.document_processor import process_pdf_document

api_router = APIRouter()

# In-memory storage mock
DB_ENTITIES = {}
DB_DOCUMENTS = {}

@api_router.get("/health")
async def health_check():
    return {"status": "ok", "service": "FinSight AI API Context"}

@api_router.post("/entities", response_model=OnboardingResponse)
async def onboard_entity(request: EntityOnboardingRequest):
    """
    Register a new corporate entity for underwriting analysis.
    """
    entity_id = f"ENT-{str(uuid.uuid4())[:8].upper()}"
    DB_ENTITIES[entity_id] = request.dict()
    
    return OnboardingResponse(
        status="success",
        entityId=entity_id,
        message=f"Successfully registered entity {request.companyName}"
    )

@api_router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(file: UploadFile = File(...)):
    """
    Ingest a financial document (PDF, Excel, etc.) for processing.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are currently supported for immediate extraction.")

    document_id = f"DOC-{str(uuid.uuid4())[:8].upper()}"
    
    # Store minimal metadata
    DB_DOCUMENTS[document_id] = {
        "filename": file.filename,
        "content_type": file.content_type,
        "status": "PROCESSING"
    }
    
    # In a real app we'd trigger a background Celery task here.
    return DocumentUploadResponse(
        documentId=document_id,
        filename=file.filename,
        status="PROCESSING",
        message="Document uploaded and queued for AI extraction."
    )

@api_router.get("/documents/{document_id}/extraction", response_model=DataValidationResponse)
async def get_document_extraction(document_id: str):
    """
    Simulate polling the extraction results of an uploaded document.
    """
    # For the sake of the hackathon, we simulate processing on-the-fly instead of async queues.
    # We would theoretically load the binary payload from S3 here and parse:
    # file_bytes = get_from_s3(document_id)
    # But we'll just mock the output for demonstration.
    
    mock_file_bytes = b"%PDF-1.4\n%TechFlow Solutions Inc. financials..."
    fields = process_pdf_document(mock_file_bytes, "mock_document.pdf")
    
    return DataValidationResponse(
        documentId=document_id,
        fields=fields
    )

@api_router.get("/analytics/{entity_id}", response_model=AnalyticsResponse)
async def get_analytics(entity_id: str):
    """
    Retrieve executive risk analytics for a specific entity.
    """
    # Hardcoded mock data to feed the Recharts in the frontend
    return {
        "overallRiskScore": 72,
        "revenueData": [
            {"name": "JAN", "value": 3200},
            {"name": "FEB", "value": 2800},
            {"name": "MAR", "value": 3600},
            {"name": "APR", "value": 3200},
            {"name": "MAY", "value": 4800},
            {"name": "JUN", "value": 5400},
        ],
        "riskData": [{"name": "Risk", "value": 72}, {"name": "Safe", "value": 28}],
        "debtData": [{"name": "Debt", "value": 42}, {"name": "Equity", "value": 58}],
        "detailedProfile": [
            {
                "factor": "Interest Rate Volatility",
                "score": 8.5,
                "probability": "High (72%)",
                "status": "Critical"
            },
            {
                "factor": "Currency Fluctuation",
                "score": 5.5,
                "probability": "Medium (45%)",
                "status": "Watch"
            }
        ]
    }

@api_router.get("/signals", response_model=NewsResponse)
async def get_market_signals():
    """
    Retrieve market news signals and sentiment analysis.
    """
    return {
        "signals": [
            {
                "sentiment": "POSITIVE",
                "source": "Reuters",
                "time": "12m ago",
                "title": "Semiconductor Manufacturing: Q3 Growth Exceeds Analyst Predictions by 14%",
                "description": "Leading manufacturers report increased demand for AI-specific chipsets...",
                "tags": ["NVDA", "TSMC"]
            },
            {
                "sentiment": "NEUTRAL",
                "source": "Bloomberg",
                "time": "2h ago",
                "title": "Central Bank Maintains Interest Rates: Markets React with Mixed Sentiments",
                "description": "The decision to hold rates steady was widely expected...",
                "tags": ["Macro", "Monetary Policy"]
            }
        ]
    }

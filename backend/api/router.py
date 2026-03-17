from fastapi import APIRouter, File, UploadFile, HTTPException
from typing import List
import uuid

from models.schemas import (
    OnboardingResponse, 
    EntityOnboardingRequest, 
    DocumentUploadResponse, 
    DataValidationResponse,
    ValidationField,
    AnalyticsResponse,
    NewsResponse,
    NewsSignal,
    ExtractedField
)
from services.document_processor import process_pdf_document
from database import get_entities_collection, get_documents_collection

api_router = APIRouter()

@api_router.get("/health")
async def health_check():
    return {"status": "ok", "service": "FinSight AI API Context"}

@api_router.post("/entities", response_model=OnboardingResponse)
async def onboard_entity(request: EntityOnboardingRequest):
    """
    Register a new corporate entity for underwriting analysis.
    """
    entity_id = f"ENT-{str(uuid.uuid4())[:8].upper()}"
    entity_data = request.dict()
    entity_data["_id"] = entity_id
    
    collection = get_entities_collection()
    await collection.insert_one(entity_data)
    
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
    # normalize filename case so users can upload files with uppercase extensions
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are currently supported for immediate extraction.")

    document_id = f"DOC-{str(uuid.uuid4())[:8].upper()}"
    
    file_bytes = await file.read()
    
    # Store minimal metadata and the raw content in MongoDB
    doc_data = {
        "_id": document_id,
        "filename": file.filename,
        "content_type": file.content_type,
        "status": "PROCESSING",
        "content": file_bytes
    }
    
    collection = get_documents_collection()
    await collection.insert_one(doc_data)
    
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
    collection = get_documents_collection()
    doc_record = await collection.find_one({"_id": document_id})
    
    if not doc_record:
        # Fallback to mock if doc_id not found
        filename = "mock_document.pdf"
        mock_file_bytes = b"%PDF-1.4\n%TechFlow Solutions Inc. financials..."
        extracted_fields: List[ExtractedField] = process_pdf_document(mock_file_bytes, filename)
    else:
        file_bytes = doc_record.get("content", b"")
        filename = doc_record.get("filename", "unknown.pdf")
        extracted_fields: List[ExtractedField] = process_pdf_document(file_bytes, filename)
    
    # Transform fields to match frontend expectations
    validation_fields: List[ValidationField] = []
    warnings_count: int = 0
    confidence_sum: float = 0.0
    
    for field in extracted_fields:
        is_warning = field.warning is not None
        if is_warning:
            warnings_count = warnings_count + 1
        
        confidence_sum = confidence_sum + field.confidence
        
        validation_field = ValidationField(
            key=field.label,
            value=field.value,
            confidence=round(field.confidence * 100),  # Convert to percentage
            isWarning=is_warning,
            warningText=field.warning if is_warning else None
        )
        validation_fields.append(validation_field)
    
    # Calculate overall confidence
    overall_confidence = confidence_sum / len(extracted_fields) * 100 if extracted_fields else 0
    
    return DataValidationResponse(
        documentId=document_id,
        filename=filename,
        overallConfidence=round(overall_confidence, 1),
        warnings=warnings_count,
        fields=validation_fields
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

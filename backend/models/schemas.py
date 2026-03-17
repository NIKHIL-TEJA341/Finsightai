from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class EntityOnboardingRequest(BaseModel):
    companyName: str
    taxId: str
    industry: str
    incorporationDate: str
    loanAmount: float
    loanPurpose: str
    termLength: int

class OnboardingResponse(BaseModel):
    status: str
    entityId: str
    message: str

class DocumentUploadResponse(BaseModel):
    documentId: str
    filename: str
    status: str
    message: str

class ExtractedField(BaseModel):
    label: str
    value: str
    confidence: float
    warning: Optional[str] = None

class ValidationField(BaseModel):
    key: str
    value: str
    confidence: float
    isWarning: bool = False
    warningText: Optional[str] = None

class DataValidationResponse(BaseModel):
    documentId: str
    filename: Optional[str] = None
    overallConfidence: float
    warnings: int
    fields: List[ValidationField]

class RiskProfile(BaseModel):
    factor: str
    score: float
    probability: str
    status: str

class AnalyticsResponse(BaseModel):
    overallRiskScore: int
    revenueData: List[Dict[str, Any]]
    riskData: List[Dict[str, Any]]
    debtData: List[Dict[str, Any]]
    detailedProfile: List[RiskProfile]

class NewsSignal(BaseModel):
    sentiment: str
    source: str
    time: str
    title: str
    description: str
    tags: List[str]

class NewsResponse(BaseModel):
    signals: List[NewsSignal]

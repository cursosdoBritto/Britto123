from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class ElementModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # text, shape, image, background
    x: float = 0
    y: float = 0
    width: Optional[float] = None
    height: Optional[float] = None
    content: Optional[str] = None  # for text elements
    color: Optional[str] = None
    backgroundColor: Optional[str] = None
    gradient: Optional[str] = None
    fontSize: Optional[int] = None
    fontFamily: Optional[str] = None
    fontWeight: Optional[str] = None
    shapeType: Optional[str] = None  # rectangle, circle, triangle, etc.
    borderColor: Optional[str] = None
    borderWidth: Optional[int] = None
    opacity: Optional[float] = 1.0
    rotation: Optional[float] = 0
    imageUrl: Optional[str] = None
    filter: Optional[str] = None
    zIndex: Optional[int] = 0
    visible: Optional[bool] = True

class TemplateModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # social, web, print, marketing
    description: Optional[str] = None
    dimensions: Dict[str, int]  # {width: 1200, height: 800}
    preview: Optional[str] = None  # preview image URL
    elements: List[ElementModel] = []
    tags: List[str] = []
    isPremium: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class DesignModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = None
    templateId: Optional[str] = None
    templateName: Optional[str] = None
    dimensions: Dict[str, int]
    elements: List[ElementModel] = []
    thumbnail: Optional[str] = None  # base64 or URL
    userId: Optional[str] = None
    tags: List[str] = []
    isFavorite: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class UserModel(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

# Request/Response Models
class TemplateCreate(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    dimensions: Dict[str, int]
    elements: List[ElementModel] = []
    tags: List[str] = []
    isPremium: bool = False

class DesignCreate(BaseModel):
    name: str
    description: Optional[str] = None
    templateId: Optional[str] = None
    templateName: Optional[str] = None
    dimensions: Dict[str, int]
    elements: List[ElementModel] = []
    thumbnail: Optional[str] = None
    userId: Optional[str] = None
    tags: List[str] = []

class DesignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    elements: Optional[List[ElementModel]] = None
    thumbnail: Optional[str] = None
    tags: Optional[List[str]] = None
    isFavorite: Optional[bool] = None

class UserCreate(BaseModel):
    name: str
    email: str

class ExportRequest(BaseModel):
    designId: str
    format: str = "png"  # png, jpg, svg
    quality: int = 100
    width: Optional[int] = None
    height: Optional[int] = None
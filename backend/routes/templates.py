from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import TemplateModel, TemplateCreate
from database import templates_collection
from datetime import datetime

router = APIRouter(prefix="/templates", tags=["templates"])

@router.get("/", response_model=List[TemplateModel])
async def get_templates(
    category: Optional[str] = Query(None, description="Filter by category"),
    search: Optional[str] = Query(None, description="Search in name and description"),
    tags: Optional[str] = Query(None, description="Filter by tags (comma-separated)"),
    premium: Optional[bool] = Query(None, description="Filter by premium status"),
    limit: int = Query(50, ge=1, le=100, description="Limit results"),
    skip: int = Query(0, ge=0, description="Skip results")
):
    """Get all templates with optional filters"""
    query = {}
    
    if category:
        query["category"] = category
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    if tags:
        tag_list = [tag.strip() for tag in tags.split(",")]
        query["tags"] = {"$in": tag_list}
    
    if premium is not None:
        query["isPremium"] = premium
    
    cursor = templates_collection.find(query).skip(skip).limit(limit)
    templates = await cursor.to_list(length=limit)
    
    return [TemplateModel(**template) for template in templates]

@router.get("/{template_id}", response_model=TemplateModel)
async def get_template(template_id: str):
    """Get template by ID"""
    template = await templates_collection.find_one({"id": template_id})
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return TemplateModel(**template)

@router.post("/", response_model=TemplateModel)
async def create_template(template: TemplateCreate):
    """Create new template"""
    template_dict = template.dict()
    template_dict["id"] = f"template_{int(datetime.utcnow().timestamp())}"
    template_dict["createdAt"] = datetime.utcnow()
    template_dict["updatedAt"] = datetime.utcnow()
    
    await templates_collection.insert_one(template_dict)
    return TemplateModel(**template_dict)

@router.put("/{template_id}", response_model=TemplateModel)
async def update_template(template_id: str, template: TemplateCreate):
    """Update template"""
    template_dict = template.dict()
    template_dict["updatedAt"] = datetime.utcnow()
    
    result = await templates_collection.update_one(
        {"id": template_id},
        {"$set": template_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    
    updated_template = await templates_collection.find_one({"id": template_id})
    return TemplateModel(**updated_template)

@router.delete("/{template_id}")
async def delete_template(template_id: str):
    """Delete template"""
    result = await templates_collection.delete_one({"id": template_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    return {"message": "Template deleted successfully"}

@router.get("/categories/list")
async def get_categories():
    """Get all available categories"""
    categories = await templates_collection.distinct("category")
    return {"categories": categories}

@router.get("/stats/summary")
async def get_template_stats():
    """Get template statistics"""
    total_templates = await templates_collection.count_documents({})
    premium_templates = await templates_collection.count_documents({"isPremium": True})
    free_templates = total_templates - premium_templates
    
    # Get category distribution
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    category_stats = await templates_collection.aggregate(pipeline).to_list(length=100)
    
    return {
        "total": total_templates,
        "premium": premium_templates,
        "free": free_templates,
        "categories": category_stats
    }
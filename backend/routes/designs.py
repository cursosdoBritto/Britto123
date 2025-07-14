from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from models import DesignModel, DesignCreate, DesignUpdate
from database import designs_collection
from datetime import datetime
import base64

router = APIRouter(prefix="/designs", tags=["designs"])

@router.get("/", response_model=List[DesignModel])
async def get_designs(
    user_id: Optional[str] = Query(None, description="Filter by user ID"),
    search: Optional[str] = Query(None, description="Search in name and description"),
    tags: Optional[str] = Query(None, description="Filter by tags (comma-separated)"),
    favorites: Optional[bool] = Query(None, description="Filter favorites"),
    limit: int = Query(50, ge=1, le=100, description="Limit results"),
    skip: int = Query(0, ge=0, description="Skip results")
):
    """Get all designs with optional filters"""
    query = {}
    
    if user_id:
        query["userId"] = user_id
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    if tags:
        tag_list = [tag.strip() for tag in tags.split(",")]
        query["tags"] = {"$in": tag_list}
    
    if favorites is not None:
        query["isFavorite"] = favorites
    
    cursor = designs_collection.find(query).sort("updatedAt", -1).skip(skip).limit(limit)
    designs = await cursor.to_list(length=limit)
    
    return [DesignModel(**design) for design in designs]

@router.get("/{design_id}", response_model=DesignModel)
async def get_design(design_id: str):
    """Get design by ID"""
    design = await designs_collection.find_one({"id": design_id})
    if not design:
        raise HTTPException(status_code=404, detail="Design not found")
    return DesignModel(**design)

@router.post("/", response_model=DesignModel)
async def create_design(design: DesignCreate):
    """Create new design"""
    design_dict = design.dict()
    design_dict["id"] = f"design_{int(datetime.utcnow().timestamp())}"
    design_dict["createdAt"] = datetime.utcnow()
    design_dict["updatedAt"] = datetime.utcnow()
    
    await designs_collection.insert_one(design_dict)
    return DesignModel(**design_dict)

@router.put("/{design_id}", response_model=DesignModel)
async def update_design(design_id: str, design: DesignUpdate):
    """Update design"""
    design_dict = design.dict(exclude_unset=True)
    design_dict["updatedAt"] = datetime.utcnow()
    
    result = await designs_collection.update_one(
        {"id": design_id},
        {"$set": design_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Design not found")
    
    updated_design = await designs_collection.find_one({"id": design_id})
    return DesignModel(**updated_design)

@router.delete("/{design_id}")
async def delete_design(design_id: str):
    """Delete design"""
    result = await designs_collection.delete_one({"id": design_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Design not found")
    return {"message": "Design deleted successfully"}

@router.post("/{design_id}/duplicate", response_model=DesignModel)
async def duplicate_design(design_id: str):
    """Duplicate an existing design"""
    original_design = await designs_collection.find_one({"id": design_id})
    if not original_design:
        raise HTTPException(status_code=404, detail="Design not found")
    
    # Remove the original ID and create new one
    del original_design["_id"]
    original_design["id"] = f"design_{int(datetime.utcnow().timestamp())}"
    original_design["name"] = f"Cópia de {original_design['name']}"
    original_design["createdAt"] = datetime.utcnow()
    original_design["updatedAt"] = datetime.utcnow()
    
    await designs_collection.insert_one(original_design)
    return DesignModel(**original_design)

@router.patch("/{design_id}/favorite")
async def toggle_favorite(design_id: str):
    """Toggle favorite status of a design"""
    design = await designs_collection.find_one({"id": design_id})
    if not design:
        raise HTTPException(status_code=404, detail="Design not found")
    
    new_favorite_status = not design.get("isFavorite", False)
    
    await designs_collection.update_one(
        {"id": design_id},
        {"$set": {
            "isFavorite": new_favorite_status,
            "updatedAt": datetime.utcnow()
        }}
    )
    
    return {"isFavorite": new_favorite_status}

@router.get("/user/{user_id}/stats")
async def get_user_design_stats(user_id: str):
    """Get design statistics for a user"""
    total_designs = await designs_collection.count_documents({"userId": user_id})
    favorite_designs = await designs_collection.count_documents({"userId": user_id, "isFavorite": True})
    
    # Get recent designs
    recent_designs = await designs_collection.find(
        {"userId": user_id}
    ).sort("updatedAt", -1).limit(5).to_list(length=5)
    
    return {
        "total": total_designs,
        "favorites": favorite_designs,
        "recent": [DesignModel(**design) for design in recent_designs]
    }
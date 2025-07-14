from fastapi import APIRouter, HTTPException
from typing import List
from models import UserModel, UserCreate
from database import users_collection
from datetime import datetime

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserModel])
async def get_users():
    """Get all users"""
    users = await users_collection.find().to_list(length=100)
    return [UserModel(**user) for user in users]

@router.get("/{user_id}", response_model=UserModel)
async def get_user(user_id: str):
    """Get user by ID"""
    user = await users_collection.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserModel(**user)

@router.post("/", response_model=UserModel)
async def create_user(user: UserCreate):
    """Create new user"""
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    user_dict = user.dict()
    user_dict["id"] = f"user_{int(datetime.utcnow().timestamp())}"
    user_dict["createdAt"] = datetime.utcnow()
    user_dict["updatedAt"] = datetime.utcnow()
    
    await users_collection.insert_one(user_dict)
    return UserModel(**user_dict)

@router.put("/{user_id}", response_model=UserModel)
async def update_user(user_id: str, user: UserCreate):
    """Update user"""
    user_dict = user.dict()
    user_dict["updatedAt"] = datetime.utcnow()
    
    result = await users_collection.update_one(
        {"id": user_id},
        {"$set": user_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    updated_user = await users_collection.find_one({"id": user_id})
    return UserModel(**updated_user)

@router.delete("/{user_id}")
async def delete_user(user_id: str):
    """Delete user"""
    result = await users_collection.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}

@router.get("/{user_id}/profile")
async def get_user_profile(user_id: str):
    """Get user profile with statistics"""
    user = await users_collection.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # You could add design statistics here
    from database import designs_collection
    design_count = await designs_collection.count_documents({"userId": user_id})
    
    return {
        "user": UserModel(**user),
        "stats": {
            "designCount": design_count,
            "memberSince": user["createdAt"]
        }
    }
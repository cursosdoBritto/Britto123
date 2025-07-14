from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
import base64
import os
import uuid
from datetime import datetime
from typing import List

router = APIRouter(prefix="/upload", tags=["upload"])

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image file"""
    
    # Check file extension
    file_extension = os.path.splitext(file.filename)[1].lower()
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Tipo de arquivo não suportado. Extensões permitidas: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Check file size
    file_content = await file.read()
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"Arquivo muito grande. Tamanho máximo: {MAX_FILE_SIZE / (1024*1024)}MB"
        )
    
    # Convert to base64
    base64_content = base64.b64encode(file_content).decode('utf-8')
    
    # Generate unique filename
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    
    # In a real implementation, you would save to a storage service like AWS S3
    # For now, we'll just return the base64 data
    
    return {
        "id": str(uuid.uuid4()),
        "filename": unique_filename,
        "originalName": file.filename,
        "size": len(file_content),
        "mimeType": file.content_type,
        "base64": f"data:{file.content_type};base64,{base64_content}",
        "uploadedAt": datetime.utcnow().isoformat()
    }

@router.post("/images")
async def upload_multiple_images(files: List[UploadFile] = File(...)):
    """Upload multiple image files"""
    
    if len(files) > 10:
        raise HTTPException(
            status_code=400,
            detail="Máximo de 10 arquivos por upload"
        )
    
    results = []
    
    for file in files:
        try:
            # Check file extension
            file_extension = os.path.splitext(file.filename)[1].lower()
            if file_extension not in ALLOWED_EXTENSIONS:
                results.append({
                    "filename": file.filename,
                    "success": False,
                    "error": f"Tipo de arquivo não suportado: {file_extension}"
                })
                continue
            
            # Check file size
            file_content = await file.read()
            if len(file_content) > MAX_FILE_SIZE:
                results.append({
                    "filename": file.filename,
                    "success": False,
                    "error": f"Arquivo muito grande: {len(file_content) / (1024*1024):.1f}MB"
                })
                continue
            
            # Convert to base64
            base64_content = base64.b64encode(file_content).decode('utf-8')
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            
            results.append({
                "id": str(uuid.uuid4()),
                "filename": unique_filename,
                "originalName": file.filename,
                "size": len(file_content),
                "mimeType": file.content_type,
                "base64": f"data:{file.content_type};base64,{base64_content}",
                "success": True,
                "uploadedAt": datetime.utcnow().isoformat()
            })
            
        except Exception as e:
            results.append({
                "filename": file.filename,
                "success": False,
                "error": str(e)
            })
    
    return {
        "batchId": f"batch_{int(datetime.utcnow().timestamp())}",
        "results": results,
        "uploadedAt": datetime.utcnow().isoformat()
    }

@router.get("/info")
async def get_upload_info():
    """Get upload configuration and limits"""
    return {
        "maxFileSize": MAX_FILE_SIZE,
        "maxFileSizeMB": MAX_FILE_SIZE / (1024*1024),
        "allowedExtensions": list(ALLOWED_EXTENSIONS),
        "maxFilesPerBatch": 10,
        "supportedFormats": [
            {
                "extension": ".jpg",
                "mimeType": "image/jpeg",
                "description": "JPEG Image"
            },
            {
                "extension": ".png",
                "mimeType": "image/png",
                "description": "PNG Image"
            },
            {
                "extension": ".gif",
                "mimeType": "image/gif",
                "description": "GIF Image"
            },
            {
                "extension": ".webp",
                "mimeType": "image/webp",
                "description": "WebP Image"
            },
            {
                "extension": ".svg",
                "mimeType": "image/svg+xml",
                "description": "SVG Vector Image"
            }
        ]
    }

@router.delete("/image/{image_id}")
async def delete_image(image_id: str):
    """Delete an uploaded image"""
    # In a real implementation, you would delete from storage service
    return {"message": f"Image {image_id} deleted successfully"}
from fastapi import APIRouter, HTTPException, BackgroundTasks
from fastapi.responses import Response
from models import ExportRequest
from database import designs_collection
import base64
import json
from datetime import datetime
import asyncio

router = APIRouter(prefix="/export", tags=["export"])

@router.post("/design/{design_id}")
async def export_design(design_id: str, export_request: ExportRequest):
    """Export design as image"""
    # Get design from database
    design = await designs_collection.find_one({"id": design_id})
    if not design:
        raise HTTPException(status_code=404, detail="Design not found")
    
    # For now, return a mock base64 image
    # In a real implementation, you would render the design to an image
    mock_image_data = generate_mock_image(design, export_request.format)
    
    # Set appropriate content type
    content_type = f"image/{export_request.format}"
    if export_request.format == "jpg":
        content_type = "image/jpeg"
    
    return Response(
        content=base64.b64decode(mock_image_data),
        media_type=content_type,
        headers={
            "Content-Disposition": f"attachment; filename=design_{design_id}.{export_request.format}"
        }
    )

@router.post("/design/{design_id}/base64")
async def export_design_base64(design_id: str, export_request: ExportRequest):
    """Export design as base64 string"""
    # Get design from database
    design = await designs_collection.find_one({"id": design_id})
    if not design:
        raise HTTPException(status_code=404, detail="Design not found")
    
    # Generate mock image data
    mock_image_data = generate_mock_image(design, export_request.format)
    
    return {
        "designId": design_id,
        "format": export_request.format,
        "base64": mock_image_data,
        "exportedAt": datetime.utcnow().isoformat()
    }

def generate_mock_image(design, format_type):
    """Generate a mock base64 image for testing"""
    # This is a minimal 1x1 pixel image in base64
    # In a real implementation, you would use a library like Pillow, wand, or a headless browser
    # to render the actual design elements into an image
    
    if format_type == "png":
        # Minimal PNG image (1x1 transparent pixel)
        return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    elif format_type in ["jpg", "jpeg"]:
        # Minimal JPEG image (1x1 white pixel)
        return "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A8A=="
    else:
        # Default to PNG
        return "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

@router.get("/formats")
async def get_export_formats():
    """Get available export formats"""
    return {
        "formats": [
            {
                "id": "png",
                "name": "PNG",
                "description": "Portable Network Graphics - Melhor para transparência",
                "extension": "png",
                "mimeType": "image/png"
            },
            {
                "id": "jpg",
                "name": "JPEG",
                "description": "JPEG - Melhor para fotos e imagens com muitas cores",
                "extension": "jpg",
                "mimeType": "image/jpeg"
            },
            {
                "id": "svg",
                "name": "SVG",
                "description": "Scalable Vector Graphics - Gráficos vetoriais escaláveis",
                "extension": "svg",
                "mimeType": "image/svg+xml"
            }
        ]
    }

@router.post("/batch")
async def batch_export(design_ids: list[str], export_format: str = "png"):
    """Export multiple designs at once"""
    results = []
    
    for design_id in design_ids:
        try:
            design = await designs_collection.find_one({"id": design_id})
            if design:
                mock_image_data = generate_mock_image(design, export_format)
                results.append({
                    "designId": design_id,
                    "success": True,
                    "base64": mock_image_data,
                    "format": export_format
                })
            else:
                results.append({
                    "designId": design_id,
                    "success": False,
                    "error": "Design not found"
                })
        except Exception as e:
            results.append({
                "designId": design_id,
                "success": False,
                "error": str(e)
            })
    
    return {
        "batchId": f"batch_{int(datetime.utcnow().timestamp())}",
        "results": results,
        "exportedAt": datetime.utcnow().isoformat()
    }
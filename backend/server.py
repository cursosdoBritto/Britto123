from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime

# Import routes
from routes.templates import router as templates_router
from routes.designs import router as designs_router
from routes.users import router as users_router
from routes.export import router as export_router
from routes.upload import router as upload_router

# Import database functions
from database import init_database, close_database

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(
    title="DesignPro API",
    description="API para aplicativo de design gráfico profissional",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add basic health check
@api_router.get("/")
async def root():
    return {
        "message": "DesignPro API está funcionando!",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "database": "connected",
            "api": "running"
        }
    }

# Include all route modules
api_router.include_router(templates_router)
api_router.include_router(designs_router)
api_router.include_router(users_router)
api_router.include_router(export_router)
api_router.include_router(upload_router)

# Include the main router in the app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    await init_database()
    logger.info("DesignPro API started successfully")

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    await close_database()
    logger.info("DesignPro API shutdown complete")
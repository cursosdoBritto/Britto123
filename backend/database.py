from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
templates_collection = db.templates
designs_collection = db.designs
users_collection = db.users

async def init_database():
    """Initialize database with sample data"""
    
    # Check if templates already exist
    template_count = await templates_collection.count_documents({})
    if template_count == 0:
        # Insert sample templates
        sample_templates = [
            {
                "id": "template_1",
                "name": "Instagram Post",
                "category": "social",
                "description": "Template perfeito para posts do Instagram",
                "dimensions": {"width": 1080, "height": 1080},
                "preview": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
                "elements": [
                    {
                        "id": "bg1",
                        "type": "background",
                        "color": "#4F46E5",
                        "gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "x": 0,
                        "y": 0,
                        "width": 1080,
                        "height": 1080,
                        "zIndex": 0,
                        "visible": True
                    },
                    {
                        "id": "text1",
                        "type": "text",
                        "content": "Sua Mensagem Aqui",
                        "x": 100,
                        "y": 400,
                        "fontSize": 48,
                        "fontWeight": "bold",
                        "color": "#FFFFFF",
                        "fontFamily": "Arial",
                        "zIndex": 1,
                        "visible": True
                    }
                ],
                "tags": ["instagram", "social", "post"],
                "isPremium": False,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            },
            {
                "id": "template_2",
                "name": "Facebook Cover",
                "category": "social",
                "description": "Capa profissional para Facebook",
                "dimensions": {"width": 1200, "height": 630},
                "preview": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=150&fit=crop",
                "elements": [
                    {
                        "id": "bg2",
                        "type": "background",
                        "color": "#1877F2",
                        "gradient": "linear-gradient(90deg, #1877F2 0%, #42A5F5 100%)",
                        "x": 0,
                        "y": 0,
                        "width": 1200,
                        "height": 630,
                        "zIndex": 0,
                        "visible": True
                    },
                    {
                        "id": "text2",
                        "type": "text",
                        "content": "Capa do Facebook",
                        "x": 50,
                        "y": 250,
                        "fontSize": 64,
                        "fontWeight": "bold",
                        "color": "#FFFFFF",
                        "fontFamily": "Arial",
                        "zIndex": 1,
                        "visible": True
                    }
                ],
                "tags": ["facebook", "social", "cover"],
                "isPremium": False,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            },
            {
                "id": "template_3",
                "name": "Banner Web",
                "category": "web",
                "description": "Banner promocional para sites",
                "dimensions": {"width": 1200, "height": 400},
                "preview": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=100&fit=crop",
                "elements": [
                    {
                        "id": "bg3",
                        "type": "background",
                        "color": "#059669",
                        "gradient": "linear-gradient(45deg, #059669 0%, #10B981 100%)",
                        "x": 0,
                        "y": 0,
                        "width": 1200,
                        "height": 400,
                        "zIndex": 0,
                        "visible": True
                    },
                    {
                        "id": "text3",
                        "type": "text",
                        "content": "Banner Promocional",
                        "x": 100,
                        "y": 150,
                        "fontSize": 42,
                        "fontWeight": "bold",
                        "color": "#FFFFFF",
                        "fontFamily": "Arial",
                        "zIndex": 1,
                        "visible": True
                    }
                ],
                "tags": ["web", "banner", "promocional"],
                "isPremium": False,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            },
            {
                "id": "template_4",
                "name": "Story Instagram",
                "category": "social",
                "description": "Template para Stories do Instagram",
                "dimensions": {"width": 1080, "height": 1920},
                "preview": "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&h=500&fit=crop",
                "elements": [
                    {
                        "id": "bg4",
                        "type": "background",
                        "color": "#EC4899",
                        "gradient": "linear-gradient(180deg, #EC4899 0%, #F59E0B 100%)",
                        "x": 0,
                        "y": 0,
                        "width": 1080,
                        "height": 1920,
                        "zIndex": 0,
                        "visible": True
                    },
                    {
                        "id": "text4",
                        "type": "text",
                        "content": "Story",
                        "x": 100,
                        "y": 800,
                        "fontSize": 72,
                        "fontWeight": "bold",
                        "color": "#FFFFFF",
                        "fontFamily": "Arial",
                        "zIndex": 1,
                        "visible": True
                    }
                ],
                "tags": ["instagram", "story", "social"],
                "isPremium": False,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            },
            {
                "id": "template_5",
                "name": "LinkedIn Post",
                "category": "social",
                "description": "Post profissional para LinkedIn",
                "dimensions": {"width": 1200, "height": 627},
                "preview": "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=150&fit=crop",
                "elements": [
                    {
                        "id": "bg5",
                        "type": "background",
                        "color": "#0A66C2",
                        "gradient": "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
                        "x": 0,
                        "y": 0,
                        "width": 1200,
                        "height": 627,
                        "zIndex": 0,
                        "visible": True
                    },
                    {
                        "id": "text5",
                        "type": "text",
                        "content": "Post LinkedIn",
                        "x": 100,
                        "y": 250,
                        "fontSize": 48,
                        "fontWeight": "bold",
                        "color": "#FFFFFF",
                        "fontFamily": "Arial",
                        "zIndex": 1,
                        "visible": True
                    }
                ],
                "tags": ["linkedin", "social", "professional"],
                "isPremium": False,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            },
            {
                "id": "template_6",
                "name": "YouTube Thumbnail",
                "category": "social",
                "description": "Thumbnail atrativa para YouTube",
                "dimensions": {"width": 1280, "height": 720},
                "preview": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=150&fit=crop",
                "elements": [
                    {
                        "id": "bg6",
                        "type": "background",
                        "color": "#FF0000",
                        "gradient": "linear-gradient(45deg, #FF0000 0%, #FF4444 100%)",
                        "x": 0,
                        "y": 0,
                        "width": 1280,
                        "height": 720,
                        "zIndex": 0,
                        "visible": True
                    },
                    {
                        "id": "text6",
                        "type": "text",
                        "content": "THUMBNAIL",
                        "x": 100,
                        "y": 300,
                        "fontSize": 64,
                        "fontWeight": "bold",
                        "color": "#FFFFFF",
                        "fontFamily": "Arial",
                        "zIndex": 1,
                        "visible": True
                    }
                ],
                "tags": ["youtube", "thumbnail", "video"],
                "isPremium": False,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            }
        ]
        
        await templates_collection.insert_many(sample_templates)
        print("Sample templates inserted successfully")

    # Check if sample user exists
    user_count = await users_collection.count_documents({})
    if user_count == 0:
        # Insert sample user
        sample_user = {
            "id": "user_1",
            "name": "Usuário Demo",
            "email": "demo@designpro.com",
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        await users_collection.insert_one(sample_user)
        print("Sample user inserted successfully")

async def close_database():
    """Close database connection"""
    client.close()
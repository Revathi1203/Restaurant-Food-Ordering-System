from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
from models import Base

from routes.admin import router as admin_router
from routes.customer import router as customer_router
from routes.order import router as orders_router
from routes.dashboard import router as dashboard_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Food Ordering System API",
    version="1.0.0"
)

# -----------------------------
# Enable CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(admin_router)
app.include_router(customer_router)
app.include_router(orders_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to Food Ordering System API"
    }
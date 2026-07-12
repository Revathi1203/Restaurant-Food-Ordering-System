from pydantic import BaseModel
from typing import List
from datetime import datetime


# ==========================
# MENU SCHEMAS
# ==========================

class MenuBase(BaseModel):
    name: str
    description: str
    category: str
    price: float
    vegetarian: bool
    non_vegetarian: bool
    spicy: bool
    available: bool


class MenuCreate(MenuBase):
    pass


class MenuResponse(MenuBase):
    id: int

    class Config:
        from_attributes = True


# ==========================
# CART SCHEMAS
# ==========================

class CartItem(BaseModel):
    menu_id: int
    quantity: int


# ==========================
# ORDER SCHEMAS
# ==========================

class OrderCreate(BaseModel):
    customer_name: str
    items: List[CartItem]


class OrderResponse(BaseModel):
    id: int
    customer_name: str
    total_price: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
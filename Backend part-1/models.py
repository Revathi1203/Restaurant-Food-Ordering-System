from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base


# ==========================
# Menu Table
# ==========================
class Menu(Base):
    __tablename__ = "menu"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    description = Column(String, nullable=False)

    category = Column(String, nullable=False)

    price = Column(Float, nullable=False)

    vegetarian = Column(Boolean, default=False)

    non_vegetarian = Column(Boolean, default=False)

    spicy = Column(Boolean, default=False)

    available = Column(Boolean, default=True)

    order_items = relationship("OrderItem", back_populates="menu")


# ==========================
# Order Table
# ==========================
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String, nullable=False)

    total_price = Column(Float, default=0)

    status = Column(String, default="Placed")

    created_at = Column(DateTime, default=datetime.utcnow)

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete"
    )


# ==========================
# Order Items Table
# ==========================
class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(Integer, ForeignKey("orders.id"))

    menu_id = Column(Integer, ForeignKey("menu.id"))

    quantity = Column(Integer, default=1)

    price = Column(Float)

    order = relationship(
        "Order",
        back_populates="items"
    )

    menu = relationship(
        "Menu",
        back_populates="order_items"
    )
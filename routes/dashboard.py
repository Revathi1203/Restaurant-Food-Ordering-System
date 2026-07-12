from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

import models
from database import get_db

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def admin_dashboard(db: Session = Depends(get_db)):

    # -----------------------------
    # Orders by Status
    # -----------------------------
    statuses = [
        "Placed",
        "Confirmed",
        "Preparing",
        "Ready",
        "Picked Up"
    ]

    orders_by_status = {}

    for status in statuses:
        orders_by_status[status] = db.query(models.Order).filter(
            models.Order.status == status
        ).count()

    # -----------------------------
    # Popular Items
    # -----------------------------
    popular_query = db.query(
        models.Menu.name,
        func.sum(models.OrderItem.quantity).label("total_orders")
    ).join(
        models.OrderItem,
        models.Menu.id == models.OrderItem.menu_id
    ).group_by(
        models.Menu.name
    ).order_by(
        func.sum(models.OrderItem.quantity).desc()
    ).all()

    popular_items = []

    for item in popular_query:
        popular_items.append({
            "name": item.name,
            "orders": int(item.total_orders)
        })

    # -----------------------------
    # Today's Revenue
    # -----------------------------
    revenue = db.query(
        func.sum(models.Order.total_price)
    ).filter(
        func.date(models.Order.created_at) == date.today()
    ).scalar()

    if revenue is None:
        revenue = 0

    return {
        "orders_by_status": orders_by_status,
        "popular_items": popular_items,
        "today_revenue": revenue
    }
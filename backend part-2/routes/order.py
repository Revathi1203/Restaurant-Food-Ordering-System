from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# =====================================================
# Place Order
# =====================================================

@router.post("/", response_model=schemas.OrderResponse)
def place_order(order: schemas.OrderCreate,
                db: Session = Depends(get_db)):

    return crud.create_order(
        db,
        order.customer_name,
        order.items
    )


# =====================================================
# View All Orders
# =====================================================

@router.get("/")
def get_orders(db: Session = Depends(get_db)):
    return crud.get_all_orders(db)


# =====================================================
# View Single Order
# =====================================================

@router.get("/{order_id}")
def get_order(order_id: int,
              db: Session = Depends(get_db)):

    order = crud.get_order(db, order_id)

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


# =====================================================
# Update Order Status
# =====================================================

@router.put("/{order_id}")
def update_status(order_id: int,
                  status: str,
                  db: Session = Depends(get_db)):

    valid_status = [
        "Placed",
        "Confirmed",
        "Preparing",
        "Ready",
        "Picked Up"
    ]

    if status not in valid_status:
        raise HTTPException(
            status_code=400,
            detail="Invalid order status"
        )

    order = crud.update_order_status(
        db,
        order_id,
        status
    )

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order
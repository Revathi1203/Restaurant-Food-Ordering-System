from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# -------------------------
# Add Menu Item
# -------------------------
@router.post("/menu", response_model=schemas.MenuResponse)
def add_menu(menu: schemas.MenuCreate, db: Session = Depends(get_db)):
    return crud.create_menu(db, menu)


# -------------------------
# View All Menu Items
# -------------------------
@router.get("/menu", response_model=list[schemas.MenuResponse])
def get_menu(db: Session = Depends(get_db)):
    return crud.get_all_menu(db)


# -------------------------
# Update Menu Item
# -------------------------
@router.put("/menu/{menu_id}", response_model=schemas.MenuResponse)
def update_menu(menu_id: int, menu: schemas.MenuCreate, db: Session = Depends(get_db)):

    updated = crud.update_menu(db, menu_id, menu)

    if updated is None:
        raise HTTPException(status_code=404, detail="Menu item not found")

    return updated


# -------------------------
# Delete Menu Item
# -------------------------
@router.delete("/menu/{menu_id}")
def delete_menu(menu_id: int, db: Session = Depends(get_db)):

    deleted = crud.delete_menu(db, menu_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Menu item not found")

    return {"message": "Menu item deleted successfully"}
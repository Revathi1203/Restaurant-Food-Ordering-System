from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
import models
import ai_search

router = APIRouter(
    prefix="/customer",
    tags=["Customer"]
)

# =====================================================
# View All Available Menu Items
# =====================================================

@router.get("/menu")
def get_menu(db: Session = Depends(get_db)):
    return db.query(models.Menu).filter(
        models.Menu.available == True
    ).all()


# =====================================================
# View Menu Item By ID
# =====================================================

@router.get("/menu/{menu_id}")
def get_menu_item(menu_id: int,
                  db: Session = Depends(get_db)):

    item = db.query(models.Menu).filter(
        models.Menu.id == menu_id,
        models.Menu.available == True
    ).first()

    if item is None:
        raise HTTPException(
            status_code=404,
            detail="Menu item not found"
        )

    return item


# =====================================================
# Browse By Category
# =====================================================

@router.get("/menu/category/{category}")
def get_category(category: str,
                 db: Session = Depends(get_db)):

    return db.query(models.Menu).filter(
        models.Menu.category == category,
        models.Menu.available == True
    ).all()


# =====================================================
# AI Menu Search
# =====================================================

@router.post("/search")
def ai_menu_search(query: str,
                   db: Session = Depends(get_db)):

    menu_items = db.query(models.Menu).filter(
        models.Menu.available == True
    ).all()

    return ai_search.search_menu(query, menu_items)
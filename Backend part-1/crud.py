from sqlalchemy.orm import Session
import models
import schemas


# =====================================================
# MENU CRUD
# =====================================================

def create_menu(db: Session, menu: schemas.MenuCreate):
    db_menu = models.Menu(**menu.model_dump())
    db.add(db_menu)
    db.commit()
    db.refresh(db_menu)
    return db_menu


def get_all_menu(db: Session):
    return db.query(models.Menu).all()


def get_menu_by_id(db: Session, menu_id: int):
    return db.query(models.Menu).filter(
        models.Menu.id == menu_id
    ).first()


def update_menu(db: Session, menu_id: int, menu: schemas.MenuCreate):

    db_menu = get_menu_by_id(db, menu_id)

    if db_menu is None:
        return None

    for key, value in menu.model_dump().items():
        setattr(db_menu, key, value)

    db.commit()
    db.refresh(db_menu)

    return db_menu


def delete_menu(db: Session, menu_id: int):

    db_menu = get_menu_by_id(db, menu_id)

    if db_menu is None:
        return None

    db.delete(db_menu)
    db.commit()

    return db_menu


# =====================================================
# ORDER CRUD
# =====================================================

def create_order(db: Session, customer_name: str, items):

    total_price = 0

    order = models.Order(
        customer_name=customer_name,
        status="Placed",
        total_price=0
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    for item in items:

        menu = db.query(models.Menu).filter(
            models.Menu.id == item.menu_id
        ).first()

        if menu is None:
            continue

        item_total = menu.price * item.quantity

        total_price += item_total

        order_item = models.OrderItem(
            order_id=order.id,
            menu_id=menu.id,
            quantity=item.quantity,
            price=item_total
        )

        db.add(order_item)

    order.total_price = total_price

    db.commit()
    db.refresh(order)

    return order


def get_all_orders(db: Session):
    return db.query(models.Order).all()


def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(
        models.Order.id == order_id
    ).first()


def update_order_status(db: Session, order_id: int, status: str):

    order = get_order(db, order_id)

    if order is None:
        return None

    order.status = status

    db.commit()
    db.refresh(order)

    return order
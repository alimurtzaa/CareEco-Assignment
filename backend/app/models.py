from pydantic import BaseModel

class OrderLevel(BaseModel):
    level: int
    bid_size: int
    bid_price: float
    offer_price: float
    offer_size: int

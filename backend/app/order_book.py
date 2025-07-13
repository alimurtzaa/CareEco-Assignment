from collections import defaultdict
from typing import List
from app.models import OrderLevel

order_books = defaultdict(lambda: defaultdict(dict))
top_of_books = defaultdict(lambda: defaultdict(dict))

def process_top_of_book(exchange: str, symbol: str, best_bid_price: float, best_bid_size: int, best_offer_price: float, best_offer_size: int):
    """ Update best bid, offer from top of the book for an exchange """
    top_of_books[exchange][symbol] = {
        "best_bid_price": best_bid_price,
        "best_bid_size": best_bid_size,
        "best_offer_price": best_offer_price,
        "best_offer_size": best_offer_size
    }

def process_new_order(exchange: str, symbol: str, order_id: str, limit_price: float, side: str, quantity: int):
    """ Add new order to order book """
    order_books[exchange][symbol][order_id] = {
        "price": limit_price,
        "side": side,
        "quantity": quantity
    }

def process_cancel_order(exchange: str, symbol: str, order_id: str):
    """ Remove order """
    if order_id in order_books[exchange][symbol]:
        del order_books[exchange][symbol][order_id]

def process_modify_order(exchange: str, symbol: str, order_id: str, new_quantity: int):
    """ Modify quantity of existing order """
    if order_id in order_books[exchange][symbol]:
        order_books[exchange][symbol][order_id]["quantity"] = new_quantity

def get_top_levels(symbol: str) -> List[OrderLevel]:
    """ Build consolidated top 5 levels from order-based and top-of-the-book feeds """
    bid_prices = defaultdict(int)   
    offer_prices = defaultdict(int) 

    # order based feed
    for exchange, books in order_books.items():
        for order_id, order in books.get(symbol, {}).items():
            price = order["price"]
            size = order["quantity"]
            side = order["side"]

            if side == "BUY":
                bid_prices[price] += size
            elif side == "SELL":
                offer_prices[price] += size

    # top of the book feed
    for exchange, books in top_of_books.items():
        tob = books.get(symbol)
        if tob:
            bid_prices[tob["best_bid_price"]] += tob["best_bid_size"]
            offer_prices[tob["best_offer_price"]] += tob["best_offer_size"]

    # sort bids desc and offers asc
    sorted_bids = sorted(bid_prices.items(), key=lambda x: -x[0])
    sorted_offers = sorted(offer_prices.items(), key=lambda x: x[0])

    # build top 5 level
    top_levels = []
    for i in range(5):
        try:
            bid_price, bid_size = sorted_bids[i]
        except IndexError:
            bid_price, bid_size = 0, 0

        try:
            offer_price, offer_size = sorted_offers[i]
        except IndexError:
            offer_price, offer_size = 0, 0

        top_levels.append(OrderLevel(
            level=i,
            bid_size=bid_size,
            bid_price=bid_price,
            offer_price=offer_price,
            offer_size=offer_size
        ))

    return top_levels


import app.simulator
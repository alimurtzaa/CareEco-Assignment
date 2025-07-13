import random
import time
from threading import Thread
from collections import defaultdict
from app.order_book import process_new_order, process_cancel_order, process_modify_order, process_top_of_book


symbols = ["AAPL", "MSFT", "TSLA"]
exchanges = ["ExchangeA", "ExchangeB", "ExchangeC"]

# keeping track of existing orders so we can cancel, modify them
existing_orders = defaultdict(list) 

def simulate_market_data():
    while True:
        for symbol in symbols:
            for exchange in exchanges:

                # randomly decide what action to do
                action = random.choice(["NEW", "NEW", "NEW", "MODIFY", "CANCEL"])

                # simulating order based
                if action == "NEW":
                    order_id = f"{exchange}_{symbol}_{random.randint(1000, 9999)}"
                    limit_price = round(random.uniform(100, 200), 2)
                    side = random.choice(["BUY", "SELL"])
                    quantity = random.randint(10, 100)

                    process_new_order(exchange, symbol, order_id, limit_price, side, quantity)
                    existing_orders[(exchange, symbol)].append(order_id)

                elif action == "CANCEL":
                    orders = existing_orders.get((exchange, symbol))
                    if orders:
                        order_id = random.choice(orders)
                        process_cancel_order(exchange, symbol, order_id)
                        orders.remove(order_id)

                elif action == "MODIFY":
                    orders = existing_orders.get((exchange, symbol))
                    if orders:
                        order_id = random.choice(orders)
                        new_quantity = random.randint(5, 120)
                        process_modify_order(exchange, symbol, order_id, new_quantity)

                # simulating top of the book 
                best_bid_price = round(random.uniform(100, 200), 2)
                best_offer_price = round(best_bid_price + random.uniform(0.5, 2.0), 2)
                best_bid_size = random.randint(10, 100)
                best_offer_size = random.randint(10, 100)

                process_top_of_book(
                    exchange, symbol,
                    best_bid_price, best_bid_size,
                    best_offer_price, best_offer_size
                )
                
        # wait 1 sec before next update
        time.sleep(1)

#start simulator in background when this file is imported
Thread(target=simulate_market_data, daemon=True).start()

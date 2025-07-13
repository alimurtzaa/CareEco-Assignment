import random
import time
import uuid
from threading import Thread
from collections import defaultdict
from app.order_book import process_new_order, process_cancel_order, process_modify_order, process_top_of_book

# List of symbols and exchanges we're simulating
symbols = ["AAPL", "MSFT", "TSLA"]
exchanges = ["ExchangeA", "ExchangeB", "ExchangeC"]

existing_orders = defaultdict(list)

def simulate_market_data():
    while True:
        #add few new orders each second
        for _ in range(3):  #number of new orders per second
            symbol = random.choice(symbols)
            exchange = random.choice(exchanges)
            order_id = f"{exchange}_{symbol}_{uuid.uuid4().hex}"  
            limit_price = round(random.uniform(100, 200), 2)
            side = random.choice(["BUY", "SELL"])
            quantity = random.randint(10, 100)

            process_new_order(exchange, symbol, order_id, limit_price, side, quantity)
            existing_orders[(exchange, symbol)].append(order_id)

        #randomly modify or cancel some existing orders
        for symbol in symbols:
            for exchange in exchanges:
                orders = existing_orders.get((exchange, symbol))
                if orders:
                    action = random.choice(["MODIFY", "CANCEL", "NONE"])
                    order_id = random.choice(orders)

                    if action == "MODIFY":
                        new_qty = random.randint(5, 120)
                        process_modify_order(exchange, symbol, order_id, new_qty)

                    elif action == "CANCEL":
                        process_cancel_order(exchange, symbol, order_id)
                        orders.remove(order_id)

        for symbol in symbols:
            for exchange in exchanges:
                best_bid = round(random.uniform(100, 200), 2)
                best_offer = round(best_bid + random.uniform(0.5, 2.0), 2)
                best_bid_size = random.randint(10, 100)
                best_offer_size = random.randint(10, 100)
                process_top_of_book(exchange, symbol, best_bid, best_bid_size, best_offer, best_offer_size)

        # wait 1 second 
        time.sleep(1)

# start simulator in background when module is imported
Thread(target=simulate_market_data, daemon=True).start()

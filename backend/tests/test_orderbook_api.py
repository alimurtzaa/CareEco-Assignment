import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import re
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_api_status():
    resp = client.get("/api/orderbook/AAPL")
    assert resp.status_code == 200

def test_response_keys():
    data = client.get("/api/orderbook/AAPL").json()
    assert "symbol" in data
    assert "order_book" in data
    assert "last_updated" in data

def test_order_book_length():
    data = client.get("/api/orderbook/AAPL").json()
    assert len(data["order_book"]) == 5

def test_fields_in_order_book():
    data = client.get("/api/orderbook/AAPL").json()
    for level in data["order_book"]:
        assert "level" in level
        assert "bid_price" in level
        assert "bid_size" in level
        assert "offer_price" in level
        assert "offer_size" in level

def test_prices_and_sizes_non_negative():
    data = client.get("/api/orderbook/AAPL").json()
    for level in data["order_book"]:
        assert level["bid_price"] >= 0
        assert level["offer_price"] >= 0
        assert level["bid_size"] >= 0
        assert level["offer_size"] >= 0

def test_last_updated_format():
    data = client.get("/api/orderbook/AAPL").json()
    pattern = r"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"
    assert re.match(pattern, data["last_updated"])

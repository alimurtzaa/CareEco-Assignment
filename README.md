# 🏦 One Big Exchange – Consolidated Order Book

This project simulates receiving market data feeds from **multiple exchanges** and builds a **consolidated order book** per stock symbol.  
It merges data from different exchanges and serves the **top 5 levels** through a FastAPI backend.

✅ This was built as part of an assignment for **CareEco Technologies**.

---

## 📌 **Project Goal**

US equities (or any assets) can be traded on multiple exchanges.  
We want to:
- Merge top-of-the-book and order-based feeds from multiple exchanges
- Build a consolidated order book per symbol
- Serve top 5 levels, showing:
  - Bid Size, Bid Price, Offer Price, Offer Size
- Update live, as new data arrives

---


## ⚙ **How it works**

- We simulate **3 exchanges**: `ExchangeA`, `ExchangeB`, `ExchangeC`
- Each exchange sends random:
  - NEW_ORDER (with price, side, quantity)
  - CANCEL_ORDER
  - MODIFY_ORDER
- Backend merges these orders:
  - Same price across exchanges → sum sizes
- Builds **top 5 bid/offer levels**, sorted properly
- Exposes a REST API:
  `GET /api/orderbook/AAPL`

---

## 📊 API Example

### Request: 

```GET /api/orderbook/{SYMBOL}```
### Response:

```json
{
  "symbol": "SYMBOL",
  "order_book": [
    {
      "level": 0,
      "bid_size": 95,
      "bid_price": 199.11,
      "offer_price": 100.87,
      "offer_size": 62
    }
    // ... more levels
  ],
  "last_updated": "2025-07-11 22:34:10"
}
```

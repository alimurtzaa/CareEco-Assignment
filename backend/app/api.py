from fastapi import APIRouter, WebSocket
from app.order_book import get_top_levels
from datetime import datetime
import asyncio

router = APIRouter()

@router.get("/api/health")
async def health_check():
    """ Health check endpoint """
    return {"status": "ok"}


@router.websocket("/ws/orderbook/{symbol}")
async def orderbook_ws(websocket: WebSocket, symbol: str):
    await websocket.accept()
    try:
        while True:
            top_levels = get_top_levels(symbol)
            data = [level.model_dump() for level in top_levels]
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
            await websocket.send_json({
                "symbol": symbol,
                "last_updated": timestamp,
                "order_book": data
            })
            await asyncio.sleep(1) 
    except Exception as e:
        print("WebSocket disconnected ", e)

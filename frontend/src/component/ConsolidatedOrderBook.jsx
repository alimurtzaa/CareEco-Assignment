import React, { useState, useEffect } from 'react';
import { BidsData , BestComponent, OffersData} from './';

export function ConsolidatedOrderBook({ selectedSymbol, setSelectedSymbol, consolidatedBook }) {

    const symbols = ['AAPL', 'MSFT', 'TSLA']
    const formatPrice = (price) => `$${price.toFixed(2)}`;

    const currentBook = consolidatedBook["order_book"];
    const maxBidSize = Math.max(...currentBook.map(l => l.bid_size ?? 0));
    const maxOfferSize = Math.max(...currentBook.map(l => l.offer_size ?? 0));


    return (

        <div className="min-h-screen ">

            <div className="container  sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-6 py-6">

                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

                    <div className='text-gray-700 '>
                        <label className="block text-sm font-medium  mb-2">Symbol</label>
                        <select
                            value={selectedSymbol}
                            onChange={(e) => setSelectedSymbol(e.target.value)}
                            className="bg-gray-800/500 border border-gray-600 rounded-lg px-4 py-2 "
                        >
                            {symbols.map(symbol => (
                                <option key={symbol} className='rounded' value={symbol}>{symbol}</option>
                            ))}

                        </select>
                    </div>

                    <div    
                        className={`px-4 py-2 rounded-lg font-medium transition-colors bg-purple-600 text-white `}
                    >
                        consolidated
                    </div>

                </div>

                {consolidatedBook && <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <BestComponent icon={"📈"} title={"Best Bid"} price={formatPrice(currentBook?.[0]?.bid_price ?? 0)} size={(currentBook?.[0]?.bid_size ?? 0)}/>
                        <BestComponent icon={"📉"} title={"Best Offer"} price={formatPrice(currentBook?.[0]?.offer_price ?? 0)} size={(currentBook?.[0]?.offer_size ?? 0)} />

                    </div>

                    <div className="bg-gray-800/500 backdrop-blur-sm rounded-xl border border-gray-700/500 overflow-hidden">

                        <div className="bg-gray-900/500 border-b border-gray-700/500 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl text-purple-400">📊</span>
                                    <div>
                                        <h3 className="text-lg font-semibold">Consolidated Book - {consolidatedBook.symbol}</h3>
                                        <p className="text-sm text-gray-700">Top 5   </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-400">🌐</span>
                                    <span className="text-sm text-gray-700">Multi-Exchange</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 divide-y xl:divide-y-0 xl:divide-x divide-gray-700/50">

                            <BidsData key={"bidsData"} currentBook={currentBook} maxBidSize={maxBidSize} formatPrice={formatPrice} />
                            
                            <OffersData key={"offersData"} currentBook={currentBook} maxOfferSize={maxOfferSize} formatPrice={formatPrice}/>
                           
                        </div>
                    </div>

                </div>}

            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';

export function ConsolidatedOrderBook({ selectedSymbol, setSelectedSymbol, consolidatedBook }) {

    const symbols = ['AAPL', 'MSFT', 'TSLA']




    const formatPrice = (price) => `$${price.toFixed(2)}`;
    const formatSize = (size) => size.toLocaleString();
    const formatNumber = (num) => num.toLocaleString();

    const currentBook = consolidatedBook["order_book"];

    const maxBidSize = Math.max(...currentBook.map(l => l.bid_size ?? 0));
    const maxOfferSize = Math.max(...currentBook.map(l => l.offer_size ?? 0));


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         // setLastUpdate(new Date());
    //     }, 3000);
    //     return () => clearInterval(interval);

    // }, []);

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

                    <button
                        disabled={true}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors bg-purple-600 text-white `}
                    >
                        consolidated
                    </button>

                </div>

                {consolidatedBook && <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <div className="bg-gray-800/400 backdrop-blur-sm rounded-xl p-4 border border-gray-700/500 text-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm ">Best Bid</p>
                                    <p className="text-2xl font-bold text-green-400">
                                        {formatPrice(currentBook?.[0]?.bid_price ?? 0)}
                                    </p>
                                    <p className="text-sm ">{formatSize(currentBook?.[0]?.bid_size ?? 0)} shares</p>
                                </div>
                                <span className="text-3xl text-green-400">📈</span>
                            </div>
                        </div>

                        <div className="bg-gray-800/400 backdrop-blur-sm rounded-xl p-4 border border-gray-700/500 text-gray-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm ">Best Offer</p>
                                    <p className="text-2xl font-bold text-red-400">
                                        {formatPrice(currentBook?.[0]?.offer_price ?? 0)}
                                    </p>
                                    <p className="text-sm">{formatSize(currentBook?.[0]?.offer_size ?? 0)} shares</p>
                                </div>
                                <span className="text-3xl text-red-400">📉</span>
                            </div>
                        </div>

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

                            <div className="p-6 xl:border-r max-xl:border-b border-gray-700/500 ">

                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-semibold text-green-400">Bids</h4>
                                    <div className="text-sm text-gray-700">
                                        Total: {formatNumber(currentBook.reduce((sum, l) => sum + l.bid_size, 0))} shares
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-700 uppercase tracking-wider pb-2 border-b border-gray-700/50">
                                        <div >Level</div>
                                        <div className='text-start'>Size</div>
                                        <div className='text-start'>Price</div>
                                        <div className='text-center'>Cumulative</div>
                                    </div>

                                    {currentBook.map((level, index) => {
                                        const cumulative = currentBook.slice(0, index + 1).reduce((sum, l) => sum + l.bid_size, 0);
                                        return (
                                            <div key={index} className="relative group">
                                                <div
                                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500/40 to-green-500/30 rounded-lg transition-all duration-300"
                                                    style={{ width: `${(level.bid_size / maxBidSize) * 100}%` }}
                                                />
                                                <div className="relative grid grid-cols-4 gap-4 py-3 px-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                                                    <div className="flex items-center className='text-center'">
                                                        <span className="w-6 h-6  bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                                                            {level.level}
                                                        </span>
                                                    </div>
                                                    <div className="font-semibold text-start">{formatSize(level.bid_size)}</div>
                                                    <div className="font-mono text-green-400 font-bold text-start">{formatPrice(level.bid_price)}</div>
                                                    <div className="font-medium text-center">{formatSize(cumulative)}</div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>


                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-semibold text-red-400">Offer</h4>
                                    <div className="text-sm text-gray-700">
                                        Total: {formatNumber(currentBook.reduce((sum, l) => sum + l.offer_size, 0))} shares
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-700 uppercase tracking-wider pb-2 border-b border-gray-700/50">
                                        <div>Level</div>
                                        <div className='text-start'>Size</div>
                                        <div className='text-start'>Price</div>
                                        <div className='text-center'>Cumulative</div>
                                    </div>

                                    {currentBook.map((level, index) => {
                                        const cumulative = currentBook.slice(0, index + 1).reduce((sum, l) => sum + l.offer_size, 0);
                                        return (
                                            <div key={index} className="relative group">
                                                <div
                                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500/40 to-red-500/30 rounded-lg transition-all duration-300"
                                                    style={{ width: `${(level.offer_size / maxOfferSize) * 100}%` }}
                                                />
                                                <div className="relative grid grid-cols-4 gap-4 py-3 px-2 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                                                    <div className="flex items-center text-center">
                                                        <span className="w-6 h-6 t bg-red-500 text-center rounded-full flex items-center justify-center text-xs font-bold">
                                                            {level.level}
                                                        </span>
                                                    </div>
                                                    <div className="font-semibold text-start">{formatSize(level.offer_size)}</div>
                                                    <div className="font-mono text-red-400 font-bold text-start">{formatPrice(level.offer_price)}</div>
                                                    <div className="font-medium text-center">{formatSize(cumulative)}</div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>}

            </div>
        </div>
    );
}
import React from 'react'

function OffersData({currentBook , formatPrice , maxOfferSize}) {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-red-400">Offer</h4>
                <div className="text-sm text-gray-700">
                    Total: {(currentBook.reduce((sum, l) => sum + l.offer_size, 0))} shares
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
                                <div className="font-semibold text-start">{(level.offer_size)}</div>
                                <div className="font-mono text-red-400 font-bold text-start">{formatPrice(level.offer_price)}</div>
                                <div className="font-medium text-center">{(cumulative)}</div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export  {OffersData}

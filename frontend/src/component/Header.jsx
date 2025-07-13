import React from 'react'

function Header({ last_updated }) {
    return (
        <header className="bg-gradient-to-b from-purple-100 to-purple-100 backdrop-blur-sm text-gray-800 w-full  border-gray-700/50 sticky top-0 z-50">
            <div className=" container sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl  mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">📊</span>
                            </div>
                            <div>
                                <h1 className="text-xl max-[500px]:text-lg font-bold">Consolidated Order Book</h1>
                                <p className="text-sm max-[500px]:text:xs text-gray-600">Multi-Exchange Market Data</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="min-[450px]:flex hidden items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full">
                            <span className="text-green-400">⚡</span>
                            <span className="text-sm font-medium text-green-400">Live</span>
                        </div>
                        <div className="text-sm min-[900px]:flex hidden text-gray-600">
                            <span className="mr-1">🕐</span>
                            Last Update : 
                            {` ${last_updated}`}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export  {Header}

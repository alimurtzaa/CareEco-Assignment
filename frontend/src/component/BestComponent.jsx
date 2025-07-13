import React from 'react'

function BestComponent({title ,icon, price , size}) {
    return (
        <div className="bg-gray-800/400 backdrop-blur-sm rounded-xl p-4 border border-gray-700/500 text-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm ">{title}</p>
                    <p className="text-2xl font-bold text-green-400">
                        {price}
                    </p>
                    <p className="text-sm ">{size} shares</p>
                </div>
                <span className="text-3xl text-green-400">{icon}</span>
            </div>
        </div>

    )
}

export  {BestComponent}

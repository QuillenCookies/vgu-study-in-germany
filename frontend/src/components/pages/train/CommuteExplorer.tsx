import React from 'react';

const CommuteExplorer: React.FC = () => {
    // Similar structural layout to JourneyCalculator.
    // Flow: 
    // 1. User inputs address -> fetch(nominatim) -> get lat/lon.
    // 2. fetch(DB /locations/nearby?latitude=X&longitude=Y) -> get nearby stops.
    // 3. Render a list of nearby stations with distance.

    return (
        <section className="py-16 bg-white px-4">
            <div className="max-w-screen-lg mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a2463] mb-4">Commute Explorer</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">Enter your housing address to discover nearby U-Bahn, S-Bahn, and bus stations.</p>
                </div>

                <div className="bg-gray-50 rounded-[2rem] border border-gray-200 shadow-sm p-8 text-center h-64 flex items-center justify-center">
                    <p className="text-gray-500 italic">Commute Explorer interactive map/list goes here...</p>
                </div>
            </div>
        </section>
    );
};

export default CommuteExplorer;
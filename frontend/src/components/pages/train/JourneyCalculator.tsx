import React, { useState } from 'react';
import { Euro, ArrowRight, Clock, AlertTriangle, Train } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

const JourneyCalculator: React.FC = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [journeys, setJourneys] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Note: Use standard station string inputs or autocomplete IDs here
        try {
            const res = await fetch(`/api/trains/journeys/?from=${from}&to=${to}`);
            const data = await res.json();
            if (data.journeys) setJourneys(data.journeys);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    return (
        <section className="py-16 bg-white px-4 border-t border-gray-100">
            <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-12 items-start">

                {/* Input Form */}
                <div className="w-full md:w-1/3">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mb-4">Budgeting Tool</Badge>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Estimate Ticket Prices</h2>
                    <p className="text-gray-500 mb-8">Not all trains are included in your Semesterticket. Check your journey cost before boarding to avoid €60 fines.</p>

                    <form onSubmit={handleSearch} className="flex flex-col gap-4">
                        <input
                            type="text" placeholder="From (e.g. Frankfurt Hbf)"
                            value={from} onChange={e => setFrom(e.target.value)}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#0a2463]"
                        />
                        <input
                            type="text" placeholder="To (e.g. Berlin Hbf)"
                            value={to} onChange={e => setTo(e.target.value)}
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#0a2463]"
                        />
                        <Button type="submit" disabled={isLoading} className="w-full py-6 rounded-2xl bg-[#0a2463] hover:bg-[#0a2463]/90 text-white font-bold">
                            {isLoading ? 'Calculating...' : 'Calculate Fares'}
                        </Button>
                    </form>
                </div>

                {/* Results */}
                <div className="w-full md:w-2/3 flex flex-col gap-4">
                    {journeys.length === 0 && !isLoading && (
                        <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-8 text-center text-gray-400">
                            <Euro className="w-12 h-12 mb-4 text-gray-300" />
                            <p>Enter a route to see price estimations and ticket validity.</p>
                        </div>
                    )}

                    {journeys.map((j, i) => (
                        <div key={i} className="bg-white border border-gray-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div className="flex-1 w-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="font-bold text-lg text-gray-800">Journey {i + 1}</span>
                                    <Badge variant="outline" className="text-gray-500"><Clock className="w-3 h-3 mr-1" /> {j.duration} min</Badge>
                                    <Badge variant="outline" className="text-gray-500"><Train className="w-3 h-3 mr-1" /> {j.transfers} Changes</Badge>
                                </div>
                                {/* Mock Logic: In production, check j.legs for ICE/IC presence */}
                                {j.price > 15 ? (
                                    <div className="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg flex items-center gap-2 mt-3 w-fit">
                                        <AlertTriangle className="w-4 h-4" /> Not covered by D-Ticket. Requires Long-Distance fare.
                                    </div>
                                ) : (
                                    <div className="text-xs font-semibold text-green-700 bg-green-50 p-2 rounded-lg flex items-center gap-2 mt-3 w-fit">
                                        Included in Deutschlandticket & Semesterticket!
                                    </div>
                                )}
                            </div>
                            <div className="text-right shrink-0">
                                <p className="text-sm text-gray-500 font-medium mb-1">Estimated Fare</p>
                                <p className="text-4xl font-black text-[#f97316]">€{j.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default JourneyCalculator;
import React from 'react';
import { Info, TrainFront, Compass, AlertCircle } from 'lucide-react';
import { Badge } from '../../ui/badge';

const trainTypes = [
    {
        category: "Long-Distance (Fernverkehr)",
        icon: <TrainFront className="w-6 h-6 text-red-600" />,
        badgeColor: "bg-red-100 text-red-800",
        trains: ["ICE (Intercity Express)", "IC (Intercity)", "EC (Eurocity)"],
        description: "High-speed trains connecting major cities and countries. White trains with a red stripe.",
        warning: "Strictly requires specific tickets. Your student Semesterticket or Deutschlandticket is NOT valid here. You will be fined!"
    },
    {
        category: "Regional Rail (Nahverkehr)",
        icon: <Compass className="w-6 h-6 text-orange-600" />,
        badgeColor: "bg-orange-100 text-orange-800",
        trains: ["RE (Regional-Express)", "RB (Regionalbahn)", "IRE"],
        description: "Connects cities with surrounding towns. Usually red trains (though private operators vary).",
        warning: "Generally covered by the Deutschlandticket. Great for weekend trips across states."
    },
    {
        category: "Local Transit",
        icon: <TrainFront className="w-6 h-6 text-blue-600" />,
        badgeColor: "bg-blue-100 text-blue-800",
        trains: ["S-Bahn", "U-Bahn", "Tram", "Bus"],
        description: "Inner-city transit. Runs very frequently. Operated by local networks (like RMV in Frankfurt).",
        warning: "Fully covered by your university Semesterticket within the specific tariff zone."
    }
];

const TransitKnowledgeBase: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 px-4">
            <div className="max-w-screen-xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0a2463] mb-4">The DB Cheat Sheet</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">Understanding the German transit alphabet is a survival skill. Here is what you need to know before you board.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {trainTypes.map((type, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -z-10" />
                            <div className="mb-6 flex items-center justify-between">
                                <div className={`p-4 rounded-2xl ${type.badgeColor} bg-opacity-50`}>
                                    {type.icon}
                                </div>
                                <Badge variant="outline" className="border-gray-200 text-gray-500">Category</Badge>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{type.category}</h3>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {type.trains.map(t => (
                                    <span key={t} className="px-3 py-1 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg">{t}</span>
                                ))}
                            </div>

                            <p className="text-gray-600 mb-6">{type.description}</p>

                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl text-sm flex gap-3 mt-auto">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <p className="font-medium">{type.warning}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DB Info Banner */}
                <div className="bg-[#0a2463] rounded-[2rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-lg">
                    <div className="flex-1">
                        <Badge className="bg-[#f97316] text-white hover:bg-[#ea580c] mb-4">Pro Tip</Badge>
                        <h3 className="text-3xl font-bold mb-4">What is the "Deutschlandticket"?</h3>
                        <p className="text-white/80 text-lg">
                            For €49/month, you can ride almost every regional and local train, tram, and bus in Germany. If your university doesn't offer a full Semesterticket, this is the first thing you should buy when arriving in Germany.
                        </p>
                    </div>
                    <div className="shrink-0 w-full md:w-auto">
                        <a href="https://www.bahn.de/angebot/regio/deutschland-ticket" target="_blank" rel="noopener noreferrer" className="block text-center bg-white text-[#0a2463] px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
                            Learn more at Bahn.de
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TransitKnowledgeBase;
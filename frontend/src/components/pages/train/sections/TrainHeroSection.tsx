import React from "react";
import { Badge } from '../../../ui/badge';
import { Train, Ticket, Calculator, Clock, Book } from 'lucide-react';

const stats = [
    { label: '8+ Types', value: 'Transit', icon: <Train size={24} /> },
    { label: 'Rules', value: 'Ticket', icon: <Ticket size={24} /> },
    { label: 'Budgeting', value: 'Calculator', icon: <Calculator size={24} /> },
    { label: 'Knowledge Base', value: 'Guide', icon: <Book size={24} /> },
    { label: 'Live Updates', value: 'Delays', icon: <Clock size={24} /> },
];

const TrainHeroSection: React.FC = () => {
    return (
        <section className="relative bg-[#0a2463] text-white py-24 px-4 overflow-hidden flex flex-col items-center justify-center min-h-[60vh]">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-overlay"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2463] via-transparent to-transparent opacity-90 z-0" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-10">

                {/* Text Block */}
                <div className="flex flex-col items-center max-w-3xl">
                    <Badge variant="orange" className="mb-6 text-sm px-4 py-1.5 shadow-sm border-white/10 bg-white/10 backdrop-blur-md text-orange-400">
                        German Transit Guide
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl tracking-tight">
                        Master the <span className="text-[#f97316] drop-shadow-md">DB Network</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
                        Navigate Germany like a local. Find the best neighborhoods for your commute, understand ticketing rules, and never pay an ICE fine by mistake.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center shadow-xl hover:bg-white/15 transition-colors duration-300">
                            <div className="flex justify-center mb-2 text-orange-400">{stat.icon}</div>
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-white/70 mt-1 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default TrainHeroSection;
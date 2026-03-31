import React from "react";
import { Badge } from '../../ui/badge';

const TrainHeroSection: React.FC = () => {
    return (
        <section className="relative bg-[#0a2463] text-white py-20 px-4 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1920&q=80')" }} />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <Badge variant="orange" className="mb-4 text-sm px-4 py-1">German Transit Guide</Badge>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
                    Master the <span className="text-[#f97316]">DB Network</span>
                </h1>
                <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                    Navigate Germany like a local. Find the best neighborhoods for your commute, understand ticketing rules, and never pay an ICE fine by mistake.
                </p>
            </div>
        </section>
    );
}

export default TrainHeroSection;
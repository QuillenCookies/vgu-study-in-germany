import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar
} from 'lucide-react';
import { EVENTS } from '../knowledge/data';

const Events: React.FC = () => {
    return (
        <section className="py-20 px-4 bg-gradient-to-br from-[#1a0533] to-[#1A2B4C]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-purple-500/30 text-purple-300 text-sm font-semibold border border-purple-400/30">
                        Dynamic Events
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Frankfurt's Annual Calendar
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Plan your student life around these incredible events that make Frankfurt a world-class cultural city.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {EVENTS.map((event, idx) => (
                        <motion.div
                            key={event.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.4 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2.5 rounded-xl ${event.bg}`}>
                                    <span className={event.color}>{event.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{event.name}</h3>
                                    <div className="flex items-center gap-1 text-purple-300 text-xs mt-0.5">
                                        <Calendar className="w-3 h-3" />
                                        <span>{event.month}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
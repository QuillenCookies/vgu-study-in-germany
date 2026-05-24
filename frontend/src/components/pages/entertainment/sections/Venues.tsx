import React from 'react';
import { motion } from 'framer-motion';
import {
    Ticket, Clock, MapPin
} from 'lucide-react';
import { VENUES } from '../knowledge/data';

const Venues: React.FC = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 text-sm font-semibold">
                        Fixed Venues
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Frankfurt's Best Venues
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        From world-class concert halls to lively nightlife districts — here are the top spots every student should explore.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {VENUES.map((venue, idx) => (
                        <motion.div
                            key={venue.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, duration: 0.5 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${venue.color} opacity-50`} />
                                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-xl p-2 text-white">
                                    {venue.icon}
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                                        {venue.type}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{venue.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{venue.description}</p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                                        <span>{venue.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <Clock className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                                        <span>{venue.hours}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
                                        <Ticket className="w-4 h-4 flex-shrink-0" />
                                        <span>{venue.price}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {venue.highlights.map((h) => (
                                        <span
                                            key={h}
                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${venue.bg} text-gray-700 dark:text-gray-300`}
                                        >
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                {venue.website !== '#' && (
                                    <a
                                        href={venue.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
                                    >
                                        Visit Website →
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Venues;
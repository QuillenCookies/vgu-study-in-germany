import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Mail } from 'lucide-react';

const CTA: React.FC = () => {
    return (
        <section className="px-4 pb-24">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gradient-to-br from-[#0a2463] via-[#0d1f4e] to-[#1a3a7a] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/3 translate-x-1/3 rounded-full bg-[#FFCC00]/15 blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 translate-y-1/3 -translate-x-1/3 rounded-full bg-[#1A2B4C]/40 blur-[80px] pointer-events-none" />

                    <div className="relative z-10">
                        <span className="text-4xl mb-4 block">🦆</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                            Want to join the flock?
                        </h2>
                        <p className="text-white/70 text-[15px] mb-8 max-w-md mx-auto leading-relaxed">
                            Share your tips, fix an error, or add a whole new section. Every contribution helps
                            the next wave of students land safely.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/contributors"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#e6b800] text-[#1A2B4C] font-bold text-[14px] shadow-lg shadow-[#FFCC00]/30 transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <Users size={15} /> Become a Contributor
                            </Link>
                            <a
                                href="mailto:hello@vgu-ente.de"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-[14px] transition-all duration-200"
                            >
                                <Mail size={15} /> Get in Touch
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CTA;
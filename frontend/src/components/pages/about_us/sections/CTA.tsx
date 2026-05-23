import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Linkedin from '../../../ui/Linkedin';
import { stagger, fadeUp } from '../../../ui/animation';
import { TEAM } from '../knowledge/data';

const CTA: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f4ff] via-white to-[#fdf8ec] pt-16 pb-24 px-6">
            {/* Subtle gold glow bottom-right */}
            <div className="absolute bottom-0 right-0 w-80 h-80 translate-x-1/3 translate-y-1/3 rounded-full bg-[#FFCC00]/20 blur-[100px] pointer-events-none" />
            {/* Subtle blue glow top-left */}
            <div className="absolute top-0 left-0 w-80 h-80 -translate-x-1/3 -translate-y-1/3 rounded-full bg-[#0a2463]/8 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

                {/* Left column — text */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-[42%] text-center lg:text-left"
                >
                    <span className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00]/40 text-[#92650a] text-[11px] font-bold uppercase tracking-widest">
                        <Users size={11} /> Our Core Team
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2463] leading-tight mb-5">
                        Meet the Minds<br />
                        <span className="text-[#CA8A04]">Behind Die Ente</span>
                    </h2>

                    <p className="text-slate-500 text-[15px] leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
                        We are a team of passionate VGU students dedicated to walking with you through every step of your journey to Germany. No more navigating alone.
                    </p>

                    <div className="inline-flex flex-col items-center gap-2">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFCC00] to-[#e6b800] flex items-center justify-center text-2xl shadow-lg shadow-[#FFCC00]/30">
                            🦆
                        </div>
                        <span className="text-[#92650a] text-[12px] font-bold tracking-widest uppercase">Die Ente Core Team</span>
                    </div>
                </motion.div>

                {/* Right column — cards */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="lg:w-[58%] w-full grid grid-cols-1 gap-4"
                >
                    {TEAM.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={fadeUp}
                            className="flex items-start gap-4 bg-white border border-slate-100 rounded-2xl p-5 shadow-md shadow-black/5 hover:shadow-lg hover:shadow-black/8 transition-shadow duration-200"
                        >
                            {/* Avatar */}
                            <div className={`shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-xl shadow-md`}>
                                {member.emoji}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <p className="text-[#0a2463] font-bold text-[15px] leading-tight">{member.name}</p>
                                        <p className="text-[#CA8A04] text-[11px] font-bold uppercase tracking-wider mt-0.5">{member.role}</p>
                                    </div>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 text-slate-300 hover:text-[#0a2463] transition-colors duration-200 mt-0.5"
                                        aria-label={`${member.name} on LinkedIn`}
                                    >
                                        <Linkedin width={16} height={16} />
                                    </a>
                                </div>
                                <p className="text-slate-400 text-[13px] italic leading-relaxed mt-2">
                                    "{member.funFact}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

export default CTA;
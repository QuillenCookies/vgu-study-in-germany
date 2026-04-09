import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowLeft, Heart, Users, Globe, BookOpen, Lightbulb, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


// ── ANIMATION VARIANTS ──────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ── DATA ────────────────────────────────────────────────────────────────────
const VALUES = [
  {
    Icon: Heart,
    title: 'Student-First',
    desc: 'Every decision we make starts with one question: does this help a student navigate Germany better?',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
  },
  {
    Icon: Globe,
    title: 'Open & Inclusive',
    desc: 'We are international students ourselves. We build for every background, every language, every duck.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    Icon: Lightbulb,
    title: 'Practical Knowledge',
    desc: 'No fluff, no filler — just real, tested tips gathered from students who have been there.',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    Icon: Users,
    title: 'Community Driven',
    desc: 'Our best content comes from the community. Everyone contributes, everyone benefits.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
];

const STATS = [
  { value: '500+', label: 'Students Helped' },
  { value: '6', label: 'Guide Sections' },
  { value: '3', label: 'Languages' },
  { value: '100%', label: 'Student Built' },
];

// ── MAIN PAGE ────────────────────────────────────────────────────────────────
const AboutUsPage: React.FC = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-gray-950 font-sans w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="relative z-10 w-full">
          <Navbar />
          {/* Navbar spacer — compensates for fixed positioning */}
          <div className="h-[59px]" />

          {/* ══════════════════════════════════════════
              SECTION 1 — HERO
          ══════════════════════════════════════════ */}
          <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0a2463] via-[#0d1f4e] to-[#060f2e] pt-16 pb-28 px-4 flex flex-col items-center box-border">
            {/* Glow blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-500/15 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-screen-lg mx-auto w-full">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-[13px] font-medium transition-all border border-white/15 backdrop-blur-sm"
                >
                  <ArrowLeft size={14} />
                  Back to Home
                </Link>
              </motion.div>

              <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
                {/* Badge */}
                <motion.span
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-[11px] font-bold uppercase tracking-widest"
                >
                  <BookOpen size={12} /> Our Story
                </motion.span>

                <motion.h1
                  variants={fadeUp}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4 drop-shadow-xl"
                >
                  Built by Students,{' '}
                  <span className="text-[#f97316]">for Students</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-white/70 text-[16px] sm:text-[17px] max-w-2xl mx-auto leading-relaxed"
                >
                  We are a group of international students at VGU who got tired of figuring out Germany
                  alone — so we built the guide we wished we'd had from day one.
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 2 — STATS (Overlap)
          ══════════════════════════════════════════ */}
          <section className="relative z-20 px-4 -mt-12 pb-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {STATS.map((s) => (
                  <motion.div
                    key={s.label}
                    variants={fadeUp}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-black/5 border border-slate-100 dark:border-gray-800 p-6 text-center"
                  >
                    <div className="text-3xl sm:text-4xl font-black text-[#0a2463] dark:text-white mb-1">
                      {s.value}
                    </div>
                    <div className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 3 — MISSION
          ══════════════════════════════════════════ */}
          <section className="px-4 py-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#0a2463]/10 dark:bg-blue-900/30 text-[#0a2463] dark:text-blue-300 text-[11px] font-bold uppercase tracking-widest">
                  Our Mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2463] dark:text-white leading-tight">
                  No student should navigate Germany alone
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-slate-100 dark:border-gray-800 shadow-xl shadow-black/5 p-8 sm:p-10"
              >
                <div className="flex flex-col sm:flex-row gap-8 items-center">
                  {/* Duck mascot placeholder */}
                  <div className="shrink-0 w-28 h-28 rounded-full bg-gradient-to-br from-[#f97316] to-[#fbbf24] flex items-center justify-center text-5xl shadow-lg shadow-orange-300/30">
                    🦆
                  </div>
                  <div className="space-y-4 text-slate-600 dark:text-gray-300 text-[15px] leading-relaxed">
                    <p>
                      Moving to a new country as a student is exciting — and absolutely overwhelming.
                      Between finding housing, understanding the Bahn rules, registering at the
                      Einwohnermeldeamt, and somehow keeping up with lectures, it can feel like
                      too much.
                    </p>
                    <p>
                      <strong className="text-[#0a2463] dark:text-white">VGU Note from Die Ente</strong> started
                      as a personal notebook of survival tips. Now it's a community-driven guide covering
                      universities, transport, housing, food, entertainment and everything in between —
                      all written by students who have lived it.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 4 — OUR VALUES
          ══════════════════════════════════════════ */}
          <section className="px-4 py-16 bg-slate-50 dark:bg-gray-900/50">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-orange-500/10 text-[#f97316] text-[11px] font-bold uppercase tracking-widest">
                  What We Stand For
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a2463] dark:text-white">
                  Our Values
                </h2>
              </motion.div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-6"
              >
                {VALUES.map((v) => {
                  const Icon = v.Icon;
                  return (
                    <motion.div
                      key={v.title}
                      variants={fadeUp}
                      className="group flex gap-5 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-slate-100 dark:border-gray-800 shadow-md shadow-black/5 hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
                    >
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${v.bg} transition-transform group-hover:scale-110 duration-300`}>
                        <Icon size={22} className={v.color} />
                      </div>
                      <div>
                        <h3 className="text-[15px] font-bold text-[#0a2463] dark:text-white mb-1">{v.title}</h3>
                        <p className="text-slate-500 dark:text-gray-400 text-[13px] leading-relaxed">{v.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* ══════════════════════════════════════════
              SECTION 5 — CTA
          ══════════════════════════════════════════ */}
          <section className="px-4 pb-24">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#0a2463] via-[#0d1f4e] to-[#1a3a7a] rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/3 translate-x-1/3 rounded-full bg-orange-500/20 blur-[80px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 translate-y-1/3 -translate-x-1/3 rounded-full bg-blue-500/20 blur-[80px] pointer-events-none" />

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
                      className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-[14px] shadow-lg shadow-orange-500/30 transition-all duration-200 hover:scale-105 active:scale-95"
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

          {/* Footer removed */}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUsPage;
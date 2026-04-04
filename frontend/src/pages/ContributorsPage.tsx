import React, { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  X, PenLine, ArrowLeft, Users, Send,
  Globe, Home, ShoppingBag, Train, BookOpen, PartyPopper
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { useLanguage } from '../contexts/LanguageContext';

const MIDNIGHT = '#1A2B4C';
const AMBER    = '#FFCC00';

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ── PATHFINDERS DATA ───────────────────────────────────────────────────────
const PATHFINDERS = [
  { name: "Alex Tran",    role: "Visa Pathfinder",   avatar: "https://i.pravatar.cc/150?img=11", hacks: 24, badge: "Legendary", Icon: Globe,         iconBg: 'rgba(26,43,76,0.08)' },
  { name: "Sarah N.",    role: "Housing Guru",       avatar: "https://i.pravatar.cc/150?img=5",  hacks: 18, badge: "Expert",    Icon: Home,          iconBg: 'rgba(26,43,76,0.08)' },
  { name: "Minh Le",     role: "Bargain Hunter",     avatar: "https://i.pravatar.cc/150?img=8",  hacks: 15, badge: "Pro",       Icon: ShoppingBag,   iconBg: 'rgba(26,43,76,0.08)' },
  { name: "Duc Pham",    role: "Transport Pro",      avatar: "https://i.pravatar.cc/150?img=12", hacks: 12, badge: "Veteran",  Icon: Train,         iconBg: 'rgba(26,43,76,0.08)' },
  { name: "Linh Vu",     role: "Study Expert",       avatar: "https://i.pravatar.cc/150?img=9",  hacks:  9, badge: "Explorer", Icon: BookOpen,      iconBg: 'rgba(26,43,76,0.08)' },
  { name: "Khoa Nguyen", role: "Social Butterfly",   avatar: "https://i.pravatar.cc/150?img=14", hacks:  8, badge: "Newbie",   Icon: PartyPopper,   iconBg: 'rgba(26,43,76,0.08)' },
];

// ── MAIN PAGE ───────────────────────────────────────────────────────────────
const ContributorsPage: React.FC = () => {
  const { tr } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Visa', content: '', name: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.name) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormData({ title: '', category: 'Visa', content: '', name: '' });
    }, 2000);
  };

  // Synchronous scroll to top upon entry to prevent flicker
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 font-sans w-full overflow-x-hidden">
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
      <section className="relative w-full max-w-full overflow-hidden box-border pt-16 pb-28 px-4 flex flex-col items-center"
        style={{ background: `linear-gradient(135deg, ${MIDNIGHT} 0%, #0D1F38 60%, #080f1e 100%)` }}>
        {/* Subtle blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: `${AMBER}15` }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full blur-[100px] pointer-events-none"
          style={{ backgroundColor: `${MIDNIGHT}60` }} />

            <div className="relative z-10 max-w-screen-lg mx-auto w-full">
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-[13px] font-medium transition-all border border-white/15 backdrop-blur-sm"
                >
                  <ArrowLeft size={14} />
                  {tr('community', 'backHome')}
                </Link>
              </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="text-center">
            {/* Badge */}
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full backdrop-blur-md border text-[11px] font-bold uppercase tracking-widest"
              style={{ background: `${AMBER}20`, borderColor: `${AMBER}30`, color: AMBER }}
            >
              <Users size={12} /> Join the Migration
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight tracking-tight mb-2 drop-shadow-xl"
            >
              Wall of <span style={{ color: AMBER }}>Pathfinders</span>
            </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-white/70 text-[15px] sm:text-[16px] mb-6 max-w-lg mx-auto leading-relaxed"
                >
                  Meet the elite flock who mapped the unknown. Have a survival hack of your own? Leave your footprint.
                </motion.p>

            <motion.div variants={fadeUp}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-[15px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                style={{ backgroundColor: AMBER, color: MIDNIGHT, boxShadow: `0 4px 20px ${AMBER}35` }}
              >
                <PenLine size={16} strokeWidth={1.75} />
                Become a Contributor
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

          {/* ══════════════════════════════════════════
          SECTION 2 — PATHFINDERS DIRECTORY (Overlap)
      ══════════════════════════════════════════ */}
      <section className="relative z-20 px-4 -mt-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PATHFINDERS.map((p, i) => {
              const IconData = p.Icon;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative p-8 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full object-cover shadow-sm bg-gray-100" />
                      <div>
                        <h3 className="text-xl font-semibold dark:text-gray-100 leading-tight mb-1" style={{ color: MIDNIGHT }}>{p.name}</h3>
                        <p className="text-xs font-medium text-slate-500 dark:text-gray-400">{p.role}</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                      style={{ backgroundColor: p.iconBg }}>
                      <IconData size={22} strokeWidth={1.75} style={{ color: MIDNIGHT }} />
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold dark:text-white" style={{ color: MIDNIGHT }}>{p.hacks}</div>
                      <div className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Hacks Shared</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[12px] font-bold border"
                      style={{ background: `${AMBER}15`, color: MIDNIGHT, borderColor: `${AMBER}40` }}>
                      {p.badge}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* ══════════════════════════════════════════
          CONTRIBUTOR MODAL
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-100 dark:border-gray-800 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
                <h3 className="text-[15px] font-semibold dark:text-white flex items-center gap-2" style={{ color: MIDNIGHT }}>
                  <PenLine size={16} style={{ color: AMBER }} /> Share Your Hack
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 -mr-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                      <Send size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-[#0a2463] dark:text-white mb-2">Hack Submitted!</h4>
                    <p className="text-slate-500 dark:text-gray-400 text-[13px]">
                      Your survival note is flying through the moderation queue. Quack!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                        Your Name / Alias
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Wise VGU Duck"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 transition-all"
                        style={{ '--tw-ring-color': `${AMBER}40` } as React.CSSProperties}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                        Category
                      </label>
                      <div className="relative">
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 transition-all appearance-none"
                          style={{ '--tw-ring-color': `${AMBER}40` } as React.CSSProperties}
                        >
                          <option value="Visa">Visa & Bureaucracy</option>
                          <option value="Housing">Housing & WG</option>
                          <option value="Finance">Finance & Banking</option>
                          <option value="Study">Study & Exams</option>
                          <option value="Transport">Transport & DB</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                        </div>
                      </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                        Hack Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. The fastest way to get Anmeldung"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 transition-all"
                        style={{ '--tw-ring-color': `${AMBER}40` } as React.CSSProperties}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1.5">
                        Content
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Share your experience, tips, and step-by-step hacks here..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 transition-all resize-none"
                        style={{ '--tw-ring-color': `${AMBER}40` } as React.CSSProperties}
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>

              {/* Footer */}
              {!submitted && (
                <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl font-semibold text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-800 transition-colors text-[13px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 rounded-lg font-semibold text-[13px] shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
                    style={{ backgroundColor: AMBER, color: MIDNIGHT, boxShadow: `0 4px 14px ${AMBER}30` }}
                  >
                    Submit <Send size={14} strokeWidth={1.75} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ContributorsPage;

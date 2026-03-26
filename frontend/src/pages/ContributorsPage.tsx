import React, { useState, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  X, PenLine, ArrowLeft, Users, Send,
  Globe, Home, ShoppingBag, Train, BookOpen, PartyPopper
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

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
  {
    name: "Alex Tran",
    role: "Visa Pathfinder",
    avatar: "https://i.pravatar.cc/150?img=11",
    hacks: 24,
    badge: "Legendary",
    Icon: Globe,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    name: "Sarah N.",
    role: "Housing Guru",
    avatar: "https://i.pravatar.cc/150?img=5",
    hacks: 18,
    badge: "Expert",
    Icon: Home,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
  },
  {
    name: "Minh Le",
    role: "Bargain Hunter",
    avatar: "https://i.pravatar.cc/150?img=8",
    hacks: 15,
    badge: "Pro",
    Icon: ShoppingBag,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    name: "Duc Pham",
    role: "Transport Pro",
    avatar: "https://i.pravatar.cc/150?img=12",
    hacks: 12,
    badge: "Veteran",
    Icon: Train,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    name: "Linh Vu",
    role: "Study Expert",
    avatar: "https://i.pravatar.cc/150?img=9",
    hacks: 9,
    badge: "Explorer",
    Icon: BookOpen,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50",
  },
  {
    name: "Khoa Nguyen",
    role: "Social Butterfly",
    avatar: "https://i.pravatar.cc/150?img=14",
    hacks: 8,
    badge: "Newbie",
    Icon: PartyPopper,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
  }
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

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section className="relative w-full max-w-full overflow-hidden box-border bg-gradient-to-br from-[#0a2463] via-[#0d1f4e] to-[#060f2e] pt-16 pb-28 px-4 flex flex-col items-center">
        {/* Background glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-500/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 translate-y-1/2 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[100px] pointer-events-none" />

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
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/30 text-orange-400 text-[11px] font-bold uppercase tracking-widest"
            >
              <Users size={12} /> Join the Migration
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight mb-2 drop-shadow-xl"
            >
              Wall of <span className="text-[#f97316]">Pathfinders</span>
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f97316] hover:bg-[#ea6c0a]
                  text-white font-bold text-[15px] shadow-lg shadow-orange-500/30
                  transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <PenLine size={16} />
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
                  className="group relative p-8 rounded-2xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl shadow-black/5 hover:shadow-black/10 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-full object-cover shadow-sm bg-gray-100" />
                      <div>
                        <h3 className="text-xl font-extrabold text-[#0a2463] dark:text-gray-100 leading-tight mb-1">{p.name}</h3>
                        <p className="text-xs font-medium text-slate-500 dark:text-gray-400">
                          {p.role}
                        </p>
                      </div>
                    </div>
                    {/* Circle Icon Background */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${p.iconBg} dark:bg-gray-800 transition-transform group-hover:scale-110 duration-300`}>
                      <IconData size={22} className={`${p.iconColor} dark:text-white`} />
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-gray-800 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-black text-[#0a2463] dark:text-white">{p.hacks}</div>
                      <div className="text-[11px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">Hacks Shared</div>
                    </div>
                    <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 rounded-full text-[12px] font-bold text-[#f97316]">
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
              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50">
                <h3 className="text-[15px] font-bold text-[#0a2463] dark:text-white flex items-center gap-2">
                  <PenLine size={16} className="text-[#f97316]" /> Share Your Hack
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
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
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all appearance-none"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-[14px] focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all resize-none"
                      />
                    </div>
                  </form>
                )}
              </div>

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
                    className="px-6 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold text-[13px] shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5"
                  >
                    Submit <Send size={14} />
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

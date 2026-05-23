import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';

const MiniCTA: React.FC = () => {
    const { tr } = useLanguage();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleNoteSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-14 px-4 border-t border-gray-100 dark:border-white/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-screen-sm mx-auto text-center"
            >
                <Mail size={28} className="mx-auto mb-4 text-[#FFCC00]" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tr('community', 'sec6Title')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    {tr('community', 'sec6Desc')}
                </p>

                <AnimatePresence mode="wait">
                    {subscribed ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold"
                        >
                            {tr('community', 'subscribed')}
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleNoteSubscribe}
                            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
                        >
                            <input
                                ref={inputRef}
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500 text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#FFCC00]/40 transition"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#e6b800] text-white
                    font-semibold text-sm whitespace-nowrap transition-all duration-200
                    hover:scale-105 active:scale-95 shadow-lg shadow-amber-400/30"
                            >
                                {tr('community', 'subscribe')}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default MiniCTA;
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { BORDER } from './colors';

const BackButton: React.FC = () => {
    const { tr } = useLanguage();
    return (
        <div>
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-slate-500 hover:text-slate-800 bg-white/70 hover:bg-white transition-all shadow-sm border"
                    style={{ borderColor: BORDER }}
                >
                    <ChevronLeft size={14} className="opacity-70" />
                    {tr('legalCompass', 'backHome')}
                </Link>
            </motion.div>
        </div>
    );
};

export default BackButton;
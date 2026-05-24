import React from 'react';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { ENTERTAINMENT_TIPS } from '../knowledge/data';

const NightlifeTips: React.FC = () => {
    const { tr } = useLanguage();
    return (
        <section className="py-20 px-4 bg-white dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 text-sm font-semibold">
                        Student Tips
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
                        {tr('entertainment', 'secTipsTitle')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Practical tips for students to enjoy Frankfurt's culture on a budget.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {ENTERTAINMENT_TIPS.map((item) => (
                        <div key={item.tip} className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                            <div className="text-3xl flex-shrink-0">{item.icon}</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.tip}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NightlifeTips;
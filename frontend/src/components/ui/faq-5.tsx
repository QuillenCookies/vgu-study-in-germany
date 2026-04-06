import { Badge } from './badge';
import { cn } from '../../lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq5Props {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
  className?: string;
}

export const Faq5 = ({
  badge = 'FAQ',
  heading = 'Common Questions & Answers',
  description = 'Find out all the essential details about our platform and how it can serve your needs.',
  faqs = [],
  className,
}: Faq5Props) => {
  return (
    <section className={cn('py-0', className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <Badge
          variant="outline"
          className="text-[11px] font-bold uppercase tracking-widest border-amber-300 text-amber-700 dark:border-amber-600 dark:text-amber-400 bg-amber-50/60 dark:bg-amber-900/10 px-3 py-1"
        >
          {badge}
        </Badge>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-[#1A2B4C] dark:text-white">
          {heading}
        </h2>
        <p className="mt-4 text-base font-medium text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* FAQ list */}
      <div className="mx-auto max-w-2xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-7 flex gap-4 group"
          >
            {/* Number badge */}
            <span className="flex size-6 shrink-0 items-center justify-center rounded-md font-mono text-xs font-bold mt-0.5
              bg-[#1A2B4C]/08 dark:bg-white/[0.07]
              text-[#1A2B4C] dark:text-gray-300
              border border-[#1A2B4C]/10 dark:border-white/[0.1]
              ring-0 group-hover:ring-2 group-hover:ring-[#FFCC00]/50
              transition-all duration-200 select-none"
              style={{ background: 'rgba(26,43,76,0.07)' }}
            >
              {index + 1}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1.5 leading-snug">
                {faq.question}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

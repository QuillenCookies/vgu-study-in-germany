import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ChevronLeft, Shield, Search, Clock, AlertCircle,
  ChevronDown, CheckSquare, Square, ArrowRight,
  FileText, Home, Banknote, Scale, Radio, CreditCard,
  Briefcase, Phone, Rocket, Landmark, Coins,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../lib/translations';
import Navbar from '../components/Navbar';

/* ─── Color Tokens ───────────────────────────────────────────── */
const NAVY = '#001A3F';
const GOLD = '#FFCC00';
const BORDER = '#E5E7EB';

/* ─── Animation Variants ─────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 24 } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/* ─── Multilingual helper ────────────────────────────────────── */
type ML = Record<Language, string>;
const sl = (lang: Language) => (e: string, d: string, v: string) =>
  lang === 'EN' ? e : lang === 'DE' ? d : v;

/* ─── Raw Interfaces ─────────────────────────────────────────── */
interface ChecklistRaw {
  id: string;
  label: ML;
  germanTerm?: string;
}
interface ArticleRaw {
  id: string;
  tag: 'new' | 'residency' | 'tax';
  title: ML;
  germanAnchor: string;
  icon: React.ReactNode;
  isUrgent?: boolean;
  urgencyText?: ML;
  summary: ML;
  checklist?: ChecklistRaw[];
  dependsOn?: string; // article ID prerequisite
  extraContent?: (lang: Language) => React.ReactNode;
}
interface ChecklistItem { id: string; label: string; germanTerm?: string; }
interface Article {
  id: string;
  tag: 'new' | 'residency' | 'tax';
  title: string;
  germanAnchor: string;
  icon: React.ReactNode;
  isUrgent?: boolean;
  urgencyText?: string;
  summary: string;
  checklist?: ChecklistItem[];
  dependsOn?: string;
  extraContent?: React.ReactNode;
}

/* ─── Category Config ────────────────────────────────────────── */
type CategoryKey = 'new' | 'residency' | 'tax';
interface CategoryConfig {
  key: CategoryKey;
  icon: React.ReactNode;
  articleIds: string[];
}
const CATEGORIES: CategoryConfig[] = [
  {
    key: 'new',
    icon: <Rocket size={20} strokeWidth={1.75} />,
    articleIds: ['anmeldung', 'blocked-account', 'sim-card', 'immatrikulation', 'krankenversicherung'],
  },
  {
    key: 'residency',
    icon: <Landmark size={20} strokeWidth={1.75} />,
    articleIds: ['aufenthaltstitel', 'aufenthg', 'ummeldung', 'passport'],
  },
  {
    key: 'tax',
    icon: <Coins size={20} strokeWidth={1.75} />,
    articleIds: ['rundfunkbeitrag', 'steuer-id', 'haftpflicht', 'steuererklarung', 'arbeitsvertrag'],
  },
];

/* ─── German Anchor Badge ─────────────────────────────────────── */
const GermanBadge: React.FC<{ term: string }> = ({ term }) => (
  <span
    className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase rounded-full mb-2.5"
    style={{ background: NAVY, color: '#FFFFFF' }}
  >
    {term}
  </span>
);

/* ─── Urgency Badge ───────────────────────────────────────────── */
const UrgencyBadge: React.FC<{ text: string }> = ({ text }) => (
  <span className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-slate-500">
    <Clock size={12} className="text-amber-500 flex-shrink-0" />
    {text}
  </span>
);

/* ─── Prerequisite Banner ─────────────────────────────────────── */
const DependencyBanner: React.FC<{ dependsOn: string; articles: Article[]; requiresLabel: string; onJump: (id: string) => void }> = ({
  dependsOn, articles, requiresLabel, onJump,
}) => {
  const dep = articles.find(a => a.id === dependsOn);
  if (!dep) return null;
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium mb-4"
      style={{ background: `${GOLD}18`, borderLeft: `3px solid ${GOLD}` }}
    >
      <ArrowRight size={12} style={{ color: GOLD, flexShrink: 0 }} />
      <span style={{ color: NAVY }}>
        {requiresLabel}{' '}
        <button
          onClick={() => onJump(dep.id)}
          className="font-bold underline underline-offset-2 hover:opacity-75 transition-opacity"
          style={{ color: NAVY }}
        >
          {dep.germanAnchor}
        </button>
      </span>
    </div>
  );
};

/* ─── Interactive Checklist ──────────────────────────────────── */
const InteractiveChecklist: React.FC<{ items: ChecklistItem[] }> = ({ items }) => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setChecked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const doneCount = checked.size;
  const progress = items.length ? (doneCount / items.length) * 100 : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: GOLD }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[11px] font-bold text-slate-400 flex-shrink-0">
          {doneCount}/{items.length}
        </span>
      </div>
      <ul className="space-y-2">
        {items.map(item => {
          const done = checked.has(item.id);
          return (
            <li
              key={item.id}
              onClick={() => toggle(item.id)}
              className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all duration-200 group"
              style={{
                borderColor: done ? `${GOLD}60` : BORDER,
                background: done ? `${GOLD}0C` : 'transparent',
              }}
            >
              <button className="flex-shrink-0 mt-0.5 transition-transform group-active:scale-90">
                {done
                  ? <CheckSquare size={17} style={{ color: GOLD }} />
                  : <Square size={17} className="text-slate-300" />}
              </button>
              <span
                className="text-[13px] font-medium leading-relaxed"
                style={{
                  color: done ? '#9CA3AF' : '#374151',
                  textDecoration: done ? 'line-through' : 'none',
                  opacity: done ? 0.7 : 1,
                }}
              >
                {item.label}
                {item.germanTerm && (
                  <span
                    className="ml-2 text-[10.5px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${NAVY}10`, color: NAVY }}
                  >
                    {item.germanTerm}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ─── Article Card ────────────────────────────────────────────── */
const ArticleCard: React.FC<{
  article: Article;
  allArticles: Article[];
  onJumpTo: (id: string) => void;
}> = ({ article, allArticles, onJumpTo }) => {
  const { tr } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      layout
      className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
      style={{ borderColor: open ? `${GOLD}60` : BORDER }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left px-6 py-5 flex items-start gap-4 group"
      >
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-105"
          style={{ background: open ? `${GOLD}20` : `${NAVY}0A` }}
        >
          {article.icon}
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <GermanBadge term={article.germanAnchor} />
          <div className="flex items-start flex-wrap gap-x-2 gap-y-1 mb-1.5">
            {article.isUrgent && (
              <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
            )}
            <h3 className="text-[16px] font-bold leading-snug tracking-tight flex-1" style={{ color: NAVY }}>
              {article.title}
            </h3>
          </div>
          {article.urgencyText && (
            <div className="mb-1.5">
              <UrgencyBadge text={article.urgencyText} />
            </div>
          )}
          <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        </div>

        {/* Chevron */}
        <div
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 mt-1"
          style={{ background: open ? `${GOLD}25` : `${NAVY}08` }}
        >
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
            <ChevronDown size={14} style={{ color: NAVY }} />
          </motion.span>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-1 border-t" style={{ borderColor: `${GOLD}30` }}>

              {/* Dependency banner */}
              {article.dependsOn && (
                <div className="mt-4">
                  <DependencyBanner
                    dependsOn={article.dependsOn}
                    articles={allArticles}
                    requiresLabel={tr('legalCompass', 'requiresLabel')}
                    onJump={onJumpTo}
                  />
                </div>
              )}

              {/* Checklist */}
              {article.checklist && (
                <div className="mt-4">
                  <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2.5">
                    {tr('legalCompass', 'checklistHeader')}
                  </p>
                  <InteractiveChecklist items={article.checklist} />
                </div>
              )}

              {/* Extra content */}
              {article.extraContent && (
                <div className="mt-5 text-[13.5px] text-slate-600 leading-relaxed space-y-3">
                  {article.extraContent}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Category Tab ────────────────────────────────────────────── */
const CategoryTab: React.FC<{
  icon: React.ReactNode;
  label: string;
  description: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, description, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="flex-1 flex flex-col items-start gap-3 px-5 py-4 rounded-2xl border transition-all duration-200 text-left group"
    style={{
      background: isActive ? NAVY : '#FFFFFF',
      borderColor: isActive ? NAVY : BORDER,
      boxShadow: isActive ? `0 4px 20px ${NAVY}25` : undefined,
    }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
      style={{ background: isActive ? GOLD : `${NAVY}0A` }}
    >
      <span style={{ color: isActive ? NAVY : NAVY }}>{icon}</span>
    </div>
    <div className="flex-1">
      <p className={`text-[14px] font-bold leading-tight mb-0.5 ${isActive ? 'text-white' : 'text-[#1A2B4C]'}`}>
        {label}
      </p>
      <p className={`text-[11.5px] leading-snug ${isActive ? 'text-white/60' : 'text-slate-400'}`}>
        {description}
      </p>
    </div>
    <span
      className="text-[10.5px] font-bold px-2.5 py-1 rounded-full"
      style={{
        background: isActive ? `${GOLD}` : `${NAVY}0C`,
        color: isActive ? NAVY : NAVY,
      }}
    >
      {count}
    </span>
  </button>
);

/* ─── Raw Article Data ────────────────────────────────────────── */
const ARTICLE_DATA: ArticleRaw[] = [
  /* ── NEWCOMERS ── */
  {
    id: 'anmeldung',
    tag: 'new',
    title: { EN: 'Address Registration', DE: 'Einwohnerregistrierung', VN: 'Đăng ký cư trú' },
    germanAnchor: 'Anmeldung',
    icon: <Home size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    isUrgent: true,
    urgencyText: { EN: 'Within 14 days', DE: 'Innerhalb von 14 Tagen', VN: 'Trong 14 ngày' },
    summary: {
      EN: 'The first mandatory step after arriving in Germany. Register your address at the Bürgeramt of your city.',
      DE: 'Der erste Pflichtschritt nach der Ankunft in Deutschland. Melden Sie Ihre Adresse beim Bürgeramt Ihrer Stadt an.',
      VN: 'Thủ tục bắt buộc đầu tiên sau khi đến Đức. Đăng ký địa chỉ tại Bürgeramt của thành phố bạn ở.',
    },
    checklist: [
      { id: 'a1', label: { EN: 'Passport / Personalausweis (original)', DE: 'Reisepass / Personalausweis (Original)', VN: 'Hộ chiếu / Personalausweis (bản gốc)' }, germanTerm: 'Reisepass' },
      { id: 'a2', label: { EN: 'Landlord confirmation of move-in (signature, date, address)', DE: 'Einzugsbestätigung vom Vermieter (Unterschrift, Datum, Adresse)', VN: 'Xác nhận nhập cư từ chủ nhà (chữ ký, ngày, địa chỉ)' }, germanTerm: 'Wohnungsgeberbestätigung' },
      { id: 'a3', label: { EN: 'Anmeldung form (download or fill in on-site)', DE: 'Anmeldeformular (herunterladen oder vor Ort ausfüllen)', VN: 'Mẫu đơn Anmeldung (tải sẵn hoặc điền tại chỗ)' } },
      { id: 'a4', label: { EN: 'Book appointment online via local Bürgeramt website', DE: 'Online-Termin über die Bürgeramt-Website buchen', VN: 'Đặt lịch online qua website Bürgeramt địa phương' }, germanTerm: 'Termin' },
    ],
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-3">
          <p>
            <strong>{t('Find Bürgeramt:', 'Bürgeramt finden:', 'Tìm Bürgeramt:')}</strong>{' '}
            {t('Visit', 'Besuchen Sie', 'Truy cập')}{' '}
            <a href="https://buerger-amt.de" target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: NAVY }}>buerger-amt.de</a>{' '}
            {t('or call', 'oder rufen Sie an', 'hoặc gọi')} <strong>115</strong>{' '}
            {t('to find the nearest office.', 'um das nächste Amt zu finden.', 'để tìm văn phòng gần nhất.')}
          </p>
          <p>
            <strong>{t('Note:', 'Hinweis:', 'Lưu ý:')}</strong>{' '}
            {t(
              'Must register within 14 days of moving in. Book early — slots fill fast, some offices release new slots daily at 7-8 AM.',
              'Anmeldung muss innerhalb von 14 Tagen nach dem Einzug erfolgen. Frühzeitig buchen — Slots füllen sich schnell, manche Ämter geben täglich um 7-8 Uhr neue Slots frei.',
              'Phải đăng ký trong 14 ngày sau khi dọn đến. Đặt sớm vì slot thường kín — một số nơi mở slot mới hàng ngày lúc 7-8h sáng.'
            )}
          </p>
          <p>
            {t('After Anmeldung you receive the', 'Nach der Anmeldung erhalten Sie die', 'Sau Anmeldung bạn nhận được')}{' '}
            <strong className="px-1.5 py-0.5 rounded-md text-[12px]" style={{ background: `${GOLD}25`, color: NAVY }}>Meldebescheinigung</strong>{' '}
            {t('— needed for all subsequent procedures.', '— benötigt für alle weiteren Verfahren.', '— cần thiết cho mọi thủ tục tiếp theo.')}
          </p>
        </div>
      );
    },
  },
  {
    id: 'blocked-account',
    tag: 'new',
    title: { EN: 'Activate Blocked Account', DE: 'Sperrkonto aktivieren', VN: 'Kích hoạt tài khoản phong tỏa' },
    germanAnchor: 'Blocked Account',
    icon: <Banknote size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    dependsOn: 'anmeldung',
    summary: {
      EN: 'After Anmeldung, activate your Blocked Account to receive monthly funds (992€/month, 2025).',
      DE: 'Nach der Anmeldung Sperrkonto aktivieren — 992€/Monat Auszahlung (2025).',
      VN: 'Sau Anmeldung, kích hoạt Blocked Account để nhận tiền hàng tháng (992€/tháng, 2025).',
    },
    checklist: [
      { id: 'b1', label: { EN: 'Complete Anmeldung → get address confirmation', DE: 'Anmeldung abschließen → Meldebestätigung', VN: 'Hoàn tất Anmeldung → lấy xác nhận địa chỉ' }, germanTerm: 'Meldebescheinigung' },
      { id: 'b2', label: { EN: 'Open a free bank account (N26, Commerzbank, Sparkasse)', DE: 'Kostenloses Girokonto eröffnen (N26, Commerzbank, Sparkasse)', VN: 'Mở tài khoản ngân hàng miễn phí (N26, Commerzbank, Sparkasse)' }, germanTerm: 'Girokonto' },
      { id: 'b3', label: { EN: 'Get your IBAN of the Girokonto', DE: 'IBAN des Girokontos notieren', VN: 'Lấy số IBAN của Girokonto' } },
      { id: 'b4', label: { EN: 'Log in to Blocked Account app (Fintiba / Expatrio / Coracle), upload documents + IBAN', DE: 'Sperrkonto-App (Fintiba / Expatrio / Coracle) — Dokumente + IBAN hochladen', VN: 'Đăng nhập app Blocked Account (Fintiba / Expatrio / Coracle), upload giấy tờ + IBAN' } },
      { id: 'b5', label: { EN: 'Complete Video-Ident verification if required', DE: 'Video-Ident-Verifizierung abschließen (falls nötig)', VN: 'Xác thực Video-Ident nếu được yêu cầu' } },
    ],
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-3">
          <p><strong>{t('Cost:', 'Kosten:', 'Chi phí:')}</strong>{' '}
            {t("Activation ~89-150€ + 5€/month fee. First month's funds arrive within 1-5 business days.", 'Aktivierung ~89-150€ + 5€/Monat. Erste Auszahlung in 1-5 Werktagen.', 'Phí kích hoạt ~89-150€ + 5€/tháng. Nhận tiền tháng đầu sau 1-5 ngày làm việc.')}
          </p>
          <p><strong>{t('Note:', 'Hinweis:', 'Lưu ý:')}</strong>{' '}
            {t('Cannot withdraw directly from Blocked Account. Provider auto-transfers to your Girokonto monthly.', 'Kein direkter Zugriff auf das Sperrkonto — Anbieter überweist monatlich automatisch.', 'Không thể rút trực tiếp từ Blocked Account. Nhà cung cấp tự chuyển sang Girokonto hàng tháng.')}
          </p>
        </div>
      );
    },
  },
  {
    id: 'sim-card',
    tag: 'new',
    title: { EN: 'SIM Card & Internet', DE: 'SIM-Karte & Internet', VN: 'SIM card & Internet' },
    germanAnchor: 'SIM-Karte',
    icon: <Phone size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    summary: {
      EN: 'Compare Prepaid plans from O2, Telekom, Vodafone and register a SIM as required by German law.',
      DE: 'Prepaid-Tarife von O2, Telekom und Vodafone vergleichen — SIM-Registrierung gemäß deutschem Recht.',
      VN: 'So sánh gói Prepaid của O2, Telekom, Vodafone và đăng ký SIM chính chủ theo luật Đức.',
    },
    checklist: [
      { id: 's1', label: { EN: 'Buy SIM at supermarket (Rewe, Aldi) or online', DE: 'SIM im Supermarkt (Rewe, Aldi) oder online kaufen', VN: 'Mua SIM tại siêu thị (Rewe, Aldi) hoặc online' } },
      { id: 's2', label: { EN: 'Mandatory Video-Ident activation — scan passport via webcam/app', DE: 'Pflicht-Video-Ident — Reisepass per Webcam/App scannen', VN: 'Bắt buộc Video-Ident — scan hộ chiếu qua webcam/app' }, germanTerm: 'POSTIDENT' },
      { id: 's3', label: { EN: 'Select tariff via app or SMS after SIM is active (~5-10 min)', DE: 'Tarif per App oder SMS wählen (~5-10 Minuten nach Aktivierung)', VN: 'Chọn tariff qua app hoặc SMS sau khi SIM hoạt động (~5-10 phút)' } },
    ],
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: BORDER }}>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr style={{ background: `${NAVY}08` }}>
                  <th className="px-4 py-2.5 text-left font-bold" style={{ color: NAVY }}>{t('Carrier', 'Anbieter', 'Nhà mạng')}</th>
                  <th className="px-4 py-2.5 text-left font-bold" style={{ color: NAVY }}>~10€</th>
                  <th className="px-4 py-2.5 text-left font-bold" style={{ color: NAVY }}>~15€</th>
                  <th className="px-4 py-2.5 text-left font-bold" style={{ color: NAVY }}>{t('Highlights', 'Stärken', 'Điểm mạnh')}</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: BORDER }}>
                {[
                  { name: 'Telekom', p1: '20GB (M)', p2: '40GB (L)', pro: t('Best network, rollover data', 'Bestes Netz, Datenübertrag', 'Mạng tốt nhất, rollover data') },
                  { name: 'Vodafone', p1: '25GB (S)', p2: '50GB (M)', pro: t('Large volume, EU roaming', 'Hohes Volumen, EU-Roaming', 'Volume lớn, EU roaming') },
                  { name: 'O2', p1: '20GB (S)', p2: '40GB (M)', pro: t('1Mbit/s fallback, cheapest', '1Mbit/s nach Limit, günstig', '1Mbit/s sau hết data, rẻ nhất') },
                ].map(r => (
                  <tr key={r.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 font-bold" style={{ color: NAVY }}>{r.name}</td>
                    <td className="px-4 py-2.5 text-slate-600">{r.p1}</td>
                    <td className="px-4 py-2.5 text-slate-600">{r.p2}</td>
                    <td className="px-4 py-2.5 text-slate-500">{r.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[12px] text-slate-400">
            {t('* Prices Q1 2026, 4-week plans.', '* Preise Q1 2026, 4-Wochen-Tarife.', '* Giá Q1 2026, gói 4 tuần.')}
          </p>
        </div>
      );
    },
  },
  {
    id: 'immatrikulation',
    tag: 'new',
    title: { EN: 'Official Enrollment', DE: 'Offizielle Immatrikulation', VN: 'Nhập học chính thức' },
    germanAnchor: 'Immatrikulation',
    icon: <FileText size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    dependsOn: 'anmeldung',
    summary: {
      EN: 'Complete enrollment, receive your student ID and activate the semester transport ticket.',
      DE: 'Immatrikulation abschließen, Studentenausweis erhalten und Semesterticket aktivieren.',
      VN: 'Hoàn tất nhập học, nhận thẻ sinh viên và kích hoạt vé tàu học kỳ.',
    },
    checklist: [
      { id: 'i1', label: { EN: 'Submit docs online: Zulassungsbescheinigung, passport, Anmeldung, certified transcripts, photo', DE: 'Online: Zulassungsbescheinigung, Reisepass, Anmeldung, beglaubigte Zeugnisse, Foto', VN: 'Nộp online: Zulassungsbescheinigung, passport, Anmeldung, bằng cấp dịch công chứng, ảnh' } },
      { id: 'i2', label: { EN: 'Pay semester fee (150-350€)', DE: 'Semesterbeitrag bezahlen (150-350€)', VN: 'Đóng phí học kỳ (150-350€)' }, germanTerm: 'Semesterbeitrag' },
      { id: 'i3', label: { EN: 'Receive electronic enrollment confirmation → print student ID', DE: 'Elektronische Immatrikulationsbestätigung → Studentenausweis ausdrucken', VN: 'Nhận xác nhận nhập học điện tử → in thẻ sinh viên' }, germanTerm: 'Immatrikulationsbescheinigung' },
      { id: 'i4', label: { EN: 'Activate semester ticket via app (DB Navigator / MVV / OWLmobil)', DE: 'Semesterticket per App aktivieren (DB Navigator / MVV / OWLmobil)', VN: 'Kích hoạt vé tàu học kỳ qua app (DB Navigator / MVV / OWLmobil)' }, germanTerm: 'Semesterticket' },
    ],
  },
  {
    id: 'krankenversicherung',
    tag: 'new',
    title: { EN: 'Health Insurance', DE: 'Krankenversicherung', VN: 'Bảo hiểm y tế' },
    germanAnchor: 'Krankenversicherung',
    icon: <Shield size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    isUrgent: true,
    urgencyText: { EN: 'Before enrollment', DE: 'Vor der Immatrikulation', VN: 'Trước khi nhập học' },
    dependsOn: 'immatrikulation',
    summary: {
      EN: 'Mandatory for students under 30. ~120€/month at TK, AOK, Barmer or DAK.',
      DE: 'Pflichtversicherung für Studierende unter 30. ~120€/Monat bei TK, AOK, Barmer oder DAK.',
      VN: 'Bắt buộc cho sinh viên dưới 30 tuổi. ~120€/tháng tại TK, AOK, Barmer hoặc DAK.',
    },
    checklist: [
      { id: 'k1', label: { EN: 'Choose provider: TK, AOK, Barmer or DAK', DE: 'Anbieter wählen: TK, AOK, Barmer oder DAK', VN: 'Chọn nhà cung cấp: TK, AOK, Barmer hoặc DAK' } },
      { id: 'k2', label: { EN: 'Register online with Anmeldung, passport and enrollment confirmation', DE: 'Online mit Anmeldung, Reisepass und Immatrikulationsbestätigung anmelden', VN: 'Đăng ký online với Anmeldung, passport và xác nhận nhập học' } },
      { id: 'k3', label: { EN: 'Receive insurance card by post (5-10 days), activate via app', DE: 'Versichertenkarte per Post (5-10 Tage), per App aktivieren', VN: 'Nhận thẻ bảo hiểm qua bưu điện (5-10 ngày), kích hoạt qua app' }, germanTerm: 'Gesundheitskarte' },
      { id: 'k4', label: { EN: 'Download PDF insurance confirmation for university & immigration office', DE: 'PDF-Versicherungsnachweis für Uni & Ausländerbehörde herunterladen', VN: 'Lấy bản PDF xác nhận bảo hiểm để nộp trường & Sở ngoại kiều' }, germanTerm: 'Versicherungsbescheinigung' },
    ],
  },

  /* ── RESIDENCY ── */
  {
    id: 'aufenthaltstitel',
    tag: 'residency',
    title: { EN: 'Extend Residence Permit', DE: 'Aufenthaltstitel verlängern', VN: 'Gia hạn giấy phép cư trú' },
    germanAnchor: 'Aufenthaltstitel',
    icon: <CreditCard size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    isUrgent: true,
    urgencyText: { EN: 'Before visa expires', DE: 'Vor Ablauf des Visums', VN: 'Trước khi visa hết hạn' },
    dependsOn: 'anmeldung',
    summary: {
      EN: 'Book appointment at Ausländerbehörde before visa expires. Proof of funds ~11,904€/year (2026).',
      DE: 'Termin bei der Ausländerbehörde vor Ablauf des Visums. Finanznachweis ~11.904€/Jahr (2026).',
      VN: 'Đặt lịch tại Ausländerbehörde trước khi visa hết hạn. Chứng minh tài chính ~11.904€/năm (2026).',
    },
    checklist: [
      { id: 'v1', label: { EN: 'Book early at Ausländerbehörde (slots fill up weekly)', DE: 'Frühzeitig Termin buchen (Slots füllen sich wöchentlich)', VN: 'Đặt lịch sớm tại Ausländerbehörde (lịch thường kín hàng tuần)' }, germanTerm: 'Termin' },
      { id: 'v2', label: { EN: 'Valid passport + 2 photos 35x45mm', DE: 'Gültiger Reisepass + 2 Fotos 35x45mm', VN: 'Hộ chiếu còn hạn + 2 ảnh 35x45mm' } },
      { id: 'v3', label: { EN: 'Current address registration', DE: 'Aktuelle Anmeldebescheinigung', VN: 'Giấy đăng ký địa chỉ hiện tại' }, germanTerm: 'Anmeldung' },
      { id: 'v4', label: { EN: 'Valid health insurance certificate', DE: 'Gültiger Krankenversicherungsnachweis', VN: 'Bảo hiểm y tế còn hiệu lực' }, germanTerm: 'Krankenversicherung' },
      { id: 'v5', label: { EN: 'Current enrollment confirmation', DE: 'Aktuelle Immatrikulationsbescheinigung', VN: 'Xác nhận nhập học hiện tại' }, germanTerm: 'Immatrikulationsbescheinigung' },
      { id: 'v6', label: { EN: 'Proof of funds: Blocked Account / scholarship / bank statements 3-6 months', DE: 'Finanznachweis: Sperrkonto / Stipendium / Kontoauszüge 3-6 Monate', VN: 'Chứng minh tài chính: Blocked Account / học bổng / sao kê 3-6 tháng' } },
    ],
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-3">
          <p><strong>{t('Fee:', 'Gebühr:', 'Phí:')}</strong>{' '}
            {t('80-110€ on-site. After biometric scan you receive a', '80-110€ vor Ort. Nach biometrischem Scan erhalten Sie eine', '80-110€ tại chỗ. Sau quét vân tay sinh trắc học, bạn nhận được')}{' '}
            <strong style={{ color: NAVY }}>Fiktionsbescheinigung</strong>{' '}
            {t('while waiting for the eAT card (4-8 weeks).', 'während Sie auf die eAT-Karte warten (4-8 Wochen).', 'trong khi chờ thẻ eAT (4-8 tuần).')}
          </p>
          <p><strong>{t('Funds required:', 'Finanzanforderung:', 'Tài chính yêu cầu:')}</strong>{' '}
            {t('~11,904€/year (992€/month, 2026). Proven via Blocked Account, scholarship, or bank statements (max 20h/week during semester).', '~11.904€/Jahr (992€/Monat, 2026). Über Sperrkonto, Stipendium oder Kontoauszüge (max. 20h/Woche im Semester).', '~11.904€/năm (992€/tháng, 2026). Qua Blocked Account, học bổng, hoặc sao kê ngân hàng (tối đa 20h/tuần kỳ học).')}
          </p>
        </div>
      );
    },
  },
  {
    id: 'aufenthg',
    tag: 'residency',
    title: { EN: 'Student Work Rights', DE: 'Aufenthaltsrecht für Studierende', VN: 'Quyền đi làm của sinh viên' },
    germanAnchor: 'AufenthG §16b',
    icon: <Scale size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    summary: {
      EN: 'Max 140 full-time days or 280 half-time days per year. Violations can lead to visa revocation.',
      DE: 'Max. 140 Vollzeit- oder 280 Teilzeittage pro Jahr. Verstöße können zur Visarücknahme führen.',
      VN: 'Tối đa 140 ngày full-time hoặc 280 ngày half-time mỗi năm. Vi phạm có thể bị thu hồi visa.',
    },
    extraContent: (lang) => {
      const t = sl(lang);
      const rules = [
        { label: t('140 days/year', '140 Tage/Jahr', '140 ngày/năm'), detail: t('Full-time', 'Vollzeit', 'Full-time (toàn thời gian)'), safe: true },
        { label: t('280 days/year', '280 Tage/Jahr', '280 ngày/năm'), detail: t('Half-time', 'Teilzeit', 'Half-time (bán thời gian)'), safe: true },
        { label: t('20 hours/week', '20 Std./Woche', '20 giờ/tuần'), detail: t('During semester', 'Im Semester', 'Trong kỳ học'), safe: true },
        { label: t('Exceeding limit', 'Überschreitung', 'Vượt hạn mức'), detail: t('Card revoked + 1-3 yr ban', 'Karte entzogen + 1-3 Jahre', 'Thu hồi thẻ + cấm 1-3 năm'), safe: false },
      ];
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {rules.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border text-[13px]"
                style={{ borderColor: item.safe ? `${GOLD}50` : '#FCA5A550', background: item.safe ? `${GOLD}08` : '#FEF2F2' }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: item.safe ? GOLD : '#F87171' }} />
                <div>
                  <div className="font-bold" style={{ color: NAVY }}>{item.label}</div>
                  <div className="text-slate-500 text-[12px]">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-slate-400">
            {t('* Conditions: no unexplained break >6 months, meet minimum credit requirements.', '* Bedingungen: kein ungeklärter Unterbruch >6 Monate, Mindestcredits erfüllen.', '* Điều kiện: không nghỉ học >6 tháng không lý do, đạt tín chỉ tối thiểu.')}
          </p>
        </div>
      );
    },
  },
  {
    id: 'ummeldung',
    tag: 'residency',
    title: { EN: 'Change of Address', DE: 'Adressummeldung', VN: 'Chuyển địa chỉ đăng ký' },
    germanAnchor: 'Ummeldung',
    icon: <Home size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    isUrgent: true,
    urgencyText: { EN: 'Within 14 days (fine up to €1,000)', DE: '14 Tage (Bußgeld bis 1.000€)', VN: 'Trong 14 ngày (phạt đến 1.000€)' },
    summary: {
      EN: 'Must complete within 14 days of moving. Moving cities? Just do Anmeldung at the new location.',
      DE: 'Innerhalb von 14 Tagen nach dem Umzug. Stadtumzug? Neue Anmeldung am neuen Wohnort genügt.',
      VN: 'Hoàn tất trong 14 ngày kể từ khi chuyển. Chuyển thành phố? Chỉ cần Anmeldung tại nơi mới.',
    },
    checklist: [
      { id: 'u1', label: { EN: 'Passport + current residence card', DE: 'Reisepass + aktuelle Aufenthaltskarte', VN: 'Hộ chiếu + thẻ cư trú hiện tại' }, germanTerm: 'eAT' },
      { id: 'u2', label: { EN: 'Move-in confirmation from new landlord', DE: 'Einzugsbestätigung vom neuen Vermieter', VN: 'Xác nhận nhập cư từ chủ nhà mới' }, germanTerm: 'Wohnungsgeberbestätigung' },
      { id: 'u3', label: { EN: 'Fill out Ummeldung form (download or fill on-site)', DE: 'Ummeldungsformular ausfüllen (online oder vor Ort)', VN: 'Điền mẫu đơn Ummeldung (tải online hoặc điền tại chỗ)' } },
    ],
  },
  {
    id: 'passport',
    tag: 'residency',
    title: { EN: 'Passport & Consulate', DE: 'Reisepass & Konsulat', VN: 'Hộ chiếu & Lãnh sự' },
    germanAnchor: 'Reisepass / Konsulat',
    icon: <FileText size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    summary: {
      EN: 'Guide to passport renewal and handling a lost passport in Germany.',
      DE: 'Reisepassverlängerung und Vorgehen bei Verlust in Deutschland.',
      VN: 'Hướng dẫn gia hạn hộ chiếu và xử lý khi mất hộ chiếu tại Đức.',
    },
    checklist: [
      { id: 'p1', label: { EN: 'Application form + old passport + 3.5x4.5cm photo + copy of residence card', DE: 'Antrag + alter Reisepass + Foto 3,5x4,5cm + Kopie Aufenthaltskarte', VN: 'Tờ khai + hộ chiếu cũ + ảnh 3.5x4.5cm + bản sao thẻ cư trú' }, germanTerm: 'eAT' },
      { id: 'p2', label: { EN: 'Submit at Embassy Berlin or Consulate Frankfurt', DE: 'Einreichen bei Botschaft Berlin oder Konsulat Frankfurt', VN: 'Nộp tại ĐSQ Berlin hoặc Lãnh sự Frankfurt' } },
    ],
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-3">
          <p><strong>{t('Lost passport:', 'Reisepass verloren:', 'Mất hộ chiếu:')}</strong></p>
          <ol className="list-decimal list-inside space-y-1.5 pl-2">
            <li>{t('File a report at German police →', 'Anzeige bei der deutschen Polizei erstatten →', 'Báo cảnh sát Đức →')} <strong>Anzeige</strong></li>
            <li>{t('Submit to Embassy / Consulate with the Anzeige', 'Antrag + Anzeige bei Botschaft / Konsulat einreichen', 'Nộp hồ sơ kèm biên bản tại ĐSQ / Lãnh sự')}</li>
            <li>{t('Berlin:', 'Berlin:', 'Berlin:')} <a href="mailto:berlin.kv@mofa.gov.vn" className="font-semibold underline" style={{ color: NAVY }}>berlin.kv@mofa.gov.vn</a></li>
            <li>{t('Frankfurt:', 'Frankfurt:', 'Frankfurt:')} <a href="mailto:frankfurt.lsq@mofa.gov.vn" className="font-semibold underline" style={{ color: NAVY }}>frankfurt.lsq@mofa.gov.vn</a></li>
          </ol>
          <p className="text-slate-500 text-[12.5px]">{t('Processing: 3-5 business days.', 'Bearbeitungszeit: 3-5 Werktage.', 'Xử lý: 3-5 ngày làm việc.')}</p>
        </div>
      );
    },
  },

  /* ── TAX & INSURANCE ── */
  {
    id: 'rundfunkbeitrag',
    tag: 'tax',
    title: { EN: 'Broadcasting Fee', DE: 'Rundfunkbeitrag', VN: 'Thuế Radio & Tivi' },
    germanAnchor: 'Rundfunkbeitrag',
    icon: <Radio size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    summary: {
      EN: '18.36€/month per household (2026). Split in WGs. BAföG recipients are fully exempt.',
      DE: '18,36€/Monat pro Haushalt (2026). In der WG aufteilen. BAföG-Empfänger vollständig befreit.',
      VN: '18,36€/tháng/hộ (2026). Chia tiền nếu ở WG. Sinh viên nhận BAföG được miễn hoàn toàn.',
    },
    checklist: [
      { id: 'r1', label: { EN: 'Check if anyone in household is already paying (1 person per household)', DE: 'Prüfen, ob jemand im Haushalt bereits zahlt (nur 1 Person nötig)', VN: 'Kiểm tra xem hộ có ai đang đóng chưa (chỉ cần 1 người/hộ)' } },
      { id: 'r2', label: { EN: 'Receiving BAföG? → Apply for exemption at rundfunkbeitrag.de/befreiung', DE: 'BAföG-Empfänger? → Befreiungsantrag auf rundfunkbeitrag.de/befreiung', VN: 'Nhận BAföG? → Nộp đơn miễn tại rundfunkbeitrag.de/befreiung' } },
      { id: 'r3', label: { EN: 'Register online if nobody in household is paying yet', DE: 'Online anmelden, wenn noch niemand zahlt', VN: 'Đăng ký online nếu chưa ai trong hộ đóng' } },
    ],
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <p className="text-[13px] text-slate-500">
          {t('Fully exempt with BAföG or social benefits. Apply at', 'Vollständige Befreiung bei BAföG oder Sozialleistungen. Antrag auf', 'Miễn hoàn toàn nếu nhận BAföG hoặc trợ cấp xã hội. Nộp đơn tại')}{' '}
          <a href="https://rundfunkbeitrag.de/befreiung" target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: NAVY }}>rundfunkbeitrag.de/befreiung</a>.
        </p>
      );
    },
  },
  {
    id: 'steuer-id',
    tag: 'tax',
    title: { EN: 'Tax Identification Number', DE: 'Steueridentifikationsnummer', VN: 'Mã số thuế' },
    germanAnchor: 'Steuer-ID',
    icon: <CreditCard size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    dependsOn: 'anmeldung',
    summary: {
      EN: '11-digit code sent to your address 2-4 weeks after Anmeldung. Missing it → taxed at 42-45%.',
      DE: '11-stelliger Code — wird 2-4 Wochen nach Anmeldung zugesandt. Ohne ihn → 42-45% Steuern.',
      VN: 'Mã 11 chữ số gửi về địa chỉ 2-4 tuần sau Anmeldung. Thiếu mã → thuế cao nhất 42-45%.',
    },
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-xl border" style={{ borderColor: '#FCA5A550', background: '#FEF2F2' }}>
            <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] font-medium text-red-700">
              {t('Submit Steuer-ID to your employer immediately when starting work. Missing = Steuerklasse VI (42-45%).', 'Steuer-ID sofort beim Arbeitgeber einreichen. Fehlt sie = Steuerklasse VI (42-45%).', 'Nộp Steuer-ID ngay cho nhà tuyển dụng khi bắt đầu làm. Thiếu = Steuerklasse VI (42-45%).')}
            </p>
          </div>
          <p>{t('Not received after 4 weeks? Contact your local', 'Nach 4 Wochen nicht erhalten? Lokales', 'Chưa nhận sau 4 tuần? Liên hệ')}{' '}
            <strong>Finanzamt</strong>{' '}
            {t('to request a replacement.', 'um Neuausstellung bitten.', 'để yêu cầu cấp lại.')}
          </p>
        </div>
      );
    },
  },
  {
    id: 'haftpflicht',
    tag: 'tax',
    title: { EN: 'Personal Liability Insurance', DE: 'Haftpflichtversicherung', VN: 'Bảo hiểm trách nhiệm cá nhân' },
    germanAnchor: 'Haftpflichtversicherung',
    icon: <Shield size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    summary: {
      EN: '4-10€/month — covers millions in damages. German law holds individuals liable without limit.',
      DE: '4-10€/Monat — Schutz in Millionenhöhe. Deutsches Recht haftet unbegrenzt.',
      VN: '4-10€/tháng — bảo hiểm hàng triệu Euro. Luật Đức buộc cá nhân chịu trách nhiệm không giới hạn.',
    },
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-3">
          <p><strong>{t('Why?', 'Warum?', 'Tại sao?')}</strong>{' '}
            {t('If you accidentally damage someone\'s property or cause an accident, this pays for you. No cap under German law.', 'Wenn Sie versehentlich Schaden verursachen, zahlt diese Versicherung. Keine Obergrenze nach deutschem Recht.', 'Nếu vô tình gây thiệt hại cho người khác, bảo hiểm này chi trả thay bạn. Luật Đức không giới hạn mức bồi thường.')}
          </p>
          <div className="p-3.5 rounded-xl border" style={{ borderColor: `${GOLD}50`, background: `${GOLD}08` }}>
            <p className="text-[13px] font-semibold" style={{ color: NAVY }}>
              {t('💡 Student packages from HanseMerkur, DEVK or Huk24 ≈ 4€/month, fully online.', '💡 Studentenpakete von HanseMerkur, DEVK oder Huk24 ≈ 4€/Monat, 100% online.', '💡 Gói sinh viên từ HanseMerkur, DEVK hoặc Huk24 chỉ ~4€/tháng, mua 100% online.')}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: 'steuererklarung',
    tag: 'tax',
    title: { EN: 'Tax Return — Get Money Back', DE: 'Steuererklärung — Geld zurück', VN: 'Khai thuế — Lấy tiền hoàn về' },
    germanAnchor: 'Steuererklärung',
    icon: <Banknote size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    summary: {
      EN: 'Income under 12,096€/year → refund 200-1,000€. File via ELSTER by July 31 each year.',
      DE: 'Einkommen unter 12.096€/Jahr → Erstattung 200-1.000€. Bis 31. Juli via ELSTER.',
      VN: 'Thu nhập dưới 12.096€/năm → hoàn thuế 200-1.000€. Nộp qua ELSTER trước 31/7.',
    },
    checklist: [
      { id: 'st1', label: { EN: 'Register on ELSTER at elster.de (Steuer-ID required)', DE: 'Konto auf elster.de erstellen (Steuer-ID nötig)', VN: 'Đăng ký tài khoản ELSTER tại elster.de (cần Steuer-ID)' } },
      { id: 'st2', label: { EN: 'Collect Lohnsteuerbescheinigung from all employers', DE: 'Lohnsteuerbescheinigung von allen Arbeitgebern sammeln', VN: 'Thu thập Lohnsteuerbescheinigung từ tất cả nhà tuyển dụng' } },
      { id: 'st3', label: { EN: 'Claim additional expenses: laptop, commuting, study materials', DE: 'Kosten angeben: Laptop, Fahrtkosten, Lernmaterial', VN: 'Khai thêm: laptop, đi lại, tài liệu học tập' } },
      { id: 'st4', label: { EN: 'File before July 31 of the following year', DE: 'Einreichen vor dem 31. Juli des Folgejahres', VN: 'Nộp trước ngày 31/7 của năm tiếp theo' } },
    ],
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <p className="text-[13px] text-slate-500">
          {t('Use', 'Nutze', 'Dùng')} <strong>Taxfix</strong> {t('or', 'oder', 'hoặc')} <strong>Wundertax</strong>{' '}
          {t('instead of ELSTER for simple cases. Refund typically arrives within 4-8 weeks.', 'statt ELSTER für einfache Fälle. Erstattung in 4-8 Wochen.', 'thay vì ELSTER cho trường hợp đơn giản. Hoàn tiền sau 4-8 tuần.')}
        </p>
      );
    },
  },
  {
    id: 'arbeitsvertrag',
    tag: 'tax',
    title: { EN: 'Employment Contract & Rights', DE: 'Arbeitsvertrag & Rechte', VN: 'Hợp đồng lao động & Quyền lợi' },
    germanAnchor: 'Arbeitsvertrag',
    icon: <Briefcase size={20} style={{ color: NAVY }} strokeWidth={1.75} />,
    summary: {
      EN: 'Min. wage 12.82€/hour (2026). Compare Minijob vs Werkstudent and how to avoid exploitation.',
      DE: 'Mindestlohn 12,82€/Stunde (2026). Minijob vs. Werkstudent — Ausbeutung vermeiden.',
      VN: 'Lương tối thiểu 12,82€/giờ (2026). So sánh Minijob vs Werkstudent và cách tránh bóc lột.',
    },
    extraContent: (lang) => {
      const t = sl(lang);
      return (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-xl border" style={{ borderColor: BORDER }}>
            <table className="w-full text-[12.5px]">
              <thead>
                <tr style={{ background: `${NAVY}08` }}>
                  <th className="px-4 py-2.5 text-left font-bold" style={{ color: NAVY }}>{t('Type', 'Typ', 'Loại')}</th>
                  <th className="px-4 py-2.5 text-left font-bold" style={{ color: NAVY }}>{t('Income Limit', 'Einkommensgrenze', 'Giới hạn')}</th>
                  <th className="px-4 py-2.5 text-left font-bold" style={{ color: NAVY }}>{t('Min. Wage', 'Mindestlohn', 'Lương tối thiểu')}</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: BORDER }}>
                {[
                  { type: 'Minijob', limit: t('≤ 556€/month', '≤ 556€/Monat', '≤ 556€/tháng'), wage: '12,82€/h' },
                  { type: 'Werkstudent', limit: t('No limit', 'Kein Limit', 'Không giới hạn'), wage: '12,82€/h' },
                ].map(row => (
                  <tr key={row.type} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-2.5 font-bold" style={{ color: NAVY }}>{row.type}</td>
                    <td className="px-4 py-2.5 text-slate-600">{row.limit}</td>
                    <td className="px-4 py-2.5 text-slate-600">{row.wage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3.5 rounded-xl border" style={{ borderColor: '#FCA5A550', background: '#FEF2F2' }}>
            <p className="text-[13px] font-semibold text-red-700">
              {t('⚠️ Sign 2 copies of the contract and keep a photo. If you suspect a violation, call DGB union or the free Fair Integration hotline.', '⚠️ 2 Vertragsexemplare unterschreiben und fotografieren. Bei Verstößen: DGB-Gewerkschaft oder kostenlose Fair Integration Hotline.', '⚠️ Ký 2 bản hợp đồng, chụp ảnh lưu. Nếu nghi ngờ vi phạm, gọi DGB hoặc hotline Fair Integration miễn phí.')}
            </p>
          </div>
        </div>
      );
    },
  },
];

/* ─── Main Page Component ────────────────────────────────────── */
const LegalCompassPage: React.FC = () => {
  const { lang, tr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const [activeSubTag, setActiveSubTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Localize all articles
  const articles: Article[] = ARTICLE_DATA.map(a => ({
    id: a.id,
    tag: a.tag,
    title: a.title[lang],
    germanAnchor: a.germanAnchor,
    icon: a.icon,
    isUrgent: a.isUrgent,
    urgencyText: a.urgencyText?.[lang],
    summary: a.summary[lang],
    checklist: a.checklist?.map(c => ({ id: c.id, label: c.label[lang], germanTerm: c.germanTerm })),
    dependsOn: a.dependsOn,
    extraContent: a.extraContent?.(lang),
  }));

  // Filter articles
  const filtered = articles.filter(a => {
    const matchCat = !activeCategory || a.tag === activeCategory;
    const matchSub = !activeSubTag || a.id === activeSubTag;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q
      || a.title.toLowerCase().includes(q)
      || a.germanAnchor.toLowerCase().includes(q)
      || a.summary.toLowerCase().includes(q);
    return matchCat && matchSub && matchSearch;
  });

  // Handle sub-tag jump (from dependency banner)
  const handleJumpTo = (id: string) => {
    const target = ARTICLE_DATA.find(a => a.id === id);
    if (target) {
      setActiveCategory(target.tag);
      setActiveSubTag(id);
      setTimeout(() => {
        document.getElementById(`article-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleCategoryClick = (key: CategoryKey) => {
    if (activeCategory === key) {
      setActiveCategory(null);
      setActiveSubTag(null);
    } else {
      setActiveCategory(key);
      setActiveSubTag(null);
    }
  };

  const catDescKey = (key: CategoryKey) =>
    key === 'new' ? 'catNewDesc' : key === 'residency' ? 'catResidencyDesc' : 'catTaxDesc';

  const catLabelKey = (key: CategoryKey) =>
    key === 'new' ? 'tagNew' : key === 'residency' ? 'tagResidency' : 'tagTax';

  return (
    <div className="min-h-screen flex flex-col relative font-sans" style={{ background: '#F8F9FB' }}>
      <Navbar transparent={false} />

      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[900px] h-[900px] -translate-x-1/3 -translate-y-1/3"
          style={{ background: `radial-gradient(circle, ${NAVY}05, transparent 65%)` }} />
        <div className="absolute bottom-0 right-0 w-[900px] h-[900px] translate-x-1/3 translate-y-1/3"
          style={{ background: `radial-gradient(circle, ${GOLD}05, transparent 65%)` }} />
        <div className="absolute inset-0 opacity-[0.18]" style={{
          backgroundImage: `radial-gradient(circle, ${NAVY}30 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />
      </div>

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">

        {/* Back Button */}
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

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          className="text-center mb-12">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-5 border"
            style={{ background: `${NAVY}08`, borderColor: `${NAVY}18`, color: NAVY }}
          >
            <Shield size={12} style={{ color: GOLD }} strokeWidth={2.5} />
            {tr('legalCompass', 'badge')}
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-4" style={{ color: NAVY }}>
            {tr('legalCompass', 'titleMain')}{' '}
            <span style={{ color: GOLD }}>{tr('legalCompass', 'titleHighlight')}</span>
          </h1>

          <p className="text-[16px] text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            {tr('legalCompass', 'subtitle')}
          </p>

          {/* Search */}
          <div className="mt-7 max-w-md mx-auto">
            <div className="flex items-center px-5 py-3.5 rounded-2xl border bg-white shadow-sm focus-within:shadow-md transition-all"
              style={{ borderColor: BORDER }}>
              <Search size={16} className="text-slate-400 flex-shrink-0 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={tr('legalCompass', 'searchPlaceholder')}
                className="flex-1 bg-transparent text-[14px] font-medium text-slate-700 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600 transition-colors ml-2 text-[13px]">✕</button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── 3 Large Category Tabs ── */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {CATEGORIES.map(cat => (
            <CategoryTab
              key={cat.key}
              icon={cat.icon}
              label={tr('legalCompass', catLabelKey(cat.key))}
              description={tr('legalCompass', catDescKey(cat.key))}
              count={cat.articleIds.length}
              isActive={activeCategory === cat.key}
              onClick={() => handleCategoryClick(cat.key)}
            />
          ))}
        </motion.div>

        {/* ── Sub-tags (when a category is active) ── */}
        <AnimatePresence>
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-8"
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {/* "All" sub-pill */}
                <button
                  onClick={() => setActiveSubTag(null)}
                  className="px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-all duration-150 select-none"
                  style={{
                    background: !activeSubTag ? GOLD : '#FFFFFF',
                    color: !activeSubTag ? NAVY : '#6B7280',
                    borderColor: !activeSubTag ? GOLD : BORDER,
                    boxShadow: !activeSubTag ? `0 2px 8px ${GOLD}50` : undefined,
                  }}
                >
                  {tr('legalCompass', 'allInCategory')}
                </button>

                {/* One pill per article in this category */}
                {CATEGORIES.find(c => c.key === activeCategory)!.articleIds.map(id => {
                  const art = articles.find(a => a.id === id);
                  if (!art) return null;
                  const isActive = activeSubTag === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveSubTag(isActive ? null : id)}
                      className="px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-all duration-150 select-none flex items-center gap-1.5"
                      style={{
                        background: isActive ? `${NAVY}` : '#FFFFFF',
                        color: isActive ? '#FFFFFF' : '#374151',
                        borderColor: isActive ? NAVY : BORDER,
                      }}
                    >
                      {art.isUrgent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      )}
                      {art.germanAnchor}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── View All link when no category active ── */}
        {!activeCategory && !searchQuery && (
          <div className="text-center mb-8">
            <p className="text-[13px] text-slate-400">
              {tr('legalCompass', 'viewAll')} — {articles.length} topics
            </p>
          </div>
        )}

        {/* ── Articles ── */}
        {filtered.length > 0 ? (
          <motion.div key={`${activeCategory}-${activeSubTag}-${searchQuery}`}
            variants={stagger} initial="hidden" animate="visible"
            className="space-y-3">
            {filtered.map(article => (
              <div key={article.id} id={`article-${article.id}`}>
                <ArticleCard
                  article={article}
                  allArticles={articles}
                  onJumpTo={handleJumpTo}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-500 font-medium">{tr('legalCompass', 'noResults')}</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory(null); setActiveSubTag(null); }}
              className="mt-4 text-[13px] font-semibold underline"
              style={{ color: NAVY }}
            >
              {tr('legalCompass', 'clearFilters')}
            </button>
          </motion.div>
        )}

        {/* ── Disclaimer ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-14 p-5 rounded-2xl border text-center"
          style={{ borderColor: BORDER, background: `${NAVY}03` }}
        >
          <p className="text-[12.5px] text-slate-500 leading-relaxed">
            <strong style={{ color: NAVY }}>{tr('legalCompass', 'disclaimerLabel')}</strong>{' '}
            {tr('legalCompass', 'disclaimerText')}
          </p>
        </motion.div>

      </main>

    </div>
  );
};

export default LegalCompassPage;

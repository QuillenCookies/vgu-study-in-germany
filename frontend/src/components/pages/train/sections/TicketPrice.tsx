// frontend/src/components/pages/train/sections/TicketPrice.tsx
import React, { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Clock, Euro, Info, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface TicketCard {
  id: string;
  name: string;
  price: string;
  validity: string;
  note: string;
  highlight?: boolean;
}

const TICKETS: TicketCard[] = [
  {
    id: 'semester',
    name: 'Semesterticket',
    price: '~€100–230 / semester',
    validity: '6 months (semester)',
    note: "Bundled with your university enrollment fee. Covers unlimited travel on S-Bahn, U-Bahn, Tram, and Bus within the RMV zone — including many RE/RB lines. The best deal you'll ever find in Germany.",
    highlight: true,
  },
  {
    id: 'single',
    name: 'Einzelfahrt (Single)',
    price: '€3.40 – €5.50',
    validity: '1 journey',
    note: 'Valid for one trip without transfers (or with within 90 min in some zones). Buy from ticket machines or the DB/RMV app.',
  },
  {
    id: 'tageskarte',
    name: 'Tageskarte (Day Ticket)',
    price: '€10.00 – €16.50',
    validity: 'All day (until 03:00)',
    note: 'Great for day trips within Hessen. One person travels unlimited within the zone for the entire day.',
  },
  {
    id: 'week',
    name: 'Wochenkarte (Weekly)',
    price: '~€39 – €60',
    validity: '7 days',
    note: 'For students needing short-term coverage. Personalised — valid only for the named passenger.',
  },
  {
    id: 'month',
    name: 'Monatskarte (Monthly)',
    price: '~€85 – €130',
    validity: '1 month (calendar)',
    note: 'Best non-semester option. Valid from the 1st to the last day of the calendar month.',
  },
  {
    id: 'deutschlandticket',
    name: 'Deutschlandticket (€49)',
    price: '€58 / month',
    validity: '1 month (rolling)',
    note: 'Nationwide flat-rate ticket on all local/regional public transport in Germany. Subscribe monthly, cancel anytime. Does NOT cover ICE/IC.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'What does the Semesterticket cover?',
    a: 'In Hessen (Frankfurt, Darmstadt, Marburg area) the Semesterticket is issued by studierendenWERK and covers unlimited travel on all RMV services: S-Bahn, U-Bahn, Tram, Bus, and most RE/RB regional trains within Hessen. It is automatically included in the semester fee you pay when you enroll.',
  },
  {
    q: 'Do I need a ticket for ICE/IC trains?',
    a: 'Yes. ICE and IC/EC trains are long-distance services operated by Deutsche Bahn. The Semesterticket and Deutschlandticket do NOT cover them. You need a separate DB ticket — book early for the cheapest "Sparpreis" fares from €17.90.',
  },
  {
    q: 'Can I validate with my student ID?',
    a: 'Your university student ID card (with a valid Semesterticket sticker or digital code) IS your ticket on RMV. You must carry it at all times. Inspectors will check both the card and the current semester validity.',
  },
  {
    q: 'Is the Deutschlandticket worth it?',
    a: "If your Semesterticket doesn't cover commutes outside Hessen, or you travel frequently to other German cities, the €58/month Deutschlandticket is excellent value. Many states offer a discounted version for students — check with your university.",
  },
];

const TicketPrice: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-[#0B1220]">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="orange" className="mb-3">
            Tickets &amp; Fares
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A2B4C] dark:text-white mb-3">
            How Much Does It Cost?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            From single rides to the famous <strong>Semesterticket</strong> — understand
            every ticket option available to you as an international student.
          </p>
        </div>

        {/* Ticket Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {TICKETS.map((t) => (
            <div
              key={t.id}
              className={`relative rounded-3xl border shadow-sm p-6 flex flex-col gap-4 transition-all hover:shadow-md overflow-hidden group
                ${t.highlight
                  ? 'bg-[#1A2B4C] border-[#FFCC00]/40 text-white'
                  : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700'
                }`}
            >
              {t.highlight && (
                <div className="absolute top-0 right-0 bg-[#FFCC00] text-[#1A2B4C] text-[10px] font-black px-3 py-1 rounded-bl-xl tracking-wider uppercase">
                  Included with enrollment
                </div>
              )}

              {/* Decorative circle */}
              <div
                className={`absolute bottom-0 right-0 w-24 h-24 rounded-tl-[100%] transition-transform group-hover:scale-125
                  ${t.highlight ? 'bg-white/5' : 'bg-[#1A2B4C]/5'}`}
              />

              <div className="flex flex-col gap-1">
                <h3
                  className={`font-bold text-lg leading-tight ${t.highlight ? 'text-[#FFCC00]' : 'text-[#1A2B4C] dark:text-white'}`}
                >
                  {t.name}
                </h3>
                <span
                  className={`text-2xl font-black ${t.highlight ? 'text-white' : 'text-[#FFCC00]'}`}
                >
                  {t.price}
                </span>
              </div>

              <div
                className={`flex items-center gap-2 text-sm font-medium w-fit px-3 py-1.5 rounded-lg
                  ${t.highlight ? 'bg-white/10 text-white/80' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}
              >
                <Clock className="w-4 h-4 text-[#FFCC00]" />
                {t.validity}
              </div>

              <div
                className={`flex items-start gap-2 text-sm rounded-xl p-3 mt-auto
                  ${t.highlight
                    ? 'bg-white/10 text-white/80 border border-white/10'
                    : 'bg-blue-50/50 dark:bg-blue-950/30 text-[#1A2B4C]/80 dark:text-blue-300 border border-blue-100/50 dark:border-blue-800/50'
                  }`}
              >
                <Info className={`w-4 h-4 shrink-0 mt-0.5 ${t.highlight ? 'text-[#FFCC00]' : 'text-[#1A2B4C] dark:text-blue-400'}`} />
                {t.note}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-[#1A2B4C] dark:text-white mb-6 text-center flex items-center justify-center gap-2">
            <Euro className="w-5 h-5 text-[#FFCC00]" /> Frequently Asked Questions
          </h3>
          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="font-semibold text-[#1A2B4C] dark:text-white text-sm">
                    {item.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.rmv.de/en/homepage/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#1A2B4C] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#1A2B4C]/90 transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <ExternalLink className="w-4 h-4" /> RMV Tickets
          </a>
          <a
            href="https://www.bahn.de/en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#be0000] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#a00000] transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <Euro className="w-4 h-4" /> DB Long-Distance Tickets
          </a>
          <a
            href="https://www.deutschlandticket.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#008d3f] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#006b30] transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <ExternalLink className="w-4 h-4" /> Deutschlandticket
          </a>
        </div>
      </div>
    </section>
  );
};

export default TicketPrice;
